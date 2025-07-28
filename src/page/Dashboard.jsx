import React, { useEffect } from 'react'
import Card from '../components/Card'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'
import Chart from '../components/Chart'
import Navbar from '../components/Navbar'
import { FaHubspot } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import totalAmount from '../assets/tdesign_money.svg'
import { MdColorLens } from 'react-icons/md'
import threeDot from '../assets/Vector (1).svg'
import amountDeposit from '../assets/ph_hand-deposit-bold.svg'
import amountSpent from '../assets/qlementine-icons_money-16.svg'
import { useNavigate } from "react-router-dom";
// import {NameContext} from '../App'


const Dashboard = () => {
  // const namesformapis = useContext(NameContext);
  const nav = useNavigate();
  // console.log(namesformapis)

  useEffect(() =>{
    const token = localStorage.getItem("token")

    if(!token){
      nav("/")
}})

  const Carddata = {
    color: "white",
    text: "Total Amount",
    icon: totalAmount ,
    dotIcon: threeDot,  
    price: "$ 50,000"    
  }

  const Carddata2 = {
    color: "#55B000",
    text: "Amount Deposit",
    icon: amountDeposit ,
    dotIcon: threeDot,  
    price: "$ 27,000"    
  }
  
  const Carddata3 = {
    color: "#F17C1C",
    text: "Amount Spent",
    icon: amountSpent ,
    dotIcon: threeDot,  
    price: "$ 7,500"    
  }

  return (
    <div className='flex h-[800px] text-white'>
      <LeftSidebar className="w-64" />
      <div className='w-[60%] bg-[#181D14]'>
      <Navbar />
      <div className='flex px-10 py-5 gap-10'>
        {/* <div>
          {
            namesformapis.map((i)=>(<>
            <li>{i.name}</li>
            </>))
          }
        </div> */}
        <Card data={Carddata}/>
        <Card data={Carddata2}/>
        <Card data={Carddata3}/>
      </div>
      <div>
        <Chart />
      </div>
      </div>
      <RightSidebar className="w-64"/>  
    </div>
  )
}

export default Dashboard;


