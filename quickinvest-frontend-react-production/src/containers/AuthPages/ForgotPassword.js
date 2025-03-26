import React, { useEffect, useState } from "react";
import { MdQuestionAnswer } from "react-icons/md";
import { FaMobileAlt, FaQuestion } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { securityQuestions } from "../../utils/securityQuestions";
import { useForgotPassWordMutation } from "../../services/User.Auth";
import { getLocalStorage } from "../../utils/localStorage";
import { Notification } from "../../components/Admin/Notification/Notification";

const ForgotPassword = () => {
  const navigate = useNavigate();
  // If already user logged In then redirect to the dashboard
  useEffect(() => {
    if (getLocalStorage("quickinvest_token")) {
      navigate("/dashboard");
    }
  }, []);
  const [value, setValue] = useState({});
  const [token, setToken] = useState();
  const [forgotPassword, { data, error }] = useForgotPassWordMutation();

  useEffect(() => {
    if (data && data.token) {
      Notification(data?.message, "success");
      setToken(data.token);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [data, error]);
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (value) {
        await forgotPassword(value);
      }
      // navigate(`/reset-password?token=${token}`);
    } catch (error) {
      console.error("Forgot password failed:", error);
    }
  };
  useEffect(() => {
    // Check if token is defined and navigate accordingly
    if (token) {
      navigate(`/reset-password?token=${token}`);
    }
  }, [token, navigate]);

  return (
    <div className="tb__layout">
      <div className="user__container">
        <div className="tb__auth__content">
          <div className="tb__auth__heading">
            <h2>Forgot Password</h2>
          </div>
          <div className="tb__auth__form">
            <div className="tb__auth__group">
              <form onSubmit={handleSubmit}>
                <div className="tb__form__group">
                  <p>
                    <FaMobileAlt />{" "}
                    <label htmlFor="number">Mobile Number</label>
                  </p>
                  <input
                    type="number"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    onChange={handleChange}
                  />
                </div>
                <div className="tb__form__group">
                  <p>
                    <FaQuestion />{" "}
                    <label htmlFor="question">Security Question</label>
                  </p>
                  <select name="question" onChange={handleChange}>
                    <option value="">--Select--</option>
                    {securityQuestions?.map((d, i) => (
                      <option value={d} key={i + 1}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="tb__form__group">
                  <p>
                    <MdQuestionAnswer /> <label htmlFor="answer">Answer</label>
                  </p>
                  <input
                    type="text"
                    name="answer"
                    placeholder="Enter your question answer"
                    onChange={handleChange}
                  />
                </div>
                <div className="tb__form__group button__area">
                  <div className="auth__button">
                    <button type="submit">Forgot Password</button>
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

export default ForgotPassword;
