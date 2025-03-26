import React from "react";
import Page404 from "../../containers/Page404NotFound/Page404";

/* ***************************** //admin// ************************** */
const AdminDashboard = React.lazy(() =>
  import("../../containers/Admin.Container/Admin.Dashboard")
);
//**********************************//all member related component*************** */
const AllMembers = React.lazy(() =>
  import("../../containers/Admin.Container/Members/AllMember")
);
const ActiveMembers = React.lazy(() =>
  import("../../containers/Admin.Container/Members/ActiveMember")
);
const BlockedMembers = React.lazy(() =>
  import("../../containers/Admin.Container/Members/BlockedMember/BlockedMember")
);
const RankStatus = React.lazy(() =>
  import("../../containers/Admin.Container/Members/RankStatus/RankStatus")
);
const TeamStatistics = React.lazy(() =>
  import(
    "../../containers/Admin.Container/Members/TeamStatistics/TeamStatistics"
  )
);

//**********************************//all deposit related component*************** */

const AllDeposit = React.lazy(() =>
  import(
    "../../containers/Admin.Container/DepositReport/AllTransaction/AllTransaction"
  )
);
const SuccessfullDeposit = React.lazy(() =>
  import(
    "../../containers/Admin.Container/DepositReport/SuccessfullTransaction/SuccessfullTransaction"
  )
);
const RejectedDeposit = React.lazy(() =>
  import(
    "../../containers/Admin.Container/DepositReport/RejectedTransaction/RejectedTransaction"
  )
);

//**********************************//All TopUp component**************************** */

const AllTopUp = React.lazy(() =>
  import("../../containers/Admin.Container/TopupReport/AllTopUp/AllTopUp")
);
//******************************Withdraw Components************************************************//
const AllWithdraw = React.lazy(() =>
  import(
    "../../containers/Admin.Container/WithdrawReport/Allwithdraw/Allwithdraw"
  )
);
const SuccessWithdraw = React.lazy(() =>
  import(
    "../../containers/Admin.Container/WithdrawReport/SuccessWithdraw/SuccessfulWithdraw"
  )
);
const RejectedWithdraw = React.lazy(() =>
  import(
    "../../containers/Admin.Container/WithdrawReport/RejectWithdraw/RejectedWithdraw"
  )
);
// Earning Components
const ROIIncome = React.lazy(() =>
  import("../../containers/Admin.Container/Earning/ROIIncome")
);
const DirectIncome = React.lazy(() =>
  import("../../containers/Admin.Container/Earning/DirectIncome")
);
const RoyaltyIncome = React.lazy(() =>
  import("../../containers/Admin.Container/Earning/Royaltyincome")
);
const JoiningBonus = React.lazy(() =>
  import("../../containers/Admin.Container/Earning/JoiningBonus")
);
const RechargeReward = React.lazy(() =>
  import("../../containers/Admin.Container/Earning/RechargeReward")
);
//KYC Components

const AllKYC = React.lazy(() =>
  import("../../containers/Admin.Container/KYC/AllKYC/AllKYC")
);
const SuccessKYC = React.lazy(() =>
  import("../../containers/Admin.Container/KYC/SuccessKYC/SuccessKYC")
);
const RejectedKYC = React.lazy(() =>
  import("../../containers/Admin.Container/KYC/RejectedKYC/RejectedKYC")
);
//support components
const ContactUs = React.lazy(() =>
  import("../../containers/Admin.Container/Support/ContactUs/ContactUs")
);
const TicketData = React.lazy(() =>
  import("../../containers/Admin.Container/Support/TicketData/TicketData")
);
//Setting Components
const ChangePassword = React.lazy(() =>
  import(
    "../../containers/Admin.Container/Settings/ChangePassWord/ChangePassWord"
  )
);
const ChangeEmail = React.lazy(() =>
  import("../../containers/Admin.Container/Settings/ChangeEmail/ChangeEmail")
);
const PDFController = React.lazy(() =>
  import(
    "../../containers/Admin.Container/Settings/PDFController/PDFController"
  )
);
const ManualRechargeHistory = React.lazy(() =>
  import("../../containers/Admin.Container/Settings/AllManaualTransaction.js")
);
const ChangeUPI = React.lazy(() =>
  import("../../containers/Admin.Container/admin.ChangeUPIandQR")
);
const MakeRecharge = React.lazy(() =>
  import("../../containers/Admin.Container/admin.MakeRechagre")
);

export const routers = [
  /*******************************************admin routes *********************************************/
  {
    path: "*",
    exact: true,
    name: "Error",
    permission: ["admin"],
    component: Page404,
  },
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    permission: ["admin"],
    component: AdminDashboard,
  },
  //members section

  {
    path: "/member/all-member",
    exact: true,
    name: "All Members",
    permission: ["admin"],
    component: AllMembers,
  },
  {
    path: "/member/active-member",
    exact: true,
    name: "Active Members",
    permission: ["admin"],
    component: ActiveMembers,
  },
  {
    path: "/member/blocked-member",
    exact: true,
    name: "Blocked Members",
    permission: ["admin"],
    component: BlockedMembers,
  },
  {
    path: "/member/rank-status",
    exact: true,
    name: "Rank Status",
    permission: ["admin"],
    component: RankStatus,
  },
  {
    path: "/member/team-statistics",
    exact: true,
    name: "Team Statistics",
    permission: ["admin"],
    component: TeamStatistics,
  },
  //Deposit Section
  {
    path: "/recharge/all-recharge",
    exact: true,
    name: "All Deposit",
    permission: ["admin"],
    component: AllDeposit,
  },
  {
    path: "/recharge/successful-recharge",
    exact: true,
    name: "Successfull Deposit",
    permission: ["admin"],
    component: SuccessfullDeposit,
  },
  {
    path: "/recharge/rejected-recharge",
    exact: true,
    name: "Rejected Deposit",
    permission: ["admin"],
    component: RejectedDeposit,
  },
  // topup related Route

  {
    path: "/topup/all-top-up-history",
    exact: true,
    name: "All ToUp",
    permission: ["admin"],
    component: AllTopUp,
  },
  // withdraw related Route
  {
    path: "/Withdraw/all-withdraw",
    exact: true,
    name: "All Withdraw",
    permission: ["admin"],
    component: AllWithdraw,
  },
  {
    path: "/Withdraw/successful-withdraw",
    exact: true,
    name: "Successful Withdraw",
    permission: ["admin"],
    component: SuccessWithdraw,
  },
  {
    path: "/Withdraw/rejected-withdraw",
    exact: true,
    name: "Rejected Withdraw",
    permission: ["admin"],
    component: RejectedWithdraw,
  },
  //change upi and qr code
  {
    path: "/upi-qr/change-upi-qr",
    exact: true,
    name: "Change UPI and QR",
    permission: ["admin"],
    component: ChangeUPI,
  },

  {
    path: "/recharge/make-rechage",
    exact: true,
    name: "Make Recharge",
    permission: ["admin"],
    component: MakeRecharge,
  },

  // Earning Routes
  {
    path: "/earnings/roi-income", //previously /level-income
    exact: true,
    name: "ROI Income",
    permission: ["admin"],
    component: ROIIncome,
  },
  {
    path: "/earnings/direct-income",
    exact: true,
    name: "Direct Income",
    permission: ["admin"],
    component: DirectIncome,
  },
  {
    path: "/earnings/royalty-income",
    exact: true,
    name: "Royalty Income",
    permission: ["admin"],
    component: RoyaltyIncome,
  },
  {
    path: "/earnings/joining-bonus",
    exact: true,
    name: "Royalty Income",
    permission: ["admin"],
    component: JoiningBonus,
  },
  {
    path: "/earnings/recharge-reward",
    exact: true,
    name: "Recharge Reward",
    permission: ["admin"],
    component: RechargeReward,
  },
  //KYC Routes
  {
    path: "/kyc/all",
    exact: true,
    name: "All KYC",
    permission: ["admin"],
    component: AllKYC,
  },
  {
    path: "/kyc/all",
    exact: true,
    name: "All KYC",
    permission: ["admin"],
    component: AllKYC,
  },
  {
    path: "/kyc/successfull",
    exact: true,
    name: "Successful KYC",
    permission: ["admin"],
    component: SuccessKYC,
  },
  {
    path: "/kyc/rejected",
    exact: true,
    name: "Rejected KYC",
    permission: ["admin"],
    component: RejectedKYC,
  },
  //Support related Routes
  {
    path: "/contact-us",
    exact: true,
    name: "Contact Us",
    permission: ["admin"],
    component: ContactUs,
  },
  {
    path: "/ticket-data",
    exact: true,
    name: "Ticket data",
    permission: ["admin"],
    component: TicketData,
  },
  //Settings Routes
  {
    path: "/change-password",
    exact: true,
    name: "Change Password",
    permission: ["admin"],
    component: ChangePassword,
  },
  {
    path: "/change-email",
    exact: true,
    name: "Change Email",
    permission: ["admin"],
    component: ChangeEmail,
  },
  {
    path: "/pdf-controller",
    exact: true,
    name: "PDF Controller",
    permission: ["admin"],
    component: PDFController,
  },
  {
    path: "/manual-recharge-history",
    exact: true,
    name: "Manual Recharge History",
    permission: ["admin"],
    component: ManualRechargeHistory,
  },
];
