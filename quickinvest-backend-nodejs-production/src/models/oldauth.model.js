const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");
const old_userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
    fullName: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Must be at least 6 characters"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
    },
    sponsorId: {
      type: String,
      required: [true, "Sponsor ID is required"],
    },
    sponsorName: {
      type: String,
      required: [true, "Sponsor Name is required"],
    },
    security: {
      question: { type: String, required: [true, "Question is required"] },
      answer: { type: String, required: [true, "Answer is required"] },
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: { type: Boolean, default: false },
    activationDate: { type: String, default: "N/A" },
    joiningDate: String,
    userStatus: { type: Boolean, default: true },
    team: [
      {
        userId: String,
        level: String,
      },
    ],
    avatar: String,
    deleteStatus: { type: Boolean, default: false },
    currentRecharge: {
      type: Number,
      default: 0,
    },
    royaltyRank: {
      currentRank: { type: String, default: "N/A" },
      nextRank: {
        rank: { type: String, default: "VIP1" },
      },
    },
    totalInvestmentAmount: {
      type: Number,
      default: 0,
    },
    todayROIDistributedDate: { type: String, default: "N/A" },
    quickCrestStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

old_userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

old_userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
});

old_userSchema.plugin(mongoosePaginate);
// Define and export the User model
const Old_User = mongoose.model("Old_user", old_userSchema);
module.exports = Old_User;
