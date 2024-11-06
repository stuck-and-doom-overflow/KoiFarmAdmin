import React from "react";
import { Outlet } from "react-router-dom";
import { NavBarComponent } from "./components/NavBarComponent";
import { SidebarComponent } from "./components/SideBarComponent";

export default function Layout() {
  return (
    <div>
      <NavBarComponent />
      <div
        className=""
        style={{
          display: "grid",
          gridTemplateColumns: "0.2fr 0.7fr",
          gap: "2%",
        }}
      >
        <SidebarComponent />
        <main >
          <Outlet />
        </main>
      </div>
    </div>
    // style={{backgroundColor:'#f9fafb'}}
  );
}
