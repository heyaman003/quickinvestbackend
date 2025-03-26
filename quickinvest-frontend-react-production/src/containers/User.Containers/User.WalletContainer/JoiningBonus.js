import React, { useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import { useGetJoiningBonusHistoryQuery, useGetRoyaltyIncomeHistoryQuery } from "../../../services/User.Wallet";
import JoiningBonusTable from "./table/JoiningBonusTable";
const useJoiningBonus = () => {
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
  const { data, error } = useGetJoiningBonusHistoryQuery(obj);

  return (
    <>
      <SectionLayout
        sectionTitle={`Joining Bonus(${data?.data?.totalDocs || "0"})`}
        table={
          <JoiningBonusTable
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

export default useJoiningBonus;
