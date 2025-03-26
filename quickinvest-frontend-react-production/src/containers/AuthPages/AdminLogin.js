import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { loginValidate } from "../../components/Validate/Validate";
import {
  getLocalStorage,
  removeLocalStorage,
  savedLocalStorage,
} from "../../utils/localStorage";
import Header from "../../components/Admin/Header";
import AuthCardLayout from "../../components/AuthCardLayout/AuthCardLayout";
import Input from "../../components/Admin/Input/Input";
import Button from "../../components/Admin/Button/Button";
import Footer from "../../components/Admin/Footer";
import { Notification } from "../../components/ToastNotification";
import { useLogInUserMutation } from "../../services/User.Auth";

export let popupShow = false;
let isLoading;
const AdminLogin = () => {
  const navigate = useNavigate();
  // If already user logged In then redirect to the dashboard
  useEffect(() => {
    if (getLocalStorage("quickinvest_token")) {
      navigate("/admin");
    }
  }, []);
  const [errors, setErrors] = useState({}); // error catch
  const [value, setValue] = useState({
    userId: "",
    password: "",
  });
  const [captcha, setCaptcha] = useState({ x: 0, y: 0 });
  const [captchaRefresh, setCaptchaRefresh] = useState(false);
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // auth check
  useEffect(() => {
    if (getLocalStorage("quickinvest_token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // error
  useEffect(() => {
    setErrors(loginValidate(value));
  }, [value]);

  // add user
  const [addLogin, { error, data, isLoading }] = useLogInUserMutation();
  // let addLogin;
  // let error;
  // let data;
  // let isloading;
  console.log({ data });
  console.log({ error });
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      savedLocalStorage("quickinvest_token", data?.token);
      navigate("/admin");
      popupShow = true;
      savedLocalStorage("quickinvest_token", data?.token);
      removeLocalStorage("otp_timer");
    } else {
      Notification(error?.data?.message, "error");
      refresh();
    }
  }, [error, data, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ value });
    if (Object.keys(errors).length > 0) {
      Notification(errors?.user_id || errors?.password, "error");
    } else {
      if (value.userId?.toUpperCase() !== "ADMIN") {
        // Notification("Invalid credential", "error");
      } else {
        const logData = {
          ...value,
          userId: value.userId.toUpperCase(),
        };
        console.log({ logData });
        await addLogin(logData);
      }
    }
  };
  useEffect(() => {
    setCaptcha({
      ...captcha,
      x: Math.floor(Math.random() * 10 + 1),
      y: Math.floor(Math.random() * 10 + 1),
    });
  }, [captchaRefresh]);

  const refresh = async () => {
    setCaptchaRefresh(!captchaRefresh);
  };
  const [showPassword, setShowPassword] = useState(false);
  // const token = getLocalStorage("hashPro_token");
  // useEffect(() => {
  //   if (token) {
  //     navigate("/admin");
  //   }
  // }, [token, navigate]);
  return (
    <>
      {/* <SocialIconeforLogin /> */}
      {/* <Header /> */}
      <div className="hashPro_dashboard_login_page_wrapper">
        <AuthCardLayout
          style={{ backgroundColor: "rgb(0 0 0 / 17%)" }}
          className="hashPro_dashboard_login_card hashPro_all_card"
        >
          <div className="hashPro_section_title">
            <h2>Login</h2>
          </div>
          <div className="hr_border"></div>
          {/* <SocialIconForCardHearder /> */}
          <div className="hashPro_dashboard_login_content">
            <form onSubmit={handleSubmit}>
              <div className="form_group" style={{ display: "inherit" }}>
                <Input
                  label="User ID"
                  type="text"
                  name="userId"
                  placeholder="Enter your user ID"
                  onChange={handleChange}
                  value={value.user_id}
                  className="userid_input input_field"
                  inputGroupClass="right"
                />
              </div>
              <div className="form_group" style={{ display: "inherit" }}>
                <Input
                  label="Password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={value.password}
                  className="password_input input_field"
                  inputGroupClass="right"
                />
                <span
                  style={{ marginTop: "0px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              {/* {true && (
                <>
                  <div className="captchaContainer">
                    <p>{captcha?.x}</p>
                    <p>+</p>
                    <p>{captcha?.y}</p>
                    <p>=</p>
                    <input
                      name="captchaConfirm"
                      onChange={handleChange}
                      value={value.captchaConfirm}
                    />
                    <span onClick={() => refresh()} tooltip="refresh">
                      <HiOutlineRefresh />
                    </span>
                  </div>
                </>
              )} */}
              <Button
                type="submit"
                className="submit_btn"
                // disabled={OTPup}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </div>
        </AuthCardLayout>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AdminLogin;
