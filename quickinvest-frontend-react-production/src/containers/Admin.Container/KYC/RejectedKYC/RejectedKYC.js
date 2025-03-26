import React, { useRef, useState } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import RejectedKYCTable from "./Table/rejectedKYCTable";
import Modal from "../../../../components/Admin/Modal/Modal";
import { useClickOutside } from "../../../../hooks/useClickOutside";

const RejectedKYC = () => {
  let rejectedKyc;
  let kycLoading;
  let kycFetching;
  const [filterData, setFilterData] = useState([]);

  /* modal section */
  const [details, setDetails] = useState({});

  /* image modal  */
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalImageRef = useRef(null);
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };

  if (kycFetching || kycLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Rejected KYC (${
          filterData?.length || rejectedKyc?.data?.length
        })`}
        data={rejectedKyc?.data}
        setFilterData={setFilterData}
        table={
          <RejectedKYCTable
            data={filterData || rejectedKyc?.data}
            showImageDetails={showImageDetails}
          />
        }
      />
      <Modal
        openModal={openModalForImage}
        setOpenModal={setOpenModalForImage}
        modalTitle="KYC Image"
        modalRef={modalImageRef}
      >
        <div className="tp_commol_modal_field">
          <div className="transaction_details" style={{ textAlign: "center" }}>
            <img
              style={{ width: "80%", margin: "20px auto" }}
              src={details?.proof}
              alt=""
            ></img>
          </div>
        </div>
      </Modal>{" "}
    </>
  );
};

export default RejectedKYC;
