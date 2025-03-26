import React, { useEffect, useRef, useState } from "react";
import avatar from "../../assets/images/avatar.jpg";
import logo from "../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { removeLocalStorage } from "../../utils/localStorage";
import Popover from "../Admin/PopOver";
import { useClickOutside } from "../../hooks/useClickOutside";

const TopTab = ({ openSidebar, setOpenSidebar }) => {
  const profileRef = useRef(null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  useClickOutside(profileRef, () => setShowSubmenu(false));
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    if (!location.pathname.includes("/wallet")) {
      setOpenSidebar(false);
    }
  }, [location, setOpenSidebar]);
  const handleLogout = () => {
    removeLocalStorage("quickinvest_token");
    navigate("/login");
    setShowSubmenu(false);
  };
  // console.log({ openSidebar });
  return (
    <>
      <div className="tb__topTab__layout">
        <div className="tb__topTab__widgets">
          {path.includes("/wallet") && (
            <div className="tb__topTab__hamburger">
              <span>
                <RiBarChartHorizontalFill
                  onClick={() => {
                    setOpenSidebar(true);
                  }}
                />
              </span>
            </div>
          )}

          <div className="tb__topTab__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="tb__topTab__userAvatar" ref={profileRef}>
            <img
              src={avatar}
              alt="avatar"
              onClick={() => setShowSubmenu(!showSubmenu)}
            />
            <Popover openPopover={showSubmenu} className="clickable_submenu">
              <div className="logout__dropdown">
                <ul className="logout__menu">
                  <li onClick={handleLogout}>
                    <span style={{ cursor: "pointer" }}>Logout</span>
                  </li>
                </ul>
              </div>
            </Popover>
          </div>
        </div>
      </div>
      {/* Menu */}
      <div className={`tb__sidebar__menu ${openSidebar ? "active" : ""}`}>
        <div className="tb__sidebar__menu__lists">
          <ul className="tb__lists">
            <li className="tb__list">
              <Link
                to="/dashboard/wallet/withdraw-history"
                onClick={() => setOpenSidebar(false)}
              >
                Withdraw History
              </Link>
            </li>
            <li className="tb__list">
              <Link
                to="/dashboard/wallet/recharge-history"
                onClick={() => setOpenSidebar(false)}
              >
                Recharge History
              </Link>
            </li>
            <li className="tb__list">
              <Link
                to="/dashboard/wallet/roi-history"
                onClick={() => setOpenSidebar(false)}
              >
                ROI History
              </Link>
            </li>
            <li className="tb__list">
              <Link
                to="/dashboard/wallet/direct-income"
                onClick={() => setOpenSidebar(false)}
              >
                Direct Income
              </Link>
            </li>
            <li className="tb__list">
              <Link
                to="/dashboard/wallet/royalty-income"
                onClick={() => setOpenSidebar(false)}
              >
                Royalty Income
              </Link>
            </li>
            <li className="tb__list">
              <Link
                to="/dashboard/wallet/joining-bonus"
                onClick={() => setOpenSidebar(false)}
              >
                Joining Bonus
              </Link>
            </li>
            {/* <li className="tb__list">
              <Link
                to="/dashboard/wallet/recharge-reward"
                onClick={() => setOpenSidebar(false)}
              >
                Reward
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
      <div
        className={`tb__sidebar__overlay ${openSidebar ? "active" : ""}`}
        onClick={() => setOpenSidebar(false)}
      ></div>
    </>
  );
};

export default TopTab;
