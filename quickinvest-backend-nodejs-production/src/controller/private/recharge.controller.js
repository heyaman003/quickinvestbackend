const User = require("../../models/auth.model");
const Recharge = require("../../models/recharge.model");
const RoiInstance = require("../../models/rechargeRoiInstance");
const Wallet = require("../../models/wallet.model");
const getIstTime = require("../../config/getTime");
const IncomeHistory = require("../../models/incomeHistory.model");
const { ALL_INCOME_TYPE_NAMES, RECHARGE__CONSTS } = require("../../constants");
const generateString = require("../../config/generateRandomString");
const Level = require("../../models/level.model");
const JoiningBonus = require("../../models/JoiningBonus");
const RechargeReward = require("../../models/RechargeReward");
const RechargeCounter = require("../../config/RechargeCounter");
const getAllRechargeHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      select: "-__v -createdAt -updatedAt",
    };

    const result = await Recharge.paginate({}, options);
    if (result?.docs?.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ message: "There is no recharge history" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllSuccessRechargeHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      select: "-__v -createdAt -updatedAt",
    };

    const result = await Recharge.paginate({ status: "succeed" }, options);
    if (result?.docs?.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ message: "There is no recharge history" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllRejectRechargeHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 500; // Number of items per page, default is 10

    const options = {
      page: page,
      limit: limit,
      sort: { createdAt: -1 }, // Sorting by createdAt in descending order
      select: "-__v -createdAt -updatedAt",
    };

    const result = await Recharge.paginate({ status: "rejected" }, options);
    if (result?.docs?.length > 0) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ message: "There is no recharge history" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// create Recharge Reward History
const handleRechargeReward = async (userId, amount) => {
  const currentUser = await User.findOne({ userId });
  let reward;
  if (amount >= 25000 && amount <= 49999) {
    reward = "Bluetooth speaker";
  } else if (amount >= 50000 && amount <= 99999) {
    reward = "Smartwatch";
  } else if (amount >= 100000 && amount <= 499999) {
    reward = "Smart Phone";
  } else if (amount >= 500000 && amount <= 999999) {
    reward = "Tablet";
  } else {
    reward = "Laptop";
  }

  await RechargeReward.create({
    userId: currentUser.userId,
    fullName: currentUser.fullName,
    sponsorId: currentUser.sponsorId,
    sponsorName: currentUser.sponsorName,
    type: "recharge-reward",
    amount: parseInt(amount),
    reward,
    date: new Date(getIstTime().date).toDateString(),
    time: getIstTime().time,
  });
  await Wallet.findOneAndUpdate(
    { userId: currentUser.userId },
    {
      $set: { rechargeReward: reward },
    },
    { new: true }
  );
};

const handleJoiningBonus = async (userId, amount) => {
  const currentUser = await User.findOne({ userId });
  const threePercentOfRechargeAmount = (amount * 3) / 100;

  await JoiningBonus.create({
    userId: currentUser.userId,
    fullName: currentUser.fullName,
    sponsorId: currentUser.sponsorId,
    sponsorName: currentUser.sponsorName,
    type: "joining-bonus",
    rechargeAmount: amount,
    amount: threePercentOfRechargeAmount,
    date: new Date(getIstTime().date).toDateString(),
    time: getIstTime().time,
  });

  await Wallet.findOneAndUpdate(
    { userId: currentUser.userId },
    {
      $inc: {
        joiningBonus: threePercentOfRechargeAmount,
        totalIncome: threePercentOfRechargeAmount,
        activeIncome: threePercentOfRechargeAmount,
      },
    },
    { new: true }
  );
};

const updateRechargeStatus = async (req, res) => {
  try {
    const date = new Date(getIstTime().date).toDateString();

    const { transaction_id, status } = req.body;
    const existingRecharge = await Recharge.findOne({
      status: "pending",
      transactionId: transaction_id,
    });
    if (!existingRecharge) {
      return res.status(400).json({
        message: "Status cannot be changed. Recharge not found.",
      });
    }

    const updatedRecharge = await Recharge.findOneAndUpdate(
      { transactionId: transaction_id },
      { $set: { status: status } },
      { new: true }
    );

    const originalAmount = existingRecharge?.amount;
    const commissionPercentage = 3;
    const sponsorCommission =
      originalAmount - (originalAmount * commissionPercentage) / 100;
    const commissionAmount = originalAmount - sponsorCommission;
    if (status === "succeed") {
      let sponsorInfo = await User.findOne({
        userId: existingRecharge?.sponsorId,
      });

      if (!sponsorInfo) {
        sponsorInfo = await User.findOne({
          userId: "ADMIN",
        });
      }

      await Promise.all([
        User.findOneAndUpdate(
          { userId: existingRecharge.userId },
          {
            $set: {
              isActive: true,
              activationDate: date,
              currentRecharge: existingRecharge?.amount,
            },
            $inc: { totalInvestmentAmount: +existingRecharge?.amount },
          },
          { new: true }
        ),
        Wallet.findOneAndUpdate(
          { userId: existingRecharge.userId },
          {
            $inc: { rechargeAmount: +existingRecharge.amount },
            $set: { currentRechargeAmount: existingRecharge.amount },
          },
          { new: true }
        ),
        // Update level user
        await Level.updateMany(
          { "level.userId": existingRecharge?.userId, "level.isActive": false },
          {
            $set: {
              "level.isActive": true,
              "level.activationDate": new Date(
                getIstTime().date
              ).toDateString(),
            },
          }
        ),

        //sponsor will get 3 % if status well success
        Wallet.findOneAndUpdate(
          { userId: existingRecharge.sponsorId },
          {
            $inc: {
              directIncome: +Number(commissionAmount.toFixed(4)),
              totalTeamIncome: +Number(commissionAmount.toFixed(4)),
              totalIncome: +Number(commissionAmount.toFixed(4)),
              activeIncome: +Number(commissionAmount.toFixed(4)),
            },
          },
          { new: true }
        ),

        await IncomeHistory.create({
          userId: sponsorInfo?.userId,
          fullName: sponsorInfo?.fullName,
          mobile: sponsorInfo?.mobile,
          sponsorId: sponsorInfo?.sponsorId,
          sponsorName: sponsorInfo?.sponsorName,
          incomeType: "recharge-direct-income",
          incomeFrom: {
            userId: existingRecharge?.userId,
            fullName: existingRecharge?.fullName,
            level: 1,
          },
          amount: Number(commissionAmount.toFixed(4)),
          rechargeAmount: originalAmount,
          dateAndTime: {
            date: new Date(getIstTime().date).toDateString(),
            time: getIstTime().time,
          },
        }),

        RoiInstance.findOneAndUpdate(
          { rechargeId: existingRecharge.rechargeId },
          { $set: { isActive: true } },
          { new: true }
        ),

        Recharge.findOneAndUpdate(
          { transactionId: transaction_id },
          { $set: { isActive: true } },
          { new: true }
        ),
      ]);

      // Handle Joining Bonus and Recharge Reward
      const amount = existingRecharge.amount;
      const userId = existingRecharge.userId;

      // ? This is the old requirement
      // if (amount >= 5000 && amount <= 24999) {
      //   await handleJoiningBonus(userId);
      // } else {
      //   await handleRechargeReward(userId, amount);
      // }
      // ? ................................

      // ? This is the new requirement
      // Users will get 3% joining bonus of recharging amount.
      if (amount >= 5000 && amount <= 10000000) {
        await handleJoiningBonus(userId, amount);
      }

      return res.status(200).json({
        message: "Recharge Status Successfully Updated",
      });
    } else {
      await RoiInstance.findOneAndDelete({
        rechargeId: existingRecharge.rechargeId,
      });

      return res.status(200).json({
        message: "Recharge Status Reject Successfully Updated",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const makeRecharge = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const rechargeAmount = parseInt(amount);

    if (!userId) {
      return res.status(500).json({ message: "Amount is not valid" });
    } else if (!(rechargeAmount >= 5000 && rechargeAmount <= 1000000)) {
      return res.status(500).json({ message: "Amount is not valid" });
    } else {
      const rcId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      // Find Me
      const currentUser = await User.findOne({ userId });
      if (!currentUser) {
        return res.status(404).json({ message: "Invalid User Id" });
      }

      const commissionPercentage = 3;
      const sponsorCommission =
        rechargeAmount - (rechargeAmount * commissionPercentage) / 100;
      const commissionAmount = rechargeAmount - sponsorCommission;

      // Create Recharge History
      const countOfRecharge = await Recharge.countDocuments({
        userId: currentUser?.userId,
      });
      const RechargeType = await RechargeCounter(currentUser?.userId);
      const transaction_id = generateString(10);

      await Recharge.create({
        userId: userId,
        fullName: currentUser.fullName,
        mobile: currentUser.mobile,
        sponsorId: currentUser.sponsorId,
        sponsorName: currentUser.sponsorName,
        amount: rechargeAmount,
        rechargeType: RechargeType, // 'countOfRecharge' by default 0
        rechargeId: rcId,
        paidDays: 0,
        leftDays: RECHARGE__CONSTS.TOTAL_DAYS,
        totalDays: RECHARGE__CONSTS.TOTAL_DAYS,
        status: "succeed",
        dateAndTime: {
          date: new Date(getIstTime().date).toDateString(),
          time: getIstTime().time,
        },
        transactionId: transaction_id,
        setIsAdmin: true,
        isActive: true,
        // proof: imgDataOfCloudinary,
      });
      // Create ROI Instance
      const createdRoiInstance = await RoiInstance.create({
        userId: currentUser?.userId,
        fullName: currentUser?.fullName,
        sponsorId: currentUser?.sponsorId,
        sponsorName: currentUser?.sponsorName,
        currentRechargeAmount: rechargeAmount,
        forRoiAmount: rechargeAmount,
        rechargeType: RechargeType,
        rechargeId: rcId,
        paidDays: 0,
        leftDays: RECHARGE__CONSTS.TOTAL_DAYS,
        totalDays: RECHARGE__CONSTS.TOTAL_DAYS,
        dateAndTime: {
          date: new Date(getIstTime().date).toDateString(),
          time: getIstTime().time,
        },
        isActive: true,
      });
      let sponsorInfo = await User.findOne({
        userId: currentUser?.sponsorId,
      });

      if (!sponsorInfo) {
        sponsorInfo = await User.findOne({
          userId: "ADMIN",
        });
      }

      await Promise.all([
        User.findOneAndUpdate(
          { userId: currentUser.userId },
          {
            $set: {
              isActive: true,
              activationDate: new Date(getIstTime().date).toDateString(),
            },
            $inc: { totalInvestmentAmount: rechargeAmount },
          },
          { new: true }
        ),
        Wallet.findOneAndUpdate(
          { userId: currentUser.userId },
          {
            $inc: { rechargeAmount: +rechargeAmount },
            $set: { currentRechargeAmount: rechargeAmount },
          },
          { new: true }
        ),
        // Update level user
        await Level.updateMany(
          { "level.userId": currentUser?.userId, "level.isActive": false },
          {
            $set: {
              "level.isActive": true,
              "level.activationDate": new Date(
                getIstTime().date
              ).toDateString(),
            },
          }
        ),
        //sponsor will get 3 % if status well success
        Wallet.findOneAndUpdate(
          { userId: sponsorInfo?.userId },
          {
            $inc: {
              directIncome: +Number(commissionAmount.toFixed(4)),
              totalTeamIncome: +Number(commissionAmount.toFixed(4)),
              totalIncome: +Number(commissionAmount.toFixed(4)),
              activeIncome: +Number(commissionAmount.toFixed(4)),
            },
          },
          { new: true }
        ),

        await IncomeHistory.create({
          userId: sponsorInfo?.userId,
          fullName: sponsorInfo?.fullName,
          mobile: sponsorInfo?.mobile,
          sponsorId: sponsorInfo?.sponsorId,
          sponsorName: sponsorInfo?.sponsorName,
          incomeType: "recharge-direct-income",
          incomeFrom: {
            userId: currentUser?.userId,
            fullName: currentUser?.fullName,
            level: 1,
          },
          amount: Number(commissionAmount.toFixed(4)),
          rechargeAmount: rechargeAmount,
          dateAndTime: {
            date: new Date(getIstTime().date).toDateString(),
            time: getIstTime().time,
          },
        }),
        // Update
        RoiInstance.findOneAndUpdate(
          { rechargeId: createdRoiInstance?.rechargeId },
          { $set: { isActive: true } },
          { new: true }
        ),
        Recharge.findOneAndUpdate(
          { rechargeId: createdRoiInstance?.rechargeId },
          { $set: { isActive: true } },
          { new: true }
        ),
      ]);

      // Handle Joining Bonus and Recharge Reward
      // ? This is the old requirement
      // if (amount >= 5000 && amount <= 24999) {
      //   await handleJoiningBonus(userId);
      // } else {
      //   await handleRechargeReward(userId, amount);
      // }
      // ? ................................

      // ? This is the new requirement
      // Users will get 3% joining bonus of recharging amount.
      if (amount >= 5000 && amount <= 10000000) {
        await handleJoiningBonus(userId, amount);
      }

      return res.status(201).json({ message: "Recharge successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
module.exports = {
  getAllRechargeHistory,
  getAllSuccessRechargeHistory,
  getAllRejectRechargeHistory,
  updateRechargeStatus,
  makeRecharge,
};
