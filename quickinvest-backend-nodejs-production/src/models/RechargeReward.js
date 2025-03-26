const mongoose = require("mongoose");
const mongoosePlugin = require("mongoose-paginate-v2");
const RechargeRewardSchema = new mongoose.Schema(
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
        enum: ["recharge-reward"],
      },
      amount: {
        type: Number,
        required: true,
      },
      reward: String,
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    
  },
  { timestamps: true }
);
RechargeRewardSchema.plugin(mongoosePlugin)
const RechargeReward = mongoose.model("RechargeReward", RechargeRewardSchema);

module.exports = RechargeReward;
