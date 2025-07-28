import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Dummy Data
const data = [
  { name: "Jan", daily: 1000, car: 2000, health: 500 },
  { name: "Feb", daily: 3000, car: 1500, health: 800 },
  { name: "March", daily: 10000, car: 1000, health: 12000 },
  { name: "April", daily: 7000, car: 5000, health: 15000 },
  { name: "May", daily: 5000, car: 2000, health: 8000 },
  { name: "June", daily: 15000, car: 500, health: 2000 },
  { name: "July", daily: 25000, car: 9000, health: 15000 },
  { name: "Aug", daily: 20000, car: 12000, health: 9000 },
  { name: "Sep", daily: 15000, car: 10000, health: 10000 },
  { name: "Oct", daily: 10000, car: 15000, health: 7000 },
];

const Chart = () => {
 return (
  <div className='px-10'>
  <div className="flex justify-between items-center mb-4">
        <h2 className="text-[36px] text-2xl font-bold">Spent</h2>
        <div className='flex items-center gap-5 text-[#FFFFFF99]'>
          <p className='flex items-center gap-2'><div className='w-[10px] h-[10px] bg-[#B6116B] rounded-full'></div>Daily Expense</p>
          <p className='flex items-center gap-2'> <div className='w-[10px] h-[10px] bg-[#FFF84E] rounded-full'></div>Car Insurance</p>
          <p className='flex items-center gap-2'><div className='w-[10px] h-[10px] bg-[#09FBD3] rounded-full'></div>Health</p>
        </div>
        <span className="text-sm text-gray-400">Last 7 Days</span>
      </div>
    <div className=" text-white p-6 rounded-2xl shadow-xl w-full max-w-4xl">
      <ResponsiveContainer w={400} height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
          <XAxis dataKey="name" stroke="#999" />
          <YAxis stroke="#999" />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Line type="monotone" dataKey="daily" stroke="#d946ef" strokeWidth={2} dot={false} name="Daily Expense" />
          <Line type="monotone" dataKey="car" stroke="#eab308" strokeWidth={2} dot={false} name="Car Insurance" />
          <Line type="monotone" dataKey="health" stroke="#06b6d4" strokeWidth={2} dot={false} name="Health" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
}

export default Chart
