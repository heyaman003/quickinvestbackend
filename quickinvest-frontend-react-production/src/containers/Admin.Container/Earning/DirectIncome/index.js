import React, { useRef, useState } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import DirectIncomeTable from "../Table/DirectIncomeTable";
import TransactionModal from "../../../../components/TransactionModal/TransactionModal";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useGetDirectIncomeHistoryQuery } from "../../../../services/Admin.Earning";

const ActinicBonus = () => {
  const { data, isLoading } = useGetDirectIncomeHistoryQuery();
  console.log({ data });
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  const [values, setValues] = useState({});
  const showDetails = (body) => {
    setValues(body);
    setOpenModal(true);
  };
  const modalData = {
    userid: values?.userId,
    fullName: values?.fullName,
    package: values?.package,
    percentage: values?.commissionPercentagePerDay + "%",
    amount: "₹" + Number(values?.commissionAmount).toFixed(4),
    totalAmount: "₹" + Number(values?.totalCommissionAmount).toFixed(4),
    date: values?.incomeDate,
    time: values?.incomeTime,
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
          sectionTableTitle={` Direct Income (${
            filterData?.length > 0
              ? filterData?.length
              : data?.data?.length ?? 0
          })`}
          data={data?.data}
          setFilterData={setFilterData}
          table={
            <DirectIncomeTable
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

export default ActinicBonus;
