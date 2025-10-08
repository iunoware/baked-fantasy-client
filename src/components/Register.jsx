import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, X, Phone } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../fireBaseConfig.js";

function Register({ isOpen, onClose, onOpenLogin }) {
  // for otp
  // const [showOtp, setShowOtp] = useState(false);
  const [showVerify, setVerify] = useState(false);
  const [confirmationResult, setConfirmation] = useState(null);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    if (!form.phoneNumber) {
      toast.error("Please enter your phone number first");
      return;
    }

    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const confirmation = await signInWithPhoneNumber(
        auth,
        "+91" + form.phoneNumber,
        recaptcha
      );

      setConfirmation(confirmation);
      setVerify(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Failed to send OTP", error);
      toast.error("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      await registerUser(); // separate registration logic
      toast.success("OTP verified & user registered!");
    } catch (error) {
      console.error(error);
      toast.error("Invalid OTP, please try again.");
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
        phoneNumber,
      });
      onClose();
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
      // Send Google token to backend for verification
      const res = await axios.post("http://localhost:5000/google-login", {
        token: credentialResponse.credential,
      });

      // Save your backend JWT
      localStorage.setItem("token", res.data.token);
      onClose();
      toast.success("User Registered Successfully 🍰");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, phoneNumber } = form;

      setIsLoading(true);
      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        phoneNumber,
      });

      setMessage(res.data.msg);
      onClose();
      toast.success("User Registered Successfully 🍰");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 grid place-content-center  p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          ></div>
        )}
        <div className="z-10 lg:w-[60vw] md:w-[60vw]  w-screen h-full rounded-2xl bg-[url(/images/padded.png)] bg-pink-400 p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <h2
              id="modalTitle"
              className="lg:text-3xl md:text-xl text-lg font-bold text-white "
            >
              Register
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
            <div className="flex-1 flex items-center justify-center pt-5 order-2">
              <div className="w-full max-h-190 max-w-md border-1 rounded-2xl  border-white backdrop-blur-sm backdrop-saturate-[182%] bg-[rgba(188,90,150,0.90)] inset-shadow-white inset-shadow-sm  ">
                <Card className="shadow-card fade-in-delay-1">
                  <CardContent className="p-8">
                    <div className="text-center mb-3">
                      <h1 className="text-2xl text-white mb-2">
                        Create Account
                      </h1>
                      <p className="text-white">
                        Enroll your Baked Fantasy account
                      </p>
                    </div>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="space-ys-2">
                        <label
                          htmlFor="name"
                          className="text-white font-medium"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your Full Name"
                            // value={name}
                            onChange={handleChange}
                            className="pl-10 bg-input-background border-white text-white focus:ring-2 focus:ring-[#00BCD4] transition-all"
                            required
                          />
                        </div>
                      </div>
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
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            // value={email}
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
                            title="Password must be at least 6 characters long, include uppercase, lowercase, and a number."
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            name="password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$"
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
                      <div className="space-y-2">
                        <label
                          htmlFor="con-pass"
                          className="text-white font-medium"
                        >
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                          <Input
                            id="con-pass"
                            title="Password must be at least 6 characters long, include uppercase, lowercase, and a number."
                            type="tel"
                            placeholder="Enter Phone Number"
                            // value={password}
                            name="phoneNumber"
                            onChange={handleChange}
                            className="pl-10 pr-10 bg-input-background border-white text-white  focus:ring-2 focus:ring-[#00BCD4] transition-all"
                            required
                          />
                          <button
                            type="button"
                            // onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          ></button>
                        </div>
                      </div>
                      {showVerify && (
                        <div className="space-y-2">
                          <label
                            htmlFor="otp"
                            className="text-white font-medium"
                          >
                            Enter OTP
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                            <Input
                              id="otp"
                              // title="Password must be at least 6 characters long, include uppercase, lowercase, and a number."
                              type="text"
                              placeholder="Enter 4 Digit OTP"
                              value={otp}
                              name="otp"
                              onChange={(e) => setOtp(e.target.value)}
                              className="pl-10 pr-10 bg-input-background border-white text-white  focus:ring-2 focus:ring-[#00BCD4] transition-all"
                              required
                            />
                            {/* <Button onClick={verifyOtp}>Verify OTP</Button> */}
                          </div>
                        </div>
                      )}

                      {/* <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2"></div>
                        <button
                          type="button"
                          className="text-sm text-white font-bold hover:text-white transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div> */}
                      {/* <p className="text-center text-lime-500">{message}</p> */}

                      {!showVerify ? (
                        <Button
                          type="button"
                          onClick={sendOtp}
                          size="lg"
                          className="w-full bg-sky-500 hover:bg-[#00ACC1] text-white btn-hover"
                        >
                          Send OTP
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={verifyOtp}
                          size="lg"
                          className="w-full bg-green-500 hover:bg-green-600 text-white btn-hover"
                        >
                          Verify OTP
                        </Button>
                      )}
                    </form>

                    <div className="mt-6">
                      {/* <Separator className="my-6" /> */}

                      <div className="google-button">
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={() => {
                            console.log("Google Login Failed");
                          }}
                          useOneTap
                        />
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <p className="text-muted-foreground">
                        Already have an account?
                        <button
                          onClick={onOpenLogin}
                          className="text-[#00BCD4] ps-3 text-lg font-bold cursor-pointer hover:text-[#00ACC1]  transition-colors"
                        >
                          LogIn
                        </button>
                      </p>
                    </div>
                    <div id="recaptcha-container"></div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* images side */}
            <div className="img w-full flex justify-center lg:inline-block  md:hidden order-1">
              <img
                src="/images/register-mascot.png"
                alt="mascot"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} /> */}
    </>
  );
}
export default Register;
