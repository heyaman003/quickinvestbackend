import React from "react";
import CustomDataTable from "../../../../components/CustomDataTable";

const DirectIncomeHistoryTable = ({
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
    { id: "incomeFrom", label: "Income From", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 20 },
    {
      id: "level",
      label: "Level",
      minWidth: 10,
    },
    {
      id: "rechargeAmount",
      label: "Recharge Amount",
      minWidth: 10,
    },
    {
      id: "amount",
      label: "Amount",
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
    incomeFrom,
    name,
    level,
    rechargeAmount,
    amount,
    dateAndTime
  ) {
    return { sn, incomeFrom, name, level, rechargeAmount, amount, dateAndTime };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.incomeFrom?.userId,
      d?.incomeFrom?.fullName,
      d?.incomeFrom?.level,
      d?.rechargeAmount,
      d?.amount,
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
      totalData={totalData}
      isCustomPagination={isCustomPagination}
    />
  );
};

export default DirectIncomeHistoryTable;
