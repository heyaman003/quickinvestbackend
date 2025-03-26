import React, { useEffect, useState } from "react";
import Sidebar from "../components/Admin/SideBar/SideBar";
import { getLocalStorage } from "../utils/localStorage";
import Header from "../components/Admin/Header";
import Footer from "../components/Admin/Footer";
import AppContent from "../routers/adminRoutes/appContent";
import { useNavigate } from "react-router-dom";

const AdminDashboadLayout = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getLocalStorage("quickinvest_token")) {
      navigate("/adminlogin");
    }
  }, []);
  return (
    <>
      <div className="home_wrapper" show-menu={show ? "false" : "true"}>
        {/* sidebar */}
        <div className="sidebar_wrapper">
          <Sidebar
            sideBarShow={setShow}
            theme={JSON.parse(getLocalStorage("dark-mode"))}
          />
        </div>
        {!show && (
          <div
            className="menu_backdrop"
            style={{
              position: "fixed",
              backgroundColor: "#0000001c",
              width: "100%",
              height: "100%",
              zIndex: "9999",
            }}
            onClick={() => setShow(true)}
          ></div>
        )}
        {/* body container */}
        <div className="body_content_wrapper">
          {/* header */}
          <Header setShow={setShow} show={show} />
          <div
            className="content_wrapper"
            style={{
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Routers for every page render on the UI */}
            <AppContent />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminDashboadLayout;
