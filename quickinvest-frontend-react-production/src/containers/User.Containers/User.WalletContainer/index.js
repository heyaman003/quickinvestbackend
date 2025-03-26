import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import { Notification } from "../../../components/ToastNotification";
import { useGetBankQuery } from "../../../services/User.Mine";
import {
  useAddRechargeMutation,
  useGetMyWalletQuery,
  useGetUpiQrQuery,
  useWithdrawAmountMutation,
} from "../../../services/User.Wallet";

const UserWallet = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { data } = useGetBankQuery();

  const { data: walletData } = useGetMyWalletQuery();
  // withdraw Amount
  const [withdrawAmount, { data: withdrawData, error: withdrawError }] =
    useWithdrawAmountMutation();

  // get UPI and QR
  const { data: upidata } = useGetUpiQrQuery();

  const [withdrawValue, setWithdrawValue] = useState({
    accountNumber: "",
    amount: "",
  });

  useEffect(() => {
    if (data?.data?.accountNumber) {
      setWithdrawValue({
        accountNumber: data?.data?.accountNumber || "",
      });
    }
  }, [data]);

  const [addRecharge, { data: addRechargeData, error: addRechargeError }] =
    useAddRechargeMutation();

  const withdrawHandleChange = (e) => {
    setWithdrawValue({
      ...withdrawValue,
      [e.target.name]: e.target.value,
    });
  };
  const [showWithdrawNotify, setWithdrawNotify] = useState(false);
  const withdrawSubmit = async (e) => {
    e.preventDefault();
    if (withdrawValue) {
      await withdrawAmount(withdrawValue);
    }
  };

  // handle payment gateway
  const [showProof, setShowProof] = useState(false);
  const handlePaymentGateway = () => {
    navigator.clipboard.writeText(upidata?.upi);
    setShowProof(true);
  };

  const [recharge, setRecharge] = useState({
    image: null,
    transactionId: "",
    amount: "",
  });

  const convertedToNumber = Number(recharge.amount);

  const isValidAmount =
    convertedToNumber &&
    convertedToNumber >= 10000 &&
    convertedToNumber <= 1000000;

  const rechargeHandleChange = (e) => {
    const { name, value, files } = e.target;
    setRecharge((prevProof) => ({
      ...prevProof,
      [name]: files ? files[0] : value,
    }));
  };

  const handelRecharge = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", recharge.image);
    formData.append("transactionId", recharge.transactionId);
    formData.append("amount", recharge.amount);

    if (recharge) {
      await addRecharge(formData);
      setOpenModal(false);
      document.querySelector(".image").value = "";
    }
  };
  // FOR RECHARGE NOTIFICATION
  useEffect(() => {
    const message = addRechargeData?.message;
    const error = addRechargeError?.data?.message;

    if (message) {
      Notification(message, "success");
      setRecharge({
        image: null,
        transactionId: "",
        amount: "",
      });
      setOpenModal(false);
    } else if (error) {
      Notification(error, "error");
    }
  }, [addRechargeData, addRechargeError]);

  // FOR WITHDRAW NOTIFICATION
  useEffect(() => {
    const message = withdrawData?.message;
    const error = withdrawError?.data?.message;

    if (message) {
      // Notification(message, "success");
      setOpenModal(false);
      setWithdrawNotify(true);
    } else if (error) {
      Notification(error, "error");
    }
  }, [withdrawData, withdrawError]);

  const openMainModel = () => {
    setOpenModal(true);
    setShowProof(true);
  };

  return (
    <>
      <div className="tb__userWallet__layout">
        <div className="tb__userWallet__container">
          <div className="tb__userWallet__content__area">
            <div className="tb__userWallet__balance">
              <div className="tb__userWallets__cards">
                <div
                  className="tb__userWallets__balance"
                  style={{
                    background: "white",
                    border: "1px solid black",
                  }}
                >
                  <h4 style={{ color: "black" }}>Main Balance</h4>
                  <span style={{ color: "black" }}>
                    ₹{walletData?.data?.activeIncome.toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__userWallets__balance"
                  onClick={() => {
                    navigate("/dashboard/wallet/withdraw-history");
                  }}
                >
                  <h4>Withdrawal</h4>
                  <span>₹{walletData?.data?.activeIncome.toFixed(2)}</span>
                </div>
                <div
                  className="tb__userWallets__balance"
                  onClick={() => {
                    navigate("/dashboard/wallet/recharge-history");
                  }}
                >
                  <h4>Self Business</h4>
                  <span>
                    ₹{parseFloat(walletData?.data?.rechargeAmount).toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__userWallets__balance"
                  style={{
                    background: "white",
                    border: "1px solid black",
                  }}
                >
                  <h4 style={{ color: "black" }}>Total Income</h4>
                  <span style={{ color: "black" }}>
                    ₹{parseFloat(walletData?.data?.totalIncome).toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__userWallets__balance"
                  onClick={() => {
                    navigate("/dashboard/wallet/roi-history");
                  }}
                >
                  <h4>ROI Income</h4>
                  <span>
                    ₹{parseFloat(walletData?.data?.roiIncome).toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__userWallets__balance"
                  onClick={() => {
                    navigate("/dashboard/wallet/direct-income");
                  }}
                >
                  <h4>Direct Income</h4>
                  <span>
                    ₹{parseFloat(walletData?.data?.directIncome).toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__userWallets__balance"
                  onClick={() => {
                    navigate("/dashboard/wallet/royalty-income");
                  }}
                >
                  <h4>Royalty Income</h4>
                  <span>
                    ₹{parseFloat(walletData?.data?.royaltyIncome).toFixed(2)}
                  </span>
                </div>
                <div
                  className="tb__userWallets__balance"
                  onClick={() => {
                    navigate("/dashboard/wallet/joining-bonus");
                  }}
                >
                  <h4>Joining Bonus</h4>
                  <span>
                    ₹
                    {parseFloat(walletData?.data?.joiningBonus || 0).toFixed(2)}
                  </span>
                </div>
                {/* <div
                  className="tb__userWallets__balance"
                  onClick={() => {
                    navigate("/dashboard/wallet/recharge-reward");
                  }}
                >
                  <h4>Reward</h4>
                   <span>{walletData?.data?.rechargeReward}</span>
                </div> */}
              </div>
            </div>
            <div className="tb__userWallet__recharge">
              <button
                type="button"
                onClick={openMainModel}
                style={{
                  background: "#FFC100",
                  color: "black",
                  border: "1px solid black",
                }}
              >
                Recharge
              </button>
            </div>
            {/* Withdraw */}
            <div className="tb__userWallet__withdraw__section">
              <div className="tb__userWallet__section__title">
                <h2>Withdraw</h2>
              </div>
              <div className="tb__userWallet__withdraw__fields">
                <form onSubmit={withdrawSubmit}>
                  <div className="tb__userWallet__withdraw__field">
                    <div className="tb__userWallet__withdraw__group">
                      <label htmlFor="accountNumber">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        id="accountNumber"
                        placeholder="Enter your account number"
                        defaultValue={withdrawValue.accountNumber}
                        disabled={true}
                        onChange={withdrawHandleChange}
                      />
                    </div>
                    <div className="tb__userWallet__withdraw__group">
                      <label htmlFor="amount">Amount</label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        placeholder="Enter your amount"
                        onChange={withdrawHandleChange}
                      />
                    </div>
                  </div>
                  <div className="tb__userWallet__withdraw__button">
                    <button
                      type="submit"
                      style={{
                        background: "#FFC100",
                        color: "black",
                        border: "1px solid black",
                      }}
                    >
                      Withdraw
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recharge Modal */}
      <Modal
        openModal={openModal ? "active" : undefined}
        closeModal={() => setOpenModal(false)}
        modalTitle="Recharge"
        className="tb__recharge__modal"
      >
        <div className="tb__recharge__modal__content">
          {convertedToNumber && (
            <div className="tb__recharge__modal__amount">
              <button type="button">₹{convertedToNumber}</button>
            </div>
          )}

          <div className="tb__recharge__modal__qrCode">
            <div className="qr__code">
              <img src={upidata?.qrcode?.url} alt="qr" />
            </div>
            <div className="upi__code">
              <p onClick={handlePaymentGateway}>
                {upidata?.upi}{" "}
                <span>
                  <FaRegCopy />
                </span>
              </p>
            </div>
          </div>
          <div className="tb__recharge__payment">
            <button
              type="button"
              className={`tb__recharge__payment_btn ${
                isValidAmount ? "allowed" : "disabled"
              }`}
            >
              {isValidAmount ? (
                <a
                  href={`upi://pay?pa=${upidata?.upi}&cu=INR&am=${convertedToNumber}&tn=QuickInvest`}
                  style={{
                    cursor: "allowed",
                  }}
                >
                  Select Payment Gateway
                </a>
              ) : (
                <span>Select Payment Gateway</span>
              )}
            </button>
          </div>

          {showProof && (
            <div className="tb__recharge__proof">
              <div className="tb__recharge__proof__fields">
                <div className="tb__recharge__field">
                  <div className="tb__recharge__group">
                    <label htmlFor="proof">Proof</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="image"
                      placeholder="Enter your amount"
                      onChange={rechargeHandleChange}
                    />
                  </div>
                  {/* Select Amount */}
                  <div className="tb__recharge__group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      name="amount"
                      id="recharge_amount"
                      placeholder="5K to 10L"
                      type="number"
                      min="0"
                      onChange={rechargeHandleChange}
                      className="input_field"
                    />
                  </div>
                  <div className="tb__recharge__group">
                    <label htmlFor="trans">Transaction ID</label>
                    <input
                      type="text"
                      name="transactionId"
                      value={recharge.transactionId}
                      id="trans"
                      placeholder="Enter your transaction id"
                      onChange={rechargeHandleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="tb__recharge__button">
            <button type="button" onClick={handelRecharge}>
              Recharge
            </button>
          </div>
        </div>
      </Modal>
      {/* Withdraw Notification */}
      <Modal
        openModal={showWithdrawNotify ? "active" : undefined}
        closeModal={() => setWithdrawNotify(false)}
        modalTitle="Withdrawal Completed Successfully"
        className="tb__withdrawUpdate__modal"
      >
        <p style={{ textTransform: "capitalize", fontSize: "16px" }}>
          withdrawal will be credited in your account within 2 to 3 Working
          days.
        </p>
      </Modal>
    </>
  );
};

export default UserWallet;
