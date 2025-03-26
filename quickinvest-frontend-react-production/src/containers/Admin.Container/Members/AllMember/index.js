import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../components/Admin/Loading/Loading";
import SectionCommonTable from "../../../../components/Admin/SectionCommonTable/SectionCommonTable";
import Modal from "../../../../components/Admin/Modal/Modal";
import Input from "../../../../components/Admin/Input/Input";
import Button from "../../../../components/Admin/Button/Button";
import AllMemberTable from "../Tables/AllMemberTable/AllMemberTable";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import {
  useEditUserListMutation,
  useEditUserStatusMutation,
  useGetAllMemberAdminQuery,
} from "../../../../services/Admin.AllUser";
import { Notification } from "../../../../components/ToastNotification";

const AllMember = () => {
  // modal toggle
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));
  // get all member list
  const {
    data,
    error,
    isLoading: isLoadingAllUser,
  } = useGetAllMemberAdminQuery();

  // blocked member
  const [
    blockMember,
    { data: blockData, error: blockError, isLoading: blockLoading },
  ] = useEditUserStatusMutation();

  useEffect(() => {
    if (blockData?.message) {
      Notification(blockData?.message, "success");
    } else {
      Notification(blockError?.data?.message, "error");
    }
  }, [blockError, blockData]);
  const blockHandler = async (body) => {
    await blockMember(body);
  };

  // handle change
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // update member
  const editHandler = (body) => {
    setValues(body);
    setOpenModal(true);
  };
  const [editMember, { data: editData, error: editError, isLoading }] =
    useEditUserListMutation();
  useEffect(() => {
    if (editData?.message) {
      Notification(editData?.message, "success");
      setOpenModal(false);
    } else {
      Notification(editError?.data?.message, "error");
    }
  }, [editError, editData]);
  const handleEdit = async (e) => {
    e.preventDefault();
    await editMember(values);
  };
  const [filterData, setFilterData] = useState([]);
  filterData?.sort((a, b) => {
    const createdAtA = new Date(a.createdAt);
    const createdAtB = new Date(b.createdAt);

    // Compare createdAt dates in descending order
    return createdAtB - createdAtA;
  });
  if (isLoadingAllUser) {
    return <Loading />;
  }
  return (
    <>
      <SectionCommonTable
        wrapperClassName="allmember_table"
        cardStyle={{ backgroundColor: "#fff" }}
        sectionTableTitle={`All Members (${
          filterData?.length > 0
            ? filterData?.length
            : data?.data?.totalDocs ?? 0
        })`}
        data={data?.data?.docs}
        setFilterData={setFilterData}
        table={
          <AllMemberTable
            data={filterData?.length > 0 ? filterData : data?.data?.docs}
            blockHandler={blockHandler}
            editHandler={editHandler}
            blockLoading={blockLoading}
          />
        }
      />
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Update Member"
        modalRef={modalRef}
      >
        <div className="ss-trade_commol_modal_field">
          <form onSubmit={handleEdit}>
            <div className="form_group">
              <Input
                label="User ID"
                type="text"
                name="userId"
                value={values.userId}
                onChange={handleChange}
                inputGroupClass="left"
                disabled={true}
              />
              <Input
                label="Name"
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                inputGroupClass="left"
              />
              <Input
                label="Sponsor ID"
                type="text"
                name="sponsorId"
                value={values.sponsorId}
                onChange={handleChange}
                inputGroupClass="left"
                disabled={true}
              />
              <Input
                label="Mobile"
                type="text"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                inputGroupClass="left"
              />
              {/* <Input
                label="Email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                inputGroupClass="left"
              /> */}
              {/* <Input
                label="USDT Address"
                type="text"
                name="walletAddress"
                value={values.walletAddress}
                onChange={handleChange}
                inputGroupClass="left"
              /> */}
            </div>
            <div className="submit_button">
              <Button type="submit">
                {isLoadingAllUser ? "Loading..." : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AllMember;
