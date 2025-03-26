import React from "react";
import CustomDataTable from "../../../../components/CustomDataTable";

const TeamTable = ({
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
    { id: "userId", label: "User ID", minWidth: 30 },
    { id: "name", label: "Name", minWidth: 50 },
    {
      id: "level",
      label: "Level",
      minWidth: 5,
    },
    {
      id: "activationDate",
      label: "Activation Date",
      minWidth: 5,
    },
    {
      id: "date",
      label: "Join Date",
      minWidth: 50,
    },
  ];

  function createData(sn, userId, name, level, activationDate, date) {
    return { sn, userId, name, level, activationDate, date };
  }

  const rows = data?.map((d, i) =>
    createData(
      i + 1,
      d?.level?.userId,
      d?.level?.fullName,
      d?.level?.level,
      d?.level?.activationDate ? d?.level?.activationDate : "N/A",
      d?.level?.joiningDate
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

export default TeamTable;
