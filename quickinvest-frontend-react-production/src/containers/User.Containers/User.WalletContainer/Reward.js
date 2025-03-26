import React, { useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import { useGetRewardHistoryQuery, } from "../../../services/User.Wallet";
import RewardHistoryTable from "./table/RewardHistoryTable";
const useRewardHistory = () => {
  const [pageNo, setPageNo] = useState(1);
  const [pagePerShow, setPagePerShow] = useState(10);

  const setPage = (page) => {
    setPageNo(page);
  };

  const setPagePer = (limit) => {
    setPagePerShow(limit);
  };
  const obj = {
    page: pageNo,
    limit: pagePerShow,
  };
  const { data, error } = useGetRewardHistoryQuery(obj);

  return (
    <>
      <SectionLayout
        sectionTitle={`Reward(${data?.data?.totalDocs || "0"})`}
        table={
          <RewardHistoryTable
            data={data?.data?.docs}
            pageNo={data?.data?.page}
            pagePerShow={data?.data?.limit}
            totalData={data?.data?.totalDocs}
            setPageNo={setPage}
            setPagePerShow={setPagePer}
            isCustomPagination={true}
          />
        }
      />
    </>
  );
};

export default useRewardHistory;
