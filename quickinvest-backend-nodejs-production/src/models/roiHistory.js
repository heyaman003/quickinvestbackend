const mongoose = require("mongoose");
const { RECHARGE__CONSTS } = require("../constants");
const mongoosePaginate = require("mongoose-paginate-v2");
const RoiHistorySchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    sponsorId: String,
    sponsorName: String,
    currentRechargeAmount: { type: Number, default: 0 }, // This will update when only Recharge
    rechargeType: {
      type: String,
      required: [true, "Recharge type is required"],
    },
    rechargeId: { type: String },
    totalDays: { type: Number, default: RECHARGE__CONSTS.TOTAL_DAYS },
    paidDays: { type: Number, default: 0 },
    leftDays: { type: Number, default: RECHARGE__CONSTS.TOTAL_DAYS },
    percentagePerDay: { type: Number, default: 0 },
    perDayAmount: { type: Number, default: 0 },
    totalReturnedAmount: { type: Number, default: 0 },
    dateAndTime: {
      date: { type: String },
      time: { type: String },
    },
    transactionId: { type: String },
  },
  { timestamps: true }
);
RoiHistorySchema.plugin(mongoosePaginate);
const RoiHistory = mongoose.model("roihistories", RoiHistorySchema);

module.exports = RoiHistory;
