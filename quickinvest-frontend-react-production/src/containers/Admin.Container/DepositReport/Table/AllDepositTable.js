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
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
  {
    id: "rechargeType",
    label: "Recharge Type",
    minWidth: 100,
  },
  {
    id: "dateAndTime",
    label: "Date",
    minWidth: 120,
  },
  {
    id: "proof",
    label: "Transaction Proof",
    minWidth: 120,
  },
  {
    id: "transaction_id",
    label: "Transaction ID",
    minWidth: 100,
  },

  {
    id: "action",
    label: "Action",
    minWidth: 80,
  },
];

const AllDepositTable = ({
  data,
  showDetails,
  showImageDetails,
  statusChange,
}) => {
  function createData(
    sr,
    userId,
    fullName,
    amount,
    rechargeType,
    dateAndTime,
    proof,
    transaction_id,

    action
  ) {
    return {
      sr,
      userId,
      fullName,
      amount,
      rechargeType,
      dateAndTime,
      proof,
      transaction_id,

      action,
    };
  }

  const rows = data?.map((d, index) =>
    createData(
      index + 1,
      d?.userId,
      d?.fullName,
      "₹" + parseInt(Number(d?.amount))?.toFixed(4),
      // parseInt(d?.amount * 17)?.toFixed(3),
      d?.rechargeType,
      new Date(d?.dateAndTime?.date).toDateString(),
      <span
        onClick={() => showImageDetails(d)}
        style={{
          userSelect: "none",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        <img
          style={{ width: "30px", height: "30px" }}
          src={d?.proof?.url}
          alt=""
        ></img>
      </span>,
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
      // d?.hash,
      // <>
      //   {d?.hash?.length > 0 ? (
      //     <a
      //       href={`https://bscscan.com/tx/${d?.hash}`}
      //       target='_blank'
      //       rel='noreferrer'
      //       style={{
      //         userSelect: "none",
      //         cursor: "pointer",
      //         textDecoration: "underline",
      //         color: `var(--text-p-color)`,
      //       }}
      //     >
      //       {d?.hash}
      //     </a>
      //   ) : (
      //     "N/A"
      //   )}
      // </>,
      <span>
        <select
          name="status"
          style={{
            border: "none",
            outline: "none",
            padding: "5px 8px",
            borderRadius: "5px",
            textTransform: "capitalize",
            backgroundColor:
              d.status === "pending"
                ? "rgba(255,189,90,.2)"
                : d.status === "succeed"
                ? "rgba(28,213,174,.2)"
                : "rgba(247,79,117,.2)",
            color:
              d.status === "pending"
                ? "#ffc107"
                : d.status === "succeed"
                ? "#38cab3"
                : "#f74f75",
          }}
          value={d.status}
          onChange={(e) => statusChange(e.target.value, d?.transactionId)}
        >
          <option value="pending">pending</option>
          <option value="succeed">success</option>
          <option value="rejected">reject</option>
        </select>
      </span>
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

export default AllDepositTable;
