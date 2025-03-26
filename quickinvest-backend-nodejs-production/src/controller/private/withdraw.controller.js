const Bank = require("../../models/addBank.model");
const User = require("../../models/auth.model");
const Wallet = require("../../models/wallet.model");
const Withdraw = require("../../models/withdraw.model");

// Show all withdraws
const showAllWithdraw = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 500;

    // Use the paginate method provided by mongoose-paginate-v2
    const withdraws = await Withdraw.paginate(
      {},
      {
        page: page,
        limit: pageSize,
        sort: { createdAt: -1 },
        lean: true,
      }
    );

    const manipulatedWithdraws = [];
    for (const doc of withdraws.docs) {
      const isBankInfo = await Bank.findOne({ userId: doc.userId });
      if (isBankInfo) {
        manipulatedWithdraws.push({
          ...doc,
          holderName: isBankInfo.holderName,
        });
      }
    }

    withdraws.docs = manipulatedWithdraws;

    // Respond with the paginated list of withdraws
    if (withdraws.docs.length > 0) {
      return res.status(200).json({
        message: "List of withdraws",
        data: withdraws,
      });
    } else {
      return res.status(404).json({ message: "No withdraws found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Controller to get successful withdraw requests
const getSuccessfulWithdraws = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 500;

    // Use the paginate method provided by mongoose-paginate-v2
    const successfulWithdraws = await Withdraw.paginate(
      { status: "success" },
      {
        page: page,
        limit: pageSize,
        sort: { createdAt: -1 },
        lean: true,
      }
    );

    // Respond with the paginated list of successful withdraws
    if (successfulWithdraws.docs.length > 0) {
      return res.status(200).json({
        message: "List of successful withdraws",
        data: successfulWithdraws,
      });
    } else {
      return res.status(404).json({
        message: "There is no successful withdraw history",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Controller to get rejected withdraw requests
const getRejectedWithdraws = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 500;

    // Use the paginate method provided by mongoose-paginate-v2
    const [rejectedWithdraws, totalRejectedWithdraws] = await Promise.all([
      Withdraw.paginate(
        { status: "reject" },
        {
          page: page,
          limit: pageSize,
          sort: { createdAt: -1 },
          lean: true,
        }
      ),
      Withdraw.countDocuments({ status: "reject" }),
    ]);

    // Respond with the paginated list of rejected withdraws
    if (rejectedWithdraws.docs.length > 0) {
      return res.status(200).json({
        message: "List of rejected withdraws",
        data: rejectedWithdraws,
      });
    } else {
      return res.status(404).json({
        message: "There is no rejected withdraw history",
        totalRejectedWithdraws: 0,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// Controller to update the status of a withdraw request
const updateWithdrawStatus = async (req, res) => {
  try {
    const { transaction_id, status, userId } = req.body;
    // const currentUser = await User.findOne({ userId: userId });
    let message = "";
    const existingWithdraw = await Withdraw.findOne({
      status: "pending",
      transactionId: transaction_id,
    });

    if (existingWithdraw) {
      if (status === "success") {
        await Withdraw.findOneAndUpdate(
          {
            userId: userId,
            status: "pending",
            transactionId: transaction_id,
          },
          {
            $set: {
              status: status,
            },
          }
        );
        // Send mail notifiction to user email with request status
        // sendEmailNotification(
        //   currentUser?.userId,
        //   currentUser?.fullName,
        //   currentUser?.email,
        //   "Withdrawal Request Status Update",
        //   existingWithdraw?.requestAmount,
        //   "Your withdrawal request has been successfully processed, and the funds have been transferred to your designated account.",
        //   "withdrawal"
        // );
        message = "Withdraw Successfully";
        return res.status(200).json({ message });
      } else {
        await Withdraw.findOneAndUpdate(
          {
            userId: userId,
            status: "pending",
            transactionId: transaction_id,
          },
          {
            $set: {
              status: status,
            },
          }
        );

        await Wallet.findOneAndUpdate(
          { userId: userId },
          { $inc: { activeIncome: +existingWithdraw?.requestAmount } },
          { new: true }
        );
      }
      // Send mail notifiction to user email with request status
      // sendEmailNotification(
      //   currentUser?.userId,
      //   currentUser?.fullName,
      //   currentUser?.email,
      //   "Withdrawal Request Status Update",
      //   existingWithdraw?.requestAmount,
      //   `Unfortunately, your withdrawal request for $${existingWithdraw?.requestAmount} amount has been rejected.`,
      //   "withdrawal"
      // );
      message = "Withdraw Rejected";

      return res.status(400).json({
        message,
      });
    } else {
      return res.status(400).json({
        message: "Status Cannot be changed",
      });
    }
  } catch (e) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  showAllWithdraw,
  updateWithdrawStatus,
  getSuccessfulWithdraws,
  getRejectedWithdraws,
};
