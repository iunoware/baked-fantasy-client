/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminLogin() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [visibility, setVisiblity] = useState(false);

  const verifyAdmin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.adminName.value.trim();
    const password = form.adminPass.value.trim();

    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        name,
        password,
      });

      // Save token in localStorage
      sessionStorage.setItem("token", response.data.token);
      // window.location.href = "/admin/dashboard";

      toast.success("Welcome Back Admin ");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    } catch (error) {
      console.error("Login error: ", error.message);
      toast.error("Try Again ");
    }
  };

  return (
    <>
      <div
        style={{ zIndex: "99" }}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center-safe justify-center-safe"
      >
        {/* login form */}
        <div
          className={`${
            isModalVisible ? "block" : "hidden"
          } fixed inset-0 grid place-content-center bg p-4`}
          role="dialog"
          style={{ zIndex: "99" }}
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="md:w-[60vh] rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex justify-center items-center ">
              <img
                className="w-[20%]"
                src="/images/baked-fantasy-logo.png"
                alt="THE BAKED FANTASY"
              />
            </div>
            <div className="flex justify-center py-3">
              <h2 className="text-2xl lora font-bold">Admin Login</h2>
            </div>
            <form className="mt-4 flex flex-col gap-3" onSubmit={verifyAdmin}>
              {/* Admin Name */}
              <div className="flex gap-3 justify-between items-center">
                {/* <label htmlFor="userName">Admin Name</label> */}
                <input
                  type="text"
                  required
                  name="adminName"
                  id="adminName"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Admin Name"
                />
              </div>
              {/* password */}
              <div className="flex relative gap-3  justify-between items-center">
                <label
                  htmlFor="pass"
                  className="absolute cursor-pointer end-3"
                  onClick={() => setVisiblity((prev) => !prev)}
                >
                  {visibility ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </label>
                <input
                  title="Password must be at least 6 characters long, include uppercase, lowercase, and a number."
                  required
                  type={visibility ? "text" : "password"}
                  name="adminPass"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
                  id="pass"
                  className=" ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-center items-center my-4">
                <button
                  type="submit"
                  className="bg-pbrown font-semibold hover:cursor-pointer hover:opacity-90 transition-all duration-200 text-white px-4 py-3 rounded-xl"
                >
                  Verify Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminLogin;
