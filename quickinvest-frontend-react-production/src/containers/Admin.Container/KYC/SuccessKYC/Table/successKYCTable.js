import React from "react";
import DataTable from "../../../../../components/Admin/DataTable/DataTable";
const SuccessKYCTable = ({
  data,
  showPaymentMethodDetails,
  showImageDetails,
}) => {
  const columns = [
    { id: "sn", label: "S.N", minWidth: 20 },
    { id: "userId", label: "Username", minWidth: 50 },
    { id: "submissionDate", label: "Submission Date", minWidth: 50 },
    { id: "kycMethod", label: "KYC Method", minWidth: 50 },
    { id: "cardNumber", label: "Card Number", minWidth: 50 },
    { id: "frontSide", label: "Front Side", minWidth: 50 },
    { id: "backSide", label: "Back Side", minWidth: 50 },
  ];
  function createData(
    sn,
    userId,
    submissionDate,
    kycMethod,
    cardNumber,
    frontSide,
    backSide
  ) {
    return {
      sn,
      userId,
      submissionDate,
      kycMethod,
      cardNumber,
      frontSide,
      backSide,
    };
  }

  const rows =
    data &&
    data?.map((d, i) =>
      
      createData(
        i + 1,
        d?.userId,
        new Date(d?.submission_date).toDateString(),
        <span>{d?.kyc_method}</span>,
        <p>{d?.card_number}</p>,
        <span
          onClick={() => showImageDetails({ proof: d?.front_side })}
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          {d?.front_side ? (
            <img
              style={{ width: "30px", height: "30px" }}
              src={d?.front_side}
              alt=""
            ></img>
          ) : (
            "N/A"
          )}
        </span>,
        <span
          onClick={() => showImageDetails({ proof: d?.back_side })}
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
        >
          {d?.back_side ? (
            <img
              style={{ width: "30px", height: "30px" }}
              src={d?.back_side}
              alt=""
            ></img>
          ) : (
            "N/A"
          )}
        </span>
      )
    );
  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        perPageShow={10}
        tableHeight={590}
        className="common_table"
      />
    </>
  );
};

export default SuccessKYCTable;
