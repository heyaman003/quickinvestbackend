import React, { useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import DirectIncomeHistoryTable from "./table/directIncomeHistoryTable";
import { useGetDirectIncomeHistoryQuery } from "../../../services/User.Wallet";
const UserDirectIncomeHistory = () => {
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
  const { data } = useGetDirectIncomeHistoryQuery(obj);

  return (
    <>
      <SectionLayout
        sectionTitle={`Direct Income (${data?.data?.totalDocs})`}
        table={
          <DirectIncomeHistoryTable
            data={data?.data?.docs}
            pageNo={data?.data?.page}
            pagePerShow={data?.data?.limit}
            setPageNo={setPage}
            setPagePerShow={setPagePer}
            totalData={data?.data?.totalDocs}
            isCustomPagination={true}
          />
        }
      />
    </>
  );
};

export default UserDirectIncomeHistory;
