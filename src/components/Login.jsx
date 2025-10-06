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
      // Send Google token to backend for verification
      const res = await axios.post("http://localhost:5000/google-login", {
        token: credentialResponse.credential,
      });

      // Save your backend JWT
      localStorage.setItem("token", res.data.token);

      setMessage(res.data.msg);
      onClose();
      toast.success("Login Successful! Welcome back 🍰");

      // Close modal or redirect
      // console.log("Login success", res.data);
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
      toast.success("Login Successful! Welcome back 🍰");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="lg:w-[60vw] lg:h-[85vh] md:w-[60vw] md:h-[68.2vh] w-screen h-screen  rounded-2xl bg-[url(/images/padded.png)] bg-pink-400 p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <h2
              id="modalTitle"
              className="lg:text-3xl md:text-xl text-lg font-bold text-white "
            >
              Login
            </h2>

            <button
              type="button"
              className="-me-4 -mt-4 rounded-full p-2 text-white transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 h-screen md:h-fit items-center lg:grid-cols-2 gap-0">
            {/* login form */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="w-full max-w-md border-1 rounded-2xl  border-white backdrop-blur-sm backdrop-saturate-[182%] bg-[rgba(188,90,150,0.90)] inset-shadow-white inset-shadow-sm  ">
                <Card className="shadow-card fade-in-delay-1">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h1 className="text-2xl text-white mb-2">Welcome Back</h1>
                      <p className="text-white">
                        Sign in to your Baked Fantasy account
                      </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-ys-2">
                        <label
                          htmlFor="email"
                          className="text-white font-medium"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                          <Input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="pl-10 bg-input-background border-white text-white focus:ring-2 focus:ring-[#00BCD4] transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="text-white font-medium"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                          <Input
                            name="password"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            // value={password}
                            onChange={handleChange}
                            className="pl-10 pr-10 bg-input-background border-white text-white  focus:ring-2 focus:ring-[#00BCD4] transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-white" />
                            ) : (
                              <Eye className="h-5 w-5 text-white" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 text-[#00BCD4] bg-input-background border-border rounded focus:ring-[#00BCD4] focus:ring-2"
                          />
                          <label
                            htmlFor="remember"
                            className="text-sm text-white cursor-pointer"
                          >
                            Remember me
                          </label>
                        </div>
                        <button
                          type="button"
                          className="text-sm text-white font-bold hover:text-white transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                      {/* <p className="text-center text-lime-300">{message}</p> */}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-sky-500 hover:bg-[#00ACC1] text-white btn-hover"
                        // disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="mt-3">
                      <div className="space-y-3">
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={() => {
                            console.log("Google Login Failed");
                          }}
                          useOneTap
                        />
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-muted-foreground">
                        Don't have an account?
                        <button
                          onClick={onOpenRegister}
                          className="text-sky-400 hover:text-[#00ACC1] pl-2 font-bold
                          text-lg transition-colors cursor-pointer"
                        >
                          Sign up
                        </button>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* images side */}
            <div className="img w-full flex justify-center lg:inline-block  md:hidden">
              <img
                src="/images/login-mascot.png"
                alt="mascot"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Register isOpen={isSignupOpen} onClose={() => setSignUpOpen(false)} /> */}
    </>
  );
}
export default Login;
