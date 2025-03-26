import React, { useRef, useState } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import ROIIncomeTable from "../Table/ROIIncomeTable";
import TransactionModal from "../../../../components/TransactionModal/TransactionModal";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useGetROIIncomeHistoryQuery } from "../../../../services/Admin.Earning";

const ProfitShare = () => {
  const { data, isLoading } = useGetROIIncomeHistoryQuery();
 console.log({data})
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };
  const modalData = {
    fullName: values?.fullName,
    userid: values?.userId,
    amount: "₹" + Number(values?.amount).toFixed(4),
    SelfPackage: "₹" + values?.selfPackageInfo?.amount,
    LevelUserId: values?.incomeFrom,
    LevelPackage: "₹" + values?.levelUserPackageInfo?.amount,
    date: values?.date,
    time: values?.time,
    status: "success",
  };

  const [filterData, setFilterData] = useState([]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="UserEarning_wallet_page_wrapper">
        <SectionCommonTable
          wrapperClassName="roi_table"
          cardStyle={{ backgroundColor: "#fff" }}
          sectionTableTitle={`ROI Income (${
            filterData?.length > 0
              ? filterData?.length
              : data?.data?.length ?? 0
          })`}
          data={filterData?.length > 0 ? filterData : data?.data}
          setFilterData={setFilterData}
          table={
            <ROIIncomeTable
              data={filterData?.length > 0 ? filterData : data?.data}
              showDetails={showDetails}
            />
          }
        />
      </div>
      <TransactionModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalRef={modalRef}
        modalTitle="Details"
        objValue={modalData}
      />
    </>
  );
};

export default ProfitShare;
