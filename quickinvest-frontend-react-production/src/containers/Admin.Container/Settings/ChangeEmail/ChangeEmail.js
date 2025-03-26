import React, { useEffect, useState } from "react";
import { updateEmailValidate } from "../../../../components/Validate/Validate";
import { Notification } from "../../../../components/Admin/Notification/Notification";
import ScreenShot from "../../../../components/ScreenShot/ScreenShot";
import CardLayout from "../../../../components/Admin/CardLayout/CardLayout";
import Input from "../../../../components/Admin/Input/Input";
import Button from "../../../../components/Admin/Button/Button";

const ChangeEmail = () => {
  const [OTPup, setOTPup] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    currentEmail: "",
    new_email: "",
    otpCode: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // error
  useEffect(() => {
    setFormErrors(updateEmailValidate(data));
  }, [data]);

  const forOTP = async () => {
    const otp = {
      user_id: "admin",
      currentEmail: data.currentEmail,
      new_email: data.new_email,
    };
    await addOtp(otp);
  };

  // send otp code
  // const [addOtp, { error: otpError, data: otpData }] = useAddOtpMutation();
  let otpError;
  let otpData;
  let addOtp;
  useEffect(() => {
    if (otpData?.message) {
      // Notification(otpData?.message, "success");
      setOTPup(true);
    } else {
      // Notification(otpError?.data?.message, "error");
      setOTPup(false);
    }
  }, [otpError, otpData]);

  // email update
  // const [editEmail, { error, data: emailData, isLoading }] =
  //   useEditAdminEmailMutation();
  let editEmail;
  let emailData;
  let error;
  let isLoading;
  // useEffect(() => {
  //   if (emailData?.message) {
  //     Notification(emailData?.message, "success");
  //   } else {
  //     Notification(error?.data?.message, "error");
  //   }
  // }, [error, emailData]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (Object.keys(formErrors).length > 0) {
  //     // Notification("All condition are required", "error");
  //   } else {
  //     if (!data.otpCode) {
  //       const otp = {
  //         user_id: "admin",
  //         currentEmail: data.currentEmail,
  //         new_email: data.new_email,
  //       };
  //       await addOtp(otp);
  //     } else {
  //       if (data.otpCode < 0) {
  //         // Notification("Only Number Is Allowed On OTP", "error");
  //       } else {
  //         await editEmail(data);
  //       }
  //     }
  //   }
  // };
  return (
    <div className="ss-trade_updatepassword_page_wrapper">
      <ScreenShot width={600} height={410} pageName={"changeEmail"} />
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_accountpassword_card"
      >
        <div className="ss-trade_accountpassword_title">
          <h2>update email</h2>
        </div>
        <div className="ss-trade_accountpassword_field">
          <form
            // onSubmit={handleSubmit}
          >
            <div className="form_group">
              <Input
                label="Current Email"
                type="email"
                value={data.currentEmail}
                name="currentEmail"
                placeholder="Enter your current email"
                onChange={handleChange}
                inputGroupClass="left"
                isRequired={true}
              />
              <Input
                label="New Email"
                type="email"
                value={data.new_email}
                name="new_email"
                onChange={handleChange}
                placeholder="Enter your new email"
                inputGroupClass="right"
                isRequired={true}
                error={formErrors.new_email}
              />
            </div>

            {OTPup && (
              <div className="form_group form_group_OTP">
                <Input
                  label="OTP"
                  type="number"
                  name="otpCode"
                  placeholder="Enter OTP"
                  onChange={handleChange}
                  className="OTP_input_field input_field"
                  inputGroupClass="left"
                  isRequired={true}
                />
                <Button type="button" className="submit_btn" onClick={forOTP}>
                  Resend OTP
                </Button>
              </div>
            )}
            <div className="form_group">
              <Button type="submit" className="submit_btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "update"}
              </Button>
            </div>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default ChangeEmail;
