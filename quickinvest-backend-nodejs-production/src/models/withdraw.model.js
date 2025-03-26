const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const withdrawSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    fullName: String,
    sponsorId: { type: String },
    sponsorName: String,
    requestAmount: Number,
    withdrawCharge: Number,
    amountAfterCharge: Number,
    chargeAmount: Number,
    currentAmount: Number,
    accountNumber: String,
    bankName: String,
    branchName: String,
    ifscCode: String,
    status: {
      type: String,
      enum: ["pending", "success", "rejected"],
      default: "pending",
    },
    transactionId: String,
    transactionHash: String,

    date: { type: String, default: new Date().toDateString() },
    time: String,
    setIdManual: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
withdrawSchema.plugin(mongoosePaginate);
const Withdraw = new mongoose.model("Withdraw", withdrawSchema);

module.exports = Withdraw;
