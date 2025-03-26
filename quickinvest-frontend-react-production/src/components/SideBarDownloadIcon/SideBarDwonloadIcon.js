import html2canvas from "html2canvas";
import downloadjs from "downloadjs";
import jsPDF from "jspdf";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { RiScreenshotFill } from "react-icons/ri";

const handleDownloadScreeshot = async (pageName) => {
  const canvas = await html2canvas(document.body);
  const dataURL = canvas.toDataURL("image/png");
  downloadjs(dataURL, pageName, "image/png");
};

const handleDownloadPDF = async (width, height, pageName) => {
  const canvas = await html2canvas(document.body);
  const dataURL = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  pdf.addImage(dataURL, "JPEG", 0, 0, parseInt(width), parseInt(height));
  pdf.save(pageName);
};

const SideBarDownloadIcon = (props) => {
  return (
    // <div className="download-menu">
      // {/* <AiOutlineBars onClick={handleDownload} className="download_menu_icon" /> */}
      <ul>
        <li>
          <RiScreenshotFill
            onClick={()=>handleDownloadScreeshot(props.pageName)}
            className="download_icon download_menu_icon"
          />
        </li>
        <li className="download_pdf_hidden">
          <AiOutlineDownload
            onClick={()=>handleDownloadPDF(props.width,props.height, props.pageName)}
            className="screenshot_icon download_menu_icon"
          />
        </li>
      </ul>
    // {/* </div> */}
  );
};

export default SideBarDownloadIcon;
