const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const manualPackageSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    sponsorId: String,
    sponsorName: String,
    withdrawPending: Number,
    mainBlanch: Number,
    totalBlanch: Number,
  },
  { timestamps: true }
);
manualPackageSchema.plugin(mongoosePaginate);
const ManualPackage = mongoose.model("manualPackage", manualPackageSchema);

module.exports = ManualPackage;
