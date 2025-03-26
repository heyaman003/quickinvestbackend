import React from "react";
import { Link, useLocation } from "react-router-dom";
import { bottomMenu } from "../../utils/bottomTab";

const BottomTab = () => {
  const location = useLocation();
  const pathname = location?.pathname;
  return (
    <>
      <div className="bottom__tab__wrapper">
        <div className="bottom__tab__lists">
          <ul className="tab__lists">
            {bottomMenu?.map((d, i) => (
              <li className="tab__list" key={i + 1}>
                <div className="tab__menu">
                  <Link
                    to={d.path}
                    className={d.path === pathname ? "active" : ""}
                  >
                    <p>{d.icon}</p>
                    <span>{d.name}</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BottomTab;
