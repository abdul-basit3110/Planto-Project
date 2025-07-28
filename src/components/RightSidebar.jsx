import React from 'react';
import { Home, Heart, Car, User, MoreVertical, ChartAreaIcon } from 'lucide-react';
// import userImage from '../assets/user image.jpg';
import userBell from '../assets/bell.svg';
import userMessage from '../assets/msg.svg'
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Sidebar = () => {
  const token = localStorage.getItem("token");
  let decodeToken;
  // console.log(token)

  if(token){
    decodeToken = jwtDecode(token)
    console.log(decodeToken)
  }

  const name = decodeToken.name
  const firstChar = name[0].toUpperCase();
  // console.log(firstChar)


  const historyItems = [
    {
      id: 1,
      icon: Home,
      title: 'House Rent',
      date: 'July 4, 2024',
      color: 'text-blue-400'
    },
    {
      id: 2,
      icon: Heart,
      title: 'Health',
      date: 'July 4, 2024',
      color: 'text-red-400'
    },
    {
      id: 3,
      icon: Car,
      title: 'Car Expense',
      date: 'July 4, 2024',
      color: 'text-green-400'
    },
    {
      id: 4,
      icon: User,
      title: 'Deposited',
      date: 'July 4, 2024',
      color: 'text-purple-400'
    },
  ];

  const upcomingItems = [
    {
      id: 1,
      icon: Home,
      title: 'House Rent',
      date: 'July 5, 2024',
      color: 'text-blue-400'
    },
    {
      id: 2,
      icon: Heart,
      title: 'Health',
      date: 'July 5, 2024',
      color: 'text-red-400'
    },
    {
      id: 3,
      icon: Car,
      title: 'Car Expense',
      date: 'July 5, 2024',
      color: 'text-green-400'
    },
    {
      id: 4,
      icon: User,
      title: 'Deposited',
      date: 'July 5, 2024',
      color: 'text-purple-400'
    },
  ];

  const renderSection = (title, items) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium text-lg">{title}</h3>
        <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
            >
              <div className={`p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors`}>
                <IconComponent className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-[#242e24] h-[800px] flex flex-col items-center " >
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 rounded-sm">
              <img src={userMessage} />
            </div>
          </div>
          <div className="w-12 h-12 bg-gray-700 flex rounded-full justify-center items-center">
            <img src={userBell} className='w-6 h-6' />
          </div>
          
          <div className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-700 font-bold">
          {/* <p src={userImage} className='w-full h-full rounded-full'/> */}
          <p className='text-[24px]'>{firstChar}</p> 
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-[90%] ">
        {renderSection('History', historyItems)} 
        {renderSection('Upcoming', upcomingItems)}
      </div>
    </div>
  );
};

export default Sidebar;

