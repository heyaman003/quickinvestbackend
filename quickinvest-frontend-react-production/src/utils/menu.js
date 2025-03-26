import { AiOutlineDashboard, AiOutlineWallet } from "react-icons/ai";
import { FiUser, FiSettings } from "react-icons/fi";
import { FaExchangeAlt } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdCoffeeMaker } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";

export const menus = [
  // ************************************* common dashboard menu ************************//
  {
    id: "337fwedkf",
    menu: "dashboard",
    icon: <AiOutlineDashboard />,
    route: "/admin",
    permission: ["user", "admin"],
  },
  // ************************************* admin dashboard menu ************************//
  {
    id: "7dfsegrr8srf",
    menu: "Member",
    icon: <FiUser />,
    permission: ["admin"],
    dropdown: [
      {
        id: "83agr89r4ifd",
        menu: "All Member",
        route: "/admin/member/all-member",
        permission: ["admin"],
      },
      {
        id: "838dga9r4ifd",
        menu: "Active Member",
        route: "/admin/member/active-member",
        permission: ["admin"],
      },
      {
        id: "838dga9ifd",
        menu: "Blocked Member",
        route: "/admin/member/blocked-member",
        permission: ["admin"],
      },
      {
        id: "838dlodjkdifd",
        menu: "Rank Status",
        route: "/admin/member/rank-status",
        permission: ["admin"],
      },
      // {
      //   id: "838dga9ifdteamstats",
      //   menu: "Team Statistics",
      //   route: "/admin/member/team-statistics",
      //   permission: ["admin"],
      // },
    ],
  },
  {
    id: "7dfsrs8srf",
    menu: "Recharge Report",
    icon: <GiTakeMyMoney />,
    permission: ["admin"],
    dropdown: [
      {
        id: "83bhi9r4ifd",
        menu: "All Transaction",
        route: "/admin/recharge/all-recharge",
        permission: ["admin"],
      },
      {
        id: "838dsoifd",
        menu: "Successful Report",
        route: "/admin/recharge/successful-recharge",
        permission: ["admin"],
      },
      {
        id: "8shbga9ifd",
        menu: "Rejected Report",
        route: "/admin/recharge/rejected-recharge",
        permission: ["admin"],
      },
    ],
  },
  // {
  //   id: "7dfsrs8srftopup",
  //   menu: "Topup Report",
  //   icon: <GiTakeMyMoney />,
  //   permission: ["admin"],
  //   dropdown: [
  //     {
  //       id: "83bhi9r4ifdtpup",
  //       menu: "All Topup",
  //       route: "/admin/topup/all-top-up-history",
  //       permission: ["admin"],
  //     },
  //   ],
  // },
  {
    id: "ajjdrs8srf",
    menu: "withdraw",
    icon: <AiOutlineWallet />,
    permission: ["admin"],
    dropdown: [
      {
        id: "dajei9r4ifd",
        menu: "All Withdraw",
        route: "/admin/Withdraw/all-withdraw",
        permission: ["admin"],
      },
      {
        id: "ajobeoifd",
        menu: "Successful Withdraw",
        route: "/admin/Withdraw/successful-withdraw",
        permission: ["admin"],
      },
      {
        id: "aubia9ifd",
        menu: "Rejected Withdraw",
        route: "/admin/Withdraw/rejected-withdraw",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "4323qf3q2f",
    menu: "make Recharge",
    icon: <MdCoffeeMaker />,
    permission: ["admin"],
    dropdown: [
      {
        id: "34qqf43gq3lq",
        menu: "Make Recharge",
        route: "/admin/recharge/make-rechage",
        permission: ["admin"],
      },
    ],
  },
  {
    id: "4343qf2q2f",
    menu: "change upi",
    icon: <FaExchangeAlt />,
    permission: ["admin"],
    dropdown: [
      {
        id: "34qqf43gf3hq",
        menu: "Change UPI and QR",
        route: "/admin/upi-qr/change-upi-qr",
        permission: ["admin"],
      },
    ],
  },

  {
    id: "4343qf3q2f",
    menu: "earning",
    icon: <GiTakeMyMoney />,
    permission: ["admin"],
    dropdown: [
      {
        id: "34qqf43gq3hq",
        menu: "ROI Income",
        route: "/admin/earnings/roi-income",
        permission: ["admin"],
      },
      {
        id: "f5sf5s8fs8f",
        menu: " Direct Income",
        route: "/admin/earnings/direct-income", // previously level-income
        permission: ["admin"],
      },
      {
        id: "f5sf5s8fs2f",
        menu: " Royalty Income",
        route: "/admin/earnings/royalty-income", // previously level-income
        permission: ["admin"],
      },
      {
        id: "f5sfloi8fs2f",
        menu: "Joining Bonus",
        route: "/admin/earnings/joining-bonus", // previously level-income
        permission: ["admin"],
      },
      {
        id: "f5sflokjpofs2f",
        menu: "Recharge Reward",
        route: "/admin/earnings/recharge-reward", // previously level-income
        permission: ["admin"],
      },
      // Comment out unnessesary route
      // {
      //   id: "f5sf5s8fs8frank",
      //   menu: "Rank income",
      //   route: "/admin/earnings/rank-income",
      //   permission: ["admin"],
      // },
      // {
      //   id: "f5sf5s8fs8fnaj3w",
      //   menu: "Reward",
      //   route: "/admin/earnings/admin-reward",
      //   permission: ["admin"],
      // },
    ],
  },
  // {
  //   id: "4343qf3q2g",
  //   menu: "KYC",
  //   icon: <GiTakeMyMoney />,
  //   permission: ["admin"],
  //   dropdown: [
  //     {
  //       id: "f5sf5s8fs81",
  //       menu: " All KYC",
  //       route: "/admin/kyc/all",
  //       permission: ["admin"],
  //     },
  //     {
  //       id: "f5sf5s8fs82",
  //       menu: " Successfull KYC",
  //       route: "/admin/kyc/successfull",
  //       permission: ["admin"],
  //     },
  //     {
  //       id: "f5sf5s8fs83",
  //       menu: " Rejected KYC",
  //       route: "/admin/kyc/rejected",
  //       permission: ["admin"],
  //     },
  //   ],
  // },
  // {
  //   id: "nf4au4awg43",
  //   menu: "Support",
  //   icon: <MdOutlineSupportAgent />,
  //   permission: ["admin"],
  //   dropdown: [
  //     {
  //       id: "98ay9uva",
  //       menu: "Contact Us",
  //       route: "/admin/contact-us",
  //       permission: ["admin"],
  //     },
  //     {
  //       id: "30ht9fwa",
  //       menu: "Ticket Data",
  //       route: "/admin/ticket-data",
  //       permission: ["admin"],
  //     },
  //   ],
  // },
  {
    id: "sf4s8f7ser",
    menu: "Setting",
    icon: <FiSettings />,
    permission: ["admin"],
    dropdown: [
      {
        id: "f4s8fe8r8",
        menu: "Change Password",
        route: "/admin/change-password",
        permission: ["admin"],
      },
      // {
      //   id: "f5sfsf8sf",
      //   menu: "Change Email",
      //   route: "/admin/change-email",
      //   permission: ["admin"],
      // },
      // {
      //   id: "sf4se8r9w",
      //   menu: "Popup Image",
      //   route: "/admin/popup-image",
      //   permission: ["admin"],
      // },
      {
        id: "4f7sfs8fs8f",
        menu: "PDF Controller",
        route: "/admin/pdf-controller",
        permission: ["admin"],
      },
      {
        id: "4f7sfs8ddkkkfs8f",
        menu: "Manual Recharge History",
        route: "/admin/manual-recharge-history",
        permission: ["admin"],
      },
    ],
  },
];
