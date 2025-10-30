import { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Eye, EyeOff, Mail, Lock, X } from "lucide-react";

function AdminLogin() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  return (
    <>
      <div className="bg-black/90 fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center-safe justify-center-safe">
        {/* login form */}
        <div
          className={`${
            isModalVisible ? "block" : "hidden"
          } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-[70vh] rounded-lg bg-white p-6 shadow-lg">
            <div className="flex justify-between pb-3">
              <h2 className="text-2xl font-bold">Admin Login</h2>
              <button
                onClick={() => {
                  setIsModalVisible(false), toast.error("No edit Saved");
                }}
                className="cursor-pointer hover:rotate-90 transition-all ease-in"
              >
                <X />
              </button>
            </div>
            <form
              className="mt-4 flex flex-col gap-3"
              //  onSubmit={postCategory}
            >
              {/* <p className="text-pretty text-gray-700">this is a test run</p> */}
              {/* Admin Name */}
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="userName">Admin Name</label>
                <input
                  type="text"
                  name="adminName"
                  id="adminName"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Title"
                />
              </div>
              {/* Sub heading */}
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="userName">Password</label>
                <input
                  type="text"
                  name="bannerSubject"
                  // id="bannerSubject"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Subject"
                />
              </div>

              <div className="flex justify-center items-center my-4">
                <button
                  type="submit"
                  className="bg-pink-600 font-semibold hover:cursor-pointer hover:bg-pink-500 transition-all duration-200 text-white px-4 py-3 rounded-xl"
                >
                  Add new category
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
