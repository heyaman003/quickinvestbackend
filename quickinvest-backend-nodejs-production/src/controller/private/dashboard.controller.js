const User = require("../../models/auth.model");
const Wallet = require("../../models/wallet.model");
const Recharge = require("../../models/recharge.model");
const getAdminDashboardStatsController = async (req, res) => {
  try {
    // Total Team and Direct Team count
    const alluser = await User.find({});
    const activeUsers = await User.find({ isActive: true });
    const inactiveUsers = await User.find({ isActive: false });
    const blockedUsers = await User.find({ userStatus: false });
    const [investmentAmount] = await Recharge.aggregate([
      {
        $match: {
          status: "succeed",
        },
      },
      {
        $group: {
          _id: null,
          totalInvestmentAmount: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const data = {
      alluser: alluser.length || 0,
      activeUsers: activeUsers.length || 0,
      inactiveUsers: inactiveUsers.length || 0,
      blockedUsers: blockedUsers.length || 0,
      totalInvestmentAmount: investmentAmount?.totalInvestmentAmount,
    };
    if (data) {
      return res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const runROIStaticController = async (req, res) => {
  try {
    function getISTDate() {
      // Get current date and time in UTC
      const currentDate = new Date();

      // Create an Intl.DateTimeFormat object for Indian Standard Time (IST)
      const istOptions = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const istFormatter = new Intl.DateTimeFormat("en-IN", istOptions);

      // Format the date in IST
      const istDateStr = istFormatter.format(currentDate);

      return istDateStr;
    }
    // Example usage
    const istDate = getISTDate();
    const lastUpdatedDate = await LastRoiData.findOne({});

    console.log({ dateX: lastUpdatedDate?.date });
    if (lastUpdatedDate?.date !== istDate) {
      await handleROI();

      res.status(200).json({
        success: true,
        message: "ROI function has successfully run",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: `ROI is already run for ${istDate}` });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  getAdminDashboardStatsController,
};
