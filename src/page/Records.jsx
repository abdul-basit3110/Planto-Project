import React, { useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import { useNavigate } from "react-router-dom";

const Records = () => {
  const nav = useNavigate();
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) nav("/");

    fetchRecordsFromBackend();
  }, []);

  const fetchRecordsFromBackend = async () => {
    try {
      const response = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/orders/getAllOrders"
      );
      const data = await response.json();

      if (response.ok && Array.isArray(data.data.order)) {
        // ✅ sirf completed transactions rakho
        const completedOrders = data.data.order
          .filter((order) => order.status === "completed")
          .map((order) => ({
            id: order._id,
            date: order.createdAt || new Date().toISOString(),
            type: "Income",
            amount: order.total || 0,
            status: "Complete",
          }));

        setRecords(completedOrders);
      } else {
        alert(data.message || "Failed to fetch records.");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      alert("An error occurred while fetching records.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filter by month + search
  const filteredRecords = records.filter(record => {
    const recordDate = new Date(record.date);
    const recordMonth = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, "0")}`;

    const matchesMonth = month ? recordMonth === month : true;
    const matchesSearch =
      record.amount.toString().includes(search.toLowerCase()) ||
      record.status.toLowerCase().includes(search.toLowerCase());

    return matchesMonth && matchesSearch;
  });

  return (
    <div className='flex min-h-screen'>
      <LeftSidebar />
      <div className="w-[80%] min-h-screen bg-[#181D14] p-4 sm:p-6 md:p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-white mb-6">Transaction Records</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by amount or status..."
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
          </select>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto bg-[#242e24] rounded-xl shadow p-4">
          {loading ? (
            <p className="text-gray-400">Loading records...</p>
          ) : (
            <table className="min-w-full text-sm text-left text-white">
              <thead className="text-xs uppercase text-white font-semibold">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Amount (₨)</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <tr key={record.id} className="border-b border-white-900">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-green-500 font-medium">{record.type}</td>
                      <td className="px-4 py-2">₨ {record.amount.toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-600 text-white">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-gray-400">
                      No completed records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Records;

