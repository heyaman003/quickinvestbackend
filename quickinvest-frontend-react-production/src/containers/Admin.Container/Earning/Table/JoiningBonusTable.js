import React from "react";
import DataTable from "../../../../components/Admin/DataTable/DataTable";

const RoyaltyIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userId", label: "User Id", minWidth: 100 },
    { id: "fullName", label: "Name", minWidth: 100 },
  
    {
      id: "amount",
      label: "Amount",
      minWidth: 80,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 120,
    },
  ];

  function createData(
    sn,
    userId,
    fullName,
    amount,
    date
  ) {
    return {
      sn,
      userId,
      fullName,
      amount,
      date,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      "₹" + Number(d?.amount).toFixed(4),
      d?.date
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
