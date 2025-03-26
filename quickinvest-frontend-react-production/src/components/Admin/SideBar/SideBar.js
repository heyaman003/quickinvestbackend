import React from "react";
import logoDark from "../../../assets/images/logo.png";
import { removeLocalStorage } from "../../../utils/localStorage";
import { menus } from "../../../utils/menu";
import MenuAccordion from "./MenuAccrodion";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sideBarShow, theme }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeLocalStorage("quickinvest_token");
    window.location.reload();
    navigate("/adminlogin");
  };
  // get user
  // Will Be used Leter
  //   const { data } = useGetLoginUserQuery();
  return (
    <div className="TradeBulls_sidebar">
      <div className="TradeBulls_logo_container">
        <img src={logoDark} width="100%" alt="logo" />
      </div>
      <div className="TradeBulls_user_profile">
        <div className="TradeBulls_user_info">
          <h2>{"QuickInvest"}</h2>
          <p>{"quickinvest@gmail.com"}</p>
        </div>
      </div>
      <div className="TradeBulls_sidebar_menu">
        <ul className="TradeBulls_sidebar_menu_lists">
          <MenuAccordion
            d={menus}
            sideBarShow={sideBarShow}
            logout={handleLogout}
            // userRole={data?.data?.role}
            userRole={"admin"}
          />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
