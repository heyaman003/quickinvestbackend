const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const royaltyIncomeSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    sponsorId: String,
    sponsorName: String,
    amount: { type: Number },
    rank: { type: String },
    totalTeam: { type: Number },
    level1Team: { type: Number },
    incomeDay: { type: Number },
    dateAndTime: {
      date: { type: String },
      time: { type: String },
    },
  },
  { timestamps: true }
);
royaltyIncomeSchema.plugin(mongoosePaginate);
const RoyaltyIncome = mongoose.model("royaltyincome", royaltyIncomeSchema);

module.exports = RoyaltyIncome;
