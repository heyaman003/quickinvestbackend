const {
  registerController,
  loginController,
  ForgotPasswordController,
  resetPasswordController,
  checkMobileNumberController,
  getSponsorNameController,
  getPdfLink,
  testAPI
} = require("../../controller/public/auth.controller");
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  checkMobileNumberValidator,

} = require("../../validation/auth.validator");

const router = require("express").Router();

router.get("/test_api", testAPI);
router.post("/register", registerValidator, registerController);
router.post("/login", loginValidator, loginController);
router.post(
  "/forgotPassword",
  forgotPasswordValidator,
  ForgotPasswordController
);
router.post("/resetPassword", resetPasswordValidator, resetPasswordController);
router.get("/checkSponsorId", getSponsorNameController);
router.get(
  "/checkMobileNumber/:mobile",
  // checkMobileNumberValidator,
  checkMobileNumberController
);
router.get("/getPdfLink",getPdfLink)

module.exports = router;
