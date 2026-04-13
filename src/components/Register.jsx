import React, { useState, useEffect } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, X, Phone } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext.jsx";

function Register({ isOpen, onClose, onOpenLogin }) {
  const { handleLoginSuccess } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // for otp
  const [showVerify, setVerify] = useState(false);
  // const [confirmationResult, setConfirmation] = useState(null);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    if (!form.phoneNumber) {
      toast.error("Please enter your phone number first");
      return;
    }
    if (!form.email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/send-otp", {
        email: form.email,
        type: "register",
      });
      setVerify(true);
      toast.success(res.data.msg || "OTP sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post("http://localhost:5000/verify-otp", {
        email: form.email,
        otp: otp.trim(),
        type: "register",
      });

      setOtpVerified(true);
      toast.success("OTP verified!");

      await registerUser();
    } catch (error) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async () => {
    try {
      const { name, email, password, phoneNumber } = form;

      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        mobileNumber: phoneNumber,
      });
      
      if (typeof handleLoginSuccess === "function") {
        handleLoginSuccess(res.data.token, res.data.user);
      }
      toast.success("User Registered Successfully 🍰");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Registration
  const handleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/google-login", {
        token: credentialResponse.credential,
      });

      if (typeof handleLoginSuccess === "function") {
        handleLoginSuccess(res.data.token, res.data.user);
      }
      toast.success("Logged in with Google 🎉");
    } catch (err) {
      console.error("Google Login failed:", err);
      const errorMessage =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Google Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-auto flex flex-col items-center justify-start sm:justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-md transition-all duration-300">
      {/* Click-to-close overlay (underlying the modal) */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Simplified & Compact Modal Container */}
      <div className="relative hide-scrollbar w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-y-scroll my-auto transform transition-all animate-in fade-in zoom-in duration-300">
        {/* Minimal Accent Line */}
        <div className="h-1 w-full bg-[#ec4174]" />

        {/* Precise Close Button */}
        <button
          type="button"
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all focus:outline-none"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="px-6 py-6 sm:px-10 sm:py-8">
          {/* Header Section - More Compact */}
          <div className="text-center mb-6">
            <h2 id="modalTitle" className="text-2xl font-bold text-slate-900">
              Create Account
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Join{" "}
              <span className="text-[#ec4174] font-semibold">
                Baked Fantasy
              </span>{" "}
              today
            </p>
          </div>

          <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name Field */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-[13px] font-semibold text-slate-600 ml-0.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="pl-10 h-10.5 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#ec4174] focus-visible:border-[#ec4174] transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Address Field */}

            {/* Password Field */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-[13px] font-semibold text-slate-600 ml-0.5"
              >
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$"
                  title="At least 6 chars (A, a, 1)"
                  onChange={handleChange}
                  className="pl-10 pr-10 h-10.5 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#ec4174] focus-visible:border-[#ec4174] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label
                htmlFor="phoneNumber"
                className="text-[13px] font-semibold text-slate-600 ml-0.5"
              >
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="10-digit number"
                  onChange={handleChange}
                  className="pl-10 h-10.5 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#ec4174] focus-visible:border-[#ec4174] transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-[13px] font-semibold text-slate-600 ml-0.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  className="pl-10 h-10.5 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#ec4174] focus-visible:border-[#ec4174] transition-all"
                  required
                />
              </div>
            </div>

            {/* OTP Section (Conditional) */}
            {showVerify && (
              <div className="space-y-1 animate-in slide-in-from-top-1 duration-300">
                <label
                  htmlFor="otp"
                  className="text-[13px] font-semibold text-green-600 ml-0.5"
                >
                  OTP Code
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter 6 Digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 h-10.5 bg-green-50 border-green-100 rounded-xl focus-visible:ring-1 focus-visible:ring-green-500 transition-all font-bold tracking-widest text-green-700"
                    required
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {message && (
              <p className="text-center text-xs font-medium text-red-500">
                {message}
              </p>
            )}

            {/* Compact Action Buttons */}
            <div className="pt-2">
              {!showVerify ? (
                <Button
                  type="button"
                  onClick={sendOtp}
                  disabled={isLoading}
                  className="w-full h-11 bg-[#ec4174] hover:bg-[#d63a69] text-white font-bold rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={verifyOtp}
                  disabled={isLoading}
                  className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                >
                  {isLoading ? "Verifying..." : "Verify & Register"}
                </Button>
              )}
            </div>
          </form>

          {/* Social Divider - More Subtle */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-white px-3 text-slate-400">Or with</span>
            </div>
          </div>

          {/* Google Login Center Alignment */}
          <div className="flex justify-center h-[40px] social-login-container">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Google Login Failed")}
            />
          </div>

          {/* Footer Navigation - Tightened */}
          <div className="mt-6 pt-4 border-t border-slate-50 text-center text-sm">
            <p className="text-slate-500">
              Already have an account?{" "}
              <button
                onClick={onOpenLogin}
                className="text-[#ec4174] font-bold hover:underline transition-all cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>

          <div id="recaptcha-container" className="hidden"></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
