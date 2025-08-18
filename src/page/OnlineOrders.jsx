import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/orders/getAllOrders"
      );
      const data = await response.json();
      if (response.ok && Array.isArray(data.data.order)) {
        setOrders(data.data.order);
      } else {
        alert(data.message || "Failed to fetch order.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const response = await fetch(
        `https://eb-project-backend-kappa.vercel.app/api/v0/orders/deleteOrder/${orderId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        }
      );
      if (response.ok) {
        alert("Order deleted.");
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      } else {
        alert("Failed to delete order.");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting order.");
    }
  };

  const handleEdit = (order) => {
    setEditId(order._id);
    setEditData({ status: order.status });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(
        `https://eb-project-backend-kappa.vercel.app/api/v0/orders/updateOrder/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editData, orderId: id }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to update");

      alert("Order updated.");

      // 🔥 Store completed order in localStorage for Transfers page
      if (editData.status === "completed") {
        const completedOrder = orders.find((order) => order._id === id);
        const transfers = JSON.parse(localStorage.getItem("transfers")) || [];

        const newTransfer = {
          name: completedOrder.customer?.name || "N/A",
          item: (completedOrder.items || [])
            .map((i) => `${i.name} × ${i.quantity}`)
            .join(", "),
          amount: completedOrder.total || 0,
          date: new Date().toLocaleDateString(),
          status: "completed",
        };

        const alreadyExists = transfers.some(
          (t) =>
            t.name === newTransfer.name &&
            t.item === newTransfer.item &&
            t.amount === newTransfer.amount &&
            t.date === newTransfer.date
        );

        if (!alreadyExists) {
          transfers.push(newTransfer);
          localStorage.setItem("transfers", JSON.stringify(transfers));
        }
      }

      setEditId(null);
      fetchOrders();
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="flex">
      <LeftSidebar />
      <div className="p-10 bg-[#181D14] text-white w-full min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Online Orders</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <>
            <div className="overflow-auto">
              <table className="min-w-full bg-[#232e24] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-green-700 text-left text-white">
                    <th className="py-3 px-4">S.No</th>
                    <th className="py-3 px-4">Customer Name</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => {
                    const isEditing = editId === order._id;
                    return (
                      <tr
                        key={order._id}
                        className="border-t border-green-900 hover:bg-[#2b3a2c]"
                      >
                        <td className="py-3 px-4">
                          {(currentPage - 1) * ordersPerPage + index + 1}
                        </td>
                        <td className="py-3 px-4">
                          {order.customer?.name || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          {(order.items || []).map((item, idx) => (
                            <div key={idx}>
                              {item.name} × {item.quantity}
                            </div>
                          ))}
                        </td>
                        <td className="py-3 px-4">Rs: {order.total || 0}</td>
                        <td className="py-3 px-4">
                          {isEditing ? (
                            <select
                              name="status"
                              value={editData.status}
                              onChange={handleChange}
                              className="bg-[#1f2a22] text-white px-2 py-1 rounded"
                            >
                              <option value="pending">pending</option>
                              <option value="processing">processing</option>
                              <option value="completed">completed</option>
                              <option value="cancelled">cancelled</option>
                            </select>
                          ) : (
                            order.status
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => handleSave(order._id)}
                                  className="text-green-400 hover:text-green-600"
                                >
                                  <FaSave />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <FaTimes />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(order)}
                                  className="text-yellow-400 hover:text-yellow-600"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(order._id)}
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <FaTrashAlt />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 🔹 Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-green-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-green-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
