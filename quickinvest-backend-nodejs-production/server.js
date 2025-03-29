require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const port = process.env.PORT || 8000;

// for production2
// const port = 5957;
const app = express();

const secureRoutes = require("./src/routes/secure/index");
const publicRoutes = require("./src/routes/public/index");
const commonRoutes = require("./src/routes/common/index");
const privateRoutes = require("./src/routes/private/index");

const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");
const { runRoi, testRoi, runOldRoi } = require("./src/utils/runRoi");
const { runRoyaltyRoi, testRoyaltyRoi } = require("./src/utils/royaltyRoi");
const { ROIScript, MakePackage } = require("./src/utils/ROIScript");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://47.128.225.231/",
    "https://quickinvestbackend-b2g9.vercel.app/",
    "https://www.quickinvest.org",
    "https://quickinvest.org",
    "https://development.quickinvest.org",
    "https://animated-brioche-a2df71.netlify.app/",
    "https://quickinvest-testing.netlify.app",
  ],
  optionsSuccessStatus: 200,
};
// Middleware
const middleware = [
  cors(corsOptions),
  express.json(),
  express.urlencoded({ extended: true }),
];
app.use(middleware);
connectDB();

// Run Function
runRoi();
runOldRoi();
runRoyaltyRoi();
// Here will be custom routes

app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/common", commonRoutes);
app.use("/api/v1/private", privateRoutes);
app.use("/api/v1/secure", secureRoutes);

app.get("/testRoi", testRoi);
app.get("/testRoyalty", testRoyaltyRoi);

app.get("/", (_req, res) => {
  return res.send("Hello QuickInvest Production !");
});
app.get("/run", async (_req, res) => {
  await ROIScript();
  await MakePackage();
  return res.send("Hello ROI Script");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is running at port ", port);
});
