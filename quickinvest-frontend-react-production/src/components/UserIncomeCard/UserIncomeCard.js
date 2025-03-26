import React from "react";

const UserIncomeCard = ({
  cardName,
  cardValue,
  link,
  linkText,
  icon,
  bgColor,
  cardBgColor,
}) => {
  return (
    <div
      className="LevelIncome_UserIncomeCard_dash_card_wrapper"
      style={{ backgroundColor: cardBgColor }}
    >
      <div className="LevelIncome_UserIncomeCard_content">
        <div
          className="LevelIncome_UserIncomeCard_widget_icon"
          style={{ backgroundColor: bgColor }}
        >
          <img
            style={{ width: "70px", height: "70px", padding: "15px" }}
            className="LevelIncomeImageIcon"
            src={icon}
            alt=""
          />
        </div>
        <div className="LevelIncome_UserIncomeCard_widget_info">
          <p>{cardName}</p>
          <h2>{cardValue}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserIncomeCard;