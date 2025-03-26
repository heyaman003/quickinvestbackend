import React from "react";
import DataTable from "../../../../components/Admin/DataTable/DataTable";

const DirectIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },

    { id: "userId", label: "User Id", minWidth: 100 },
    { id: "fullName", label: "Name", minWidth: 100 },
    { id: "incomeFrom", label: "Income From User ID", minWidth: 100 },
    { id: "rechargeAmount", label: "Recharge Amount", minWidth: 100 },
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
    incomeFrom,
    rechargeAmount,
    amount,
    dateAndTime
  ) {
    return {
      sn,
      userId,
      fullName,
      incomeFrom,
      rechargeAmount,
      amount,
      dateAndTime,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      d?.incomeFrom.userId,
      d?.rechargeAmount,
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

export default DirectIncomeTable;
