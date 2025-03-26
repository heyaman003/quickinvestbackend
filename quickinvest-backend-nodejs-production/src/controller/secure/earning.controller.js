const IncomeHistory = require("../../models/incomeHistory.model");
const RoiHistory = require("../../models/roiHistory");
const RoyaltyIncome = require("../../models/royaltyIncome.model");

const getDirectIncomeHistory = async (req, res) => {
  try {
    const userId = req.auth.id;
    const { page = 1, limit = 500 } = req.query; // Default page and limit values

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const directIncome = await IncomeHistory.paginate(
      { userId: userId },
      options
    );

    if (!directIncome.docs.length) {
      return res.status(400).json({ message: "Direct income not found" });
    }

    return res.status(200).json({
      data: directIncome,
    });
  } catch (error) {
    console.error("Error in getDriectIncomeHistory:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getROIIncomeHistory = async (req, res) => {
  try {
    const userId = req.auth.id;
    const { page = 1, limit = 500 } = req.query; // You can set default values for page and limit

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    const roiIncome = await RoiHistory.paginate({ userId: userId }, options);

    return res.status(200).json({
      data: roiIncome,
    });
  } catch (error) {
    console.error("Error in getROIIncomeHistory:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getRoyaltyIncome = async (req, res) => {
  const userId = req.auth.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 500;

  try {
    const options = {
      page,
      limit,
      sort: {
        createdAt: -1,
      },
    };

    const result = await RoyaltyIncome.paginate({ userId }, options);
    if (result?.docs?.length > 0) {
      return res.status(200).json({
        data: result,
      });
    } else {
      return res.status(400).json({ message: "Royalty Income Not Found!" });
    }
  } catch (error) {
    console.error("Error in getRoyaltyIncome:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getDirectIncomeHistory,
  getROIIncomeHistory,
  getRoyaltyIncome,
};
