import React from "react";
import { Button } from "flowbite-react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import FishPackageComponent from "../../components/FishPackageComponent";

export default function FishPackage() {
  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="/" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Management</Breadcrumb.Item>
          <Breadcrumb.Item>Fish Package</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <FishPackageComponent />
    </div>
  );
}
