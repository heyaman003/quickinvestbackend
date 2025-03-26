import React from "react";
import CustomDataTable from "../../../../components/CustomDataTable";

const RoiHistoryTable = ({
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
    { id: "currentRechargeAmount", label: "Recharge", minWidth: 50 },
    { id: "perDayAmount", label: "Amount", minWidth: 50 },
    { id: "rcType", label: "RC Type", minWidth: 20 },
    {
      id: "paidDay",
      label: "Paid Days",
      minWidth: 10,
    },
    {
      id: "leftDays",
      label: "Left Days",
      minWidth: 10,
    },
    {
      id: "totalDays",
      label: "Total Days",
      minWidth: 10,
    },
    {
      id: "dateAndTime",
      label: "Date",
      minWidth: 100,
    },
  ];

  function createData(
    sn,
    currentRechargeAmount,
    perDayAmount,
    rcType,
    paidDay,
    leftDays,
    totalDays,
    dateAndTime
  ) {
    return {
      sn,
      currentRechargeAmount,
      perDayAmount,
      rcType,
      paidDay,
      leftDays,
      totalDays,
      dateAndTime,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.currentRechargeAmount,
      d?.perDayAmount.toFixed(2),
      d?.rechargeType,
      d?.paidDays,
      d?.leftDays,
      d?.totalDays,
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

export default RoiHistoryTable;
