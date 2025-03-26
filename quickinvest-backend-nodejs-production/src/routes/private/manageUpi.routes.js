const express = require("express");
const {
    getUPIandQR,
    updateUPIandQR
} = require("../../controller/private/manageUpi.controller");
const multer = require("../../middleware/multer");
const router = express.Router();

router.get("/get_manage_upi_qr", getUPIandQR);
router.post("/update_manage_upi_qr", multer.single("image"), updateUPIandQR);


module.exports = router;
