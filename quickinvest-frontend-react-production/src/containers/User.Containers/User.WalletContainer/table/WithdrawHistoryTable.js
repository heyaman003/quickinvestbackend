import React from "react";
import CustomDataTable from "../../../../components/CustomDataTable";

const WithdrawHistoryTable = ({
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
    { id: "amount", label: "Amount", minWidth: 30 },
    { id: "charge", label: "Charge", minWidth: 50 },
    {
      id: "afterChargeAmount",
      label: "After Charge",
      minWidth: 5,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 50,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 50,
    },
  ];

  function createData(sn, amount, charge, afterChargeAmount, date, status) {
    return { sn, amount, charge, afterChargeAmount, date, status };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.requestAmount,
      `${d?.withdrawCharge}%`,
      d?.amountAfterCharge,
      d?.date,
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

export default WithdrawHistoryTable;
