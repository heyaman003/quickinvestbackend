import React from "react";
import { FiLogOut } from "react-icons/fi";
import avatar from "../../../assets/Admin/avatar.png";
import CustomLink from "../Link/Index";
const AvatarDropdownMenu = ({ setOpenMenu, logout, data }) => {
  return (
    <>
      <ul className="submenu">
        <div className="header">
          <div className="img">
            <img src={data?.avatar ? data?.avatar : avatar} alt="img" />
          </div>
          <div className="name">
            <h4>{data?.name}</h4>
            <p>{data?.user_id}</p>
          </div>
        </div>
        {data?.role === "user" ? (
          <>
            <li className="submenu_list_static">
              <h4>{"joining date"}</h4>
              <p>{data?.join_date}</p>
            </li>
            {data?.topup_activation_date && (
              <li className="submenu_list_static">
                <h4>{"Activation Date"}</h4>
                {
                  <p>
                    {data?.topup_activation_date
                      ? new Date(
                          parseInt(data?.topup_activation_date)
                        ).toDateString()
                      : new Date(parseInt(data?.activation_date)).toDateString()
                      ? new Date(parseInt(data?.activation_date)).toDateString()
                      : ""}
                  </p>
                }
              </li>
            )}
          </>
        ) : null}
        <li className="submenu_list" onClick={() => setOpenMenu(false)}>
          <CustomLink href="#" onClick={logout} className="submenu_link">
            <FiLogOut style={{ cursor: "pointer" }} />
            &nbsp; Logout
          </CustomLink>
        </li>
      </ul>
    </>
  );
};

export default AvatarDropdownMenu;
