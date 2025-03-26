import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import ActiveMemberTable from "../Tables/ActiveMemberTable/ActiveMemberTable";
import {
  useEditUserStatusMutation,
  useGetActiveMemberAdminQuery,
} from "../../../../services/Admin.AllUser";
import { Notification } from "../../../../components/ToastNotification";

const ActiveMember = () => {
  // get all active member
  const { data, isLoadingActiveUser } = useGetActiveMemberAdminQuery();

  // blocked member
  const [blockMember, { data: blockData, error: blockError }] =
    useEditUserStatusMutation();
  useEffect(() => {
    if (blockData?.message) {
      Notification(blockData?.message, "success");
    } else {
      Notification(blockError?.data?.message, "error");
    }
  }, [blockError, blockData]);
  const blockHandler = async (body) => {
    await blockMember(body);
  };
  const [filterData, setFilterData] = useState([]);
  filterData?.sort((a, b) => {
    const createdAtA = new Date(a.createdAt);
    const createdAtB = new Date(b.createdAt);

    // Compare createdAt dates in descending order
    return createdAtB - createdAtA;
  });
  const [date, setDate] = useState("");
  const [monthWiseFilterData, setMonthWiseFilterData] = useState({});
  useEffect(() => {
    if (monthWiseFilterData?.year && monthWiseFilterData?.month) {
      const filtRes = data?.data?.filter((d, i) =>
        d?.joiningDate?.includes(monthWiseFilterData?.year)
      );
      const res = filtRes?.filter((d) =>
        d?.joiningDate?.includes(monthWiseFilterData?.month)
      );
      setFilterData(res);
    }
  }, [monthWiseFilterData?.year, monthWiseFilterData?.month]);
  useEffect(() => {
    const filterDate = new Date(date).toDateString();
    const filterResult = data?.data?.docs.filter(
      (d) => d?.joiningDate === filterDate
    );
    setFilterData(filterResult);
  }, [date]);

  if (isLoadingActiveUser) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="activemember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Active Members (${
          filterData?.length > 0
            ? filterData?.length
            : data?.data?.totalDocs ?? 0
        })`}
        data={data?.data?.docs}
        setFilterData={setFilterData}
        setDate={setDate}
        setMonthWiseFilterData={setMonthWiseFilterData}
        monthWiseFilterData={monthWiseFilterData}
        table={
          <ActiveMemberTable
            data={filterData?.length > 0 ? filterData : data?.data?.docs}
            blockHandler={blockHandler}
          />
        }
      />
    </>
  );
};

export default ActiveMember;
