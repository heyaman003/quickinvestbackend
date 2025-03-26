import React from "react";
import CustomDataTable from "../../../../components/CustomDataTable";

const RewardHistoryTable = ({
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
    { id: "amount", label: "Package", minWidth: 50 },
    { id: "reward", label: "Reward", minWidth: 50 },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
    },
  ];

  function createData(
    sn,
    userId,
    fullName,
    amount,
    reward,
    date
  ) {
    return {
      sn,
      userId,
      fullName,
      amount,
      reward,
     date,
    };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.userId,
      d?.fullName,
      `₹${d?.amount}`,
      d?.reward,
     d?.date
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

export default RewardHistoryTable;
