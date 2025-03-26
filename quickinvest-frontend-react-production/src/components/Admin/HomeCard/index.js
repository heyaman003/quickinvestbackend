import React from "react";

const HomeCard = ({
  cardName,
  cardValue,
  link,
  linkText,
  icon,
  bgColor,
  cardBgColor,
  type,
  teamBusiness,
  role,
  goToHistory,
  level,
}) => {
  return (
    <div
      className='trade-bulls_dash_card_wrapper'
      // style={{ backgroundColor: cardBgColor }}
    >
      <div className='trade-bulls_content'>
        <div className='trade-bulls_widget_info'>
          <p>{cardName}</p>
          {!type && <h2>{cardValue}</h2>}
          {type === "level" && (
            <p className='trade-bulls_widget_info_text'>
              {" "}
              Total Partner: {cardValue}
            </p>
          )}
          {type === "level" && role !== "admin" && (
            <p className='trade-bulls_widget_info_text'>
              {" "}
              Partner business: ${teamBusiness}
            </p>
          )}
          {/* {type === "level" && role === "admin" && (
            <button onClick={()=> goToHistory()} className="trade-bulls_widget_info_text">
              {" "}
              Team business: ${teamBusiness}
            </button>
          )} */}
        </div>
        <div
          className='trade-bulls_widget_icon'
          style={{ backgroundColor: bgColor }}
        >
          <img src={icon} style={{ width: "70px", padding: "15px" }} alt='' />
        </div>
      </div>
    </div>
  );
};
export default HomeCard;
