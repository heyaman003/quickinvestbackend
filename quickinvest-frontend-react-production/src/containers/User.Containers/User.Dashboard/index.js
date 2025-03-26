import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDashboardDataQuery } from "../../../services/User.Home";
const UserDashboard = () => {
  const navigate = useNavigate();
  const { data } = useGetUserDashboardDataQuery();

  return (
    <>
      <div className="tb__dashboard">
        <div className="tb__dashboard__container">
          <div
            className="tb__user__info"
            style={{ background: "#FFC100", color: "white" }}
          >
            <h2
              style={{ color: "white" }}
            >{`Hello, ${data?.userInfo?.fullName}`}</h2>
          </div>
          <div className="tb__dashboardHome__info">
            <div className="tb__userDashboard__stats">
              <h4>Balance</h4>
              <div
                className="tb__stats__cards"
                style={{ border: "1px solid black" }}
              >
                <div className="tb__stats__mainBalance">
                  <h4
                    style={{
                      color: "white",
                      padding: "0px",
                      marginRight: "6px",
                    }}
                  >
                    Main Balance
                  </h4>
                  <span>₹{data?.walletInfo?.activeIncome.toFixed(2)}</span>
                </div>
                <div className="tb__vertical__war"></div>
                <div
                  className="tb__stats__mainBalance"
                  onClick={() => {
                    navigate("/dashboard/wallet");
                  }}
                >
                  <h4 style={{ color: "white" }}>Withdrawal</h4>
                  <span>₹{data?.walletInfo?.activeIncome.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="tb__userDashboard__stats">
              <div className="tb__userDashboard__team">
                <h4>Target</h4>
                <div className="totalTeam">
                  <h4>
                    Total Team: <span>{data?.totalTeam}</span>
                  </h4>
                </div>
              </div>
              <div className="tb__stats__cards target__cards">
                <div
                  className="tb__stats__mainBalance"
                  style={{ border: "1px solid black" }}
                >
                  <h4>Current Rank</h4>
                  <span>{data?.userInfo?.royaltyRank?.currentRank}</span>
                </div>
                <div
                  className="tb__stats__mainBalance"
                  style={{ border: "1px solid black" }}
                >
                  <h4>Current Business</h4>
                  <span>{parseFloat(data?.totalTeamBusiness).toFixed(2)}</span>
                </div>
                <div
                  className="tb__stats__mainBalance"
                  style={{
                    background: "#d2122e",
                    color: "white",
                    border: "1px solid black",
                  }}
                >
                  <h4 style={{ color: "white" }}>Next Rank</h4>
                  <span style={{ color: "white" }}>
                    {data?.userInfo?.royaltyRank?.nextRank?.rank}
                  </span>
                </div>
                <div
                  className="tb__stats__mainBalance"
                  style={{
                    background: "#d2122e",
                    color: "white",
                    border: "1px solid black",
                  }}
                >
                  <h4 style={{ color: "white" }}>Required Business</h4>
                  <span style={{ color: "white" }}>
                    {parseFloat(data?.totalRequiredBusiness).toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__stats__mainBalance"
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    navigate("/dashboard/wallet/recharge-history");
                  }}
                >
                  <h4>Self Business</h4>
                  <span>
                    ₹{parseFloat(data?.walletInfo?.rechargeAmount).toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__stats__mainBalance"
                  style={{ border: "1px solid black" }}
                  onClick={() => {
                    navigate("/dashboard/wallet/roi-history");
                  }}
                >
                  <h4>Total ROI</h4>
                  <span>
                    ₹{parseFloat(data?.walletInfo?.roiIncome).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
