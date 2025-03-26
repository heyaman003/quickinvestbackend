const mongoose = require("mongoose");

const manageUPISchema = new mongoose.Schema(
  {
    Id: { type: String, default: "manageUpiId" },
    qrcode: {
      url: { type: String },
      publicUrl: { type: String },
    },
    upiLink: String,
    upi: String,
  },
  { timestamps: true }
);

const ManageUpi = mongoose.model("ManageUpi", manageUPISchema);

module.exports = ManageUpi;
