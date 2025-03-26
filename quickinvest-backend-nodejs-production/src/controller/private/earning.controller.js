const JoiningBonus = require("../../models/JoiningBonus");
const RechargeReward = require("../../models/RechargeReward");
const ColorPredictionWinner = require("../../models/colourPredictionWinner");
const GameWalletIncome = require("../../models/gameWalletIncome");
const IncomeHistory = require("../../models/incomeHistory.model");
const LevelIncome = require("../../models/levelIncome.model");
const RoiHistory = require("../../models/roiHistory");
const RoyaltyIncome = require("../../models/royaltyIncome.model");

const getAllLevelIncomeController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 500;

    // Calculate the skip value for pagination
    const skip = (page - 1) * pageSize;

    // Retrieve level incomes with pagination
    const levelIncomes = await LevelIncome.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    const totalLevelIncome = await LevelIncome.countDocuments();
    // Respond with the paginated list of level incomes
    if (levelIncomes.length > 0) {
      return res.status(200).json({
        data: levelIncomes,
        page: page,
        pageSize: pageSize,
        totalLevelIncome,
      });
    } else {
      return res.status(404).json({
        message: "No level incomes found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllGameWalletIncomeController = async (_req, res) => {
  try {
    const gameWalletIncomes = await GameWalletIncome.find({}).sort({
      createdAt: -1,
    });
    if (gameWalletIncomes.length > 0) {
      return res.status(200).json({ data: gameWalletIncomes });
    } else {
      return res.status(400).json({
        message: "There is no game wallet income",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};

// Get My winning Amount
const getWinningAmount = async (req, res) => {
  try {
    const myWinningHistory = await ColorPredictionWinner.find({});
    if (myWinningHistory?.length > 0) {
      return res.status(200).json({ data: myWinningHistory });
    } else {
      return res.status(400).json({ message: "There is no Rank history" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllROIHistory = async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const pageSize = parseInt(req.query.limit) || 10;

    // Calculate the skip value for pagination
    // const skip = (page - 1) * pageSize;

    const roiHistory = await RoiHistory.find({}).sort({ createdAt: -1 }); // Sort by date in reverse order (latest first)
    // .skip(skip)
    // .limit(pageSize)
    // .lean();

    if (roiHistory.length === 0) {
      return res.status(404).json({
        message: "No ROI History found",
      });
    } else {
      return res.status(200).json({
        data: roiHistory,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getRoyaltyIncomeHistory = async (req, res) => {
  try {
    const result = await RoyaltyIncome.find({});
    if (!result) {
      return res.status(404).json({ message: "Royalty Income Not Found!" });
    }
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error("Error in getRoyaltyIncome:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllDirectIncomeHistory = async (req, res) => {
  try {
    const result = await IncomeHistory.find({}).sort({ createdAt: -1 });
    if (!result) {
      return res.status(404).json({ message: "Direct Income Not Found!" });
    }
    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.error("Error in Direct Income:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllJoiningBonus = async (req, res) => {
  try {
    const existJoinBonus = await JoiningBonus.find({}).sort({ createdAt: -1 });
    if (existJoinBonus) {
      return res.status(200).json({ data: existJoinBonus });
    } else {
      return res.status(400).json({ message: "data Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getAllRechargeReward = async (req, res) => {
  try {
    const existJoinBonus = await RechargeReward.find({}).sort({
      createdAt: -1,
    });
    if (existJoinBonus) {
      return res.status(200).json({ data: existJoinBonus });
    } else {
      return res.status(400).json({ message: "data Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAllLevelIncomeController,
  getAllGameWalletIncomeController,

  getWinningAmount,
  getAllROIHistory,
  getRoyaltyIncomeHistory,
  getAllDirectIncomeHistory,
  getAllJoiningBonus,
  getAllRechargeReward,
};
