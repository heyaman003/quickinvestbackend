const { body } = require("express-validator");

const rechargeValidator = [
  body("amount").not().isEmpty().withMessage("Amount is required"),
  body("image").not().isEmpty().withMessage("Image is required"),
  body("transactionId")
    .not()
    .isEmpty()
    .withMessage("Transaction Id is required"),
];

module.exports = {
  rechargeValidator,
};
