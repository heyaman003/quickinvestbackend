const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = async (filePath) => {
  const image = await cloudinary.uploader.upload(filePath);
  return {
    url: image.secure_url,
    publicUrl: image.public_id,
  };
};

module.exports = { uploadToCloudinary };
