import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const FishPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Total Fish", "Total Fish Packages"],
    datasets: [
      {
        label: "Fish Data",
        data: [],
        backgroundColor: ["blue", "green"],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fishResponse = await fetch("http://192.168.1.14:5000/api/fishs/");
        const fishData = await fishResponse.json();

        const packagesResponse = await fetch(
          "http://192.168.1.14:5000/api/fish-packages"
        );
        const packagesData = await packagesResponse.json();

        const totalFish = fishData.length;
        const totalFishPackages = packagesData.length;

        setChartData({
          labels: ["Total Fish", "Total Fish Packages"],
          datasets: [
            {
              label: "Fish Data",
              data: [totalFish, totalFishPackages],
              backgroundColor: ["#cfe4e3", "#ffe1e6"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching fish data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "40%" }}>
      <Pie data={chartData} style={{ height: "40%" }} />
      {/* <span style={{textAlign:'center'}}>
        Total fishes & total packages of fish
      </span> */}
    </div>
  );
};

export default FishPieChart;
