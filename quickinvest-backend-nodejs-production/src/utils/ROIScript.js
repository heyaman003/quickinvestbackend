const generateString = require("../config/generateRandomString");
const getIstTime = require("../config/getTime");
const RechargeCounter = require("../config/RechargeCounter");
const { RECHARGE__CONSTS } = require("../constants");
const User = require("../models/auth.model");
const ManualPackage = require("../models/manualPackage");
const Recharge = require("../models/recharge.model");
const RoiInstance = require("../models/rechargeRoiInstance");
const Wallet = require("../models/wallet.model");
const Withdraw = require("../models/withdraw.model");

const ROIScript = async () => {
  try {
    console.log("Starting ROIScript...");

    // Fetch ROI records where setIsManual is not true
    const roiRecords = await RoiInstance.find({ setIsManual: { $ne: true } });

    if (roiRecords.length === 0) {
      console.log("No data found.");
      return;
    }

    // Define constant for total days
    const TOTAL_DAYS = 365;

    // Loop through each ROI record
    for (const record of roiRecords) {
      const { rechargeId, paidDays, totalReturnedAmount, forRoiAmount } =
        record;

      // Calculate left days, pending amount, and daily ROI amount
      const leftDays = TOTAL_DAYS - paidDays;
      const pendingAmount = forRoiAmount * 2 - totalReturnedAmount;
      const amount = pendingAmount / leftDays;
      console.log({ amount });
      // Update the record with new calculated values
      await RoiInstance.findOneAndUpdate(
        { rechargeId },
        {
          $set: {
            leftDays,
            pendingAmount,
            amount,
            totalDays: TOTAL_DAYS,
            oldHistory: true,
          },
        },
        { new: true } // Option to return the updated document
      );
      await Recharge.findOneAndUpdate(
        { rechargeId },
        {
          $set: {
            leftDays,
            totalDays: TOTAL_DAYS,
            oldHistory: true,
          },
        },
        { new: true } // Option to return the updated document
      );
    }

    console.log(`Successfully updated ${roiRecords.length} ROI records.`);
  } catch (error) {
    console.error(
      "An error occurred while updating ROI records:",
      error.message
    );
  }
};

const MakePackage = async () => {
  try {
    console.log("Starting MakePackage...");

    const users = await User.find({});
    if (!users.length) {
      console.log("No users found.");
      return;
    }

    for (const user of users) {
      const existingManualPackage = await ManualPackage.findOne({
        userId: user.userId,
      });

      if (existingManualPackage) continue;

      const [withdrawSummary] = await Withdraw.aggregate([
        { $match: { userId: user.userId, status: "pending" } },
        {
          $group: { _id: null, totalRequestAmount: { $sum: "$requestAmount" } },
        },
      ]);

      const totalRequestAmount = withdrawSummary?.totalRequestAmount || 0;
      const { activeIncome = 0 } =
        (await Wallet.findOne({ userId: user.userId })) || {};

      const totalAmount = totalRequestAmount + activeIncome;
      const rechargeAmount = totalAmount / 2; // 50%

      if (rechargeAmount > 0) {
        await ManualPackage.create({
          userId: user.userId,
          fullName: user.fullName,
          sponsorId: user.sponsorId,
          sponsorName: user.sponsorName,
          withdrawPending: totalRequestAmount,
          mainBlanch: activeIncome,
          totalBlanch: totalAmount.toFixed(2),
        });
        await createManualPackageAndRecharge({
          user,
          totalRequestAmount,
          activeIncome,
          rechargeAmount,
        });
      }
    }

    console.log("MakePackage process completed successfully.");
  } catch (error) {
    console.error("Error in MakePackage:", error.message);
  }
};

const createManualPackageAndRecharge = async ({ user, rechargeAmount }) => {
  try {
    const rechargeId = generateRechargeId();
    const currentUser = await User.findOne({ userId: user.userId });

    if (!currentUser) {
      console.error(`User with ID ${user.userId} not found.`);
      return;
    }

    const transactionId = generateString(10);
    const rechargeType = await RechargeCounter(currentUser.userId);

    await createRechargeAndRoiInstance({
      currentUser,
      rechargeAmount,
      rechargeType,
      rechargeId,
      transactionId,
    });

    await updateUserAndWallet({ currentUser, rechargeAmount });
  } catch (error) {
    console.error(
      `Error processing package for user ${user.userId}:`,
      error.message
    );
  }
};

const createRechargeAndRoiInstance = async ({
  currentUser,
  rechargeAmount,
  rechargeType,
  rechargeId,
  transactionId,
}) => {
  const dateAndTime = {
    date: new Date(getIstTime().date).toDateString(),
    time: getIstTime().time,
  };

  const rechargeData = {
    userId: currentUser.userId,
    fullName: currentUser.fullName,
    mobile: currentUser.mobile,
    sponsorId: currentUser.sponsorId,
    sponsorName: currentUser.sponsorName,
    amount: rechargeAmount.toFixed(2),
    rechargeType,
    rechargeId,
    paidDays: 0,
    leftDays: RECHARGE__CONSTS.TOTAL_DAYS,
    totalDays: RECHARGE__CONSTS.TOTAL_DAYS,
    status: "succeed",
    dateAndTime,
    transactionId,
    setIsManual: true,
    isActive: true,
  };

  await Recharge.create(rechargeData);

  const roiData = {
    ...rechargeData,
    currentRechargeAmount: rechargeAmount.toFixed(2),
    forRoiAmount: rechargeAmount.toFixed(2),
  };

  await RoiInstance.create(roiData);
};

const updateUserAndWallet = async ({ currentUser, rechargeAmount }) => {
  const date = new Date(getIstTime().date).toDateString();

  await Promise.all([
    User.findOneAndUpdate(
      { userId: currentUser.userId },
      {
        $set: { isActive: true, activationDate: date },
        $inc: { totalInvestmentAmount: rechargeAmount.toFixed(2) },
      },
      { new: true }
    ),
    Wallet.findOneAndUpdate(
      { userId: currentUser.userId },
      {
        $inc: { rechargeAmount: rechargeAmount.toFixed(2) },
        $set: {
          currentRechargeAmount: rechargeAmount.toFixed(2),
          ManualPackage: rechargeAmount.toFixed(2),
          activeIncome: 0,
        },
      },
      { new: true }
    ),
    Withdraw.updateMany(
      { userId: currentUser.userId, status: "pending" },
      { $set: { status: "success", setIdManual: true } }
    ),
  ]);
};

const generateRechargeId = () => {
  return `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;
};

module.exports = { ROIScript, MakePackage };
