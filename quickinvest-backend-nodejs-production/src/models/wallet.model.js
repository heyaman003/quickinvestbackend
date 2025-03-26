const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    sponsorId: String,
    sponsorName: String,
    rechargeReward: String,
    rechargeAmount: { type: Number, default: 0 }, // This will update when only [recharge]
    currentRechargeAmount: { type: Number, default: 0 }, // This will update when only Recharge
    roiIncome: { type: Number, default: 0 }, // This will update when 'ROI' income generate
    directIncome: { type: Number, default: 0 }, // This will update when get money from 'Level 1' users []
    indirectIncome: { type: Number, default: 0 },
    totalTeamIncome: { type: Number, default: 0 },
    depositBalance: { type: Number, default: 0 },
    royaltyIncome: { type: Number, default: 0 },
    joiningBonus: { type: Number, default: 0 },
    totalIncome: { type: Number, default: 0 },
    activeIncome: { type: Number, default: 0 },
    ManualPackage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
