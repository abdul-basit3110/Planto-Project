import React, { useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSidebar'
import { useNavigate } from "react-router-dom";



const Records = () => {
  const nav = useNavigate();
  useEffect(() =>{
    const token = localStorage.getItem("token")

    if(!token){
      nav("/")
    }
  })
  
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');

  const records = [
    { id: 1, date: '2025-07-01', type: 'Income', amount: 2000, description: 'Salary' },
    { id: 2, date: '2025-07-02', type: 'Expense', amount: 300, description: 'Groceries' },
    { id: 3, date: '2025-07-05', type: 'Savings', amount: 500, description: 'Vacation Fund' },
    { id: 4, date: '2025-06-30', type: 'Expense', amount: 150, description: 'Utilities' },
    { id: 5, date: '2025-07-03', type: 'Income', amount: 200, description: 'Freelance' },
  ];

  const filteredRecords = records.filter(record =>
    record.description.toLowerCase().includes(search.toLowerCase()) &&
    (month ? record.date.startsWith(month) : true)
  );

  return (
    <div className='flex h-screen'>
    <LeftSidebar />
    <div className="w-[80%] min-h-screen bg-[#181D14] p-4 sm:p-6 md:p-8 overflow-y-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Transaction Records</h1>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by description..."
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
          <option value="2025-07">July 2025</option>
          <option value="2025-06">June 2025</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#242e24] rounded-xl shadow p-4">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Amount ($)</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id} className="border-b text-white">
                  <td className="px-4 py-2">{record.date}</td>
                  <td className={`px-4 py-2 font-medium ${record.type === 'Income' ? 'text-green-600' : record.type === 'Expense' ? 'text-red-600' : 'text-blue-600'}`}>
                    {record.type}
                  </td>
                  <td className="px-4 py-2">${record.amount}</td>
                  <td className="px-4 py-2">{record.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-400">No matching records found.</td>
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


