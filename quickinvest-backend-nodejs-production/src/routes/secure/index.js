const router = require("express").Router();

const { verifyJWT, verifyUser } = require("../../middleware/authMiddleware");

// Recharge Router
const rechargeRouter = require("./recharge.routes");
// user Dashboard Router
const userDashboard = require("./userDashboard.routes");
// earning Router
const userEarningRouter = require("./earning.routes");
// wallet Router
const userWalletRouter = require("./wallet.routes");
// middleware
const middleware = [verifyJWT, verifyUser];
router.use(middleware);
// Recharge Router
router.use(rechargeRouter);
//user Dashboard Router
router.use(userDashboard);
// user Earning Router
router.use(userEarningRouter);
// user wallet Router
router.use(userWalletRouter);

module.exports = router;
