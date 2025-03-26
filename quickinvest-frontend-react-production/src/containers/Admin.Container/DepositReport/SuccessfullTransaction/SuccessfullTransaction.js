import React, { useRef, useState } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import SuccessDepositTable from "../Table/SuccessDepositTable";
import Modal from "../../../../components/Admin/Modal/Modal";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useGetAllSuccessRechargeQuery } from "../../../../services/AdminRecharge";

const SuccessfulTransaction = () => {
  let isLoadingCompleteDepositHistory;

  const [details, setDetails] = useState({});
  const showDetails = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));

  const { data, error } = useGetAllSuccessRechargeQuery();
  // console.log({ data });
  // console.log({ error });
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

  if (isLoadingCompleteDepositHistory) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Success Recharge History (${
          filterData?.length > 0
            ? filterData?.length
            : data?.data?.docs?.length ?? 0
        })`}
        data={data?.data?.docs}
        setFilterData={setFilterData}
        table={
          <SuccessDepositTable
            data={filterData?.length > 0 ? filterData : data?.data?.docs}
            showDetails={showDetails}
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
            <div className="group">
              <p>
                <strong>User Id:</strong> <span>{details.userId}</span>
              </p>
              <p>
                <strong>Transfer Via:</strong>{" "}
                <span
                  style={{
                    backgroundColor: "rgba(255,189,90,.2)",
                    color: "#ffc107",
                  }}
                >
                  Admin
                </span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Date:</strong> <span>{details?.date}</span>
              </p>
              <p>
                <strong>Time:</strong> <span>{details?.time}&nbsp;(IST)</span>
              </p>
            </div>
            <div className="group">
              <p>
                <strong>Amount:</strong> <span>${details.amount}</span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                    backgroundColor:
                      details.status === "pending"
                        ? "rgba(255,189,90,.2)"
                        : details.status === "succeed"
                        ? "rgba(28,213,174,.2)"
                        : "rgba(247,79,117,.2)",
                    color:
                      details.status === "pending"
                        ? "#ffc107"
                        : details.status === "succeed"
                        ? "#38cab3"
                        : "#f74f75",
                  }}
                >
                  {details.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SuccessfulTransaction;
