const mongoose = require("mongoose");
const { RECHARGE__CONSTS } = require("../constants");

const RoiInstanceSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    sponsorId: String,
    sponsorName: String,
    currentRechargeAmount: { type: Number, default: 0 },
    forRoiAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false },
    rechargeType: {
      type: String,
      required: [true, "Recharge type is required"],
    },
    rechargeId: { type: String },
    paidDays: { type: Number, default: 0 },
    pendingAmount: { type: Number },
    amount: { type: Number },
    leftDays: { type: Number, default: RECHARGE__CONSTS.TOTAL_DAYS },
    totalDays: { type: Number, default: RECHARGE__CONSTS.TOTAL_DAYS },
    totalReturnedAmount: { type: Number, default: 0 },
    dateAndTime: {
      date: { type: String },
      time: { type: String },
    },
    isCompleted: { type: Boolean, default: false },
    setIsManual: { type: Boolean, default: false },
    oldHistory: { type: Boolean, default: false },
    newHistory: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const RoiInstance = mongoose.model("roiinstance", RoiInstanceSchema);

module.exports = RoiInstance;
