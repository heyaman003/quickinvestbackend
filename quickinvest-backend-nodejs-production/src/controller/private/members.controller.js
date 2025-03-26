const { ROYALTY__CONSTS } = require("../../constants");
const User = require("../../models/auth.model");
const Level = require("../../models/level.model");
const Wallet = require("../../models/wallet.model");
const Withdraw = require("../../models/withdraw.model");

// Apply the paginate plugin to your User schema

const allMembersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 500;

    // Use the paginate method provided by mongoose-paginate-v2
    const users = await User.paginate(
      {},
      {
        page: page,
        limit: pageSize,
        sort: { createdAt: -1 },
        select: "-password",
      }
    );

    // Respond with the paginated list of users
    if (users.docs.length > 0) {
      return res.status(200).json({
        data: users,
      });
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const activeUsersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 500;

    // Use the paginate method provided by mongoose-paginate-v2
    const activeUsers = await User.paginate(
      { isActive: true },
      {
        page: page,
        limit: pageSize,
        sort: { createdAt: -1 },
        select: "-password",
      }
    );

    // Respond with the paginated list of active users
    if (activeUsers.docs.length > 0) {
      return res.status(200).json({
        data: activeUsers,
      });
    } else {
      return res.status(404).json({ message: "No active users found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const blockedUsersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 500;

    // Use the paginate method provided by mongoose-paginate-v2
    const blockedUsers = await User.paginate(
      { userStatus: false },
      {
        page: page,
        limit: pageSize,
        sort: { createdAt: -1 },
        select: "-password",
      }
    );

    // Respond with the paginated list of blocked users
    if (blockedUsers.docs.length > 0) {
      return res.status(200).json({
        data: blockedUsers,
      });
    } else {
      return res.status(404).json({ message: "No blocked users found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const editUser = async (req, res) => {
  try {
    // Use findOneAndUpdate to find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.body.userId },
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Can not Update User" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// change user Status
const changeUserStatus = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = await User.findOne({ userId: user_id });
    const updateUserStatus = await User.findOneAndUpdate(
      { userId: user_id },
      {
        $set: {
          userStatus: !user.userStatus,
        },
      }
    );
    if (updateUserStatus) {
      res.status(200).json({
        message: "Successfully changed user Status",
      });
    } else {
      res.status(400).json({
        message: "Cannot change user status",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Member delete
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          deleteStatus: true,
        },
      }
    );
    if (user) {
      res.status(200).json({
        message: "Deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "Cannot delete user",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.toString(),
    });
  }
};

// Team Statistics
const getTeamStatistics = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userInfo = await User.findOne({ userId });

    if (!userInfo) {
      return res.status(400).json({ message: "User is not found" });
    }

    const teamMembers = userInfo.team || [];

    const totalActiveTeam = await User.countDocuments({
      userId: { $in: teamMembers.map((member) => member.userId) },
      isActive: true,
    });

    const levelInfo = [];
    const findLevel = await Level.find({ userId: userId });
    console.log({ findLevel });

    // Create an object to store counts for each level
    const levelCounts = {};

    findLevel.forEach((user) => {
      const userLevel = user.level && user.level.level;

      if (userLevel) {
        // Increment total users count for the level
        levelCounts[userLevel] = (levelCounts[userLevel] || 0) + 1;
        console.log("my level", user.level.isActive);
        console.log("my user ", user);
        // Increment active users count if the user is active
        if (user.level.isActive === true) {
          levelCounts[`active_${userLevel}`] =
            (levelCounts[`active_${userLevel}`] || 0) + 1;
        }
      }
    });

    // Populate levelInfo array with total and active user counts for each level
    for (let i = 1; i <= 2; i++) {
      const totalUsers = levelCounts[i] || 0;
      const activeUsers = levelCounts[`active_${i}`] || 0;

      const data = {
        level: i,
        totalUsers: totalUsers,
        activeUsers: activeUsers,
      };

      levelInfo.push(data);
    }

    console.log(levelInfo);

    const walletInfo = await Wallet.findOne({ userId });

    const withdrawalInfo = await Withdraw.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $group: {
          _id: null,
          totalWithdraw: { $sum: "$requestAmount" },
        },
      },
    ]);

    const info = {
      fullName: userInfo.fullName,
      package: userInfo.packageInfo?.amount,
      totalTeam: teamMembers.length,
      totalActiveTeam,
      teamStats: levelInfo,
      mainIncome: walletInfo.activeIncome,
      totalIncome: walletInfo.totalIncome,
      roiIncome: walletInfo.roiIncome,
      directIncome: walletInfo.directIncome,
      royaltyIncome: walletInfo.royaltyIncome,
      totalWithdraw: withdrawalInfo[0]?.totalWithdraw || 0,
      investmentAmount: walletInfo.rechargeAmount,
    };

    if (info) {
      return res.status(200).json({ data: info });
    } else {
      return res.status(400).json({ message: "There is no data" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get level details
const getTeamStatsDetails = async (req, res) => {
  try {
    const level = String(req.query.level);
    const userId = String(req.query.userId);

    if (!level) {
      return res.status(400).json({ message: "Level is missing" });
    }
    if (level > 7) {
      return res.status(400).json({ message: "Level no more than 7" });
    }
    if (!userId) {
      return res.status(400).json({ message: "User id is missing" });
    }
    const teams = await Level.findOne({ userId: userId });
    if (!teams) {
      return res.status(400).json({ message: "User id is not exist" });
    }

    const members = teams?.level?.filter((d) => d.level === level) || [];

    let histories = [];
    for (const member of members) {
      // const formattedData = await Promise.all(
      //   packages.map(async (pkg, index) => {
      //     const { userId, userFullName } = pkg;
      //     const package = {
      //       amount: pkg.packageInfo.amount,
      //       date: pkg.packageInfo.date,
      //     };
      //     let upgradePackage = null;
      //     let amount = 0;
      //     // Calculate amount only if there is a previous package
      //     if (index > 0) {
      //       const previousPackage = packages[index - 1];
      //       if (pkg.packageType === "Upgrade") {
      //         upgradePackage = {
      //           amount: pkg.packageInfo.amount,
      //           date: pkg.packageInfo.date,
      //         };
      //         amount =
      //           upgradePackage.amount - previousPackage.packageInfo.amount;
      //       } else {
      //         amount = 0;
      //       }
      //     }
      //     return {
      //       userId,
      //       userFullName,
      //       package,
      //       upgradepackage: upgradePackage,
      //       amount,
      //     };
      //   })
      // );
      // histories.push(...formattedData);
    }
    if (histories?.length > 0) {
      return res.status(200).json({ data: histories.reverse() });
    } else {
      return res.status(400).json({ message: "There is no history" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getRankStatusForAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rank = req.query.rank || "";
    const rankType = req.query.rankType || "";
    const searchById = req.query.searchById || "";

    const skip = (page - 1) * limit;

    // Define the query object
    let query = {};

    // Add rank filter if rank is provided
    if (rankType === "current-rank") {
      query = {
        $or: [{ "royaltyRank.currentRank": rank }, { userId: searchById }],
      };
    } else if (rankType === "next-rank") {
      query = {
        $or: [{ "royaltyRank.nextRank.rank": rank }, { userId: searchById }],
      };
    } else if (searchById) {
      query = {
        $or: [{ userId: searchById }],
      };
    }

    // Find users matching the rank criteria with pagination and sorting
    const users = await User.find(query)
      .select("royaltyRank userId fullName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Count total number of users
    const totalUsers = await User.countDocuments(query);

    // Prepare the results array
    const results = await Promise.all(
      users.map(async (user) => {
        const userId = user.userId;

        // Find the total team business amount
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
              from: "recharges",
              let: { userId: "$level.userId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$userId", "$$userId"] },
                        { $eq: ["$isActive", true] },
                        { $ne: ["$setIsManual", true] }, // exclude documents where isActive is true

                      ],
                    },
                  },
                },
              ],
              as: "rechargeData",
            },
          },
          { $unwind: "$rechargeData" },
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
          ROYALTY__CONSTS[user.royaltyRank.nextRank.rank.toLowerCase()]
            .totalTeamBusinessAmount;

        const totalRequiredBusiness =
          totalTeamBusiness < nextRankRequiredAmount
            ? nextRankRequiredAmount - totalTeamBusiness
            : 0;

        return {
          userInfo: user,
          totalTeamBusiness,
          totalRequiredBusiness,
        };
      })
    );

    // Pagination info
    const totalPages = Math.ceil(totalUsers / limit);
    const pagingCounter = (page - 1) * limit + 1;
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    const response = {
      totalDocs: totalUsers,
      limit,
      totalPages,
      page,
      pagingCounter,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      docs: results,
    };

    return res.status(200).json({
      message: "All users rank status",
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  activeUsersController,
  blockedUsersController,
  editUser,
  allMembersController,
  changeUserStatus,
  deleteUser,
  getTeamStatistics,
  getTeamStatsDetails,
  getRankStatusForAllUsers,
};
