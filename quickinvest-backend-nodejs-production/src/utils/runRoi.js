const cron = require("node-cron");
const getIstTime = require("../config/getTime");
const RoiInstance = require("../models/rechargeRoiInstance");
const Wallet = require("../models/wallet.model");
const { ROI_COMISSION } = require("../constants");
const RoiHistory = require("../models/roiHistory");
const generateRandomString = require("../config/generateRandomId");
const Recharge = require("../models/recharge.model");

const runRoi = async () => {
  cron.schedule(
    "00 00 00 * * *", // This function will run Night at 12 AM IST(Indian Standard Time)
    // "*/2 * * * *", // Every 5 mins
    // "*/5 * * * * *", // Every 30 secs
    async () => {
      try {
        const today = new Date(getIstTime().date).toDateString().split(" ")[0];
        if (today === "Sat" || today === "Sun") {
          console.log("ROI isn't distributed on Saturday and Sunday");
          return;
        }
        const extRoi = await RoiInstance.find({
          newHistory: true,
          isActive: true,
        });
        for (const ext of extRoi) {
          // Regular ROI code
          if (ext.isActive && ext.paidDays < 365 && !ext.isCompleted) {
            console.log("userid", ext.userId);
            const currentRechargeAmount =
              (ext.forRoiAmount / 100) * ROI_COMISSION;

            const roiPerDayCommissionAmount = currentRechargeAmount;
            const roiPerDayCommissionPercentage = ROI_COMISSION;
            //   Update ROI Instance
            const upRoi = await RoiInstance.findOneAndUpdate(
              { rechargeId: ext.rechargeId },
              {
                $inc: {
                  paidDays: +1,
                  leftDays: -1,
                  totalReturnedAmount: +Number(
                    roiPerDayCommissionAmount.toFixed(4)
                  ),
                },
              },
              { new: true }
            );
            //   Update Wallet
            await Wallet.findOneAndUpdate(
              { userId: ext.userId },
              {
                $inc: {
                  roiIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
                  totalIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
                  activeIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
                },
              }
            );
            //   Create ROI History
            await RoiHistory.create({
              userId: ext.userId,
              fullName: ext.fullName,
              sponsorId: ext.sponsorId,
              sponsorName: ext.sponsorName,
              currentRechargeAmount: ext.currentRechargeAmount,
              rechargeType: ext.rechargeType,
              rechargeId: ext.rechargeId,
              totalDays: ext.totalDays,
              paidDays: upRoi?.paidDays,
              leftDays: upRoi?.leftDays,
              percentagePerDay: roiPerDayCommissionPercentage,
              perDayAmount: roiPerDayCommissionAmount,
              totalReturnedAmount: upRoi?.totalReturnedAmount,
              dateAndTime: {
                date: new Date(getIstTime().date).toDateString(),
                time: getIstTime().time,
              },
              transactionId: generateRandomString(),
            });
            //   Update Recharge History
            await Recharge.findOneAndUpdate(
              {
                rechargeId: ext.rechargeId,
              },
              {
                $inc: {
                  paidDays: +1,
                  leftDays: -1,
                },
              }
            );
            //   If paiddays is 365 then stopped the roi
            if (upRoi?.paidDays === 365) {
              await RoiInstance.findOneAndUpdate(
                { rechargeId: ext.rechargeId },
                { $set: { isActive: false, isCompleted: true } }
              );
              await Recharge.findOneAndUpdate(
                { rechargeId: ext.rechargeId },
                { $set: { isActive: false, isCompleted: true } }
              );
            }
          }
        }
        console.log("Distribute roi");
      } catch (error) {
        console.log("error", error);
      }
    },
    { scheduled: true, timezone: "Asia/Kolkata" }
  );
};
const runOldRoi = async () => {
  cron.schedule(
    "00 00 00 * * *", // This function will run Night at 12 AM IST(Indian Standard Time)
    // "*/2 * * * *", // Every 5 mins
    // "*/5 * * * * *", // Every 30 secs
    async () => {
      try {
        const today = new Date(getIstTime().date).toDateString().split(" ")[0];
        if (today === "Sat" || today === "Sun") {
          console.log("ROI isn't distributed on Saturday and Sunday");
          return;
        }
        const extRoi = await RoiInstance.find({
          oldHistory: true,
          isActive: true,
        });
        for (const ext of extRoi) {
          // Regular ROI code
          if (ext.isActive && ext.paidDays < 365 && !ext.isCompleted) {
            console.log("userid", ext.userId);
            const currentRechargeAmount =
              (ext.forRoiAmount / 100) * ROI_COMISSION;

            const roiPerDayCommissionAmount = ext.amount;
            const roiPerDayCommissionPercentage = ROI_COMISSION;
            //   Update ROI Instance
            const upRoi = await RoiInstance.findOneAndUpdate(
              { rechargeId: ext.rechargeId },
              {
                $inc: {
                  paidDays: +1,
                  leftDays: -1,
                  totalReturnedAmount: +Number(
                    roiPerDayCommissionAmount.toFixed(4)
                  ),
                },
              },
              { new: true }
            );
            //   Update Wallet
            await Wallet.findOneAndUpdate(
              { userId: ext.userId },
              {
                $inc: {
                  roiIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
                  totalIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
                  activeIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
                },
              }
            );
            //   Create ROI History
            await RoiHistory.create({
              userId: ext.userId,
              fullName: ext.fullName,
              sponsorId: ext.sponsorId,
              sponsorName: ext.sponsorName,
              currentRechargeAmount: ext.currentRechargeAmount,
              rechargeType: ext.rechargeType,
              rechargeId: ext.rechargeId,
              totalDays: ext.totalDays,
              paidDays: upRoi?.paidDays,
              leftDays: upRoi?.leftDays,
              // percentagePerDay: roiPerDayCommissionPercentage.toFixed(4),
              perDayAmount: roiPerDayCommissionAmount.toFixed(4),
              totalReturnedAmount: upRoi?.totalReturnedAmount.toFixed(4),
              dateAndTime: {
                date: new Date(getIstTime().date).toDateString(),
                time: getIstTime().time,
              },
              transactionId: generateRandomString(),
            });
            //   Update Recharge History
            await Recharge.findOneAndUpdate(
              {
                rechargeId: ext.rechargeId,
              },
              {
                $inc: {
                  paidDays: +1,
                  leftDays: -1,
                },
              }
            );
            //   If paiddays is 365 then stopped the roi
            if (upRoi?.paidDays === 365) {
              await RoiInstance.findOneAndUpdate(
                { rechargeId: ext.rechargeId },
                { $set: { isActive: false, isCompleted: true } }
              );
              await Recharge.findOneAndUpdate(
                { rechargeId: ext.rechargeId },
                { $set: { isActive: false, isCompleted: true } }
              );
            }
          }
        }
        console.log("Distribute old roi");
      } catch (error) {
        console.log("error", error);
      }
    },
    { scheduled: true, timezone: "Asia/Kolkata" }
  );
};

const testRoi = async (req, res) => {
  try {
    const today = new Date(getIstTime().date).toDateString().split(" ")[0];
    if (today === "Sat" || today === "Sun") {
      console.log("ROI isn't distributed on Saturday and Sunday");
      return;
    }
    const extRoi = await RoiInstance.find({});
    for (const ext of extRoi) {
      // Regular ROI code
      if (ext.isActive && ext.paidDays < 365 && !ext.isCompleted) {
        console.log("userid", ext.userId);
        const currentRechargeAmount = (ext.forRoiAmount / 100) * ROI_COMISSION;

        const roiPerDayCommissionAmount = currentRechargeAmount;
        const roiPerDayCommissionPercentage = ROI_COMISSION;
        //   Update ROI Instance
        const upRoi = await RoiInstance.findOneAndUpdate(
          { rechargeId: ext.rechargeId },
          {
            $inc: {
              paidDays: +1,
              leftDays: -1,
              totalReturnedAmount: +Number(
                roiPerDayCommissionAmount.toFixed(4)
              ),
            },
          },
          { new: true }
        );
        //   Update Wallet
        await Wallet.findOneAndUpdate(
          { userId: ext.userId },
          {
            $inc: {
              roiIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
              totalIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
              activeIncome: +Number(roiPerDayCommissionAmount.toFixed(4)),
            },
          }
        );
        //   Create ROI History
        await RoiHistory.create({
          userId: ext.userId,
          fullName: ext.fullName,
          sponsorId: ext.sponsorId,
          sponsorName: ext.sponsorName,
          currentRechargeAmount: ext.currentRechargeAmount,
          rechargeType: ext.rechargeType,
          rechargeId: ext.rechargeId,
          totalDays: ext.totalDays,
          paidDays: upRoi?.paidDays,
          leftDays: upRoi?.leftDays,
          percentagePerDay: roiPerDayCommissionPercentage,
          perDayAmount: roiPerDayCommissionAmount,
          totalReturnedAmount: upRoi?.totalReturnedAmount,
          dateAndTime: {
            date: new Date(getIstTime().date).toDateString(),
            time: getIstTime().time,
          },
          transactionId: generateRandomString(),
        });
        //   Update Recharge History
        await Recharge.findOneAndUpdate(
          {
            rechargeId: ext.rechargeId,
          },
          {
            $inc: {
              paidDays: +1,
              leftDays: -1,
            },
          }
        );
        //   If paydays is 365 then stopped the roi
        if (upRoi?.paidDays === 365) {
          await RoiInstance.findOneAndUpdate(
            { rechargeId: ext.rechargeId },
            { $set: { isActive: false, isCompleted: true } }
          );
          await Recharge.findOneAndUpdate(
            { rechargeId: ext.rechargeId },
            { $set: { isActive: false, isCompleted: true } }
          );
        }
      }
    }
    console.log("Distribue roi");
    return res.status(200).json({ message: "Distributed ROI" });
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = { runRoi, testRoi, runOldRoi };
