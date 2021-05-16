import React from "react";
import logo from "./Assets/logo.png";
import bg from "./Assets/bg.jpg";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <div
        className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5"
        style={{ padding: "0 4rem" }}
      >
        <div className="total text-center">
          <img src={logo} alt="" className="logo" />
          <br />
        </div>
        {children}
      </div>
      <div
        className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block bg cover vh-100 mt-n1 mr-n3"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
    </div>
  );
};

export default Layout;
