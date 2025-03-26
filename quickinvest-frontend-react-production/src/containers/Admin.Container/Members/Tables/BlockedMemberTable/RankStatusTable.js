import React from "react";
import PaginationTable from "../../../../../components/Admin/TablePagination";

const columns = [
  { id: "sn", label: "S.N", minWidth: 20 },
  { id: "userId", label: "User ID", minWidth: 100 },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 120,
  },
  {
    id: "currentRank",
    label: "Current Rank",
    minWidth: 80,
  },
  {
    id: "nextRank",
    label: "Next Rank",
    minWidth: 80,
  },
  {
    id: "totalTeamBusiness",
    label: "Current Team Business",
    minWidth: 80,
  },

  {
    id: "totalRequiredBusiness",
    label: "Required Business",
    minWidth: 120,
  },
];

const RankStatusTable = ({
  data,
  editHandler,
  blockHandler,
  totalData,
  totalItems,
  date,
  searchId,
  pageNo,
  pagePerShow,
  setPagePerShow,
  setPageNo,
  isCustomPagination,
}) => {
  console.log("my data", data);
  function createData(
    sn,
    userId,
    fullName,
    currentRank,
    nextRank,
    totalTeamBusiness,
    totalRequiredBusiness
  ) {
    return {
      sn,
      userId,
      fullName,
      currentRank,
      nextRank,
      totalTeamBusiness,
      totalRequiredBusiness,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      (totalItems?.page - 1) * pagePerShow + (index + 1),
      d?.userInfo?.userId,
      d?.userInfo?.fullName,
      d?.userInfo?.royaltyRank?.currentRank,
      d?.userInfo?.royaltyRank?.nextRank?.rank,
      d?.totalTeamBusiness,
      d?.totalRequiredBusiness
    )
  );
  return (
    <PaginationTable
      columns={columns}
      rows={rows}
      perPageShow={pagePerShow}
      tableHeight={640}
      className="common_table"
      data={totalItems}
      totalData={totalData}
      date={date}
      searchId={searchId}
      pageNo={pageNo}
      setPageNo={setPageNo}
      setPagePerShow={setPagePerShow}
      pagePerShow={pagePerShow}
      isCustomPagination={isCustomPagination}
    />
  );
};

export default RankStatusTable;
