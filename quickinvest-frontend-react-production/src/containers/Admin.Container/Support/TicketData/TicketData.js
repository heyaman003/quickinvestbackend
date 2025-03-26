import React, { useEffect, useRef, useState } from "react";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import AdminTicketHistory from "./Table/AdminTicketHistory";
import Modal from "../../../../components/Admin/Modal/Modal";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useGetAllSupportAdminQuery } from "../../../../services/Admin.Support";
import { Notification } from "../../../../components/Admin/Notification/Notification";

const TicketData = () => {
  const [details, setDetails] = useState({});
  const showMessage = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };
  const { data, error } = useGetAllSupportAdminQuery();
  console.log({ error });
  useEffect(() => {
    if (error?.data?.message) {
      Notification(error?.data?.message, "error");
    }
  }, [error?.data?.message]);

  const [openModal, setOpenModal] = useState(false);
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalRef = useRef(null);
  const modalImageRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  const [filterData, setFilterData] = useState([]);

  return (
    <>
      <SectionCommonTable
        wrapperClassName="updateNews_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="All ticket creator"
        data={data?.data[0]?.history}
        setFilterData={setFilterData}
        table={
          <AdminTicketHistory
            data={filterData?.length > 0 ? filterData : data?.data[0]?.history}
            showImageDetails={showImageDetails}
            showMessage={showMessage}
          />
        }
      />
      <Modal
        openModal={openModalForImage}
        setOpenModal={setOpenModalForImage}
        modalTitle="Transaction Proof Image"
        modalRef={modalImageRef}
      >
        <div className="ss-trade_commol_modal_field">
          <div className="transaction_details" style={{ textAlign: "center" }}>
            <img
              style={{ width: "70%", margin: "10px auto" }}
              src={details?.image?.avatar}
              alt=""
            ></img>
          </div>
        </div>
      </Modal>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Message"
        modalRef={modalRef}
      >
        <div className="ss-trade_message_modal_field">
          <div className="message_details">
            <div className="message_group">
              <p>{details?.question}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TicketData;
