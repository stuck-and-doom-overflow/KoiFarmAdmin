import React from "react";
import FishPieChart from "../../components/chart/FishChart";
import OrderLineChart from "../../components/chart/OrderChart";
import { TotalUserCard } from "../../components/chart/TotalUserCard";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function Home() {
  return (
    <>
      <Breadcrumb
        aria-label="Default breadcrumb example"
        style={{ marginTop: "2%" }}
      >
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <h1 style={{ marginTop: "2%", fontSize: 22, fontWeight: 600 }}>
        Dashboard
      </h1>
      <div style={{ marginTop: "2%" }}>
        <TotalUserCard />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "4%",
          gap: "4%",
        }}
      >
        <FishPieChart />
        <OrderLineChart />
      </div>
    </>
  );
}
