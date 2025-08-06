import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('https://eb-project-backend-kappa.vercel.app/api/v0/user/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "OTP sent to your email.");
        setTimeout(() => nav(`/reset-password?email=${encodeURIComponent(email)}`), 1500);
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#AC72A1] via-[#FBD9FA] to-[#070E2A] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-b from-[#AC72A1] to-[#070E2A] text-transparent bg-clip-text mb-6">Forgot Password</h2>

        {message && <p className="text-green-600 text-sm mb-4 text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <div className="relative mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-3 focus:outline-none text-sm"
          />
          <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg" />
        </div>

        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full bg-gradient-to-t from-[#070E2A] to-[#AC72A1] py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
