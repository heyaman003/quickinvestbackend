import React, { useEffect, useState } from "react";
import "./LevelTeamFilter.scss";

const LevelTeamFilter = ({ setAllTeamSearch, dataTeam }) => {
  const [levelClick, setLevelClick] = useState(0);
  const handleClick = (n) => {
    if (levelClick === n) {
      setLevelClick(0);
    } else {
      setLevelClick(n);
    }
  };

  useEffect(() => {
    const newTeam = dataTeam?.filter((team) => {
      if (levelClick === 0) {
        return team;
      } else {
        return team?.level == levelClick;
      }
    });
    setAllTeamSearch(newTeam);
  }, [dataTeam, levelClick]);

  var levelCount = [];
  for (var i = 0, l = dataTeam.length; i < l; i++)
    if (levelCount.indexOf(dataTeam[i]?.level) === -1 && dataTeam[i]?.level !== "")
    levelCount.push(dataTeam[i]?.level);
    levelCount.sort((a,b)=>a-b)

  return (
    <>
      <div className="search_by_button">
        {levelCount?.map((levelNo) => (
          <button
            className={`btn green ${levelClick == levelNo ? "active-btn" : ""}`}
            onClick={() => handleClick(levelNo)}
            key={levelNo}
          >
            level: {levelNo}
          </button>
        ))}
      </div>
    </>
  );
};

export default LevelTeamFilter;
