import React, { useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import RoyaltyIncomeHistoryTable from "./table/RoyaltyIncomeHistoryTable";
import { useGetRoyaltyIncomeHistoryQuery } from "../../../services/User.Wallet";
const UserRoyaltyIncomeHistory = () => {
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
  const { data } = useGetRoyaltyIncomeHistoryQuery(obj);

  return (
    <>
      <SectionLayout
        sectionTitle={`Royalty Income(${data?.data?.totalDocs|| "0"})`}
        table={
          <RoyaltyIncomeHistoryTable
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

export default UserRoyaltyIncomeHistory;
