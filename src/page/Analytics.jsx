import React, { useEffect } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/");
    }
  }, [nav]); // ✅ Added dependency array

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#181D14]">
      <LeftSidebar />

      <div className="flex-1 w-full p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
          Analytics Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-white">Users</h2>
            <p className="text-2xl font-bold text-white">1,234</p>
          </div>
          <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-white">Transactions</h2>
            <p className="text-2xl font-bold text-white">$8,730</p>
          </div>
          <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-white">Revenue</h2>
            <p className="text-2xl font-bold text-white">$12,340</p>
          </div>
          <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
            <h2 className="text-sm font-medium text-white">Growth</h2>
            <p className="text-2xl font-bold text-green-600">+18%</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-[#242e24] p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Activity</h2>
          <div className="h-64 flex items-center justify-center text-white border-dashed border-2 border-gray-500 rounded-lg">
            [ Chart Placeholder ]
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#242e24] p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex justify-between text-sm text-white">
              <span>User Hammad made a transfer</span>
              <span className="text-gray-400">2 hours ago</span>
            </li>
            <li className="flex justify-between text-sm text-white">
              <span>New user Toto registered</span>
              <span className="text-gray-400">5 hours ago</span>
            </li>
            <li className="flex justify-between text-sm text-white">
              <span>Revenue report updated</span>
              <span className="text-gray-400">Yesterday</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

