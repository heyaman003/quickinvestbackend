import React, { useEffect, useState } from "react";
import { updatePasswordValidate } from "../../../../components/Validate/Validate";
import { Notification } from "../../../../components/Admin/Notification/Notification";
import CardLayout from "../../../../components/Admin/CardLayout/CardLayout";
import Input from "../../../../components/Admin/Input/Input";
import Button from "../../../../components/Admin/Button/Button";
import { useUpdatePasswordAdminMutation } from "../../../../services/Admin.Setting";

const ChangePassword = () => {
  // const { data: userData } = useGetLoginUserQuery();

  const [formErrors, setFormErrors] = useState({}); // form errors
  const [data, setData] = useState({
    current_password: "",
    confirm_new_password: "",
    new_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  // error
  useEffect(() => {
    setFormErrors(updatePasswordValidate(data));
  }, [data]);

  // password update
  const [editPassword, { error, data: passwordData, isLoading }] =
    useUpdatePasswordAdminMutation();
  console.log({ error });
  console.log({ passwordData });
  useEffect(() => {
    if (passwordData?.message) {
      Notification(passwordData?.message, "success");
      setData({
        current_password: "",
        confirm_new_password: "",
        new_password: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, passwordData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    } else {
      console.log({ data });
      await editPassword(data);
    }
  };
  return (
    <div className="ss-trade_updatepassword_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_accountpassword_card"
      >
        <div className="ss-trade_accountpassword_title">
          <h2>update password</h2>
        </div>
        <div className="ss-trade_accountpassword_field">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <Input
                label="Current Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.current_password}
                name="current_password"
                placeholder="Enter your current password"
                onChange={handleChange}
                inputGroupClass="left"
                isRequired={true}
                error={formErrors.current_password}
              />
              <Input
                label=""
                type="text"
                name=""
                placeholder=""
                className="input_field"
                inputGroupClass="right"
                isRequired={false}
                disabled={true}
                style={{ display: "none" }}
              />
            </div>
            <div className="form_group">
              <Input
                label="New Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.new_password}
                name="new_password"
                onChange={handleChange}
                placeholder="Enter your new password"
                inputGroupClass="left"
                isRequired={true}
                error={formErrors.new_password}
              />
              <Input
                label=""
                type="text"
                name=""
                placeholder=""
                className="input_field"
                inputGroupClass="right"
                isRequired={false}
                disabled={true}
                style={{ display: "none" }}
              />
            </div>
            <div className="form_group">
              <Input
                label="Confirm New Password"
                type={`${showPassword ? "text" : "password"}`}
                value={data.confirm_new_password}
                name="confirm_new_password"
                placeholder="Enter your new password"
                onChange={handleChange}
                inputGroupClass="left"
                isRequired={true}
                error={formErrors.confirm_new_password}
              />
              <Input
                label=""
                type="text"
                name=""
                placeholder=""
                className="input_field"
                inputGroupClass="right"
                isRequired={false}
                disabled={true}
                style={{ display: "none" }}
              />
            </div>
            <div className="form-check form-check-label show_password form_group">
              <Input
                type="checkbox"
                className="form-check-input form-check-label"
                value="showpassword"
                id="showpassword"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showpassword" className="form-check-label">
                show Password
              </label>
            </div>

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

export default ChangePassword;
