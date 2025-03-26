const router = require("express").Router();
const { verifyJWT, verifyAdmin } = require("../../middleware/authMiddleware");
const membersRouter = require("./members.routes");
const getcontactusRouter = require("./contactus.routes");
const getdashboardRouter = require("./dashboard.routes");
const showWithdeawRouter = require("./withdraw.routes");
const earningRouter = require("./earning.routes");
const settingRouter = require("./settings.routes");
const rechargeRouter = require("./recharge.routes");
const manageUpiRouter = require("./manageUpi.routes");
// const colorRouter = require("./colorPrediction.routes");

const middleware = [verifyJWT, verifyAdmin];
router.use(middleware);
// Members router
router.use(membersRouter);
// Contact router
router.use(getcontactusRouter);
// Dashboard router
router.use(getdashboardRouter);
// Withdraw router
router.use(showWithdeawRouter);
// Earning router
router.use(earningRouter);
// Setting router
router.use(settingRouter);
// Topup router
router.use(rechargeRouter);
// manage UPI and QR
router.use(manageUpiRouter);
// Color Prdiction router
// router.use(colorRouter);

module.exports = router;
