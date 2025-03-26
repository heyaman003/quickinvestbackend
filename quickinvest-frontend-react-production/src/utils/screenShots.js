import html2canvas from "html2canvas";

export const takeScreenshot = (targetedDiv, imageName) => {
  const targetDiv = document.getElementById(targetedDiv);
  html2canvas(targetDiv).then(function (canvas) {
    const screenshotUrl = canvas.toDataURL("image/jpg");
    const downloadLink = document.createElement("a");
    downloadLink.href = screenshotUrl;
    downloadLink.download = imageName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
};
