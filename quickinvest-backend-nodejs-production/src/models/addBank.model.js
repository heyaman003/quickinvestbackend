const mongoose = require("mongoose");

const addBankSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
    },

    holderName: String,
    branchName: String,
    accountNumber: String,
    IFSCCode: String,
  },
  {
    timestamps: true,
  }
);

const Bank = mongoose.model("Bank", addBankSchema);

module.exports = Bank;
