const {
  getUserDashboardData,
  getUserTeam,
} = require("../../controller/secure/userDashboard.controller");

const router = require("express").Router();

router.get("/get_user_dashboard_data", getUserDashboardData);
router.get("/get_user_team", getUserTeam);

module.exports = router;
