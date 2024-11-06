import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const FishPieChart = () => {
  const [fishData, setFishData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [], // Labels for each category in the pie chart
    datasets: [
      {
        label: "Fish Data",
        data: [], // Data points for each category
        backgroundColor: ["blue", "green"], // Colors for each slice
      },
    ],
  });

  useEffect(() => {
    const fetchFishData = async () => {
      try {
        const response = await fetch("http://192.168.1.14:5000/api/fishs/");
        const data = await response.json();
        setFishData(data);

        // Calculate total fish and fish packages
        const totalFish = data.length;
        const totalFishPackages = Object.values(
          data.reduce((acc, fish) => {
            acc[fish.type] = (acc[fish.type] || 0) + 1;
            return acc;
          }, {})
        ).reduce((sum, typeCount) => sum + typeCount, 0);

        // Update chart data for the pie chart
        setChartData({
          labels: ["Total Fish", "Total Fish Packages"],
          datasets: [
            {
              label: "Fish Data",
              data: [totalFish, totalFishPackages],
              backgroundColor: ["blue", "green"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching fish data:", error);
      }
    };

    fetchFishData();
  }, []);

  return (
    <div>
      <h2>Fish and Fish Package Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default FishPieChart;
