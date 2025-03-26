import React, { useEffect, useRef, useState } from "react";
import { useGetAllRechargeHistoryQuery } from "../../../services/AdminRecharge";
import Loading from "../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../components/Admin/SectionCommonTable/SectionCommonTable";
import AllManageRechargeTable from "./Table/AllManageRechargeTable";
import { useGetAllManualRechargeHistoryQuery } from "../../../services/Admin.Setting";

const AllManualTransaction = () => {
  const [details, setDetails] = useState({});
  const showDetails = (body) => {};
  const showImageDetails = (body) => {
    setDetails(body);
  };

  // get all deposit history
  const { data, isloadingRecharge, error, refetch } =
    useGetAllManualRechargeHistoryQuery();

  let isLoadingAllDepositHistory;

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

  if (isloadingRecharge) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All Manual Recharge History (${
          filterData?.length > 0
            ? filterData?.length
            : data?.data?.docs?.length ?? "0"
        })`}
        data={data?.data?.docs}
        setFilterData={setFilterData}
        refetch={refetch}
        table={
          <AllManageRechargeTable
            data={filterData.length > 0 ? filterData : data?.data?.docs}
            showDetails={showDetails}
            showImageDetails={showImageDetails}
          />
        }
      />
    </>
  );
};

export default AllManualTransaction;
