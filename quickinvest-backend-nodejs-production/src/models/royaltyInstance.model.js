const mongoose = require("mongoose");

const royaltyInstanceSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    sponsorId: String,
    sponsorName: String,
    totalAmount: { type: Number, default: 0 },
    currentRank: { type: String, default: "N/A" },
    rankList: {
      vip1: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
      vip2: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
      vip3: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
      vip4: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
      vip5: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
      vip6: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
      vip7: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
      vip8: {
        rank: { type: String, default: "N/A" },
        incomeDay: { type: Number, default: 0 },
      },
    },
    totalTeam: { type: Number, default: 0 },
    level1Team: { type: Number, default: 0 },
    incomeDay: { type: Number, default: 0 },
    dateAndTime: {
      date: { type: String },
      time: { type: String },
    },
  },
  { timestamps: true }
);

const RoyaltyInstance = mongoose.model(
  "royaltyInstance",
  royaltyInstanceSchema
);

module.exports = RoyaltyInstance;
