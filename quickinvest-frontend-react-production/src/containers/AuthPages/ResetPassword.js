import React, { useEffect, useState } from "react";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useResetPassWordMutation } from "../../services/User.Auth";
import { Notification } from "../../components/ToastNotification";
import { useLocation } from "react-router-dom";
import { getLocalStorage } from "../../utils/localStorage";
const ResetPassword = () => {
  const navigate = useNavigate();
  // If already user logged In then redirect to the dashboard
  useEffect(() => {
    if (getLocalStorage("quickinvest_token")) {
      navigate("/dashboard");
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassWord, { data, error }] = useResetPassWordMutation();
  const location = useLocation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get("token");

    if (tokenFromQuery) {
      setToken(tokenFromQuery);
      // Now, 'token' state contains the value of the token from the URL
    }
  }, [location.search]);
  console.log("error", error?.data?.message);
  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      navigate("/login");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [data, error]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      // Handle error - Password fields cannot be empty
      Notification("Password fields cannot be empty", "error");
      return;
    }

    if (password !== confirmPassword) {
      // Handle error - Passwords do not match
      Notification("Passwords do not match", "error");

      return;
    }
    const obj = {
      password,
      confirmPassword,
      token,
    };
    console.log({ obj });
    // Perform the password reset
    await resetPassWord(obj);
  };

  return (
    <div className="tb__layout">
      <div className="user__container">
        <div className="tb__auth__content">
          <div className="tb__auth__heading">
            <h2>Reset Password</h2>
          </div>
          <div className="tb__auth__form">
            <div className="tb__auth__group">
              <form onSubmit={handleSubmit}>
                <div className="tb__form__group">
                  <p>
                    <FaUnlockKeyhole />{" "}
                    <label htmlFor="password">New Password</label>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="tb__form__group">
                  <p>
                    <FaUnlockKeyhole />{" "}
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Enter your confirm new password"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="tb__form__group">
                  <div className="showPasswordCheckBox">
                    <input
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                      id="showPassword"
                    />{" "}
                    <label htmlFor="showPassword">Show Password</label>
                  </div>
                </div>
                <div className="tb__form__group button__area">
                  <div className="auth__button">
                    <button type="submit">Reset Password</button>
                  </div>
                </div>
                <div className="tb__auth__footer">
                  <p>
                    Already have an Account? <Link to="/login">Sign In</Link>
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

export default ResetPassword;
