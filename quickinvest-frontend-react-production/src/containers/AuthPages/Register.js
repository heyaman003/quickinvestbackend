import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaMobileAlt, FaQuestion, FaRegEye, FaUser } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { securityQuestions } from "../../utils/securityQuestions";
import Modal from "../../components/Modal";
import { takeScreenshot } from "../../utils/screenShots";
import {
  useGetValidateSponsorIdQuery,
  useSignUpUserMutation,
} from "../../services/User.Auth";
import { Notification } from "../../components/Admin/Notification/Notification";
import { Validate } from "../../components/Validate/Validate";
import { getLocalStorage } from "../../utils/localStorage";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // If already user logged In then redirect to the dashboard
  useEffect(() => {
    if (getLocalStorage("quickinvest_token")) {
      navigate("/dashboard");
    }
  }, []);
  // API Call
  const [addUser, { data, error, isLoading }] = useSignUpUserMutation();
  // sponosr id validate

  const sponsorId = location.search.split("=")[1] || "";
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sponsorName, setSponsorName] = useState("");

  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [value, setValue] = useState({
    sponsorId: sponsorId || "",
    sponsorName: sponsorName || "",
  });
  const userId = value?.sponsorId?.toUpperCase();
  const { data: sponsoridData, error: sponsoridError } =
    useGetValidateSponsorIdQuery(userId);

  console.log({ data,sponsoridError });

  useEffect(() => {
    if (sponsoridData) {
      setSponsorName(sponsoridData?.name);
      // Use the functional update form to correctly update the state
      setValue((prevValue) => ({
        ...prevValue,
        sponsorName: sponsoridData.name,
      }));
    }
  }, [sponsoridData]);
  // error
  useEffect(() => {
    setErrors(Validate(value));
  }, [value]);

  useEffect(() => {
    if (data?.message) {
      Notification(data?.message, "success");
      setOpenModal(true);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification("All conditions and fields are required", "error");
    }
    addUser(value);
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const Screenshot = () => {
    takeScreenshot("targetDiv", "welcome-letter.png");
    navigate("/login");
  };
  const handelCloseModal = () => {
    setOpenModal(false);
    navigate("/login");
  };
  return (
    <>
      <div className="tb__layout">
        <div className="user__container layout__container">
          <div className="tb__auth__content">
            <div className="tb__auth__heading">
              <h2>Sign Up</h2>
            </div>
            <div className="tb__auth__form">
              <div className="tb__auth__group">
                <form onSubmit={handleSubmit}>
                  <div className="tb__form__group">
                    <p>
                      <FaUser /> <label htmlFor="name">Name</label>
                    </p>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="tb__form__group">
                    <p>
                      <FaMobileAlt />{" "}
                      <label htmlFor="mobile">Mobile Number</label>
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
                    <p>
                      <FaUnlockKeyhole />{" "}
                      <label htmlFor="password">Confirm Password</label>
                    </p>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Enter your confirm password"
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
                    <p>
                      <MdOutlineMail />{" "}
                      <label htmlFor="invite">Invite Code</label>
                    </p>
                    <input
                      type="text"
                      name="sponsorId"
                      placeholder="Enter your invite code"
                      onChange={handleChange}
                      defaultValue={value.sponsorId}
                      // disabled={sponsorId ? true : false}
                    />
                    {sponsoridData && (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "green",
                          marginLeft: "60px",
                        }}
                      >
                        {sponsoridData?.name}
                      </p>
                    )}
                    {sponsoridError && (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "red",
                          marginLeft: "60px",
                        }}
                      >
                        {sponsoridData?.data?.message}
                      </p>
                    )}
                  </div>
                  <div className="tb__form__group">
                    <p>
                      <FaQuestion />
                      <label htmlFor="invite">Answer A Question</label>
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
                  {value?.question && (
                    <div className="tb__form__group">
                      <p>
                        <MdQuestionAnswer />{" "}
                        <label htmlFor="answer">Answer</label>
                      </p>
                      <input
                        type="text"
                        name="answer"
                        placeholder="Enter your question answer"
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="tb__form__group button__area">
                    <div className="auth__button">
                      <button type="submit">
                        {isLoading ? "Loading" : "Sign Up"}
                      </button>
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

          <Modal
            openModal={openModal ? "active" : undefined}
            closeModal={handelCloseModal}
            modalTitle="Welcome Letter"
          >
            <div id="targetDiv" style={{ padding: "10px" }}>
              <p>
                <strong>User ID:</strong> <span>{data?.data?.userId}</span>
              </p>
              <p>
                <strong>Name:</strong> <span>{data?.data?.fullName}</span>
              </p>
              <p>
                <strong>Password:</strong> <span>{data?.data?.password}</span>
              </p>
              <p>
                <strong>Number:</strong> <span>{data?.data?.mobile}</span>
              </p>
            </div>
            <div className="modal__footer__area">
              <button type="button" onClick={Screenshot}>
                Screenshot
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Register;
