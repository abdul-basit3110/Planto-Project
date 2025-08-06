import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get("email");

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!otp || !newPassword) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('https://eb-project-backend-kappa.vercel.app/api/v0/user/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successfully.");
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#AC72A1] via-[#FBD9FA] to-[#070E2A] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-b from-[#AC72A1] to-[#070E2A] text-transparent bg-clip-text mb-6">Reset Password</h2>

        {message && <p className="text-green-600 text-sm mb-4 text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full bg-transparent border-b border-black placeholder-black px-2 py-3 focus:outline-none text-sm mb-6"
        />

        <div className="relative mb-6">
          <input
            type={showPass ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-transparent border-b border-black placeholder-black px-2 pr-10 py-3 focus:outline-none text-sm"
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg cursor-pointer"
            onClick={() => setShowPass(prev => !prev)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-gradient-to-t from-[#070E2A] to-[#AC72A1] py-3 rounded-full text-white font-medium hover:opacity-90 transition-all"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
