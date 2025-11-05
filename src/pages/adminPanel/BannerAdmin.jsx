import { useEffect, useState } from "react";
import { X, SquarePen } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

function BannerAdmin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActive, setActive] = useState(false);
  const [banner, setBanner] = useState({});
  const token = "";

  async function postCategory(e) {
    e.preventDefault();

    const form = e.target;
    const title = form.bannerTitle.value.trim();
    const subject = form.bannerSubject.value.trim();
    const endDate = form.lastDate.value.trim();
    const file = form.bgImg.files[0];
    const active = isActive;

    const formData = new FormData();
    if (title) formData.append("title", title);
    if (subject) formData.append("subject", subject);
    if (file) formData.append("image", file);
    if (endDate) formData.append("endDate", endDate);
    formData.append("active", active);

    try {
      const postBanner = await axios.patch(
        "http://localhost:5000/banner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      toast.success("Banner Edited Successfully 🍰");
      // console.log("Banner added: ", postBanner.data);
      // console.log("Current toggle value:", isActive);
      setIsModalVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("error message: ", error.message);
      toast.error("Try Again 😑");
    }
  }

  useEffect(() => {
    const fetchBaner = async () => {
      try {
        const res = await axios.get("http://localhost:5000/banner");
        setBanner(res.data[0]);
        // console.log(res.data);
      } catch (error) {
        console.error("Error Fetching Banner", error);
      }
    };
    fetchBaner();
  }, []);

  useEffect(() => {
    if (!banner?.endDate) return;

    const now = new Date();
    const end = new Date(banner.endDate);

    if (end < now && banner.active) {
      setActive(false);

      axios
        .patch("http://localhost:5000/banner", { active: false })
        .then(() => toast.success("Banner automatically deactivated 🔴"))
        .catch((err) => console.error("Auto deactivate error:", err));
    }
  }, [banner]);

  return (
    <div className="bg h-[100vh]">
      {/* edit banner modal */}
      <div
        className={`${
          isModalVisible ? "block" : "hidden"
        } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="md:w-[60vw] w-[90vw] rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-between pb-3">
            <h2 className="text-2xl font-bold">Edit Banner</h2>
            <button
              onClick={() => {
                setIsModalVisible(false), toast.error("No edit Saved");
              }}
              className="cursor-pointer hover:rotate-90 transition-all ease-in"
            >
              <X />
            </button>
          </div>
          <form className="mt-4 flex flex-col gap-3" onSubmit={postCategory}>
            {/* <p className="text-pretty text-gray-700">this is a test run</p> */}
            {/* title */}
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="bannerTitle"
                // id="bannerTitle"
                className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                placeholder="Title"
              />
            </div>
            {/* Sub heading */}
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="bannerSubject"
                // id="bannerSubject"
                className="ring ring-gray-500 placeholder:text-black text-black rounded-lg p-2 w-full"
                placeholder="Subject"
              />
            </div>
            {/* Date */}
            <div className="flex gap-3 border-1 rounded-lg p-2 border-gray-500 justify-between items-center">
              <label htmlFor="lastDate">LastDate:</label>
              <input
                type="date"
                name="lastDate"
                id="lastDate"
                className=""
                placeholder="Enter Last Date for the Banner"
              />
            </div>
            {/* image */}
            <div className="flex gap-3 justify-between items-center">
              <input
                type="file"
                name="bgImg"
                placeholder="Choose an Background Image"
                className="ring h-20 ring-gray-500 text-black text-center rounded-lg p-2 w-full"
              />
            </div>
            {/* Active */}
            {/* <label htmlFor="isActive">Active</label> */}
            <div className="flex items-center justify-between flex-row px-3">
              <p>{isActive ? "Activate" : "De-activate"}</p>
              <label
                htmlFor="AcceptConditions"
                className="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
              >
                <input
                  onClick={() => setActive((prev) => !prev)}
                  type="checkbox"
                  id="AcceptConditions"
                  className="peer sr-only"
                />

                <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked::first:hidden *:last:hidden peer-checked::last:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
              </label>
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

      <div className="lg:pl-30 pl-20 pt-10 pr-10">
        {/* heading */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Banner</h1>

            <p className="text-md pt-1">Edit Banners</p>
          </div>
          <div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="bg-pink-500 flex gap-2 items-center text-white font-semibold py-3 px-5 rounded-xl hover:bg-pink-600 transition-colors duration-200"
            >
              <SquarePen size={15} /> Edit Banner
            </button>
          </div>
        </div>
        {/* main section */}
        <div className="flex items-center justify-center mt-10">
          <div className="bg-white relative p-5 rounded-2xl shadow-2xl w-[50%] h-fit">
            <div className="">
              <h2 className="font-bold text-xl">Banner Information</h2>
              <p className="pt-2">Temporary Banner</p>
            </div>

            <div className="mt-7 flex flex-col space-y-5">
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">Heading</h2>
                <p className="pl-4 text-lg pt-1">
                  {banner?.title || "Titles not yet"}
                </p>
              </div>
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">Sub Heading</h2>
                <p className="pl-4 pt-1 text-lg">
                  {banner?.subject || "Subjects not yet"}
                </p>
              </div>
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">Status</h2>
                <p className="pl-4 pt-1 text-lg">
                  {banner?.active === true
                    ? "🟢 Active"
                    : banner?.active === false
                    ? "🔴 Inactive"
                    : "Status not defined"}
                </p>
              </div>
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">Active Till</h2>
                <p className="pl-4 pt-1 text-lg">
                  {banner?.endDate || "Last Date Not Found"}
                </p>
              </div>
            </div>
            <div className="absolute flex items-center justify-center right-5 bottom-5 flex-row gap-5">
              <SquarePen
                onClick={() => setIsModalVisible(true)}
                color="#808080"
                size={20}
                className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
              />
              {/* <label
                htmlFor="AcceptConditions"
                className="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
              >
                <input
                  // onClick={() => setActive((prev) => !prev)}
                  onClick={() => axios.patch("http://localhost:5000/banner")}
                  type="checkbox"
                  id="AcceptConditions"
                  className="peer sr-only"
                />

                <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked::first:hidden *:last:hidden peer-checked::last:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
              </label> */}
            </div>
          </div>

          {/* <div className="absolute flex items-center justify-center right-5 bottom-5 flex-row gap-5">
            <SquarePen
              onClick={() => setIsModalVisible(true)}
              color="#808080"
              size={20}
              className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
            />
            <label
              htmlFor="AcceptConditions"
              className="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500"
            >
              <input
                type="checkbox"
                id="AcceptConditions"
                className="peer sr-only"
              />

              <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked::first:hidden *:last:hidden peer-checked::last:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BannerAdmin;
