const cron = require("node-cron");
const getIstTime = require("../config/getTime");
const User = require("../models/auth.model");
const RoyaltyIncome = require("../models/royaltyIncome.model");
const RoyaltyInstance = require("../models/royaltyInstance.model");
const { ROYALTY__CONSTS } = require("../constants");
const Wallet = require("../models/wallet.model");
const Recharge = require("../models/recharge.model");
const Level = require("../models/level.model");

const findNextRankInfo = (currentRank) => {
  const currentRankInfo = Object.values(ROYALTY__CONSTS).find(
    (info) => info.rank === currentRank
  );

  if (currentRankInfo) {
    const currentIndex =
      Object.values(ROYALTY__CONSTS).indexOf(currentRankInfo);

    if (currentIndex < Object.values(ROYALTY__CONSTS).length - 1) {
      return Object.values(ROYALTY__CONSTS)[currentIndex + 1];
    }
  }

  // If current rank is not found or there is no next rank, return the first rank
  return Object.values(ROYALTY__CONSTS)[1];
};

const runRoyaltyRoi = async () => {
  cron.schedule(
    "00 00 00 * * *", // This function will run Night at 12 AM IST(Indian Standard Time)
    // "*/10 * * * *", // Every 5 mins
    // "*/10 * * * * *", // Every 5 secs
    async () => {
      try {
        const today = new Date(getIstTime().date).toDateString().split(" ")[0];
        if (today === "Sat" || today === "Sun") {
          return;
        }

        const allUsers = await User.find({
          isActive: true,
          userId: { $ne: "ADMIN" },
        });

        allUsers.forEach(async (user) => {
          const { userId } = user;

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

          // Royalty Income
          const findRoyalty = await RoyaltyInstance.findOne({
            userId,
          });

          const bulkRoyaltyInstanceUpdate = [];
          const bulkUserUpdate = [];
          const bulkWalletUpdate = [];
          const royaltyConstants = Object.values(ROYALTY__CONSTS);

          royaltyConstants.forEach(async (royaltyInfo) => {
            const estimatedDays = royaltyInfo?.days;
            const passedDays =
              findRoyalty?.rankList[`${royaltyInfo.rank?.toLowerCase()}`]
                ?.incomeDay;

            if (estimatedDays > passedDays) {
              if (totalTeamBusiness >= royaltyInfo.totalTeamBusinessAmount) {
                let nextRankInfo = royaltyInfo.rank;
                if (royaltyInfo.rank !== "VIP8") {
                  nextRankInfo = findNextRankInfo(royaltyInfo.rank);
                }

                // Update Royalty Instance
                bulkRoyaltyInstanceUpdate.push({
                  updateOne: {
                    filter: { userId },
                    update: {
                      $set: {
                        incomeDay: findRoyalty.incomeDay + 1,
                        currentRank: royaltyInfo.rank,
                        [`rankList.${royaltyInfo.rank?.toLowerCase()}.rank`]:
                          royaltyInfo.rank,
                      },
                      $inc: {
                        [`rankList.${royaltyInfo.rank?.toLowerCase()}.incomeDay`]:
                          +1,
                        totalAmount: +royaltyInfo.amount,
                      },
                    },
                  },
                });

                bulkUserUpdate.push({
                  updateOne: {
                    filter: { userId },
                    update: {
                      $set: {
                        "royaltyRank.currentRank": royaltyInfo?.rank,
                        "royaltyRank.nextRank.rank": nextRankInfo?.rank,
                      },
                    },
                  },
                });

                bulkWalletUpdate.push({
                  updateOne: {
                    filter: { userId },
                    update: {
                      $inc: {
                        royaltyIncome: +royaltyInfo?.amount,
                        totalIncome: +royaltyInfo?.amount,
                        activeIncome: +royaltyInfo?.amount,
                      },
                    },
                  },
                });

                // Create Royalty History
                await RoyaltyIncome.create({
                  userId,
                  fullName: user?.fullName,
                  sponsorId: user?.sponsorId,
                  sponsorName: user?.sponsorName,
                  amount: royaltyInfo.amount,
                  rank: royaltyInfo.rank,
                  incomeDay: passedDays + 1,
                  dateAndTime: {
                    date: new Date(getIstTime().date).toDateString(),
                    time: getIstTime().time,
                  },
                });
              }
            }
          });

          bulkRoyaltyInstanceUpdate.length > 0 &&
            (await RoyaltyInstance.bulkWrite(bulkRoyaltyInstanceUpdate));
          bulkUserUpdate.length > 0 && (await User.bulkWrite(bulkUserUpdate));
          bulkWalletUpdate.length > 0 &&
            (await Wallet.bulkWrite(bulkWalletUpdate));
        });
      } catch (error) {
        console.log("error", error);
      }
    },
    { scheduled: true, timezone: "Asia/Kolkata" }
  );
};

const testRoyaltyRoi = async (req, res) => {
  try {
    const today = new Date(getIstTime().date).toDateString().split(" ")[0];
    if (today === "Sat" || today === "Sun") {
      return;
    }

    const allUsers = await User.find({
      isActive: true,
      userId: { $ne: "ADMIN" },
    });

    allUsers.forEach(async (user) => {
      const { userId } = user;

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

      // Royalty Income
      const findRoyalty = await RoyaltyInstance.findOne({
        userId,
      });

      const bulkRoyaltyInstanceUpdate = [];
      const bulkUserUpdate = [];
      const bulkWalletUpdate = [];
      const royaltyConstants = Object.values(ROYALTY__CONSTS);

      royaltyConstants.forEach(async (royaltyInfo) => {
        const estimatedDays = royaltyInfo?.days;
        const passedDays =
          findRoyalty?.rankList[`${royaltyInfo.rank?.toLowerCase()}`]
            ?.incomeDay;

        if (estimatedDays > passedDays) {
          if (totalTeamBusiness >= royaltyInfo.totalTeamBusinessAmount) {
            let nextRankInfo = royaltyInfo.rank;
            if (royaltyInfo.rank !== "VIP8") {
              nextRankInfo = findNextRankInfo(royaltyInfo.rank);
            }

            // Update Royalty Instance
            bulkRoyaltyInstanceUpdate.push({
              updateOne: {
                filter: { userId },
                update: {
                  $set: {
                    incomeDay: findRoyalty.incomeDay + 1,
                    currentRank: royaltyInfo.rank,
                    [`rankList.${royaltyInfo.rank?.toLowerCase()}.rank`]:
                      royaltyInfo.rank,
                  },
                  $inc: {
                    [`rankList.${royaltyInfo.rank?.toLowerCase()}.incomeDay`]:
                      +1,
                    totalAmount: +royaltyInfo.amount,
                  },
                },
              },
            });

            bulkUserUpdate.push({
              updateOne: {
                filter: { userId },
                update: {
                  $set: {
                    "royaltyRank.currentRank": royaltyInfo?.rank,
                    "royaltyRank.nextRank.rank": nextRankInfo?.rank,
                  },
                },
              },
            });

            bulkWalletUpdate.push({
              updateOne: {
                filter: { userId },
                update: {
                  $inc: {
                    royaltyIncome: +royaltyInfo?.amount,
                    totalIncome: +royaltyInfo?.amount,
                    activeIncome: +royaltyInfo?.amount,
                  },
                },
              },
            });

            // Create Royalty History
            await RoyaltyIncome.create({
              userId,
              fullName: user?.fullName,
              sponsorId: user?.sponsorId,
              sponsorName: user?.sponsorName,
              amount: royaltyInfo.amount,
              rank: royaltyInfo.rank,
              incomeDay: passedDays + 1,
              dateAndTime: {
                date: new Date(getIstTime().date).toDateString(),
                time: getIstTime().time,
              },
            });
          }
        }
      });

      bulkRoyaltyInstanceUpdate.length > 0 &&
        (await RoyaltyInstance.bulkWrite(bulkRoyaltyInstanceUpdate));
      bulkUserUpdate.length > 0 && (await User.bulkWrite(bulkUserUpdate));
      bulkWalletUpdate.length > 0 && (await Wallet.bulkWrite(bulkWalletUpdate));
    });
    return res.status(200).json({ message: "Distributed Royalty" });
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = { runRoyaltyRoi, testRoyaltyRoi };
