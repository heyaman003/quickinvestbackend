import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import BlockedMemberTable from "../Tables/BlockedMemberTable/BlockedMemberTable";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import Loading from "../../../../components/Admin/Loading/Loading";
import { useGetBlockedMemberAdminQuery } from "../../../../services/Admin.AllUser";

const BlockedMember = () => {
  // get block user
  const { data, isLoadingBlockUser } = useGetBlockedMemberAdminQuery();

  // unblock member
  // const [blockMember, { data: blockData, error: blockError }] =
  //   useEditUserStatusMutation();
  // useEffect(() => {
  //   if (blockData?.message) {
  //     Notification(blockData?.message, "success");
  //   } else {
  //     Notification(blockError?.data?.message, "error");
  //   }
  // }, [blockError, blockData]);
  // const blockHandler = async (body) => {
  //   await blockMember(body);
  // };
  // delete member
  // const [deleteMember, { data: deleteData, error: deleteError }] =
  //   useDeleteUserListMutation();
  // useEffect(() => {
  //   if (deleteData?.message) {
  //     Notification(deleteData?.message, "success");
  //   } else {
  //     Notification(deleteError?.data?.message, "error");
  //   }
  // }, [deleteError, deleteData]);
  // const deleteHandler = async (body) => {
  //   await deleteMember(body);
  // };
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
      const filtRes = data?.data?.docs.filter((d, i) =>
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
      (d) => d?.joiningDate == filterDate
    );
    setFilterData(filterResult);
  }, [date]);
  if (isLoadingBlockUser) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="activemember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`Blocked Members (${
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
          <BlockedMemberTable
            data={filterData?.length > 0 ? filterData : data?.data?.docs}
            // blockHandler={blockHandler}
            // deleteHandler={deleteHandler}
          />
        }
      />
    </>
  );
};

export default BlockedMember;
