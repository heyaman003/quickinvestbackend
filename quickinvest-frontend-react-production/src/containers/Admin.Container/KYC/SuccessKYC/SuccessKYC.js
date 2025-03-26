import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import SuccessKYCTable from "./Table/successKYCTable";
import Modal from "../../../../components/Admin/Modal/Modal";
import { useClickOutside } from "../../../../hooks/useClickOutside";

const SuccessKYC = () => {
  let successKyc;
  let kycLoading;
  let kycFetching;
  const [successfulData, setSuccessfulData] = useState([]);

  useEffect(() => {
    setSuccessfulData(
      successKyc?.data?.filter((kyc) => kyc?.status === "success")
    );
  }, [successKyc]);

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
        sectionTableTitle={`Successful KYC (${successfulData?.length})`}
        data={successfulData}
        setFilterData={setFilterData}
        table={
          <SuccessKYCTable
            data={filterData?.length > 0 ? filterData : successfulData}
            showImageDetails={showImageDetails}
          />
        }
      />{" "}
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

export default SuccessKYC;
