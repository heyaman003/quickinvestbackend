import React, { useState } from "react";
import TeamTable from "./table/TeamTable";
import SectionLayout from "../../../components/SectionLayout";
import { useGetUserTeamsQuery } from "../../../services/User.Team";

const UserTeam = () => {
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

  const { data } = useGetUserTeamsQuery(obj);
  
  return (
    <>
      <SectionLayout
        sectionTitle={`Total Team(${data?.data?.totalTeamMembers})`}
        isFilterRightSection={false}
        isLevelFilter={false}
        table={
          <TeamTable
            data={data?.data?.teamMembers}
            pageNo={data?.data?.page}
            pagePerShow={data?.data?.limit}
            totalData={data?.data?.totalTeamMembers}
            setPageNo={setPage}
            setPagePerShow={setPagePer}
            isCustomPagination={true}
          />
        }
      />
    </>
  );
};

export default UserTeam;
