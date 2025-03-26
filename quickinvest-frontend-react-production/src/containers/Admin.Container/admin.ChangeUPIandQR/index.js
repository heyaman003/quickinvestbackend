import React, { useEffect, useState } from "react";
import CardLayout from "../../../components/Admin/CardLayout/CardLayout";
import Input from "../../../components/Admin/Input/Input";
import Button from "../../../components/Admin/Button/Button";
import { useChangeUPIandQRMutation } from "../../../services/AdminRecharge";
import { Notification } from "../../../components/ToastNotification";
const ChangeUPI = () => {
  const [data, setData] = useState({
    image: null,
    UPI: "",
  });

  const [updateUPI, { data: response, error, isLoading }] =
    useChangeUPIandQRMutation();

  useEffect(() => {
    if (response?.message) {
      Notification(response?.message, "success");
      setData({
        image: "",
        UPI: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, response]);

   const upiHandelChange = (e) => {
    const { name, value, files } = e.target;
    setData((prevProof) => ({
      ...prevProof,
      [name]: files ? files[0] : value,
    }));
  };

  const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("UPI", data.UPI);
    const formDataObject = formDataToObject(formData);
  
    await updateUPI(formData);
  };

  return (
    <div className="ss-trade_supportticket_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_supporttickett_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>Change UPI and QR Code</h2>
          {/* <p>Whenever, </p> */}
        </div>
        <div className="ss-trade_supportticket_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <div className="purpose">
                <Input
                  label="QR Code "
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Enter your QR Code"
                  onChange={upiHandelChange}
                  className="input_field"
                  inputGroupClass="left"
                />
              </div>
              <div className="purpose">
                <Input
                  label="UPI"
                  type="text"
                  name="UPI"
                  id="UPI"
                  value={data.UPI}
                  placeholder="Enter your UPI"
                  onChange={upiHandelChange}
                  className="input_field"
                  inputGroupClass="left"
                />
              </div>
            </div>
            {/* <div
              className="form_group preview_image"
              style={{ display: "inherit" }}
            >
              <div className="img_preview">
                <iframe
                  title="Hello"
                  src={pdfLink?.data?.pdfLink}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                />
              </div>
            </div> */}
            <Button
              type="submit"
              className="submit_btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "submit"}
            </Button>
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default ChangeUPI;
