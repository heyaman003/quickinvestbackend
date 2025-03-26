const mongoose = require("mongoose");
const mongoosePlugin = require("mongoose-paginate-v2");
const WelcomeBonusSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    sponsorId: {
      type: String,
    },
    sponsorName: {
      type: String,
    },
    type: {
      type: String,
      enum: ["joining-bonus"],
    },

    rechargeAmount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    transactionID: {
      type: String,
    },
  },
  { timestamps: true }
);
WelcomeBonusSchema.plugin(mongoosePlugin);
const JoiningBonus = mongoose.model("JoiningBonus", WelcomeBonusSchema);

module.exports = JoiningBonus;
