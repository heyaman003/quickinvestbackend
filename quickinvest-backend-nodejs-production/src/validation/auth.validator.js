const { body, check, param, query } = require("express-validator");
const User = require("../models/auth.model");

const registerValidator = [
  body("name").not().isEmpty().withMessage("Name is required").trim(),
  body("question").not().isEmpty().withMessage("Question is required"),
  body("answer").not().isEmpty().withMessage("Answer is required"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .trim(),
  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .trim(),
  body("mobile")
    .not()
    .isEmpty()
    .withMessage("Mobile number is required")
    // .isMobilePhone()
    .custom(async (mobile) => {
      const mobileMatch = await User.findOne({ mobile });
      if (mobileMatch) {
        return Promise.reject("Mobile number already in use");
      }
    })
    .trim(),
  body("sponsorId")
    .not()
    .isEmpty()
    .withMessage("Sponsor ID is required")
    .custom(async (sponsorId) => {
      const CUserId = sponsorId?.toUpperCase();
      const sponsorIdMatch = await User.findOne({ userId: CUserId });
      if (!sponsorIdMatch) {
        return Promise.reject("Sponsor ID is not valid");
      }
    })
    .trim(),
  body("sponsorName")
    .not()
    .isEmpty()
    .withMessage("Sponsor Name is required")
    .trim(),
];

module.exports = registerValidator;

const loginValidator = [
  body("userId")
    .not()
    .isEmpty()
    .withMessage("User ID or Mobile is required")
    .custom(async (userId) => {
      const userIdMatch = await User.findOne({
        $or: [{ userId }, { mobile: userId }],
      });
      if (!userIdMatch) {
        return Promise.reject("User ID or Mobile is not valid");
      }
    }),
  body("password").not().isEmpty().withMessage("Password is required"),
];

const forgotPasswordValidator = [
  check("mobile")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Mobile is required")
    .custom(async (mobile, { req }) => {
      const mobileMatch = await User.findOne({ mobile: mobile });
      if (!mobileMatch) {
        return Promise.reject("Mobile is not valid");
      }
      const user = await User.findOne({ mobile: req.body.mobile });
      if (req.body.question?.trim() !== user?.security.question) {
        return Promise.reject("Incorrect your security question");
      }
      if (req.body.answer?.trim() !== user?.security.answer) {
        return Promise.reject("Incorrect your security answer");
      }
    })
    .trim(),
  check("question").not().isEmpty().withMessage("Question is required").trim(),
  check("answer").not().isEmpty().withMessage("Answer is required").trim(),
];

const resetPasswordValidator = [
  body("password")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .trim(),
  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .trim(),
];

const checkMobileNumberValidator = [
  query("mobile")
    .exists()
    .isMobilePhone("en-IN")
    .withMessage("Mobile number should be only Indian")
    .custom(async (mobile) => {
      const mobileMatch = await User.findOne({ mobile });
      if (mobileMatch) {
        return Promise.reject("Mobile number already in use");
      }
    })
    .trim(),
];

module.exports = {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  checkMobileNumberValidator,
};
