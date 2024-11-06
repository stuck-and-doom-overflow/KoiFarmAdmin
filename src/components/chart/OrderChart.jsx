import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const OrderLineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Orders Per Day",
        data: [],
        borderColor: "blue",
        fill: false,
      },
    ],
  });

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 50,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch("http://192.168.1.14:5000/api/orders");
        const data = await response.json();

        const orderCountByDate = data.reduce((acc, order) => {
          const date = order.createdDate.split("T")[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const dates = Object.keys(orderCountByDate).sort();
        const ordersPerDay = dates.map((date) => orderCountByDate[date]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Total Orders Per Day",
              data: ordersPerDay,
              borderColor: "blue",
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div style={{width:'80%'}}>
      <Line
        data={chartData}
        options={chartOptions}
        style={{ background: "#f9fafb", borderRadius: "12px" }}
      />
    </div>
  );
};

export default OrderLineChart;
