import React, { useEffect, useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import { useNavigate } from "react-router-dom";

const Saving = () => {
  const nav = useNavigate();

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Neem Plant",
      saved: 1200,
      target: 5000,
    },
    {
      id: 2,
      name: "Tulsi Plant",
      saved: 2500,
      target: 3000,
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/");
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      setGoals((prevGoals) =>
        prevGoals.map((goal) => {
          const added = Math.floor(Math.random() * 100); // simulate savings growth
          const newSaved = Math.min(goal.saved + added, goal.target);
          return { ...goal, saved: newSaved };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [nav]);

  const totalSaved = goals.reduce((acc, curr) => acc + curr.saved, 0);

  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <div className="w-full bg-[#181D14] p-6 text-white overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">Savings Dashboard</h1>

        {/* Overview Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#242e24] p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Total Savings</h3>
            <p className="text-2xl font-bold text-green-500">Rs: {totalSaved}</p>
          </div>
          <div className="bg-[#242e24] p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Active Goals</h3>
            <p className="text-2xl font-bold text-blue-400">{goals.length}</p>
          </div>
          <div className="bg-[#242e24] p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Average Completion</h3>
            <p className="text-2xl font-bold text-purple-500">
              {goals.length > 0
                ? `${Math.round(
                    (goals.reduce(
                      (acc, curr) => acc + (curr.saved / curr.target) * 100,
                      0
                    ) / goals.length
                  ) || 0)}%`
                : "0%"}
            </p>
          </div>
        </div>

        {/* Goal List */}
        {/* <div className="bg-[#242e24] rounded-xl p-6 shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Active Savings Goals</h2>
          {goals.length === 0 ? (
            <p className="text-gray-400">No saving goals available.</p>
          ) : (
            <ul className="space-y-4">
              {goals.map((goal) => {
                const progress = Math.min(
                  (goal.saved / goal.target) * 100,
                  100
                ).toFixed(0);

                return (
                  <li
                    key={goal.id}
                    className="border-l-4 border-green-500 pl-4 py-2"
                  >
                    <div className="flex justify-between items-center">
                      <span>{goal.name}</span>
                      <span className="text-sm text-gray-400">
                        ₹{goal.saved} / ₹{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded mt-1">
                      <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Saving;
