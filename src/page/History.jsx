import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate } from "react-router-dom";

const History = () => {
  const nav = useNavigate();
  const [monthlySales, setMonthlySales] = useState({});
  const [yearlySales, setYearlySales] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) nav("/");

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/orders/getAllOrders"
      );
      const data = await response.json();

      if (response.ok && Array.isArray(data.data.order)) {
        const completedOrders = data.data.order.filter(
          (order) => order.status === "completed"
        );

        const monthly = {};
        const yearly = {};

        completedOrders.forEach((order) => {
          const amount = order.total || 0;
          const date = new Date(order.createdAt);

          const year = date.getFullYear();
          const monthName = date.toLocaleString("default", { month: "long" });
          const monthKey = `${monthName} ${year}`;

          // ✅ Monthly Sales
          if (!monthly[monthKey]) monthly[monthKey] = 0;
          monthly[monthKey] += amount;

          // ✅ Yearly Sales
          if (!yearly[year]) yearly[year] = 0;
          yearly[year] += amount;
        });

        setMonthlySales(monthly);
        setYearlySales(yearly);
      } else {
        alert(data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <div className="w-full bg-[#181D14] p-6 overflow-y-auto text-white">
        <h1 className="text-3xl font-semibold mb-6">📊 Sales History</h1>

        {loading ? (
          <p className="text-gray-400">Loading sales data...</p>
        ) : (
          <div className="space-y-10">
            {/* ✅ Monthly Breakdown */}
            <div className="bg-[#242e24] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Monthly Sales
              </h2>
              <table className="min-w-full text-sm text-left text-white">
                <thead>
                  <tr className="border-b border-white">
                    <th className="px-4 py-2">Month</th>
                    <th className="px-4 py-2">Total Sales (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(monthlySales).map(([month, total], idx) => (
                    <tr key={idx} className="border-b border-white">
                      <td className="px-4 py-2">{month}</td>
                      <td className="px-4 py-2">Rs. {total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Yearly Breakdown */}
            <div className="bg-[#242e24] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Yearly Sales
              </h2>
              <table className="min-w-full text-sm text-left text-white">
                <thead>
                  <tr className="border-b border-white">
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Total Sales (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(yearlySales).map(([year, total], idx) => (
                    <tr key={idx} className="border-b border-white">
                      <td className="px-4 py-2">{year}</td>
                      <td className="px-4 py-2">Rs. {total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
