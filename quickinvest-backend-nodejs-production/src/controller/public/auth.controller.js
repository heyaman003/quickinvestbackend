const { validationResult } = require("express-validator");
const { generateToken, verify_jwt } = require("../../config/generateToken");
const User = require("../../models/auth.model");
const ValidationErrorMsg = require("../../helpers/ValidationErrorMsg");
const getIstTime = require("../../config/getTime");
const bcrypt = require("bcryptjs");
const generateUniqueIdByDate = require("../../config/generateUniqueIdByDate");
const Wallet = require("../../models/wallet.model");
const updateLevel = require("../../utils/updateLavel");
const RoyaltyInstance = require("../../models/royaltyInstance.model");
const generateUniqueUserID = require("../../config/generateUniqueUserID");
const PDFData = require("../../models/setting.model");
const { runRoyaltyRoi } = require("../../utils/royaltyRoi");
const { runRoi } = require("../../utils/runRoi");

const testAPI = async (_req, res) => {
  // await runRoyaltyRoi();
  // await runRoi();

  return res.send("ok");
};

const registerController = async (req, res) => {
  console.log("i am being hit--")
  const error = validationResult(req).formatWith(ValidationErrorMsg);
  console.log("error", error)
  if (!error.isEmpty()) {
    let msg;
    Object.keys(req.body).map((d) => {
      if (error.mapped()[d] !== undefined) {
        msg = error.mapped()[d];
      }
    });
    if (msg !== undefined) {
      return res.status(400).json({
        message: msg,
      });
    }
  }

  try {
    const { name, password, mobile, sponsorId, sponsorName, question, answer } =
      req.body;
      console.log(name, password, mobile, sponsorId, sponsorName, question, answer)
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    let generatedUserId;
    let isUserIdUnique = false;
    generatedUserId = generateUniqueUserID();
     console.log("generatedUserId", generatedUserId)
    while (!isUserIdUnique) {
      console.log("while loop")
      const isUserExists = await User.findOne({ userId: generatedUserId });
      if (!isUserExists) {
        console.log("while loop makeing true")
        isUserIdUnique = true;
      }
      console.log("while loop makeing true exit")
    }
    const userExists = await User.findOne({ mobile: mobile });
    console.log("userExists", userExists)
    if (!userExists) {
      console.log("crating user----", userExists)
      const user = await User.create({
        userId: generatedUserId,
        fullName: name,
        password: password,
        mobile: mobile,
        sponsorId: sponsorId?.toUpperCase(),
        sponsorName: sponsorName,
        security: {
          question: question,
          answer: answer,
        },
        token: generateToken(generatedUserId),
        joiningDate: new Date(getIstTime().date).toDateString(),
      });
      console.log("user", user);
      // create wallet
      await Wallet.create({
        userId: user.userId,
        fullName: user.fullName,
        sponsorId: user.sponsorId,
        sponsorName: user.sponsorName,
      });
      // Create Royalty Instance
      await RoyaltyInstance.create({
        userId: user?.userId,
        fullName: user?.fullName,
        sponsorId: user?.sponsorId,
        sponsorName: user?.sponsorName,
        dateAndTime: {
          date: new Date(getIstTime().date).toDateString(),
          time: getIstTime().time,
        },
      });

      // create level new for user
      let currentSponsor = user;
      for (let i = 1; i <= 2; i++) {
        const levelUser = await User.findOne({
          userId: currentSponsor.sponsorId,
        });

        if (levelUser?.userId !== "ADMIN") {
          await updateLevel(levelUser, user, i);
          currentSponsor = levelUser;
        } else {
          break;
        }
      }
      console.log("User created successfully");
      return res.status(201).json({
        message: "Registration successfull",
        data: {
          userId: user?.userId,
          fullName: user?.fullName,
          password: password,
          mobile: user?.mobile,
        },
      });
    } else {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

const loginController = async (req, res) => {
  console.log("i am being hit loginController--")
  const{userId, password} = req.body;
  console.log("userId, password", userId, password)
  const error = validationResult(req).formatWith((msg) => msg);
  console.log("Validation Errors:", error.array(),error.isEmpty());
  if (!error.isEmpty()) {
    let msg;
    Object.keys(req.body).map((d) => {
      if (error.mapped()[d] !== undefined) {
        msg = error.mapped()[d];
      }
    });
    if (msg !== undefined) {
      return res.status(400).json({
        message: msg,
      });
    }
  }
  try {
    // const { userId, password } = req.body;
    console.log("here i am");
    const user = await User.findOne({
      $or: [{ userId }, { mobile: userId }],
    });
    console.log(user, "user")
    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }
    if (user.userStatus) {
      console.log("here i am ",user.userStatus,user.userId,process.env.SEC_KEY)
      let x=await user.matchPassword(password)
      console.log(x,"is match pwd",password);
      if (user && (await user.matchPassword(password))) {
        console.log("password match")
        const token = generateToken(user.userId);
        console.log(token,"token generste")
        await User.findOneAndUpdate(
          { userId: user.userId },
          {
            $set: {
              token: token,
            },
          },
          { new: true }
        );
        return res.status(200).json({
          message: "Login successfull",
          token: token,
        });
      } else {
        return res.status(400).json({
          message: "Invalid credential",
        });
      }
    } else {
      return res.status(400).json({
        message: "You are now blocked user. Please contact with support agent",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

// Get Sponsor Name
const getSponsorNameController = async (req, res) => {
  const userId = req.query.userId?.toUpperCase();

  const user = await User.findOne({ userId: userId });

  if (user) {
    return res.status(200).json({
      name: user.fullName,
      status: true,
    });
  } else {
    return res.status(400).json({
      message: "Invalid user ID",
      status: false,
    });
  }
};

// Send Forgot password link Mail
const ForgotPasswordController = async (req, res) => {
  const error = validationResult(req).formatWith(ValidationErrorMsg);
  if (!error.isEmpty()) {
    let msg;
    Object.keys(req.body).map((d) => {
      if (error.mapped()[d] !== undefined) {
        msg = error.mapped()[d];
      }
    });
    if (msg !== undefined) {
      return res.status(400).json({
        message: msg,
      });
    }
  }
  try {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile });
    if (user) {
      let newToken = generateToken(user.userId);
      const updateUser = await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: {
            token: newToken,
          },
        },
        { new: true }
      );
      if (updateUser) {
        return res.status(200).json({
          message: "Forgot password request submitted",
          token: newToken,
        });
      } else {
        return res.status(400).json({
          message: "Forgot password didn't request",
        });
      }
    } else {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

// reset Password
const resetPasswordController = async (req, res) => {
  const error = validationResult(req).formatWith(ValidationErrorMsg);
  if (!error.isEmpty()) {
    let msg;
    Object.keys(req.body).map((d) => {
      if (error.mapped()[d] !== undefined) {
        msg = error.mapped()[d];
      }
    });
    if (msg !== undefined) {
      return res.status(400).json({
        message: msg,
      });
    }
  }
  try {
    const tokenId = req.query.token;
    const { password } = req.body;
    const validToken = verify_jwt(tokenId);
    if (validToken.status) {
      const user = await User.findOne({ userId: validToken.data?.id });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const update_password = await User.updateOne(
          { _id: user._id },
          {
            $set: {
              password: encryptedPassword,
            },
          }
        );
        if (update_password) {
          return res.status(200).json({
            message: "Password changed successfully",
          });
        }
      } else {
        return res.status(400).json({
          message: "User doesn't exist",
        });
      }
    } else {
      return res.status(400).json({
        message: "Token missing or invalid",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

// check mobile number
const checkMobileNumberController = async (req, res) => {
  const error = validationResult(req).formatWith(ValidationErrorMsg);
  if (!error.isEmpty()) {
    let msg;
    Object.keys(req.body).map((d) => {
      if (error.mapped()[d] !== undefined) {
        msg = error.mapped()[d];
      }
    });
    if (msg !== undefined) {
      return res.status(400).json({
        message: msg,
      });
    }
  }
  try {
    const mobile = req.params.mobile;
    const user = await User.findOne({ mobile: mobile });
    if (user) {
      return res.status(400).json({
        message: "Mobile number already in use",
      });
    } else {
      return res.status(200).json({
        message: "Mobile number available",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

// Get pdf link
const getPdfLink = async (_req, res) => {
  try {
    const result = await PDFData.findOne({ pdfId: "PDFID" });
    if (result) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ message: "There is no data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  testAPI,
  registerController,
  loginController,
  getSponsorNameController,
  ForgotPasswordController,
  resetPasswordController,
  checkMobileNumberController,
  getPdfLink,
};
