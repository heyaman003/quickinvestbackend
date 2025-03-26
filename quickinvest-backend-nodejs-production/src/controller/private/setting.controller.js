const User = require("../../models/auth.model");
const bcrypt = require("bcryptjs");
const PDFData = require("../../models/setting.model");
const { Result } = require("express-validator");
const ManualPackage = require("../../models/manualPackage");

const changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const user_id = req.auth;

    if (!new_password) {
      return res.status(400).json({
        message: "New password is missing",
      });
    }

    if (!current_password) {
      return res.status(400).json({
        message: "Current password is missing",
      });
    }

    // Extract user ID from the object
    const userId = user_id.id;

    // Find user
    const user = await User.findOne({ userId });

    if (user && (await user.matchPassword(current_password))) {
      // Update password
      const salt = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(new_password, salt);

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
    } else {
      return res.status(400).json({
        message: "Invalid current password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};
//   Change PDF
const changePdfLink = async (req, res) => {
  try {
    if (!req.body.pdfLink)
      res.status(400).json({
        message: "PDF link is missing",
      });
    const findPdf = await PDFData.findOne({ pdfId: "PDFID" });
    if (findPdf) {
      const upLink = await PDFData.findOneAndUpdate(
        { pdfId: "PDFID" },
        {
          $set: {
            pdfLink: req.body.pdfLink,
          },
        }
      );
      if (upLink) {
        res.status(200).json({ message: "PDF link updated" });
      } else {
        res.status(200).json({ message: "Cannot update pdf link" });
      }
    } else {
      const createLink = await PDFData.create({
        pdfLink: req.body.pdfLink,
      });
      if (createLink) {
        res.status(200).json({ message: "PDF link uploaded" });
      } else {
        res.status(200).json({ message: "Cannot upload pdf link" });
      }
    }
  } catch (error) {
    //console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  }
};
// get PDF Link
const getPdfLink = async (req, res) => {
  try {
    const findPdf = await PDFData.findOne({ pdfId: "PDFID" });

    if (findPdf) {
      const pdfLink = findPdf.pdfLink;
      res.status(200).json({ pdfLink });
    } else {
      res.status(404).json({ message: "PDF link not found" });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllManualRechargeHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      select: "-__v -createdAt -updatedAt",
    };

    const result = await ManualPackage.paginate({}, options);
    if (result?.docs?.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ message: "There is no recharge history" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  changePassword,
  changePdfLink,
  getPdfLink,
  getAllManualRechargeHistory,
};
