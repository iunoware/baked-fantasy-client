import { useEffect, useState } from "react";
import { X, SquarePen } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

function SettingsAdmin() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function postAdmin(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.adminName.value.trim();
    const password = form.password.value.trim();
    const confirmPass = form.confirmPass.value.trim();
    const masterName = form.masterName.value.trim();
    const masterPassword = form.masterPassword.value.trim();

    if (password !== confirmPass) {
      toast.error("Passwords must match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/admin/newUser", {
        name,
        password,
        confirmPass,
        masterName,
        masterPassword,
      });

      toast.success("Admin created successfully 🎉");
      setIsModalVisible(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error(
        "Error creating admin:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <>
      <div className="bg h-[100vh]">
        {/* create Admin modal */}
        <div
          className={`${
            isModalVisible ? "block" : "hidden"
          } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="w-[60vh] rounded-lg bg-white p-6 shadow-lg">
            <div className="flex justify-between pb-3">
              <h2 className="text-2xl font-bold">Create New Admin</h2>
              <button
                onClick={() => {
                  setIsModalVisible(false), toast.error("No admin Saved");
                }}
                className="cursor-pointer hover:rotate-90 transition-all ease-in"
              >
                <X />
              </button>
            </div>
            <form className="mt-4 flex flex-col gap-3" onSubmit={postAdmin}>
              {/* Name */}
              <div className="flex gap-3 justify-between items-center">
                <input
                  type="text"
                  name="adminName"
                  // id="bannerTitle"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Name"
                />
              </div>
              {/* password */}
              <div className="flex gap-3 justify-between items-center">
                <input
                  type="text"
                  name="password"
                  // id="bannerSubject"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Enter Password"
                />
              </div>
              {/* Re-enter Password */}
              <div className="flex gap-3 justify-between items-center">
                <input
                  type="text"
                  name="confirmPass"
                  placeholder="Re-enter Password"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full "
                />
              </div>
              {/* Master Name */}
              <div className="flex gap-3 justify-between items-center">
                <input
                  type="text"
                  name="masterName"
                  //   id="duration"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Enter Master Name"
                />
              </div>

              {/* Master Password */}
              <div className="flex items-center justify-between flex-row">
                <input
                  type="text"
                  name="masterPassword"
                  //   id="duration"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Enter Master Password"
                />
              </div>

              <div className="flex justify-center items-center my-4">
                <button
                  type="submit"
                  className="bg-pink-600 font-semibold hover:cursor-pointer hover:bg-pink-500 transition-all duration-200 text-white px-4 py-3 rounded-xl"
                >
                  Add New Admin
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="lg:pl-30 pl-20 pt-10 pr-10">
          {/* heading */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Settings</h1>

              <p className="text-md pt-1">Configure your bakery admin panel</p>
            </div>
            <div>
              <button
                // onClick={() => setIsModalVisible(true)}
                className="bg-pink-500 flex gap-2 items-center text-white font-semibold py-3 px-5 rounded-xl hover:bg-pink-600 transition-colors duration-200"
              >
                <SquarePen size={15} /> Edit Banner
              </button>
            </div>
          </div>
          {/* main section */}
          <div className="flex gap-10 items-center justify-center mt-10">
            {/* 1 */}
            <div className="bg-white relative p-5 rounded-2xl shadow-2xl w-[50%] h-fit">
              <div className="">
                <h2 className="font-bold text-xl">Company Details</h2>
                <p className="pt-2">The Baked Fantasy</p>
              </div>

              <div className="mt-7 flex flex-col space-y-5">
                <div className="">
                  <h2 className="font-bold text-black/90 text-xl">
                    Store Name
                  </h2>
                  <p className="pl-4 text-lg pt-1">The Baked Fantasy</p>
                </div>
                <div className="">
                  <h2 className="font-bold text-black/90 text-xl">Address</h2>
                  <p className="pl-4 pt-1 text-lg">
                    123 Baker Street, Sweet City, SC 12345
                  </p>
                </div>
                <div className="">
                  <h2 className="font-bold text-black/90 text-xl">Phone</h2>
                  <p className="pl-4 pt-1 text-lg">+1 (555) 123-CAKE</p>
                </div>
              </div>
              {/* <div className="absolute flex items-center justify-center right-5 bottom-5 flex-row gap-5">
                <SquarePen
                  onClick={() => setIsModalVisible(true)}
                  color="#808080"
                  size={20}
                  className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
                />
              </div> */}
            </div>
            {/* 2 */}
            <div className="bg-white relative p-5 rounded-2xl shadow-2xl w-[50%] h-fit">
              <div className="">
                <h2 className="font-bold text-xl">Admin Management</h2>
                <p className="pt-2">Your account settings</p>
              </div>

              <div className="mt-5 flex flex-col space-y-5">
                <div className="">
                  <h2 className="font-bold text-black/90 text-xl">Name</h2>
                  <p className="pl-4 text-lg pt-1">Master Admin</p>
                </div>
                {/* <div className="">
                  <h2 className="font-bold text-black/90 text-xl">
                    New User Account
                  </h2>
                  <p className="pl-4 pt-1 text-lg">Subjects not yet</p>
                </div>
                <div className="">
                  <h2 className="font-bold text-black/90 text-xl">Status</h2>
                  <p className="pl-4 pt-1 text-lg">banner</p>
                </div> */}
                <button
                  className="bg-pink-400 mx-auto rounded-2xl text-white font-bold hover:scale-95 transition-all p-2 w-fit"
                  onClick={() => setIsModalVisible(true)}
                >
                  Create New Admin
                </button>
              </div>
              {/* <div className="absolute flex items-center justify-center right-5 bottom-5 flex-row gap-5">
                <SquarePen
                  onClick={() => setIsModalVisible(true)}
                  color="#808080"
                  size={20}
                  className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SettingsAdmin;
