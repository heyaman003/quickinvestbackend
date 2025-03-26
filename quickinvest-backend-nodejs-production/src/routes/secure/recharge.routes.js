const {
  userRechargeController,
  userGetAllRechargeController,
  addBankController,
  getBankController,
  changePasswordController,
  getUPIandQRController,
  userGetAllRechargeRewardController,
  userGetAllJoiningBonusController,
} = require("../../controller/secure/recharge.controller");
const multer = require("../../middleware/multer");
const { rechargeValidator } = require("../../validation/recharge.validation");

const router = require("express").Router();

router.post(
  "/userRecharge",
  multer.single("image"),
  rechargeValidator,
  userRechargeController
);
router.get("/userGetAllRecharge", userGetAllRechargeController);
router.post("/addBank", addBankController);
router.get("/getBank", getBankController);
router.post("/changePassword", changePasswordController);
router.get("/getUpiQr", getUPIandQRController);
router.get("/userGetAllRechargeReward", userGetAllRechargeRewardController);
router.get("/userGetAllJoiningBonus", userGetAllJoiningBonusController);

module.exports = router;
