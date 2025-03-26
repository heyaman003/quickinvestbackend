const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { RECHARGE__CONSTS } = require("../constants");

const rechargeSchema = new mongoose.Schema(
  {
    userId: { type: String },
    fullName: { type: String },
    mobile: { type: String },
    sponsorId: { type: String },
    sponsorName: { type: String },
    amount: { type: Number, required: true },
    rechargeType: {
      type: String,
      required: [true, "Recharge type is required"],
    },
    rechargeId: { type: String },
    paidDays: { type: Number, default: 0 },
    leftDays: { type: Number, default: RECHARGE__CONSTS.TOTAL_DAYS },
    totalDays: { type: Number, default: RECHARGE__CONSTS.TOTAL_DAYS },
    isActive: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    setIsAdmin: { type: Boolean, default: false },
    setIsManual: { type: Boolean, default: false },
    oldHistory: { type: Boolean, default: false },
    newHistory: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["pending", "rejected", "succeed"],
      default: "pending",
    },
    dateAndTime: {
      date: { type: String },
      time: { type: String },
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
    },
    proof: { url: { type: String }, publicUrl: { type: String } },
  },
  { timestamps: true }
);
rechargeSchema.plugin(mongoosePaginate);
const Recharge = new mongoose.model("recharge", rechargeSchema);

module.exports = Recharge;
