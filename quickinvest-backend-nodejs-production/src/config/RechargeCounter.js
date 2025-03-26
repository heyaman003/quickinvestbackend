const Recharge = require("../models/recharge.model");

const RechargeCounter = async (userId) => {
  try {
    // Find the most recent recharge for the given userId
    const exist = await Recharge.findOne({ userId }).sort({ createdAt: -1 });

    if (exist) {
      // Extract the numeric part of the recharge type
      const lastRechargeNumber = parseInt(exist.rechargeType.slice(2)); // Get the number after 'RC'

      // Increment the number for the next recharge type
      const nextRechargeType = `RC${lastRechargeNumber + 1}`;

      return nextRechargeType;
    } else {
      // If no recharge found, return the initial type "RC1"
      return "RC1";
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = RechargeCounter;
