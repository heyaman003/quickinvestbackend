import { Bounce, toast } from "react-toastify";

export const Notification = (msg, type) => {
    const options = {
      autoClose: 1500,
      type: type,
      hideProgressBar: false,
      position: 'top-center',
      pauseOnHover: false,
      transition: Bounce,
    };
    return toast(msg, options);
  };
  