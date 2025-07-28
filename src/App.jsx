// import React, { createContext } from "react"; // Don't put `{ React }`, just `React`
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import Dashboard from "./page/Dashboard";
import AddPlants from "./page/AddPlants";
import Users from "./page/Users";
import Profile from "./page/Profile";
import Transfers from "./page/Transfers";
import Analytics from "./page/Analytics";
import Savings from "./page/Savings";
import Records from "./page/Records";
import History from "./page/History";
import Settings from "./page/Settings";
import GetAllPlants from "./page/GetAllPlants";



// export const NameContext = createContext(); //2nd step
function App() {
  // const namesapi=[
  // {name:"basit"},
  // {name:"hammad"},
  // {name:"kashif"}]
  return (
    // 3rd context
    // <NameContext.Provider value={namesapi}> 
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addplants" element={<AddPlants />} />
        <Route path="/getallplants" element={<GetAllPlants />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/records" element={<Records />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    // </NameContext.Provider>
  );
}

export default App;

