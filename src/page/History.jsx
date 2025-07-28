import React, { useEffect } from "react";
import LeftSidebar from '../components/LeftSidebar'
import { useNavigate } from "react-router-dom";

const History = () => {
  const nav = useNavigate();

  useEffect(() =>{
    const token = localStorage.getItem("token")

    if(!token){
      nav("/")
    }
  })
  const historyData = [
    {
      id: 1,
      action: "Login",
      user: "John Doe",
      timestamp: "2025-07-01 08:45",
      status: "Success",
    },
    {
      id: 2,
      action: "Fund Transfer",
      user: "Jane Smith",
      timestamp: "2025-07-01 10:22",
      status: "Completed",
    },
    {
      id: 3,
      action: "Logout",
      user: "John Doe",
      timestamp: "2025-07-01 12:05",
      status: "Success",
    },
    {
      id: 4,
      action: "Account Update",
      user: "Alex Carter",
      timestamp: "2025-06-30 15:42",
      status: "Updated",
    },
    {
      id: 5,
      action: "Failed Login",
      user: "Unknown",
      timestamp: "2025-06-30 18:20",
      status: "Failed",
    },
  ];

  return (
  <div className="flex h-screen">
  <LeftSidebar />
    <div className="w-[80%] min-h-screen bg-[#181D14] p-4 sm:p-6 md:p-8 overflow-y-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
        Activity History
      </h1>

      <div className="bg-[#242e24] rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr
                key={item.id}
                className="border-b  transition duration-150"
              >
                <td className="px-4 py-2">{item.timestamp}</td>
                <td className="px-4 py-2">{item.user}</td>
                <td className="px-4 py-2">{item.action}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    item.status === "Success"
                      ? "text-green-600"
                      : item.status === "Failed"
                      ? "text-red-600"
                      : item.status === "Completed"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default History;

