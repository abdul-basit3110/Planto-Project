import React, { useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import { useNavigate } from "react-router-dom";

const Records = () => {
  const nav = useNavigate();
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) nav("/");

    fetchRecordsFromLocalStorage();
  }, []);

  const fetchRecordsFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("plantSales")) || [];
    // Normalize or enhance data if needed
    const enhanced = data.map((item, index) => ({
      id: index + 1,
      date: item.date || new Date().toISOString(),
      type: "Income", // assuming buying plants = income
      amount: item.price || 0,
      description: item.name || "Plant",
    }));
    setRecords(enhanced);
  };

  const filteredRecords = records.filter(record =>
    record.description.toLowerCase().includes(search.toLowerCase()) &&
    (month ? record.date.startsWith(month) : true)
  );

  return (
    <div className='flex min-h-screen'>
      <LeftSidebar />
      <div className="w-[80%] min-h-screen bg-[#181D14] p-4 sm:p-6 md:p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-white mb-6">Transaction Records</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by plant name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 bg-[#242e24] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 bg-[#242e24] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Filter by Month</option>
            <option value="2025-08">August 2025</option>
            <option value="2025-07">July 2025</option>
            <option value="2025-06">June 2025</option>
            {/* Add more months as needed */}
          </select>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto bg-[#242e24] rounded-xl shadow p-4">
          <table className="min-w-full text-sm text-left text-white">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount (PKR)</th>
                <th className="px-4 py-3">Plant</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-green-900">
                    <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-green-500 font-medium">{record.type}</td>
                    <td className="px-4 py-2">₨ {record.amount.toLocaleString()}</td>
                    <td className="px-4 py-2">{record.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-center text-gray-400">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Records;
