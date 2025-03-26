import React, { useEffect, useRef, useState } from "react";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import AllDepositTable from "../Table/AllDepositTable";
import Modal from "../../../../components/Admin/Modal/Modal";
import Loading from "../../../../components/Admin/Loading/Loading";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import {
  useGetAllRechargeHistoryQuery,
  useUpdateRechargeStatusMutation,
} from "../../../../services/AdminRecharge";
import { Notification } from "../../../../components/ToastNotification";

const AllTransaction = () => {
  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalImageRef = useRef(null);
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  // get all deposit history
  const { data, isloadingRecharge, error, refetch } =
    useGetAllRechargeHistoryQuery();

  const [
    updateRechargeStatus,
    { data: updateRechargeData, error: updateRechargeError },
  ] = useUpdateRechargeStatusMutation();

  let isLoadingAllDepositHistory;
  // status change
  // const [statusDepo, { data: statusData, error: statusError }] =
  //   useEditDepositStatusMutation();
  useEffect(() => {
    if (updateRechargeData?.message) {
      Notification(updateRechargeData?.message, "success");
    } else {
      Notification(updateRechargeError?.data?.message, "error");
    }
  }, [updateRechargeError, updateRechargeData]);
  const statusChange = async (status, id) => {
    const statusChanges = {
      transaction_id: id,
      status: status,
    };
    await updateRechargeStatus(statusChanges);
  };
  const [filterData, setFilterData] = useState([]);

  filterData?.sort((a, b) => {
    // Convert date strings to Date objects for proper comparison
    const dateA = new Date(
      a.date + " " + (a.time && a.time.time ? a.time.time : "")
    );
    const dateB = new Date(
      b.date + " " + (b.time && b.time.time ? b.time.time : "")
    );

    // Compare dates in descending order
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      // If dates are equal, compare times in descending order
      const timeA = new Date(
        "1970-01-01 " + (a.time && a.time.time ? a.time.time : "")
      );
      const timeB = new Date(
        "1970-01-01 " + (b.time && b.time.time ? b.time.time : "")
      );

      return timeA > timeB ? -1 : timeA < timeB ? 1 : 0;
    }
  });

  // console.log(sortedArray);


  if (isLoadingAllDepositHistory) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All Recharge History (${
          filterData?.length > 0
            ? filterData?.length
            : data?.data?.docs?.length ?? "0"
        })`}
        data={data?.data?.docs}
        setFilterData={setFilterData}
        refetch={refetch}
        table={
          <AllDepositTable
            data={filterData.length > 0 ? filterData : data?.data?.docs}
            showDetails={showDetails}
            showImageDetails={showImageDetails}
            statusChange={statusChange}
          />
        }
      />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Transaction Details"
        modalRef={modalRef}
      >
        <div className="ss-trade_commol_modal_field">
          <div className="transaction_details">
            <p>
              <strong>Payment Method: </strong>
              <span> {details?.payment_method}</span>
            </p>
            {details?.payment_method === "Paytm" && (
              <p>
                <strong>Paytm account No:</strong>{" "}
                <span>{details?.receiving_wallet?.account_no}</span>
              </p>
            )}
            {details?.payment_method === "TRX" && (
              <p>
                <strong>Trx account No:</strong>
                <span>{details?.receiving_wallet?.trx}</span>
              </p>
            )}
            {details?.payment_method === "UPI" && (
              <>
                <p>
                  <strong>UPI account No:</strong>{" "}
                  <span>{details?.receiving_wallet?.account_no}</span>
                </p>
              </>
            )}
            {details?.payment_method === "Bank" && (
              <>
                <p>
                  <strong>Bank Name:</strong>{" "}
                  <span>{details?.receiving_wallet?.bank_name}</span>
                </p>
                <p>
                  <strong>Bank account Number:</strong>{" "}
                  <span>{details?.receiving_wallet?.account}</span>
                </p>
                <p>
                  <strong>IFSC Code:</strong>{" "}
                  <span>{details?.receiving_wallet?.ifsc_code}</span>
                </p>
                <p>
                  <strong>Bank account Holder Name:</strong>{" "}
                  <span>{details?.receiving_wallet?.account_name}</span>
                </p>
              </>
            )}
            <hr
              style={{
                backgroundColor: "#7013ad",
                margin: "8px 0px",
                height: "2px",
              }}
            />
            <p>
              <strong>Deposit Amount: </strong>
              <span>₹{details?.amount?.toFixed(4)}</span>
            </p>
            <p>
              <strong>Date: </strong>
              <span>{details?.dateAndTime?.date}</span>
            </p>
            <p>
              <strong>Time: </strong>
              <span>{details?.dateAndTime?.time}</span>
            </p>
            <p>
              <strong>Status: </strong>{" "}
              <span
                style={{
                  textTransform: "capitalize",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  backgroundColor:
                    details?.status === "pending"
                      ? "rgba(255,189,90,.2)"
                      : details?.status === "success"
                      ? "rgba(28,213,174,.2)"
                      : "rgba(247,79,117,.2)",
                  color:
                    details?.status === "pending"
                      ? "#ffc107"
                      : details?.status === "success"
                      ? "#38cab3"
                      : "#f74f75",
                }}
              >
                {details?.status}
              </span>
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        openModal={openModalForImage}
        setOpenModal={setOpenModalForImage}
        modalTitle="Transaction Proof Image"
        modalRef={modalImageRef}
      >
        <div className="ss-trade_commol_modal_field">
          <div className="transaction_details" style={{ textAlign: "center" }}>
            <img
              style={{ width: "70%", margin: "20px auto" }}
              src={details?.proof?.url}
              alt=""
            ></img>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllTransaction;
