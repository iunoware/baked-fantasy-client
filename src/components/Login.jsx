import { useState } from "react";
import { Eye, EyeOff, LogIn, Phone, X, Import } from "lucide-react";

function Login({ isOpen, onClose }) {
  if (!isOpen) return null; // don’t render if closed
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div
        className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="lg:w-[60vw] lg:h-[68.2vh] md:w-[60vw] md:h-[68.2vh] w-screen h-screen  rounded-2xl bg-[url(/images/padded.png)] bg-pink-400 p-6 shadow-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0">
            <div className="border-1 border-pink-300 inset-shadow-white inset-shadow-sm  backdrop-blur-xs rounded-2xl m-9 mb-15 flex flex-col justify-center items-center">
              <div className="mailBtn ">
                <label htmlFor="Email">
                  <span className="text-lg font-bold text-white ">
                    Email or Mobile Number
                  </span>

                  <input
                    type="email"
                    id="Email"
                    className="mt-1 p-4 h-9 bg-[#fff7ff] w-90 block rounded border-gray-900 shadow-md !text-lg sm:text-sm"
                  />
                </label>
              </div>
              <div className="passBtn mt-5">
                <label htmlFor="pass" className="block relative w-90">
                  <span className="text-lg font-bold text-white">Password</span>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="pass"
                    className="mt- p-4 h-9 bg-[#fff7ff] w-full block rounded border-gray-900 shadow-md !text-lg sm:text-sm pr-10"
                  />

                  {/* Eye Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[72%] -translate-y-1/2 text-gray-600 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </label>
              </div>
              {/* forget pass btn */}
              <div className="mt-6 w-full lg:mr-28 md:mr-0 flex lg:justify-end md:justify-center">
                <a
                  href="#"
                  className="text-white text-lg hover:font-bold transition-all ease-in"
                >
                  Forgot password ?
                </a>
              </div>
              {/* login btns */}
              <div className="mt-7 flex justify-center">
                <a
                  className="group relative inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                  href="#"
                >
                  <span className="absolute -start-full transition-all group-hover:start-4">
                    <LogIn size={15} />
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Signin
                  </span>
                </a>
                <a
                  className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-3 py-3 text-sky-100 focus:ring-3 focus:outline-hidden"
                  href="#"
                >
                  <span className="absolute -start-full transition-all group-hover:start-1">
                    <Import size={15} />
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Register User
                  </span>
                </a>
              </div>
            </div>
            {/* images side */}
            <div className="img lg:inline-block  md:inline-block sm:hidden">
              <img src="/images/login-mascot.png" alt="mascot" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
