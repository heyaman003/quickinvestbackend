const express = require("express");
const {
  getAllLevelIncomeController,

  getWinningAmount,
  getAllGameWalletIncomeController,
  getAllROIHistory,
  getAllDirectIncomeHistory,
  getRoyaltyIncomeHistory,
  getAllJoiningBonus,
  getAllRechargeReward,
} = require("../../controller/private/earning.controller");
const router = express.Router();

router.get("/get_level_income", getAllLevelIncomeController);
router.get("/get_game_wallet_income", getAllGameWalletIncomeController);

router.get("/winning-amount", getWinningAmount);

router.get("/get_all_roi_history", getAllROIHistory);
router.get("/get_all_direct_income_history", getAllDirectIncomeHistory);
router.get("/get_all_royalty_income_history", getRoyaltyIncomeHistory);
router.get("/get_all_joining_bonus_history", getAllJoiningBonus);
router.get("/get_all_recharge_reward_history", getAllRechargeReward);

module.exports = router;
