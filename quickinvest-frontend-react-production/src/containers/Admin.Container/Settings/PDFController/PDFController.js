import React, { useEffect, useState } from "react";
import CardLayout from "../../../../components/Admin/CardLayout/CardLayout";
import Input from "../../../../components/Admin/Input/Input";
import Button from "../../../../components/Admin/Button/Button";
import {
  useChangePdfLindMutation,
  useGetPDFLinkQuery,
} from "../../../../services/Admin.Setting";
import { Notification } from "../../../../components/ToastNotification";

const PDFController = () => {
  const [data, setData] = useState({
    pdfLink: "",
  });
  //   get image link
  const { data: pdfLink } = useGetPDFLinkQuery();

  console.log({ pdfLink });
  console.log(pdfLink?.pdfLink);
  const [addPdfLink, { data: response, error, isLoading }] =
    useChangePdfLindMutation();

  useEffect(() => {
    if (response?.message) {
      Notification(response?.message, "success");
      setData({
        pdfLink: "",
      });
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.pdfLink) {
      Notification("All field are required", "error");
    } else {
      await addPdfLink(data);
    }
  };

  return (
    <div className="ss-trade_supportticket_page_wrapper">
      <CardLayout
        style={{ backgroundColor: "#fff" }}
        className="ss-trade_supporttickett_form_card"
      >
        <div className="ss-trade_section_title">
          <h2>PDF Controller</h2>
          {/* <p>Whenever, </p> */}
        </div>
        <div className="ss-trade_supportticket_page_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <div className="purpose">
                <Input
                  label="PDF"
                  type="text"
                  name="pdfLink"
                  id="proof"
                  value={data.pdfLink}
                  placeholder="Enter your pdf link"
                  onChange={(e) =>
                    setData({ ...data, pdfLink: e.target.value })
                  }
                  className="input_field"
                  inputGroupClass="left"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="submit_btn"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "submit"}
            </Button>
            <div
              className="form_group preview_image"
              style={{ display: "inherit" }}
            >
              <div className="img_preview">
                <iframe
                  title="Hello"
                  src={pdfLink?.pdfLink}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                />
              </div>
            </div>
           
          </form>
        </div>
      </CardLayout>
    </div>
  );
};

export default PDFController;
