import React from "react";
import "./_loading.scss";
import logo_official from "../../../assets/images/logo.png";
const Loading = () => {
  return (
    <div className="pending_log">
      <img className="skeleton" src={logo_official} alt="pending"></img>
      <div className="loading">
        <div className="line-box">
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;