import React from "react";
import Helmet from "react-helmet";
import { ToastContainer } from "react-toastify";
import logo from "../assets/images/logo.png";
import Routers from "../routers";
const App = () => {
  return (
    <>
      <Helmet>
        <title>Welcome to QuickInvest</title>
        {/* google font family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="shortcut icon" href={logo} type="image/x-icon" />
        <link rel="apple-touch-icon" href={logo} />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ToastContainer
        autoClose={3000}
        pauseOnHover={false}
        position="top-center"
      />
      <Routers />
    </>
  );
};

export default App;
