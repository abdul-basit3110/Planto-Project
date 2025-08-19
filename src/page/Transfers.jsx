import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate } from "react-router-dom";

const Transfers = () => {
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/orders/getAllOrders"
      );
      const data = await response.json();

      if (response.ok && Array.isArray(data.data.order)) {
        // ✅ Only pick completed orders
        const completedTransfers = data.data.order
          .filter((order) => order.status === "completed")
          .map((order) => ({
            name: order.customer?.name || "N/A",
            amount: order.total || 0,
            date: new Date(order.createdAt).toLocaleDateString(),
            status: order.status,
          }));

        // ✅ Optional filter
        const filteredTransfers = completedTransfers.filter(
          (t) => t.name?.toLowerCase() !== "ali khan"
        );

        setTransfers(filteredTransfers);
      } else {
        alert(data.message || "Failed to fetch transfers.");
      }
    } catch (error) {
      console.error("Error fetching transfers:", error);
      alert("An error occurred while fetching transfers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <div className="w-full sm:px-8 sm:pt-8 bg-[#181D14] text-white">
        <h1 className="text-2xl font-semibold mb-6">Transfers</h1>

        <div className="bg-[#242e24] px-6 pt-6 pb-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">All Transfers</h2>

          {loading ? (
            <p className="text-gray-400">Loading transfers...</p>
          ) : transfers.length === 0 ? (
            <p className="text-gray-400">No transfers yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-[#242e24] text-left">
                <tr>
                  <th className="px-4 py-2">S.No</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">Rs: {item.amount}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">
                      <span className="text-green-500 bg-[#181D14] px-2 py-1 rounded-full text-xs">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfers;
