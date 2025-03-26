import React, { useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import WithdrawHistoryTable from "./table/WithdrawHistoryTable";
import { useGetWithdrawHistoryQuery } from "../../../services/User.Wallet";

const UserWithdrawHistory = () => {
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
  const { data } = useGetWithdrawHistoryQuery(obj);

  return (
    <>
      <SectionLayout
        sectionTitle={`Withdraw History(${
          data?.data?.totalDocs > 0 ? data?.data?.totalDocs : 0
        })`}
        table={
          <WithdrawHistoryTable
            data={data?.data?.docs}
            pageNo={data?.data?.page}
            pagePerShow={data?.data?.limit}
            setPageNo={setPage}
            setPagePerShow={setPagePer}
            isCustomPagination={true}
            totalData={data?.data?.totalDocs}
          />
        }
      />
    </>
  );
};

export default UserWithdrawHistory;
