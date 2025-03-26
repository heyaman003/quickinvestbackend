import React, { useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import RechargeHistoryTable from "./table/RechargeHistoryTable";
import { useGetRechargeHistoryQuery } from "../../../services/User.Wallet";

const UserRechargeHistory = () => {
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
  const { data } = useGetRechargeHistoryQuery(obj);

  return (
    <>
      <SectionLayout
        sectionTitle={`Recharge History(${
          data?.data?.totalDocs > 0 ? data?.data?.totalDocs : 0
        })`}
        table={
          <RechargeHistoryTable
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

export default UserRechargeHistory;
