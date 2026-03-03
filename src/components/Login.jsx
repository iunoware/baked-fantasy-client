import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Mail, Lock, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function Login({ isOpen, onClose, onOpenRegister }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/google-login", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      setMessage(res.data.msg);
      onClose();
      toast.success("Login Successful! Welcome back 🍰");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password } = form;

      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage(res.data.msg);
      onClose();
      toast.success("Login Successful Welcome back 🍰");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-auto flex flex-col items-center justify-start sm:justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-md transition-all duration-300">
      {/* Click-to-close overlay */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Compact Login Modal Container */}
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden my-auto transform transition-all animate-in fade-in zoom-in duration-300">
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
          {/* Header Section */}
          <div className="text-center mb-6">
            <h2 id="modalTitle" className="text-2xl font-bold text-slate-900">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Sign in to{" "}
              <span className="text-[#ec4174] font-semibold">
                Baked Fantasy
              </span>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Address Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-[13px] font-semibold text-slate-600 ml-0.5"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#ec4174] transition-colors" />
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#ec4174] focus-visible:border-[#ec4174] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between ml-0.5">
                <label
                  htmlFor="password"
                  className="text-[13px] font-semibold text-slate-600"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] font-bold text-[#ec4174] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#ec4174] transition-colors" />
                <Input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  onChange={handleChange}
                  className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-1 focus-visible:ring-[#ec4174] focus-visible:border-[#ec4174] transition-all"
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

            {/* Error Message */}
            {message && (
              <p className="text-center text-xs font-medium text-red-500 animate-pulse">
                {message}
              </p>
            )}

            {/* Sign In Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#ec4174] hover:bg-[#d63a69] text-white font-bold rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>

          {/* Social Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
              <span className="bg-white px-3 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Center Alignment */}
          <div className="flex justify-center h-[40px] social-login-container">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Google Login Failed")}
              useOneTap
            />
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 pt-5 border-t border-slate-50 text-center text-sm">
            <p className="text-slate-500">
              Don't have an account?{" "}
              <button
                onClick={onOpenRegister}
                className="text-[#ec4174] font-bold hover:underline transition-all cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
