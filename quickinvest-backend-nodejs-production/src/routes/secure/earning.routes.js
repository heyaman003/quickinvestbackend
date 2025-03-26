const {
  getDirectIncomeHistory,
  getROIIncomeHistory,
  getRoyaltyIncome,
} = require("../../controller/secure/earning.controller");

const router = require("express").Router();

router.get("/get_direct_icome_history", getDirectIncomeHistory);
router.get("/get_roi_icome_history", getROIIncomeHistory);
router.get("/get_royalty_income", getRoyaltyIncome);

module.exports = router;
