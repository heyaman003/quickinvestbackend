const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const incomeHistorySchema = new mongoose.Schema(
  {
    userId: { type: String },
    fullName: { type: String },
    mobile: { type: String },
    sponsorId: { type: String },
    sponsorName: { type: String },
    incomeType: { type: String },
    incomeFrom: {
      userId: { type: String },
      fullName: { type: String },
      level: { type: Number },
    },
    amount: { type: Number, required: [true, "Amount is required"] },
    rechargeAmount: Number,
    dateAndTime: {
      date: { type: String },
      time: { type: String },
    },
  },
  { timestamps: true }
);
incomeHistorySchema.plugin(mongoosePaginate);
const IncomeHistory = new mongoose.model("incomehistory", incomeHistorySchema);

module.exports = IncomeHistory;
