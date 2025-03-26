import React, { useEffect, useRef, useState } from "react";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import Modal from "../../../../components/Admin/Modal/Modal";
import AdminContactHistory from "./Table/AdminContactHistory";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useGetAllContactUsAdminQuery } from "../../../../services/Admin.Support";
import { Notification } from "../../../../components/Admin/Notification/Notification";
import Loading from "../../../../components/Admin/Loading/Loading";

const ContactUs = () => {
  const { data, loading, error } = useGetAllContactUsAdminQuery();
  console.log({ error });
  useEffect(() => {
    if (error?.data?.message) {
      Notification(error?.data?.message, "error");
    } else if (loading) {
      <Loading />;
    }
  }, [error?.data?.message, loading]);
  console.log("data here :", data);
  const [details, setDetails] = useState({});
  const showMessage = (body) => {
    setDetails(body);
    setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [filterData, setFilterData] = useState([]);
  return (
    <>
      <SectionCommonTable
        wrapperClassName="updateNews_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle="ALL Contact Us Messages"
        data={data && data[0]?.history}
        setFilterData={setFilterData}
        table={
          <AdminContactHistory
            data={
              filterData?.length > 0 ? filterData : data && data[0]?.history
            }
            showMessage={showMessage}
          />
        }
      />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Message"
        modalRef={modalRef}
      >
        <div className="ss-trade_message_modal_field">
          <div className="message_details">
            <div className="message_group">
              <p>{details?.message}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactUs;
