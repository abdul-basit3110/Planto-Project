import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://eb-project-backend-kappa.vercel.app/api/v0/user/getUserAll"
        );
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="flex h-[100vh] overflow-hidden">
      <LeftSidebar />
      <div className="p-8 h-[100%] w-full bg-[#181D14] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">All Users</h1>

        {loading ? (
          <div className="text-center text-white">Loading users...</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-[#232e24]">
                <thead>
                  <tr className="bg-[#232e24] text-white text-left">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id || index} className="border-t text-white">
                      <td className="py-2 px-4">
                        {indexOfFirstUser + index + 1}
                      </td>
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4 capitalize">
                        {user.role || "user"}
                      </td>
                    </tr>
                  ))}
                  {currentUsers.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-white">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`px-3 py-1 rounded ${
                    currentPage === number
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
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

export default Users;

