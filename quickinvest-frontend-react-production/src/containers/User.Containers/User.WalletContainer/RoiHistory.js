import React, { useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import RoiHistoryTable from "./table/RoiHistoryTable";
import { useGetROIIncomeHistoryQuery } from "../../../services/User.Wallet";
const UserRoiHistory = () => {
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
  const { data } = useGetROIIncomeHistoryQuery(obj);
  return (
    <>
      <SectionLayout
        sectionTitle={`ROI History (${
          data?.data?.totalDocs > 0 ? data?.data?.totalDocs : 0
        })`}
        table={
          <RoiHistoryTable
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

export default UserRoiHistory;
