import React, { useEffect } from "react";
import { useAddRunROIMutation } from "../../../Services/userApi";
import { Notification } from "../../../components/ToastNotification";

function ManageFunction() {
  const [runROI, { error, data, isLoading }] = useAddRunROIMutation();
  useEffect(() => {
    if (data?.success) {
      Notification(data?.message, "success");
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [data, error]);
  const handleRunROI = async () => {
    runROI();
  };
  return (
    <div>
      ManageFunction
      <button onClick={handleRunROI}>Run ROI</button>
    </div>
  );
}

export default ManageFunction;
