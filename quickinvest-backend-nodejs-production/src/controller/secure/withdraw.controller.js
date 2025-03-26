const { validationResult } = require("express-validator");
const generateRandomString = require("../../config/generateRandomId");
const getIstTime = require("../../config/getTime");
const User = require("../../models/auth.model");
const Wallet = require("../../models/wallet.model");
const Withdraw = require("../../models/withdraw.model");
const ValidationErrorMsg = require("../../helpers/ValidationErrorMsg");
const Bank = require("../../models/addBank.model");

// Withdraw
const withdrawAmount = async (req, res) => {
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
    const { amount, accountNumber } = req.body;
    const userId = req.auth.id;
    const user = await User.findOne({ userId });
    const wallet = await Wallet.findOne({ userId });
    const existWithdraw = await Withdraw.findOne({
      userId,
      date: new Date(getIstTime().date).toDateString(),
    });
    if (!user?.isActive) {
      return res.status(400).json({ message: "You are an inactive user" });
    }
    if (existWithdraw) {
      return res.status(400).json({ message: "Only One Withdraw in One Day." });
    }
    if (amount > 10000) {
      return res
        .status(400)
        .json({ message: "Maximum withdraw limit 10000 INR." });
    }

    const findBank = await Bank.findOne({
      userId: req.auth.id,
      accountNumber: accountNumber,
    });

    if (Number(amount) >= 500) {
      if (wallet.activeIncome >= Number(amount)) {
        const amountAfterCharge = Number(amount) - (Number(amount) / 100) * 5;
        const newData = {
          userId,
          fullName: user.fullName,
          sponsorId: user.sponsorId,
          sponsorName: user.sponsorName,
          requestAmount: Number(amount),
          withdrawCharge: 5,
          amountAfterCharge: Number(amount) - (Number(amount) / 100) * 5,
          chargeAmount: Number(amount) - amountAfterCharge,
          currentAmount: wallet.activeIncome - Number(amount),
          accountNumber,
          branchName: findBank?.branchName,
          ifscCode: findBank?.IFSCCode,
          status: "pending",
          transactionId: generateRandomString(),

          date: new Date(getIstTime().date).toDateString(),
          time: getIstTime().time,
        };
        await Withdraw.create(newData);
        const filter = { userId: userId };
        const update = { $inc: { activeIncome: -Number(amount) } };
        const options = { new: true };
        await Wallet.findOneAndUpdate(filter, update, options);

        return res
          .status(200)
          .json({ message: "Withdrawal completed successfully" });
      } else {
        return res.status(400).json({ message: "Insufficient Balance" });
      }
    } else {
      return res.status(400).json({
        message: "Minimum withdrawal amount is ₹500",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// get withdraw history
const withdrawHistory = async (req, res) => {
  try {
    const userId = req.auth.id;
    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 500;

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1, date: -1 },
    };

    const withdrawInfo = await Withdraw.paginate({ userId }, options);

    if (withdrawInfo.docs.length > 0) {
      return res.status(200).json({ data: withdrawInfo });
    } else {
      return res.status(400).json({
        message: "There is no withdraw history",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const getMyWallet = async (req, res) => {
  try {
    const userId = req.auth.id;

    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }

    const wallet = await Wallet.findOne({ userId }).lean();

    if (wallet) {
      return res.status(200).json({ success: true, data: wallet });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Wallet not found for the user" });
    }
  } catch (error) {
    console.error("Error in getMyWallet:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { withdrawAmount, withdrawHistory, getMyWallet };
