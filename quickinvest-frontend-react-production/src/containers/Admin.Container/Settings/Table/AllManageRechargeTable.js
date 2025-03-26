import React from "react";
import DataTable from "../../../../components/Admin/DataTable/DataTable";

const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  { id: "userId", label: "User ID", minWidth: 50 },
  {
    id: "fullName",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "withdrawPending",
    label: "Withdraw Pending",
    minWidth: 100,
  },
  {
    id: "mainBlanch",
    label: "Main Blanch",
    minWidth: 100,
  },
  {
    id: "totalBlanch",
    label: "Total Blanch",
    minWidth: 100,
  },
];

const AllManageRechargeTable = ({
  data,
  showDetails,
  showImageDetails,
  statusChange,
}) => {
  function createData(
    sr,
    userId,
    fullName,
    withdrawPending,
    mainBlanch,
    totalBlanch
  ) {
    return {
      sr,
      userId,
      fullName,
      withdrawPending,
      mainBlanch,
      totalBlanch,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.fullName,
      "₹" + parseInt(Number(d?.withdrawPending))?.toFixed(4),
      "₹" + parseInt(Number(d?.mainBlanch))?.toFixed(4),
      "₹" + parseInt(Number(d?.totalBlanch))?.toFixed(4)
    )
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={8}
      tableHeight={610}
      className="common_table"
    />
  );
};

export default AllManageRechargeTable;
