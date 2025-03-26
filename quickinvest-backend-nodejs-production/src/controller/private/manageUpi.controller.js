const ManageUpi = require("../../models/manageUPI&QR.model");
const cloudinary = require("../../config/cloudinary");
const updateUPIandQR = async (req, res) => {
  try {
    const { UPI } = req.body;

    const upiLink = `upi://pay?pa=${UPI}&cu=INR&am=5000&tn=Quickcrest`;

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);

      const imgDataOfCloudinary = {
        url: image.secure_url,
        publicUrl: image.public_id,
      };

      await ManageUpi.updateOne(
        { Id: "manageUpiId" },
        { $set: { qrcode: imgDataOfCloudinary } },
        { upsert: true, new: true }
      );
    }

    if (UPI) {
      await ManageUpi.updateOne(
        { Id: "manageUpiId" },
        { $set: { upiLink: upiLink, upi: UPI } },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const getUPIandQR = async (req, res) => {
  try {
    const manageUpiData = await ManageUpi.findOne({ Id: "manageUpiId" });

    if (!manageUpiData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(manageUpiData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { updateUPIandQR, getUPIandQR };
