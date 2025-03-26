const User = require("../models/auth.model");
const Level = require("../models/level.model");

const updateLevel = async (levelUser, user, levelNumber) => {
  // console.log("level User", levelUser);
  if (levelUser?.userId !== "ADMIN") {
    await Level.create({
      userId: levelUser.userId,
      fullName: levelUser.fullName,
      mobile: levelUser.mobile,
      sponsorId: levelUser.sponsorId,
      sponsorName: levelUser.sponsorName,
      level: {
        userId: user.userId,
        fullName: user.fullName,
        mobile: user.mobile,
        level: levelNumber,
        sponsorId: user.sponsorId,
        sponsorName: user.sponsorName,
        joiningDate: user.joiningDate,
      },
    });
    await User.updateOne(
      { userId: levelUser.userId },
      {
        $push: {
          team: {
            userId: user.userId,
            level: levelNumber,
          },
        },
      }
    );
  }
};

module.exports = updateLevel;
