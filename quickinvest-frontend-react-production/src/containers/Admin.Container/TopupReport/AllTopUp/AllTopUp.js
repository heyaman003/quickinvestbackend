import React, { useState } from 'react'
import Loading from '../../../../components/Admin/Loading/Loading';
import SectionCommonTable from '../../../../components/Admin/SectionCommonTable/SectionCommonTable';
import AdminTopupHistoryTable from './Table/AdminTopUpHistoryTable';

const AllTopUp = () => {
  // const { data, isLoading } = useGetAllTopUpHistoryQuery();
  let data;
  let isLoading;
  const [filterData, setFilterData] = useState([]);
  filterData?.sort((a, b) => {
    const createdAtA = new Date(a.createdAt);
    const createdAtB = new Date(b.createdAt);

    // Compare createdAt dates in descending order
    return createdAtB - createdAtA;
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="topuphistory_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All Top Up History (${
          filterData?.length > 0 ? filterData?.length : data?.data?.length ?? 0
        })`}
        data={filterData?.length > 0 ? filterData : data?.data}
        setFilterData={setFilterData}
        table={
          <AdminTopupHistoryTable
            data={filterData?.length > 0 ? filterData : data?.data}
          />
        }
      />
    </>
  )
}

export default AllTopUp