import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import SideBarDownloadIcon from "../SideBarDownloadIcon/SideBarDwonloadIcon.js";


const ScreenShot = (props) => {
  const [activePlette, setActivePlette] = useState(false);
  return (
    <div className={`download-menu ${activePlette ? "activePlette" : ""}`}>
      <span
        className="setting_icon"
        onClick={() => setActivePlette(!activePlette)}
      >
        <FiSettings />
      </span>
      <SideBarDownloadIcon
        width={props.width}
        height={props.height}
        pageName={props.pageName}
      />
    </div>
  );
};

export default ScreenShot;