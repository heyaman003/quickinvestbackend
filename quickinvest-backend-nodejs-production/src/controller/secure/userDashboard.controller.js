const { ROYALTY__CONSTS } = require("../../constants");
const User = require("../../models/auth.model");
const Level = require("../../models/level.model");
const Recharge = require("../../models/recharge.model");
const Wallet = require("../../models/wallet.model");

const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.auth.id;
    const existUser = await User.findOne({ userId: userId }).select(
      "-security -token -password -deleteStatus -createdAt -updatedAt"
    );
    const totalTeam = await Level.countDocuments({
      userId: userId,
      "level.level": 1,
    });
    const existWallet = await Wallet.findOne({ userId: userId });

    // Required Team Logic
    const currentRankInfo = Object.values(ROYALTY__CONSTS).find(
      (info) => info.rank === existUser?.royaltyRank.nextRank.rank
    );

    const totalAmountAggregate = await Level.aggregate([
      {
        $match: {
          userId,
          "level.isActive": true,
          "level.level": 1,
        },
      },
      {
        $lookup: {
          from: "recharges", // Assuming the collection name is "recharges"
          let: { userId: "$level.userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    { $eq: ["$isActive", true] }, // Match documents where isActive is true
                    { $ne: ["$setIsManual", true] }, // exclude documents where isActive is true
                  ],
                },
              },
            },
          ],
          as: "rechargeData",
        },
      },
      {
        $unwind: "$rechargeData",
      },
      {
        $group: {
          _id: null,
          totalTeamBusiness: { $sum: "$rechargeData.amount" },
        },
      },
    ]);

    const totalTeamBusiness =
      totalAmountAggregate.length > 0
        ? totalAmountAggregate[0].totalTeamBusiness
        : 0;

    const nextRankRequiredAmount =
      ROYALTY__CONSTS[existUser.royaltyRank.nextRank.rank.toLowerCase()]
        .totalTeamBusinessAmount;
    const totalRequiredBusiness =
      totalTeamBusiness < nextRankRequiredAmount
        ? nextRankRequiredAmount - totalTeamBusiness
        : 0;

    return res.status(200).json({
      userInfo: existUser,
      walletInfo: existWallet,
      totalTeamBusiness: totalTeamBusiness,
      totalRequiredBusiness: totalRequiredBusiness,
      totalTeam: totalTeam,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserTeam = async (req, res) => {
  try {
    const userId = req.auth.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 500;

    // Use the user's level to paginate the team members
    const options = {
      page: page,
      limit: limit,
      customLabels: {
        docs: "teamMembers",
        totalDocs: "totalTeamMembers",
      },
      sort: { createdAt: -1 },
    };

    const teamMembers = await Level.paginate(
      {
        userId,
        "level.level": 1, // Assuming level is a field in your Level model
      },
      options
    );

    return res.status(200).json({
      data: teamMembers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getUserDashboardData,
  getUserTeam,
};
