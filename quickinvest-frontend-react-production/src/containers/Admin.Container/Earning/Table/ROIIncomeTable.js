import React from "react";
import DataTable from "../../../../components/Admin/DataTable/DataTable";

const ROIIncomeTable = ({ data, showDetails }) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userid", label: "User ID", minWidth: 100 },
    { id: "fullName", label: "Name", minWidth: 100 },
    { id: "currentRechargeAmount", label: "Recharge Amount", minWidth: 100 },
    { id: "rechargeType", label: "Recharge Type", minWidth: 100 },
    {
      id: "paidDays",
      label: "Paid Days",
      minWidth: 80,
    },
    {
      id: "leftDays",
      label: "Left Days",
      minWidth: 80,
    },
    {
      id: "totalDays",
      label: "Total Days",
      minWidth: 80,
    },
    {
      id: "perDayAmount",
      label: "Per Day Amount",
      minWidth: 80,
    },
    {
      id: "percentagePerDay",
      label: "Percentage",
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
    userid,
    fullName,
    currentRechargeAmount,
    rechargeType,
    paidDays,
    leftDays,
    totalDays,
    perDayAmount,
    percentagePerDay,
    dateAndTime
  ) {
    return {
      sn,
      userid,
      fullName,
      currentRechargeAmount,
      rechargeType,
      paidDays,
      leftDays,
      totalDays,
      perDayAmount,
      percentagePerDay,
      dateAndTime,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      d?.currentRechargeAmount,
      d?.rechargeType,
      d?.paidDays,
      d?.leftDays,
      d?.totalDays,
      d?.perDayAmount,
      d?.percentagePerDay,
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

export default ROIIncomeTable;
