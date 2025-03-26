import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
export const bottomMenu = [
  {
    id: "s5f58sfs65",
    name: "Home",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    id: "3843946r5er5e",
    name: "Team",
    path: "/dashboard/team",
    icon: <FaUserFriends />,
  },
  {
    id: "43546r99rr8er4",
    name: "Wallet",
    path: "/dashboard/wallet",
    icon: <FaWallet />,
  },
  {
    id: "152s8f8sf8s7jw",
    name: "Mine",
    path: "/dashboard/mine",
    icon: <RiProfileFill />,
  },
];
