import React, { useState } from 'react';
import SignupImage from '../assets/Image123.jpg';
import { FaEnvelope, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

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
      console.log(data)
      if (response.ok) {
        nav("/");
      } else {
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      console.log(err)
      setError("Something went wrong. Please try later.");
    } finally {
      setLoading(false);
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

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            <div className="relative mb-4">
              <FaUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg" />
              <input
                type="text"
                name="name"
                placeholder="Username"
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-1 focus:outline-none"
              />
            </div>

            <div className="relative mb-4">
              <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-1 focus:outline-none"
              />
            </div>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
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
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
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
              disabled={loading}
              className="w-full bg-gradient-to-t from-[#070E2A] to-[#AC72A1] py-2 rounded-full hover:opacity-90 transition font-medium text-white"
            >
              {loading ? "Signing up..." : "Sign Up"}
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

