import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate } from "react-router-dom";

const History = () => {
  const nav = useNavigate();
  const [monthlySales, setMonthlySales] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) nav("/");

    calculateMonthlySales();
  }, []);

  const calculateMonthlySales = () => {
    const raw = localStorage.getItem("plantSales");
    if (!raw) return;

    const sales = JSON.parse(raw);
    const salesByMonth = {};

    sales.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" }); // e.g. "August"
      const price = item.price || item.amount || 0;

      if (year === 2025) {   // ✅ sirf 2025 ka data
        if (!salesByMonth[month]) salesByMonth[month] = 0;
        salesByMonth[month] += price;
      }
    });

    setMonthlySales(salesByMonth);
  };

  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <div className="w-full bg-[#181D14] p-6 overflow-y-auto text-white">
        <h1 className="text-3xl font-semibold mb-6">📊 2025 Monthly Sales</h1>

        {Object.keys(monthlySales).length === 0 ? (
          <p className="text-lg text-center mt-12">No sales data available for 2025.</p>
        ) : (
          <div className="bg-[#242e24] rounded-xl p-6">
            <table className="min-w-full text-sm text-left text-white">
              <thead>
                <tr className="text-green-400 border-b border-green-700">
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2">Total Sales (PKR)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(monthlySales).map(([month, total], idx) => (
                  <tr key={idx} className="border-b border-green-900">
                    <td className="px-4 py-2">{month}</td>
                    <td className="px-4 py-2">Rs. {total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
