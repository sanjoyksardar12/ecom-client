import React from "react";
import { Outlet } from "react-router-dom";
import NotificationManager from "../notification-manager";
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
      <NotificationManager />
    </div>
  );
}

export default Layout;
