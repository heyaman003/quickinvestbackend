const {
  withdrawAmount,
  withdrawHistory,
  getMyWallet,
} = require("../../controller/secure/withdraw.controller");

const router = require("express").Router();

router.post("/withdraw_amount", withdrawAmount);
router.get("/get_withdraw_history", withdrawHistory);
router.get("/get_mywallet", getMyWallet);


module.exports = router;
