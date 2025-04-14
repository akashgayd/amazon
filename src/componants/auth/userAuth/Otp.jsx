import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getOtp } from '../../../utils/userApi';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      await getOtp({ otp: otpValue });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newOtp = [...otp];

      digits.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });

      setOtp(newOtp);

      if (digits.length < 6) {
        document.getElementById(`otp-${digits.length}`).focus();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Verify Your Account</h2>

      <p className="text-sm text-gray-700 text-center mb-6">
        We've sent a 6-digit OTP to your email
        {email && <span className="font-medium text-orange-600"> ({email})</span>}
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              className="w-10 h-12 md:w-12 md:h-14 text-center text-lg border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : null}
              maxLength={1}
              pattern="\d"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Didn't receive the code?{' '}
          <button
            type="button"
            className="text-orange-600 hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerifyOTP;