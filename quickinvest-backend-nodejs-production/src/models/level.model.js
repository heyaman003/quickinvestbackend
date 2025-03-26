const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const levelSchema = new mongoose.Schema(
  {
    userId: String,
    fullName: String,
    mobile: String,
    sponsorId: String,
    sponsorName: String,
    level: {
      userId: String,
      fullName: String,
      mobile: String,
      level: Number,
      sponsorId: String,
      sponsorName: String,
      joiningDate: String,
      activationDate: String,
      isActive: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);
levelSchema.plugin(mongoosePaginate);
const Level = new mongoose.model("Level", levelSchema);

module.exports = Level;
