import React, { useEffect, useState } from "react";
import UserDashboardRoutes from "../routers/userRoutes/userDashboardRoutes";
import BottomTab from "../components/BottomTab";
import TopTab from "../components/TopTab";
import { getLocalStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const UserDashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getLocalStorage("quickinvest_token")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="tb__layout">
        <div className="user__container layout__container">
          <div className="tb__topHeader__area">
            <TopTab setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
          </div>
          <div className="tb__content__area">
            <UserDashboardRoutes
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          </div>
          <div className="tb__layout__footer">
            <BottomTab />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboardLayout;
