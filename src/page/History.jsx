import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate } from "react-router-dom";

const History = () => {
  const nav = useNavigate();
  const [yearlySales, setYearlySales] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) nav("/");

    calculateSales();
  }, []);

  const calculateSales = () => {
    const raw = localStorage.getItem("plantSales");
    if (!raw) return;

    const sales = JSON.parse(raw);
    const salesByYear = {};

    sales.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "short" });
      const price = item.price;

      if (!salesByYear[year]) {
        salesByYear[year] = {
          total: 0,
          monthly: {},
        };
      }

      salesByYear[year].total += price;
      salesByYear[year].monthly[month] = (salesByYear[year].monthly[month] || 0) + price;
    });

    setYearlySales(salesByYear);
  };

  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <div className="w-full bg-[#181D14] p-6 overflow-y-auto text-white">
        <h1 className="text-3xl font-semibold mb-6">📈 Plant Sales History</h1>

        {Object.keys(yearlySales).length === 0 ? (
          <p className="text-lg text-center mt-12">No sales data available yet.</p>
        ) : (
          Object.entries(yearlySales)
            .sort((a, b) => b[0] - a[0]) // latest year first
            .map(([year, data]) => (
              <div key={year} className="mb-10">
                <div className="bg-[#242e24] rounded-xl p-6 mb-4">
                  <h2 className="text-2xl font-bold text-green-400 mb-2">📅 Year: {year}</h2>
                  <p className="text-lg">
                    <strong>Total Sale:</strong> Rs. {data.total.toLocaleString()}
                  </p>
                </div>

                <div className="bg-[#242e24] rounded-xl p-4">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    📊 Monthly Breakdown ({year})
                  </h3>
                  <table className="min-w-full text-sm text-left text-white">
                    <thead>
                      <tr className="text-green-400 border-b border-green-700">
                        <th className="px-4 py-2">Month</th>
                        <th className="px-4 py-2">Total Sale (PKR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.monthly).map(([month, total], idx) => (
                        <tr key={idx} className="border-b border-green-900">
                          <td className="px-4 py-2">{month}</td>
                          <td className="px-4 py-2">Rs. {total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default History;
