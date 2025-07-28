import React, { useEffect } from 'react';
import LeftSidebar from '../components/LeftSidebar'
import { useNavigate } from 'react-router-dom';

const Transfers = () => {
  const nav = useNavigate();

  useEffect(() =>{
    const token = localStorage.getItem("token")

    if(!token){
      nav("/")
    }
  })
  
  const recentTransfers = [
    { name: 'Hammad', amount: '$250', date: '2025-07-01', status: 'Completed' },
    { name: 'Toto', amount: '$180', date: '2025-06-30', status: 'Pending' },
    { name: 'Kashif', amount: '$320', date: '2025-06-28', status: 'Completed' },
  ];

  return (
    <div className='flex h-[700px]'>
    <LeftSidebar />
    <div className="w-[100%] sm:px-8 sm:pt-8 md:px-8 md:pt-8 bg-[#181D14] ">
      
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
        Transfers
      </h1>

      {/* Transfer Form */}
      <div className="bg-[#242e24] p-6 rounded-xl shadow-md mb-8">
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
  <label className="block text-sm font-medium text-white mb-1">Recipient</label>
  <input
    type="text"
    placeholder="Enter Your Name"
    className="w-full px-4 py-2 bg-[#181D14] text-white placeholder-white rounded-lg focus:outline-none focus:border-2 focus:border-white"
  />
</div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Amount</label>
            <input
              type="number"
              placeholder="Enter Amount"
              className="w-full px-4 py-2 bg-[#181D14] text-white placeholder-white rounded-lg focus:outline-none focus:border-2 focus:border-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-white mb-1">Message (optional)</label>
            <textarea
              rows="3"
              placeholder="Transfer reason"
              className="w-full px-4 py-2 bg-[#181D14] text-white placeholder-white rounded-lg focus:outline-none focus:border-2 focus:border-white"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="text-white px-6 py-2  bg-green-500 hover:bg-green-600 rounded-lg">
              Send Transfer
              </button>
              </div>
              </form>
              </div>

      {/* Recent Transfers Table */}
      <div className="bg-[#242e24] px-6 pt-6 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-white">Recent Transfers</h2>
        <table className="min-w-full text-sm text-white">
          <thead className="bg-[#242e24] text-left">
            <tr>
              <th className="px-4 py-2">Recipient</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTransfers.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      item.status === 'Completed'
                        ? 'bg-[#181D14] text-green-700'
                        : 'bg-[#181D14] text-yellow-700'
                    }`}
                  >
                    {item.status}
                  </span>
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

export default Transfers;
