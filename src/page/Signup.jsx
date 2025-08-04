import React, { useState } from 'react';
import SignupImage from '../assets/Image123.jpg';
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();

  const [name,setName] =useState("");
  const [email,setEmail] =useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();


  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  console.log("showPassword",showPassword)
  console.log("email",email)

  const nameChange = (e) =>{
    setName(e.target.value)
  }

  const emailChange =(e) =>{
    setEmail(e.target.value)
  }

  const passwordChange =(e) =>{
    setPassword(e.target.value)
  }

  const confirmPasswordChange =(e) =>{
    setConfirmPassword(e.target.value)
  }


  const handleSubmit = async () => {

    if (!name || !email || !password || !confirmPassword) {
        console.log("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/user/createUser",
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, confirmPassword })
        }
      );

      const data = await response.json();

      if (response.ok) {
        nav("/");
      } else {
        console.log(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.log("Something went wrong. Please try later.", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#AC72A1] via-[#FBD9FA] to-[#070E2A] flex items-center justify-center px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl items-center">

        {/* Left - FORM */}
        <div className="w-full lg:w-1/2 flex justify-end">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-l-[30px] px-5 py-5 shadow-lg">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-b from-[#AC72A1] to-[#070E2A] text-transparent bg-clip-text mb-6">
              Signup
            </h2>

            {/* {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>} */}

            <div className="relative mb-4">
              <FaUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg" />
              <input
                value={name}
                onChange={nameChange}
                type="text"
                placeholder="Username"
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-1 focus:outline-none"
              />
            </div>

            <div className="relative mb-4">
              <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg" />
              <input
                value={email}
                onChange={emailChange}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-1 focus:outline-none"
              />
            </div>

            <div className="relative mb-4">
              <input
                value={password}
                onChange={passwordChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-1 focus:outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                value={confirmPassword}
                onChange={confirmPasswordChange}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-1 focus:outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
            onClick={handleSubmit}
              // disabled={loading}
              className="w-full bg-gradient-to-t from-[#070E2A] to-[#AC72A1] py-2 rounded-full hover:opacity-90 transition font-medium text-white"
            >
             Signup {/* {loading ? "Signing up..." : "Sign Up"} */}
            </button>

            <div className="mt-4 text-sm text-right text-[#070E2A]">
              <Link to="/" className="hover:underline">Already have an account?</Link>
            </div>
          </div>
        </div>

        {/* Right - IMAGE */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-start">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-md xl:max-w-lg sm:h-[350px] md:h-[400px] lg:h-[450px] relative rounded-[30px] bg-black overflow-hidden shadow-lg">
            <img src={SignupImage} alt="Signup Visual" className="absolute object-cover w-full h-full top-0 left-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;