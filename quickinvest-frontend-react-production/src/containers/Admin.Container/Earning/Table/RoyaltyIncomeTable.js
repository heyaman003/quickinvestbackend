import React from "react";
import DataTable from "../../../../components/Admin/DataTable/DataTable";

const RoyaltyIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userId", label: "User Id", minWidth: 100 },
    { id: "fullName", label: "Name", minWidth: 100 },
    { id: "rank", label: "Rank", minWidth: 100 },
    { id: "incomeDay", label: "Income Day", minWidth: 100 },
    {
      id: "amount",
      label: "Amount",
      minWidth: 80,
    },
    {
      id: "dateAndTime",
      label: "Date",
      minWidth: 120,
    },
  ];

  function createData(
    sn,
    userId,
    fullName,

    rank,
    incomeDay,
    amount,
    dateAndTime
  ) {
    return {
      sn,
      userId,
      fullName,
      rank,
      incomeDay,
      amount,
      dateAndTime,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      d?.rank,
      d?.incomeDay,
      "₹" + Number(d?.amount).toFixed(4),
      d?.dateAndTime?.date
    )
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={6}
      tableHeight={440}
      className="common_table"
    />
  );
};

export default RoyaltyIncomeTable;
