import React from "react";

const SectionLayout = ({
  sectionTitle,
  table,
  sectionClassName,
  isFilterRightSection,
  isLevelFilter,
  handleSearch,
}) => {
  return (
    <>
      <div className={`tb__sectionLayout ${sectionClassName ?? ""}`}>
        <div className="tb__sectionLayout__title">
          <h2 style={{ color: "#FFC100" }}>{sectionTitle}</h2>
          {isFilterRightSection && (
            <div className="tb___sectionLayout__right">
              <input
                type="search"
                name="search"
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
          )}
        </div>
        {isLevelFilter && (
          <div className="tb__teamFilter__row">
            <button>Level 1</button>
            <button>Level 2</button>
          </div>
        )}

        <div className="tb__sectionlayout__table">{table}</div>
      </div>
    </>
  );
};

export default SectionLayout;
