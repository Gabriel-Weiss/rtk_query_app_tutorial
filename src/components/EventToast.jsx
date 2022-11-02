import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventToast = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={1000}
      hideProgressBar
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="colored"
    />
  );
};

export default EventToast;
