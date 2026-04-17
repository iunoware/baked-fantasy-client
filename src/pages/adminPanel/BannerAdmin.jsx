/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { X, SquarePen, Check } from "lucide-react";
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
    if (endDate) formData.append("endDate", endDate); // only send if not empty
    formData.append("active", active);

    try {
      const postBanner = await axios.patch("http://localhost:5000/banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: ` Bearer ${token}`,
        },
      });
      toast.success("Banner Edited Successfully ");
      setIsModalVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("error message: ", error.message);
      toast.error("Try Again ");
    }
  }

  // get banner
  useEffect(() => {
    const fetchBaner = async () => {
      try {
        const res = await axios.get("http://localhost:5000/banner");
        setBanner(res.data[0]);
        console.log("banner data: ", res.data[0]);
      } catch (error) {
        console.error("Error Fetching Banner", error);
      }
    };
    fetchBaner();
  }, []);

  useEffect(() => {
    if (banner?.active !== undefined) {
      // console.log("banner.active value:", banner.active, "type:", typeof banner.active);
      setActive(banner.active === true || banner.active === "true");
    }
  }, [banner]);

  // patch banner
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
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-between pb-3">
            <h2 className="text-2xl font-bold">Edit Banner</h2>
            <button
              onClick={() => {
                (setIsModalVisible(false), toast.error("No edit Saved"));
              }}
              className="cursor-pointer hover:rotate-90 transition-all ease-in"
            >
              <X />
            </button>
          </div>
          <form className="mt-4 flex flex-col gap-3" onSubmit={postCategory}>
            {/* title */}
            <p className="text-sm text-gray-700">Title:</p>
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="bannerTitle"
                // id="bannerTitle"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder={"title"}
                defaultValue={banner?.title || ""}
              />
            </div>

            {/* Sub heading */}
            <p className="text-sm text-gray-700">Sub heading:</p>
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="bannerSubject"
                // id="bannerSubject"
                className="ring ring-gray-500 ext-black rounded-lg p-2 w-full"
                placeholder="Subject"
                defaultValue={banner?.subject || ""}
              />
            </div>

            {/* Date */}
            <p className="text-sm text-gray-700">Date:</p>
            <div className="flex gap-3 border-1 rounded-lg p-2 border-gray-500 justify-between items-center">
              {/* <label className="text-gray-400" htmlFor="lastDate">
                LastDate:
              </label> */}
              <input
                type="date"
                name="lastDate"
                id="lastDate"
                className=""
                placeholder="Enter Last Date for the Banner"
                defaultValue={banner?.endDate ? banner.endDate.split("T")[0] : ""}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* image */}
            <p className="text-sm text-gray-700">Image:</p>
            <div className="flex gap-3 justify-between items-center">
              <input
                type="file"
                name="bgImg"
                placeholder="Choose an Background Image"
                className="ring h-20 ring-gray-500 text-black text-center rounded-lg p-2 w-full"
              />
            </div>

            {/* Active */}
            <div className="flex items-center justify-between flex-row px-3">
              <p>{isActive ? "Active" : "Inactive"}</p>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setActive((prev) => !prev)}
                className="h-6 w-6"
              />
            </div>

            <div className="flex justify-center items-center my-4">
              <button
                type="submit"
                className="new-primary-bg font-semibold hover:cursor-pointer hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Confirm Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:pl-30 pl-20 pt-10 pr-5">
        {/* heading */}
        <div className="flex flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl new-primary-text font-semibold lora">Banner</h1>

            <p className="text-md pt-1">Edit Banners</p>
          </div>
          <div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="new-primary-bg flex gap-2 items-center text-white font-semibold px-2 py-2 md:py-3 md:px-5 rounded-xl hover:scale-102 transition-all duration-200"
            >
              <SquarePen size={15} /> Edit Banner
            </button>
          </div>
        </div>
        {/* main section */}
        <div className="flex items-center justify-center mt-10">
          {/* {banner.length < 0 ? ( */}
          <div className="bg-white relative p-5 rounded-2xl shadow-2xl w-200 h-fit">
            <div className="">
              <h2 className="font-bold text-xl">Banner Information</h2>
              <p className="pt-2">Temporary Banner</p>
            </div>

            <div className="mt-7 flex flex-col space-y-5">
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">Heading</h2>
                <p className="pl-4 text-lg pt-1">{banner?.title || "Titles not yet"}</p>
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
                  {/* {banner?.endDate || "Last Date Not Found"} */}
                  {banner?.endDate
                    ? new Date(banner.endDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Last Date not found"}
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
            </div>
          </div>
          {/* ) : ( */}
          {/* <div className="h-[60vh] flex flex-col space-y-3 items-center justify-center">
              <h1 className="text-2xl font-bold">No Products Added</h1>
            </div> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default BannerAdmin;
