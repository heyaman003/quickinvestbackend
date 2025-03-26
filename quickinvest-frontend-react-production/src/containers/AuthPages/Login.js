import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogInUserMutation } from "../../services/User.Auth";
import { Notification } from "../../components/Admin/Notification/Notification";
import { getLocalStorage, savedLocalStorage } from "../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { data, error, isLoading }] = useLogInUserMutation();
  useEffect(() => {
    if (getLocalStorage("quickinvest_token")) {
      navigate("/dashboard");
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState({});
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      savedLocalStorage("quickinvest_token", data?.token);
      navigate("/dashboard");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/dashboard");
    const obj = {
      ...value,
      userId: value?.userId?.toUpperCase(),
    };
    loginUser(obj);
  };

  return (
    <div className="tb__layout">
      <div className="user__container">
        <div className="tb__auth__content">
          <div className="tb__auth__heading">
            <h2>Login</h2>
          </div>
          <div className="tb__auth__form">
            <div className="tb__auth__group">
              <form onSubmit={handleSubmit}>
                <div className="tb__form__group">
                  <p>
                    <MdOutlineMail />{" "}
                    <label htmlFor="user">User ID or Mobile Number</label>
                  </p>
                  <input
                    type="text"
                    name="userId"
                    placeholder="Enter your user id or phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="tb__form__group">
                  <p>
                    <FaUnlockKeyhole />{" "}
                    <label htmlFor="password">Password</label>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
                  <span>
                    {showPassword ? (
                      <FaRegEye
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </span>
                </div>
                <div className="tb__form__group">
                  <div className="forgot__text">
                    <p>
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </p>
                  </div>
                </div>
                <div className="tb__form__group button__area">
                  <div className="auth__button">
                    <button type="submit">Login</button>
                  </div>
                </div>
                <div className="tb__auth__footer">
                  <p>
                    Don't have an Account? <Link to="/register">Sign Up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
