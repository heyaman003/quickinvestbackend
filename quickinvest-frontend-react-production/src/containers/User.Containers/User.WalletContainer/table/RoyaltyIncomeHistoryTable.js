import React from "react";
import CustomDataTable from "../../../../components/CustomDataTable";

const RoyaltyIncomeHistoryTable = ({
  data,
  pageNo,
  pagePerShow,
  setPagePerShow,
  setPageNo,
  isCustomPagination,
  totalData,
}) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 5 },
    { id: "userId", label: "User Id", minWidth: 50 },
    { id: "fullName", label: "Name", minWidth: 50 },
    { id: "amount", label: "Amount", minWidth: 50 },
    { id: "rank", label: "Rank", minWidth: 50 },
    { id: "incomeDay", label: "Day", minWidth: 50 },

    {
      id: "dateAndTime",
      label: "Date",
      minWidth: 100,
    },
  ];

  function createData(
    sn,
    userId,
    fullName,
    amount,
    rank,
    incomeDay,
    dateAndTime
  ) {
    return {
      sn,
      userId,
      fullName,
      amount,
      rank,
      incomeDay,
      dateAndTime,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      `₹${d?.amount}`,
      d?.rank,
      d?.incomeDay,
      d?.dateAndTime?.date
    )
  );

  return (
    <CustomDataTable
      columns={columns}
      rows={rows}
      perPageShow={10}
      tableHeight={640}
      className="common_table"
      pageNo={pageNo}
      pagePerShow={pagePerShow}
      setPageNo={setPageNo}
      setPagePerShow={setPagePerShow}
      isCustomPagination={isCustomPagination}
      totalData={totalData}
    />
  );
};

export default RoyaltyIncomeHistoryTable;
