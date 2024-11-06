import React from "react";
import { FishTableComponent } from "../../components/FishTableComponent";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function FishesTable() {
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
          <Breadcrumb.Item>Fishes</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <FishTableComponent />
    </div>
  );
}
