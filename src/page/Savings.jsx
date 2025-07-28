import React, { useEffect } from 'react';
import LeftSidebar from '../components/LeftSidebar'
import { useNavigate } from 'react-router-dom';

const Saving = () => {
  const nav = useNavigate();

  useEffect(() =>{
    const token = localStorage.getItem("token")

    if(!token){
      nav("/")
    }
  })

  
  return (
    <div className='flex h-[800px]'>
    <LeftSidebar />
    <div className="w-[80%] min-h-screen bg-[#181D14] p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Savings Dashboard</h1>

      {/* Savings Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#242e24] p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-white mb-2">Total Savings</h3>
          <p className="text-2xl font-bold text-green-600">$12,450</p>
        </div>
        <div className="bg-[#242e24] p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-white mb-2">Monthly Contribution</h3>
          <p className="text-2xl font-bold text-blue-600">$1,200</p>
        </div>
        <div className="bg-[#242e24] p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-white mb-2">Goal Completion</h3>
          <p className="text-2xl font-bold text-purple-600">45%</p>
        </div>
      </div>

      {/* Goals List */}
      <div className="bg-[#242e24] rounded-xl p-6 shadow mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Active Savings Goals</h2>
        <ul className="space-y-4">
          <li className="border-l-4 border-green-500 pl-4 py-2">
            <div className="flex justify-between items-center">
              <span className="text-white">Vacation Fund</span>
              <span className="text-sm text-gray-500">$3,000 / $5,000</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded mt-1">
              <div className="bg-green-500 h-2 rounded w-[60%]"></div>
            </div>
          </li>
          <li className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex justify-between items-center">
              <span className="text-white">Emergency Fund</span>
              <span className="text-sm text-gray-500">$1,800 / $2,500</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded mt-1">
              <div className="bg-blue-500 h-2 rounded w-[72%]"></div>
            </div>
          </li>
        </ul>
      </div>

      {/* Add New Goal */}
      <div className="bg-[#242e24] rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-white mb-4">Add New Saving Goal</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Goal Name</label>
            <input
              type="text"
              placeholder="e.g. New Car"
              className="w-full px-4 py-2 bg-[#181D14] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Target Amount ($)</label>
            <input
              type="number"
              placeholder="e.g. 8000"
              className="w-full px-4 py-2 bg-[#181D14] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="sm:col-span-2 text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-400 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Saving;
