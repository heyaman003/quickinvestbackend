const {
  RECHARGE_COMISSION_SPONSOR,
  ALL_INCOME_TYPE_NAMES,
  RECHARGE__CONSTS,
} = require("../../constants");
const User = require("../../models/auth.model");
const Recharge = require("../../models/recharge.model");
const getIstTime = require("../../config/getTime");
const Wallet = require("../../models/wallet.model");
const IncomeHistory = require("../../models/incomeHistory.model");
const Level = require("../../models/level.model");
const { validationResult } = require("express-validator");
const ValidationErrorMsg = require("../../helpers/ValidationErrorMsg");
const RoiInstance = require("../../models/rechargeRoiInstance");
const cloudinary = require("../../config/cloudinary");
const Bank = require("../../models/addBank.model");
const bcrypt = require("bcryptjs");
const ManageUpi = require("../../models/manageUPI&QR.model");
const JoiningBonus = require("../../models/JoiningBonus");
const RechargeReward = require("../../models/RechargeReward");
const RechargeCounter = require("../../config/RechargeCounter");

// Create Recharge
const userRechargeController = async (req, res) => {
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
    const userId = req.auth.id;
    const { amount, transactionId } = req.body;
    const { path } = req.file || {};
    const isExistsWithTransId = await Recharge.findOne({
      transactionId: transactionId,
    });
    if (!path) {
      return res.status(500).json({ message: "Proof image required" });
    } else if (!transactionId) {
      return res.status(500).json({ message: "Transaction ID required" });
    } else if (!(amount >= 5000)) {
      return res.status(500).json({ message: "Minimum amount 5000" });
    } else if (!(amount <= 1000000)) {
      return res.status(500).json({ message: "Maximum amount 1000000" });
    } else if (isExistsWithTransId) {
      return res.status(500).json({ message: "Transaction ID already used" });
    } else {
      const rcId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      // Find Me
      const currentUser = await User.findOne({ userId });
      // Find Sponsor
      // Upload Recharge Proof Image to Cloudinary
      const image = await cloudinary.uploader.upload(path);
      const imgDataOfCloudinary = {
        url: image.secure_url,
        publicUrl: image.public_id,
      };
      // Create Recharge History
      const countOfRecharge = await Recharge.countDocuments({
        userId: currentUser?.userId,
      });
      const RechargeType = await RechargeCounter(currentUser?.userId);

      await Recharge.create({
        userId: userId,
        fullName: currentUser.fullName,
        mobile: currentUser.mobile,
        sponsorId: currentUser.sponsorId,
        sponsorName: currentUser.sponsorName,
        amount: parseInt(amount),
        rechargeType: RechargeType, // 'countOfRecharge' by default 0
        rechargeId: rcId,
        paidDays: 0,
        leftDays: RECHARGE__CONSTS.TOTAL_DAYS,
        totalDays: RECHARGE__CONSTS.TOTAL_DAYS,
        dateAndTime: {
          date: new Date(getIstTime().date).toDateString(),
          time: getIstTime().time,
        },
        transactionId: transactionId,
        proof: imgDataOfCloudinary,
      });
      // Create ROI Instance
      await RoiInstance.create({
        userId: currentUser?.userId,
        fullName: currentUser?.fullName,
        sponsorId: currentUser?.sponsorId,
        sponsorName: currentUser?.sponsorName,
        currentRechargeAmount: parseInt(amount),
        forRoiAmount: parseInt(amount),
        rechargeType: RechargeType,
        rechargeId: rcId,
        paidDays: 0,
        leftDays: RECHARGE__CONSTS.TOTAL_DAYS,
        totalDays: RECHARGE__CONSTS.TOTAL_DAYS,
        dateAndTime: {
          date: new Date(getIstTime().date).toDateString(),
          time: getIstTime().time,
        },
      });

      return res.status(201).json({ message: "Recharge successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get All Recharge History
const userGetAllRechargeController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      select: "-__v -createdAt -updatedAt",
    };

    const result = await Recharge.paginate({ userId: req.auth.id }, options);
    if (result?.docs?.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ message: "There is no recharge history" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const userGetAllJoiningBonusController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      select: "-__v -createdAt -updatedAt",
    };

    const result = await JoiningBonus.paginate(
      { userId: req.auth.id },
      options
    );
    if (result?.docs?.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res
        .status(400)
        .json({ message: "There is no Joining Bonus History" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const userGetAllRechargeRewardController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      select: "-__v -createdAt -updatedAt",
    };

    const result = await RechargeReward.paginate(
      { userId: req.auth.id },
      options
    );
    if (result?.docs?.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res
        .status(400)
        .json({ message: "There is no Joining Bonus History" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const addBankController = async (req, res) => {
  try {
    const userId = req.auth.id;
    const { accountNumber, bankHolderName, branch, ifscCode } = req.body;

    // Validate input data (you might want to add more validation)
    if (!accountNumber || !bankHolderName || !branch || !ifscCode) {
      return res.status(400).json({ message: "Incomplete data provided" });
    }
    // check if already have bank then will update
    const existBank = await Bank.findOne({ userId: userId });
    if (!existBank) {
      const createBank = await Bank.create({
        userId,
        holderName: bankHolderName,
        branchName: branch,
        accountNumber,
        IFSCCode: ifscCode,
      });
      // You might want to send back the created bank details in the response
      return res.status(201).json({
        message: "Bank added successfully",
        data: createBank,
      });
    } else {
      await Bank.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            holderName: bankHolderName,
            branchName: branch,
            accountNumber,
            IFSCCode: ifscCode,
          },
        }
      );
      return res.status(200).json({
        message: "Bank update successfully",
      });
    }
  } catch (error) {
    console.error("Error adding bank:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const getBankController = async (req, res) => {
  try {
    const userId = req.auth.id;

    const getBank = await Bank.findOne({ userId: userId });

    if (!getBank) {
      return res
        .status(404)
        .json({ message: "Bank not found for the given user" });
      // You might want to return an appropriate status code and message
    }

    return res.status(200).json({
      message: "Bank details retrieved successfully",
      isBank: true,
      data: getBank,
    });
  } catch (error) {
    console.error("Error retrieving bank details:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const changePasswordController = async (req, res) => {
  try {
    const { confirmNewPassword, currentPassword, newPassword } = req.body;
    const userId = req.auth.id;

    if (!newPassword) {
      return res.status(400).json({
        message: "New password is missing",
      });
    }

    if (!confirmNewPassword) {
      return res.status(400).json({
        message: "Confirm new password is missing",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "New password and confirm new password do not match",
      });
    }

    if (!currentPassword) {
      return res.status(400).json({
        message: "Current password is missing",
      });
    }

    // Find user
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!(await user.matchPassword(currentPassword))) {
      return res.status(400).json({
        message: "Invalid current password",
      });
    }

    // Update password
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(newPassword, salt);

    await User.findOneAndUpdate(
      { userId },
      {
        $set: {
          password: encryptedPassword,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const getUPIandQRController = async (req, res) => {
  try {
    const manageUpiData = await ManageUpi.findOne({ Id: "manageUpiId" });

    if (!manageUpiData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(manageUpiData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  userRechargeController,
  userGetAllRechargeController,
  userGetAllRechargeRewardController,
  userGetAllJoiningBonusController,
  addBankController,
  getBankController,
  changePasswordController,
  getUPIandQRController,
};
