import React, { useState } from "react";
import Button from "../components/Admin/Button/Button"; // Ensure this path is correct

const RankButtons = ({
  activeRank,
  time,
  handleRankClick,
  handleRankTypeClick,
}) => {
  //
  return (
    <>
      <div>
        <Button
          className="ss-trade_giftAllButton"
          type="button"
          onClick={() => {
            // setActiveRank("current-rank");
            handleRankTypeClick("current-rank");
          }}
          style={{
            backgroundColor: time === "current-rank" ? "blue" : "green",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            margin: "5px",
          }}
        >
          Current Rank
        </Button>
        <Button
          className="ss-trade_giftAllButton"
          type="button"
          onClick={() => {
            // setActiveRank("next-rank");
            handleRankTypeClick("next-rank");
          }}
          style={{
            backgroundColor: time === "next-rank" ? "blue" : "green",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            margin: "5px",
          }}
        >
          Next Rank
        </Button>
      </div>
      <div style={{ gap: "5px", display: "flex", flexWrap: "wrap" }}>
        {["VIP1", "VIP2", "VIP3", "VIP4", "VIP5", "VIP6", "VIP7", "VIP8"].map(
          (rankItem) => (
            <Button
              key={rankItem}
              type="button"
              onClick={() => handleRankClick(rankItem)}
              style={{
                backgroundColor: activeRank === rankItem ? "blue" : "green",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                margin: "5px",
              }}
            >
              {rankItem}
            </Button>
          )
        )}
      </div>
    </>
  );
};

export default RankButtons;
