import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Example plant data (replace with dynamic if needed)
// const plantData = {
//   labels: ["Rose", "Lily", "Cathlea", "Sunflower"],
//   datasets: [
//     {
//       label: "Monthly Orders",
//       data: [120, 90, 75, 150], // You can replace this with real data
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.7)",
//         "rgba(54, 162, 235, 0.7)",
//         "rgba(255, 206, 86, 0.7)",
//         "rgba(75, 192, 192, 0.7)",
//       ],
//       borderRadius: 10,
//     },
//   ],
// };

// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: { position: "top", labels: { color: "white" } },
//     title: { display: true, text: "Plant Analytics", color: "white" },
//   },
//   scales: {
//     x: {
//       ticks: { color: "white" },
//       grid: { color: "#444" },
//     },
//     y: {
//       ticks: { color: "white" },
//       grid: { color: "#444" },
//     },
//   },
// };


const Analytics = () => {
  const nav = useNavigate();

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/");
    }

    const fetchPlants = async () => {
      try {
        const response = await fetch(
          "https://eb-project-backend-kappa.vercel.app/api/v0/plants/getAll"
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to fetch plants");
        setPlants(result.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [nav]);

  // === Analytics Calculations ===
  const totalPlants = plants.length;
  const indoorPlants = plants.filter((p) => p.category === "indoor").length;
  const outdoorPlants = plants.filter((p) => p.category === "outdoor").length;
  const availablePlants = plants.filter((p) => p.status === "Available").length;
  const unavailablePlants = plants.filter((p) => p.status === "Not Available").length;
  // const uniqueTypes = new Set(plants.map((p) => p.type)).size;
  const averagePrice =
    plants.length > 0
      ? (plants.reduce((acc, p) => acc + (parseFloat(p.price) || 0), 0) / plants.length).toFixed(2)
      : 0;

  // const recentPlants = [...plants]
  //   .filter(p => p.createdAt)
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //   .slice(0, 3);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#181D14]">
      <LeftSidebar />

      <div className="flex-1 w-full p-4 sm:p-6 md:p-8 overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
          Analytics Dashboard
        </h1>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
                <h2 className="text-sm font-medium text-white">Total Plants</h2>
                <p className="text-2xl font-bold text-white">{totalPlants}</p>
              </div>
              <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
                <h2 className="text-sm font-medium text-white">Indoor / Outdoor</h2>
                <p className="text-2xl font-bold text-white">{indoorPlants} / {outdoorPlants}</p>
              </div>
              <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
                <h2 className="text-sm font-medium text-white">Available</h2>
                <p className="text-2xl font-bold text-green-500">{availablePlants}</p>
              </div>
              <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
                <h2 className="text-sm font-medium text-white">Avg. Price</h2>
                <p className="text-2xl font-bold text-white">Rs: {averagePrice}</p>
              </div>
            </div>

            {/* Additional Stats */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"> */}
              <div className="bg-[#242e24] p-6 rounded-lg shadow-md w-[270px]">
                <h2 className="text-sm font-medium text-white">Not Available</h2>
                <p className="text-2xl font-bold text-red-400">{unavailablePlants}</p>
              </div>
              {/* <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
                <h2 className="text-sm font-medium text-white">Unique Types</h2>
                <p className="text-2xl font-bold text-white">{uniqueTypes}</p>
              </div>
            </div> */}

            {/* Chart Placeholder */}
            {/* <div className="bg-[#242e24] p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Monthly Activity</h2>
              <div className="h-64 flex items-center justify-center text-white border-dashed border-2 border-gray-500 rounded-lg">
                [ Chart Placeholder ]
              </div>
            </div> */}

            {/* Recent Activity
            <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
              <ul className="space-y-4">
                {recentPlants.length === 0 ? (
                  <li className="text-sm text-gray-400">No recent activity.</li>
                ) : (
                  recentPlants.map((plant, i) => (
                    <li key={i} className="flex justify-between text-sm text-white">
                      <span>{plant.plantname} added</span>
                      <span className="text-gray-400">
                        {new Date(plant.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
