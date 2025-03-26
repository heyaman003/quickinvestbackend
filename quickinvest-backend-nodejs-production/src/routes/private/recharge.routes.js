const express = require("express");
const {
  getAllRechargeHistory,
  getAllSuccessRechargeHistory,
  getAllRejectRechargeHistory,
  updateRechargeStatus,
  makeRecharge,
} = require("../../controller/private/recharge.controller");
const router = express.Router();

router.get("/get_all_recharge_history", getAllRechargeHistory);
router.get("/get_all_success_recharge_history", getAllSuccessRechargeHistory);
router.get("/get_all_reject_recharge_history", getAllRejectRechargeHistory);
router.put("/update_recharge_status", updateRechargeStatus);
router.post("/make_recharge", makeRecharge);
module.exports = router;
