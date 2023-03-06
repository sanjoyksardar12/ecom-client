import React from "react";
import { Outlet } from "react-router-dom";
import Toast from "../toast";
import Header from "../header";
import "./layout.css";

function Layout() {
  return (
    <div className="page-container">
      <Header />
      <div className="docContent">
      <div className="page-content">
      <Outlet />
      </div>
        
      </div>
      <Toast />
    </div>
  );
}

export default Layout;
