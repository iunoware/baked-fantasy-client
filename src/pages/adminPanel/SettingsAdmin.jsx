/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { X, SquarePen, Eye, EyeOff, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

function SettingsAdmin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [visibility, setVisiblity] = useState(false);
  const [visibility2, setVisiblity2] = useState(false);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const FetchAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/user");
        setAdmin(res.data);
      } catch (error) {
        console.error("Error fetching admins", error);
      }
    };
    FetchAdmin();
  }, []);

  // delete verification

  // real delete
  async function deleteAdmin(e) {
    e.preventDefault();

    const form = e.target;
    const masterName = form.masterName1.value.trim();
    const masterPassword = form.masterPass1.value.trim();

    if (!selectedAdminId) {
      toast.error("No admin selected to delete");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/admin/delete/${selectedAdminId}`,
        {
          masterName,
          masterPassword,
        }
      );
      toast.success("Admin deleted successfully");
      setAdmin(admin.filter((a) => a._id !== selectedAdminId));
      setDeleteModal(false);
      setSelectedAdminId(null);
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error(error.response?.data?.msg || "Error deleting admin");
    }
  }

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
        {/* delete modal */}
        <div
          className={`${
            deleteModal ? "block" : "hidden"
          } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="md:w-150 rounded-lg bg-white p-6 shadow-lg">
            <div className="flex justify-between pb-3">
              <h2 className="text-2xl font-bold">Delete Admin</h2>
              <button
                onClick={() => {
                  setDeleteModal(false), toast.error("No Admin Deleted");
                }}
                className="cursor-pointer hover:rotate-90 transition-all ease-in"
              >
                <X />
              </button>
            </div>
            <div>
              <p className="text-xl">
                This Admin will be{" "}
                <span className="text-red-500 font-bold">
                  permanently deleted
                </span>
                , and can't be recovered back.
              </p>
              <p className="pt-5">
                Only the <span className="font-bold">Master Admin</span> has
                permission to delete users. Enter the Admin Id and Password to
                continue.
              </p>
              {/* form */}
              <form className="mt-4 flex flex-col gap-3" onSubmit={deleteAdmin}>
                {/* Master Name */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="masterName1"
                    //   id="duration"
                    className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                    placeholder="Enter Master Name"
                  />
                </div>

                {/* Master Password */}
                <div className="flex items-center justify-between relative flex-row">
                  <label
                    // htmlFor="userName"
                    name="masterPass1"
                    className="absolute cursor-pointer end-3"
                    onClick={() => setVisiblity2((prev) => !prev)}
                  >
                    {visibility2 ? (
                      <EyeOff className="text-gray-400" size={20} />
                    ) : (
                      <Eye className="text-gray-400" size={20} />
                    )}
                  </label>
                  <input
                    title="Password must be at least 6 characters long, include uppercase, lowercase, and a number."
                    required
                    type={visibility2 ? "text" : "password"}
                    name="masterPass1"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
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
                    Delete Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* create Admin modal */}
        <div
          className={`${
            isModalVisible ? "block" : "hidden"
          } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="rounded-2xl w-90 md:w-150 bg-white p-6 shadow-lg">
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
              <div className="flex gap-3 justify-between relative items-center">
                <label
                  // htmlFor="userName"
                  name="adminPass"
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
                  name="password"
                  title="Password must be at least 6 characters long, include uppercase, lowercase, and a number."
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
                  type={visibility ? "text" : "password"}
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Enter Password"
                />
              </div>
              {/* Re-enter Password */}
              <div className="flex gap-3 justify-between relative items-center">
                <label
                  // htmlFor="userName"
                  name="adminPass"
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
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
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
              <div className="flex items-center justify-between relative flex-row">
                <label
                  // htmlFor="userName"
                  name="adminPass"
                  className="absolute cursor-pointer end-3"
                  onClick={() => setVisiblity2((prev) => !prev)}
                >
                  {visibility2 ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </label>
                <input
                  title="Password must be at least 6 characters long, include uppercase, lowercase, and a number."
                  required
                  type={visibility2 ? "text" : "password"}
                  name="masterPassword"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
                  //   id="duration"
                  className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                  placeholder="Enter Master Password"
                />
              </div>

              <div className="flex justify-center items-center my-4">
                <button
                  type="submit"
                  className="new-primary-bg font-semibold hover:cursor-pointer hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
                >
                  Add New Admin
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:pl-30 pl-20 pt-10 pr-3 md:pr-10">
          {/* heading */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl lora new-primary-text font-semibold">
                Settings
              </h1>

              <p className="text-md pt-1">Configure your bakery admin panel</p>
            </div>
            <div>
              <button
                onClick={() => setIsModalVisible(true)}
                className="new-primary-bg flex gap-2 items-center text-white font-semibold p-2 md:py-3 md:px-5 rounded-xl hover:scale-102 transition-all duration-200"
              >
                <SquarePen size={15} /> Add New Admin
              </button>
            </div>
          </div>
          {/* main section */}
          <div className="flex bg-white p-5 rounded-2xl items-center justify-center mt-10">
            <table className="min-w-full divide-y-2 divide-gray-200">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="*:font-medium *:text-gray-900">
                  <th className="px-3 py-2 whitespace-nowrap">S.No</th>
                  <th className="px-3 py-2 whitespace-nowrap">User Name</th>
                  <th className="px-3 py-2 whitespace-nowrap">Delete</th>
                </tr>
              </thead>
              {admin.length > 0 ? (
                <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                  {admin.map((a, i) => (
                    <tr key={i} className="*:text-gray-900 *:first:font-medium">
                      <td className="px-3 py-2 whitespace-nowrap">{i + 1}</td>
                      <td className="px-3 py-2 whitespace-nowrap font-bold">
                        {a.name}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap ">
                        <button disabled={a.isMaster}>
                          <Trash2
                            // onClick={() => handleDelete(a._id)}

                            onClick={() => {
                              setSelectedAdminId(a._id);
                              setDeleteModal(true);
                            }}
                            size={18}
                            className={`${
                              a.isMaster
                                ? "cursor-not-allowed text-gray-400"
                                : "text-red-700 cursor-pointer"
                            }`}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <div className="divide-y font-bold text-xl divide-gray-200 *:even:bg-gray-50">
                  NO Admin Added
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default SettingsAdmin;
