import React from "react";
import Button from "../../../../../components/Admin/Button/Button";
import DataTable from "../../../../../components/Admin/DataTable/DataTable";

const columns = [
  { id: "sn", label: "S.N", minWidth: 20 },
  { id: "userId", label: "User ID", minWidth: 100 },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 120,
  },
  {
    id: "sponsorId",
    label: "Sponsor ID",
    minWidth: 80,
  },
  {
    id: "totalInvestmentAmount",
    label: "Self Investment",
    minWidth: 80,
  },
  {
    id: "mobile",
    label: "Mobile",
    minWidth: 80,
  },
  // {
  //   id: "email",
  //   label: "Email",
  //   minWidth: 100,
  // },
  {
    id: "joiningDate",
    label: "Joining Date",
    minWidth: 120,
  },
  {
    id: "activationDate",
    label: "Activation Date",
    minWidth: 120,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 80,
  },
];

const ActiveMemberTable = ({ data, editHandler, blockHandler }) => {
  function createData(
    sn,
    userId,
    fullName,
    sponsorId,
    totalInvestmentAmount,
    mobile,

    joiningDate,
    activationDate,
    action
  ) {
    return {
      sn,
      userId,
      fullName,
      sponsorId,
      totalInvestmentAmount,
      mobile,

      joiningDate,
      activationDate,
      action,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.fullName,
      d?.sponsorId,
      d?.totalInvestmentAmount ? "₹" + d?.totalInvestmentAmount : "0",
      d?.mobile,
      // d?.email,
      d?.joiningDate,
      d?.activationDate ? d?.activationDate : "--",
      <p style={{ display: "flex" }}>
        <Button
          type="button"
          onClick={() => editHandler(d)}
          style={{
            marginRight: "5px",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            color: d?.userStatus ? "white" : "#c6c6c6",
            cursor: d?.userStatus ? "pointer" : "no-drop",
            backgroundColor: d?.userStatus
              ? "rgb(41 156 13)"
              : "rgb(152 147 147)",
          }}
        >
          Edit
        </Button>
        <Button
          type="button"
          onClick={() => blockHandler(d)}
          style={{
            marginRight: "5px",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            color: d?.userStatus ? "white" : "#c6c6c6",
            cursor: d?.userStatus ? "pointer" : "no-drop",
            backgroundColor: d?.userStatus
              ? "rgb(254 0 0)"
              : "rgb(152 147 147)",
          }}
          disabled={d?.userStatus ? false : true}
        >
          {d?.userStatus ? "Block" : "Blocked"}
        </Button>
      </p>
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

export default ActiveMemberTable;
