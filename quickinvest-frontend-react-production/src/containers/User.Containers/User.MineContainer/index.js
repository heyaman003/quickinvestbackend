import React, { useEffect, useState } from "react";
import { FaRegCopy, FaTelegram, FaWhatsappSquare } from "react-icons/fa";
import Modal from "../../../components/Modal";
import Apk from "../../../assets/app-release.apk";
import { Notification } from "../../../components/ToastNotification";
import { useGetUserDashboardDataQuery } from "../../../services/User.Home";
import {
  useAddBankMutation,
  useChangePasswordMutation,
} from "../../../services/User.Mine";
import { useGetBankQuery } from "../../../services/User.Wallet";

const UserMine = () => {
  // Change Password
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openBankModal, setOpenBankModal] = useState(false);
  const { data: getBankData } = useGetBankQuery();
  const [bankInfo, setBankInfo] = useState({
    bankHolderName: "",
    accountNumber: "",
    branch: "",
    ifscCode: "",
  });

  useEffect(() => {
    setBankInfo({
      bankHolderName: getBankData?.data?.holderName || "",
      accountNumber: getBankData?.data?.accountNumber || "",
      branch: getBankData?.data?.branchName || "",
      ifscCode: getBankData?.data?.IFSCCode || "",
    });
  }, [openBankModal]);

  console.log("bankInfo", bankInfo);
  // add Bank Mutation
  const [addBank, { data, error }] = useAddBankMutation();
  //update password mutation
  const [
    updatePassword,
    { data: changePasswordData, error: changePasswordError },
  ] = useChangePasswordMutation();
  const { data: dashboardData } = useGetUserDashboardDataQuery();
  useEffect(() => {
    const message = changePasswordData?.message;
    const error = changePasswordError?.data?.message;

    if (message) {
      Notification(message, "success");
      setOpenPasswordModal(false);
    } else if (error) {
      Notification(error, "error");
    }
  }, [changePasswordData, changePasswordError]);
  useEffect(() => {
    // Check if Notification is defined before using it
    if (Notification) {
      if (data?.message && !error?.message) {
        Notification(data.message, "success");
        setOpenBankModal(false);
      } else if (!data?.message && error?.message) {
        Notification(error.message, "error");
      } else if (data?.message && error?.message) {
        // Handle the case where both data and error are present
        // You might want to prioritize one or provide a combined message
        Notification(
          `Success: ${data.message}, Error: ${error.message}`,
          "warning"
        );
      }
    }
  }, [data, error, Notification]);

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const submitChangePassword = async (e) => {
    e.preventDefault();
    if (changePassword) {
      await updatePassword(changePassword);
    }
  };
  // Bank Info

  const submitBankInfo = async (e) => {
    e.preventDefault();
    if (bankInfo) {
      await addBank(bankInfo);
    }
    // console.log({ bankInfo });
  };
  // handle Copy URL
  const handleCopyURL = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/register?sponsorId=${dashboardData?.userInfo?.userId}`
    ); // 'BVH458' will change
    Notification("Copied referral link", "success");
  };
  // WhatsApp Share
  const shareOnWhatsApp = () => {
    const url = `${window.location.origin}/register?sponsorid=${dashboardData?.userInfo?.userId}`;
    const message = encodeURIComponent("Join QuickInvest: " + url);

    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <>
      <div className="tb__userMine__layout">
        <div className="tb__userMine__container">
          <div className="tb__userMine__profileId">
            <h2>ID:&nbsp;{dashboardData?.userInfo?.userId}</h2>
            <span>{dashboardData?.userInfo?.fullName}</span>
          </div>
          <div className="tb__userMine__account__settings">
            <div className="tb__userMine__account__passBank">
              {/* Change Password */}
              <div className="tb__userMine__change__password">
                <div className="tb__userMine__section__tile">
                  <h2>Change Password</h2>
                </div>
                <div className="tb__userMine__button">
                  <button
                    type="button"
                    onClick={() => setOpenPasswordModal(true)}
                    style={{
                      background: "#FFC100",
                      color: "black",
                      border: "1px solid black",
                    }}
                  >
                    Password
                  </button>
                </div>
              </div>
              {/* Bank Info */}
              <div className="tb__userMine__bankInfo">
                <div className="tb__userMine__section__tile">
                  <h2>Bank Info</h2>
                </div>
                <div className="tb__userMine__button">
                  <button
                    type="button"
                    onClick={() => setOpenBankModal(true)}
                    style={{
                      background: "#FFC100",
                      color: "black",
                      border: "1px solid black",
                    }}
                  >
                    {getBankData?.data?.isBank ? "Update Bank" : "Add Bank"}
                  </button>
                </div>
              </div>
            </div>
            {/* Share */}
            <div className="tb__userMine__ref">
              <div className="tb__userMine__section__tile">
                <h2>Share</h2>
              </div>
              <div
                className="tb__userMine__field"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  style={{ background: "#2bcd13" }}
                  onClick={shareOnWhatsApp}
                >
                  <FaWhatsappSquare />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyURL}
                  style={{ background: "rgb(0, 136, 204)" }}
                >
                  <FaRegCopy />
                  <span>Copy Referral</span>
                </button>
              </div>
            </div>
            {/* Download App */}
            <div className="tb__userMine__ref">
              <div className="tb__userMine__section__tile">
                <h2>Download</h2>
              </div>
              <div className="tb__userMine__field">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={Apk}
                  style={{
                    background: "#FFC100",
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  Download App
                </a>
              </div>
            </div>
            {/* Online Services */}
            <div className="tb__userMine__share">
              <div className="tb__userMine__section__tile">
                <h2>Online Services</h2>
              </div>
              <div className="tb__userMine__link">
                <button
                  type="button"
                  style={{ background: "#0088cc" }}
                  onClick={() => {
                    window.open("http://t.me/quickinvestfinc", "_blank");
                  }}
                >
                  <FaTelegram />
                  <span>Telegram Support</span>
                </button>
                <button
                  type="button"
                  style={{ background: "#2bcd13" }}
                  onClick={() => {
                    window.open("https://wa.me/+917065163623", "_blank");
                  }}
                >
                  <FaWhatsappSquare />
                  <span>WhatsApp Support</span>
                </button>
                <button
                  type="button"
                  style={{ background: "#0088cc" }}
                  onClick={() => {
                    window.open("https://t.me/quickinvestofficial", "_blank");
                  }}
                >
                  <FaTelegram />
                  <span>Telegram Channel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Change password */}
      <Modal
        openModal={openPasswordModal ? "active" : undefined}
        closeModal={() => setOpenPasswordModal(false)}
        modalTitle="Change Password"
        className="tb__changepassword__modal"
      >
        <div className="tb__userMine__password__fields">
          <form onSubmit={submitChangePassword}>
            <div className="tb__userMine__password__field">
              <div className="tb__userMine__password__group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Enter your current password"
                  onChange={(e) =>
                    setChangePassword((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="tb__userMine__password__group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter your new password"
                  onChange={(e) =>
                    setChangePassword((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="tb__userMine__password__group">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  placeholder="Enter your new password"
                  onChange={(e) =>
                    setChangePassword((prev) => ({
                      ...prev,
                      confirmNewPassword: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="tb__userMine__showPassword">
              <input
                type="checkbox"
                id="show"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show">Show Password</label>
            </div>
            <div className="tb__userMine__button">
              <button type="submit">Change Password</button>
            </div>
          </form>
        </div>
      </Modal>
      {/* Add Bank */}
      <Modal
        openModal={openBankModal ? "active" : undefined}
        closeModal={() => setOpenBankModal(false)}
        modalTitle={getBankData?.data?.isBank ? "Update Bank" : "Add Bank"}
        className="tb__addBank__modal"
      >
        <div className="tb__userMine__bankInfo__fields">
          <form onSubmit={submitBankInfo}>
            <div className="tb__userMine__bankInfo__field">
              <div className="tb__userMine__bankInfo__group">
                <label htmlFor="holderName">Holder Name</label>
                <input
                  type="text"
                  name="holderName"
                  id="holderName"
                  placeholder="Enter your bank holder name"
                  defaultValue={bankInfo?.bankHolderName}
                  onChange={(e) =>
                    setBankInfo((prev) => ({
                      ...prev,
                      bankHolderName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="tb__userMine__bankInfo__group">
                <label htmlFor="accountNumber">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  id="accountNumber"
                  placeholder="Enter your account number"
                  onChange={(e) =>
                    setBankInfo((prev) => ({
                      ...prev,
                      accountNumber: e.target.value,
                    }))
                  }
                  defaultValue={bankInfo.accountNumber}
                />
              </div>
              <div className="tb__userMine__bankInfo__group">
                <label htmlFor="ifscCode">IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  id="ifscCode"
                  placeholder="Enter your IFSC code"
                  onChange={(e) =>
                    setBankInfo((prev) => ({
                      ...prev,
                      ifscCode: e.target.value,
                    }))
                  }
                  defaultValue={bankInfo.ifscCode}
                />
              </div>
              <div className="tb__userMine__bankInfo__group">
                <label htmlFor="branch">Branch</label>
                <input
                  type="text"
                  name="branch"
                  id="branch"
                  placeholder="Enter your branch"
                  onChange={(e) =>
                    setBankInfo((prev) => ({
                      ...prev,
                      branch: e.target.value,
                    }))
                  }
                  style={{ width: "94%" }}
                  defaultValue={bankInfo.branch}
                />
              </div>
            </div>
            <div className="tb__userMine__button">
              <button type="submit">
                {getBankData?.data?.isBank ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UserMine;
