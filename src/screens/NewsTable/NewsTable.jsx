import React from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import NewsTableComponent from "../../components/NewsTableComponent";

export default function NewsTable() {
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
          <Breadcrumb.Item>News</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <NewsTableComponent />
    </div>
  );
}
