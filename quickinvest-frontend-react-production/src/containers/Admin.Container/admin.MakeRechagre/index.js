import React, { useEffect, useState } from "react";
import Button from "../../../components/Admin/Button/Button";
import CardLayout from "../../../components/Admin/CardLayout/CardLayout";
import Input from "../../../components/Admin/Input/Input";
import { Notification } from "../../../components/ToastNotification";
import { useMakeRechargeMutation } from "../../../services/AdminRecharge";

const MakeRecharge = () => {
  const [data, setData] = useState({
    userId: "",
    amount: "",
  });
  //  make Recharge
  const [makeRecharge, { data: rechargeData, error, isLoading }] =
    useMakeRechargeMutation();

  useEffect(() => {
    if (rechargeData?.message) {
      Notification(rechargeData?.message, "success");
      setData({
        userId: "",
        amount: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, rechargeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ data });
    if (!data.userId) {
      Notification("All field are required", "error");
    } else {
      await makeRecharge(data);
    }
  };

  return (
    <div className="ss-trade_supportticket_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_supporttickett_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Make Recharge</h2>
          {/* <p>Whenever, </p> */}
        </div>
        <div className="ss-trade_supportticket_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <div className="purpose">
                <Input
                  label="User Id"
                  type="text"
                  name="userId"
                  id="userId"
                  value={data.userId}
                  placeholder="Enter your User Id"
                  onChange={(e) => setData({ ...data, userId: e.target.value })}
                  className="input_field"
                  inputGroupClass="left"
                />
              </div>
              <div className="purpose">
                <label htmlFor="amount">Amount</label>
                <input
                  name="amount"
                  id="recharge_amount"
                  placeholder="5K to 10L"
                  type="number"
                  min="0"
                  onChange={(e) => setData({ ...data, amount: e.target.value })}
                  isRequired={true}
                  className="input_field"
                  inputGroupClass="right"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="submit_btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "Make Recharge"}
            </Button>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default MakeRecharge;
