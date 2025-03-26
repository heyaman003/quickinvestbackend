import React from "react";
import { Route, Routes } from "react-router-dom";
import Page404 from "../../containers/Page404NotFound/Page404";
import UserDashboard from "../../containers/User.Containers/User.Dashboard";
import UserTeam from "../../containers/User.Containers/User.TeamContainer";
import UserMine from "../../containers/User.Containers/User.MineContainer";
import UserWallet from "../../containers/User.Containers/User.WalletContainer";
import UserWithdrawHistory from "../../containers/User.Containers/User.WalletContainer/WithdrawHistory";
import UserRechargeHistory from "../../containers/User.Containers/User.WalletContainer/RechargeHistory";
import UserRoiHistory from "../../containers/User.Containers/User.WalletContainer/RoiHistory";
import UserDirectIncomeHistory from "../../containers/User.Containers/User.WalletContainer/DirectIncomeHistory";
import UserRoyaltyIncomeHistory from "../../containers/User.Containers/User.WalletContainer/RoyaltyIncomeHistory";
import UserJoiningBonus from "../../containers/User.Containers/User.WalletContainer/JoiningBonus";
import UserRewardHistory from "../../containers/User.Containers/User.WalletContainer/Reward";

const UserDashboardRoutes = ({ openSidebar, setOpenSidebar }) => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<UserDashboard />} />
        <Route path="/team" element={<UserTeam />} />
        <Route path="/mine" element={<UserMine />} />
        <Route
          path="/wallet"
          element={
            <UserWallet
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          }
        />
        <Route
          path="/wallet/withdraw-history"
          element={<UserWithdrawHistory />}
        />
        <Route
          path="/wallet/recharge-history"
          element={<UserRechargeHistory />}
        />
        <Route path="/wallet/roi-history" element={<UserRoiHistory />} />
        <Route
          path="/wallet/direct-income"
          element={<UserDirectIncomeHistory />}
        />
        <Route
          path="/wallet/royalty-income"
          element={<UserRoyaltyIncomeHistory />}
        />
        <Route
          path="/wallet/joining-bonus"
          element={<UserJoiningBonus />}
        />
        {/* <Route
          path="/wallet/recharge-reward"
          element={<UserRewardHistory />}
        /> */}
      </Routes>
    </>
  );
};

export default UserDashboardRoutes;
