import React from "react";
import CustomDataTable from "../../../../components/CustomDataTable";

const RechargeHistoryTable = ({
  data,
  pageNo,
  pagePerShow,
  setPagePerShow,
  setPageNo,
  totalData,
  isCustomPagination,
}) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 5 },
    { id: "amount", label: "Amount", minWidth: 50 },
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
    {
      id: "status",
      label: "Status",
      minWidth: 100,
    },
  ];

  function createData(
    sn,
    amount,
    rcType,
    paidDay,
    leftDays,
    totalDays,
    dateAndTime,
    status
  ) {
    return {
      sn,
      amount,
      rcType,
      paidDay,
      leftDays,
      totalDays,
      dateAndTime,
      status,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      "₹" + d?.amount,
      d?.rechargeType,
      d?.paidDays,
      d?.leftDays,
      d?.totalDays,
      d?.dateAndTime?.date,
      d?.status
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
      totalData={totalData}
      isCustomPagination={isCustomPagination}
    />
  );
};

export default RechargeHistoryTable;
