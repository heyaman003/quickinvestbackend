import React from "react";
import Loading from "../../../components/Admin/Loading/Loading";
import HomeCard from "../../../components/Admin/HomeCard";
import totalUserIcon from "../../../assets/Admin/dashboardIcon/team.png";
import activeUserIcon from "../../../assets/Admin/dashboardIcon/active-user.png";
import blockUserIcon from "../../../assets/Admin/dashboardIcon/block-user.png";
import totalInvestmentIcon from "../../../assets/Admin/dashboardIcon/invest.png";
import { useGetDashboardInfoAdminQuery } from "../../../services/Admin.Dashboard";
const AdminDashboard = () => {
  const { data, isLoading, error } = useGetDashboardInfoAdminQuery();
  console.log({ data });
  console.log({ error });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="trade-bulls_adminHome_wrapper">
      <div className="trade-bulls_section_title">
        <h2>Dashboard</h2>
      </div>
      <div className="trade-bulls_dash_content_item">
        <div className="trade-bulls_dash_content card_row">
          <HomeCard
            cardName="Total User"
            cardValue={data?.data?.alluser ? data?.data?.alluser : "0"}
            icon={totalUserIcon}
            linkText="view details"
            bgColor="#FF87B2"
            cardBgColor="#fe9f43"
          />
          <HomeCard
            cardName="Total Active User"
            cardValue={data?.data?.activeUsers ? data?.data?.activeUsers : "0"}
            icon={activeUserIcon}
            linkText="view details"
            bgColor="#ffbd5a"
            cardBgColor="#00d0e7"
          />
          <HomeCard
            cardName="Total Inactive User"
            cardValue={
              data?.data?.inactiveUsers ? data?.data?.inactiveUsers : "0"
            }
            icon={activeUserIcon}
            linkText="view details"
            bgColor="#ffbd5a"
            cardBgColor="#00d0e7"
          />
          <HomeCard
            cardName="Blocked User"
            cardValue={
              data?.data?.blockedUsers ? data?.data?.blockedUsers : "0"
            }
            icon={blockUserIcon}
            linkText="view details"
            bgColor="#ffbd5a"
            cardBgColor="#28c66f"
          />
          <HomeCard
            cardName="Total Investment"
            cardValue={`₹ ${
              data?.data?.totalInvestmentAmount
                ? parseFloat(data?.data?.totalInvestmentAmount)?.toFixed(4)
                : "0"
            }`}
            icon={totalInvestmentIcon}
            linkText="view details"
            bgColor="#f74f75"
            cardBgColor="#00d0e7"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
