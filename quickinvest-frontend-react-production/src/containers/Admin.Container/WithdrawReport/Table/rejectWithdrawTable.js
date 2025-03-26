import React from "react";
import DataTable from "../../../../components/Admin/DataTable/DataTable";


const columns = [
  { id: "sr", label: "Sr.", minWidth: 20 },
  { id: "userId", label: "User ID", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 120,
  },
  {
    id: "request_amount",
    label: "Request Amount",
    minWidth: 110,
  },
  {
    id: "after_charge",
    label: "After Charge",
    minWidth: 110,
  },
  {
    id: "withdrawCharge",
    label: "Withdraw Charge",
    minWidth: 110,
  },
  {
    id: "current_balance",
    label: "Current Balance",
    minWidth: 110,
  },
  {
    id: "transaction_id",
    label: "Transaction ID",
    minWidth: 110,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },
];

const RejectWithdrawTable = ({ data, showDetails }) => {
  function createData(
    sr,
    userId,
    date,
    request_amount,
    after_charge,
    withdrawCharge,
    current_balance,
    transaction_id,
    status
  ) {
    return {
      sr,
      userId,
      date,
      request_amount,
      after_charge,
      withdrawCharge,
      current_balance,
      transaction_id,
      status,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.date,
      "₹" + parseFloat(d?.requestAmount)?.toFixed(4),
      "₹" + parseFloat(d?.amountAfterCharge)?.toFixed(4),
      d?.withdrawCharge + "%",
      "₹" + parseFloat(d?.currentAmount)?.toFixed(4),
      <span
        onClick={() => showDetails(d)}
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {d?.transactionId}
      </span>,
      <span
        style={{
          border: "none",
          outline: "none",
          padding: "5px 8px",
          borderRadius: "5px",
          textTransform: "capitalize",
          backgroundColor: "rgba(247,79,117,.2)",
          color: "#f74f75",
        }}
      >
        {d?.status}
      </span>
    )
  );
  return (
    <DataTable
      columns={columns}
      rows={rows}
      perPageShow={6}
      tableHeight={440}
      className='common_table'
    />
  );
};

export default RejectWithdrawTable;
