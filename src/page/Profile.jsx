import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar";

const AddProfile = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);

    try {
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }

      const endpoint = `https://eb-project-backend-kappa.vercel.app/api/v0/user/getSpecificUser/${email}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "User not found.");
      }

      setUser(data.NewUser);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.message || "Failed to fetch user.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  return (
    <div className="flex">
      <LeftSidebar />

      <div className="flex-1 p-10 bg-[#181D14] min-h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Find User Profile</h1>

        <form onSubmit={handleSearch} className="mb-8 flex gap-4 items-end flex-wrap">
          <div>
            <label className="block text-white mb-1">Enter User Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., johndoe@example.com"
              className="px-4 py-2 text-white w-80 bg-[#232e24] rounded-md focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="bg-white p-6 rounded-lg shadow max-w-xl mt-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">User Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password || "Hidden"}</p>

            {user.createdAt && (() => {
              const { date, time } = formatDateTime(user.createdAt);
              return (
                <>
                  <p><strong>Date:</strong> {date}</p>
                  <p><strong>Time:</strong> {time}</p>
                </>
              );
            })()}

            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
            {user.address && <p><strong>Address:</strong> {user.address}</p>}

            {user.history && Array.isArray(user.history) && user.history.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">User History</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {user.history.map((item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProfile;

