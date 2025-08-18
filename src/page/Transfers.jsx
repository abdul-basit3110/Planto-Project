import React, { useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import { useNavigate } from 'react-router-dom';

const Transfers = () => {
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    const storedTransfers = JSON.parse(localStorage.getItem("transfers")) || [];
    setTransfers(storedTransfers);
  }, []);

  return (
    <div className='flex min-h-screen'>
      <LeftSidebar />
      <div className="w-full sm:px-8 sm:pt-8 bg-[#181D14] text-white">
        <h1 className="text-2xl font-semibold mb-6">Transfers</h1>

        <div className="bg-[#242e24] px-6 pt-6 pb-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Recent Transfers</h2>
          {transfers.length === 0 ? (
            <p className="text-gray-400">No transfers yet.</p>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-[#242e24] text-left">
                <tr>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Item(s)</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.item}</td>
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
