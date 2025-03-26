const {
  changePassword,
  changePdfLink,
  getPdfLink,
  getAllManualRechargeHistory,
} = require("../../controller/private/setting.controller");

const router = require("express").Router();
router.put("/change_password", changePassword);
router.post("/change_pdf_link", changePdfLink);
router.get("/get_pdf_link", getPdfLink);
router.get("/get_all_manual_recharge", getAllManualRechargeHistory);

module.exports = router;
