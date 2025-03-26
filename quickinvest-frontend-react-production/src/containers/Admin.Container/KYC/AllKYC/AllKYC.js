import React, { useRef, useState } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import AllKYCTable from "./Table/AllKYCTable";
import Modal from "../../../../components/Admin/Modal/Modal";
import { useClickOutside } from "../../../../hooks/useClickOutside";

const AllKYC = () => {
  let allKyc;
  let kycFetching;
  const [details, setDetails] = useState({});
  const [filterData, setFilterData] = useState([]);
  /* image modal */
  const [openModalForImage, setOpenModalForImage] = useState(false);
  const modalImageRef = useRef(null);
  useClickOutside(modalImageRef, () => setOpenModalForImage(false));
  const showImageDetails = (body) => {
    setDetails(body);
    setOpenModalForImage(true);
  };

  // const [
  //   updateKYCStatus,
  //   { data: updateKYCResponse, error: kycUpdateError },
  // ] = useUpdateKycMutation();
  let updateKYCResponse;
  let kycUpdateError;
  let updateKYCStatus;

  // useEffect(() => {
  //   if (updateKYCResponse?.message) {
  //     Notification(updateKYCResponse?.message, "success");
  //   } else {
  //     Notification(kycUpdateError?.data?.message, "error");
  //   }
  // }, [kycUpdateError, updateKYCResponse]);

  // const statusChange = async (status, userId) => {
  //   const statusChanges = {
  //     userId: userId,
  //     status: status,
  //   };

  //   await updateKYCStatus(statusChanges);
  // };

  if (kycFetching) {
    return <Loading />;
  }

  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All KYC (${allKyc?.data?.length})`}
        data={allKyc?.data}
        setFilterData={setFilterData}
        table={
          <AllKYCTable
            data={filterData?.length > 0 ? filterData : allKyc?.data}
            showImageDetails={showImageDetails}
            // statusChange={statusChange}
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

export default AllKYC;
