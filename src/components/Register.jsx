import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, User, X } from "lucide-react";

function Register({ isOpen, onClose, onOpenLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const { name, email, password } = form;

      setIsLoading(true);

      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.msg);
      onClose();
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="lg:w-[60vw] md:w-[60vw]  w-screen h-full  rounded-2xl bg-[url(/images/padded.png)] bg-pink-400 p-6 shadow-lg">
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
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            name="password"
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
                      <div className="space-y-2">
                        <label
                          htmlFor="con-pass"
                          className="text-white font-medium"
                        >
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                          <Input
                            id="con-pass"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            // value={password}
                            name="confirmPassword"
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
                      <p className="text-center text-lime-500">{message}</p>
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
                          "Create Account"
                        )}
                      </Button>
                    </form>

                    <div className="mt-6">
                      {/* <Separator className="my-6" /> */}

                      <div className="google-button">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full border-border bg-white hover:bg-gray-50 btn-hover"
                          onClick={() => {
                            /* Handle Google login */
                          }}
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Continue with Google
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <p className="text-muted-foreground">
                        Already have an account?
                        <button
                          onClick={onOpenLogin}
                          className="text-[#00BCD4] ps-3 cursor-pointer hover:text-[#00ACC1] font-medium transition-colors"
                        >
                          LogIn
                        </button>
                      </p>
                    </div>
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
