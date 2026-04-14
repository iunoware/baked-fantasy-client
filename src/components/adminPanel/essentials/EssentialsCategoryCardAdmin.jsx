// export default EssentialsCategoryCardAdmin;

/* eslint-disable no-unused-vars */
import { Trash2, SquarePen, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function EssentialsCategoryCardAdmin(props) {
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [isActive, setIsActive] = useState(props.activate);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [isBtnVisible, setIsBtnVisible] = useState(false);

  // new delete timer useState
  const [deleteTimer, setDeleteTimer] = useState(3);

  const token = "";

  async function patchCategory(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.categoryTitle.value.trim() || props.title;
    const subject = form.categorySubject.value.trim() || props.subject;
    const file = form.categoryFile.files[0];
    const active = isActive;

    const formData = new FormData();

    if (name) formData.append("title", name);
    // formData.append("title", name);

    if (subject) formData.append("subject", subject);
    // formData.append("subject", subject);

    if (file) formData.append("image", file);
    // formData.append("image", file);

    formData.append("isActive", active);

    if (!name && !subject && !file) {
      toast.error("Please enter any one information");
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/ess-categories/${props.categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //   console.log("patch data: ", response.data);
      toast.success("Category Edited");
      setIsModal2Visible(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("can't edit category");
      console.error("something went wrong", error.message);
    }
  }

  // function deleteTimeout() {
  //   setTimeout(() => {
  //     setIsBtnVisible(true);
  //   }, 3000);
  // }

  async function deleteFunction() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/ess-categories/${props.categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response.data);
      toast.success(`${props.title} deleted successfully`);
      setDeleteModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.log(`Deleted ${props.title}`);
    } catch (error) {
      toast.error(`Can't delete ${props.title}`);
      console.error(`can't delete ${props.title}`, error.message);
    }
  }

  // new delete timer
  useEffect(() => {
    if (deleteModal) {
      setDeleteTimer(3);
      const timer1 = setTimeout(() => setDeleteTimer(2), 1000);
      const timer2 = setTimeout(() => setDeleteTimer(1), 2000);
      const timer3 = setTimeout(() => setDeleteTimer(0), 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [deleteModal]);

  return (
    <div className="">
      {/* modal for patch category */}
      <div
        className={`${
          isModal2Visible ? "block" : "hidden"
        } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="w-full max-w-md rounded-xl bg-white backdrop-blur-xl p-10 shadow-lg">
          <div className="flex items-start justify-between">
            <h2
              id="modalTitle"
              className="md:text-3xl text-center w-full mb-5 font-bold text-black text-2xl"
            >
              Edit {props.title}
            </h2>

            <button
              type="button"
              onClick={() => {
                setIsModal2Visible(false);
                toast.error("No edit saved");
              }}
              className="-me-4 -mt-4 rounded-full p-2 cursor-pointer transition-all hover:rotate-90 ease-in focus:outline-none"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={patchCategory} className="mt-4 flex flex-col gap-3">
            {/* title */}
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="categoryTitle"
                id="categoryTitle"
                defaultValue={props.title}
                // onChange={(e) => setTitle(e.target.value)}
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder="Category name"
              />
            </div>

            {/* subject */}
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="categorySubject"
                id="categorySubject"
                defaultValue={props.subject}
                // onChange={(e) => setSubject(e.target.value)}
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder="Subject"
              />
            </div>

            {/* file */}
            <div className="flex gap-3 justify-between items-center">
              <input
                type="file"
                id="categoryFile"
                name="categoryFile"
                className=" h-20 border-2 cursor-pointer border-dashed border-gray-500 text-black rounded-lg p-2 w-full"
              />
            </div>

            {/* isActive */}
            <div className="flex justify-between mb-5">
              <div>
                {/* <h4>{isActive ? "🟢 Active" : "🔴 De-active"}</h4> */}
                <h4>{isActive ? "🟢 Visible" : "🔴 Hidden"}</h4>
              </div>

              <input
                type="checkbox"
                checked={isActive}
                id="inStockProduct"
                // onClick={() => setIsActive((prev) => !prev)}
                onChange={() => setIsActive((prev) => !prev)}
                className="h-6 w-6"
              />

              {/* <label
                htmlFor={props.title}
                className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
              >
                <input
                  type="checkbox"
                  onClick={() => setIsActive((prev) => !prev)}
                  id={props.title}
                  className="peer sr-only"
                />

                <span className="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                  <Check size={10} />

                  <X size={10} />
                </span>
              </label> */}
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="new-primary-bg w-full font-semibold hover:cursor-pointer hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Confirm Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* modal for delete warning */}
      {/* <div
        className={`${
          deleteModal ? "block" : "hidden"
        } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="w-full max-w-md rounded-xl bg-white backdrop-blur-xl p-10 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2
                id="modalTitle"
                className="md:text-3xl text-center w-full mb-5 font-bold text-black text-2xl"
              >
                Are you sure? Do you really want to{" "}
                <span className="text-red-600">delete</span>{" "}
                <span className="text-pink-500">{props.title}</span>
              </h2>
              <p className=" text-center w-full mb-5 text-black">
                The category{" "}
                <span className="text-pink-500 font-semibold text-lg">{props.title}</span>{" "}
                will be{" "}
                <span className="text-red-600 font-semibold">permanently deleted</span>,
                and can't be recovered back.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setDeleteModal(false);
                setIsBtnVisible(false);
              }}
              className="-me-4 -mt-4 rounded-full p-2 cursor-pointer transition-all hover:rotate-90 ease-in focus:outline-none"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {isBtnVisible ? (
            <div
              className={`${
                isBtnVisible ? "block" : "hidden"
              } flex justify-center items-center`}
            >
              <button
                type="button"
                onClick={deleteFunction}
                className="bg-red-600 w-full font-semibold hover:cursor-pointer hover:bg-red-700 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Delete {props.title}
              </button>
            </div>
          ) : (
            <div className="text-center">Loading please wait...</div>
          )}
        </div>
      </div> */}
      <div
        className={`fixed inset-0 z-50 grid place-content-center bg-black/50 p-4 ${deleteModal ? "block" : "hidden"}`}
      >
        <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative text-center">
          <X
            className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
            onClick={() => setDeleteModal(false)}
          />
          <h2 className="text-2xl font-bold mb-4 text-red-600">Warning</h2>
          <p className="text-sm font-medium text-gray-700 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-bold">"{props.title}"</span>? This will also{" "}
            <span className="font-bold">delete all the products</span> inside this
            category. This action cannot be undone.
          </p>
          {deleteTimer > 0 ? (
            <button
              disabled
              className="bg-gray-400 w-full font-semibold text-white px-4 py-3 rounded-xl cursor-not-allowed"
            >
              Wait {deleteTimer}s to Confirm
            </button>
          ) : (
            <button
              onClick={deleteFunction}
              className="bg-red-600 w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
            >
              Yes, Delete Essential
            </button>
          )}
        </div>
      </div>

      {/* <h1>hello world</h1> */}
      {/* <p>Current category: {props.title}</p> */}
      <div
        className={`${
          props.activate ? "bg-white" : "bg-red-300"
        } rounded-2xl min-h-75 shadow-xl m-2 group relative`}
      >
        <div className="rounded-xl h-40 w-auto !m-2 translate-y-2 flex align-bottom overflow-hidden">
          <div className="absolute top-2 right-2 flex gap-2 z-10 bg-white/80 p-1.5 rounded-lg">
            <SquarePen
              className="cursor-pointer text-blue-600 hover:-translate-y-1 transition-all duration-200"
              onClick={() => setIsModal2Visible(true)}
              size={20}
            />

            <Trash2
              className="cursor-pointer text-red-600 hover:-translate-y-1 transition-all duration-200"
              onClick={() => {
                setDeleteModal(true);
                // deleteTimeout();
              }}
              size={20}
            />
          </div>
          <img
            // src={`http://localhost:5000${props.image}`}
            src={
              props.image ? `http://localhost:5000${props.image}` : "/images/fallback.png"
            }
            alt="course-img"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "/images/fallback.png";
            }}
            className="rounded-xl w-full h-full object-center object-cover !z-0 hover:scale-104 transition-all duration-200"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <Link
              to={`/admin/essentials/${props.title}`}
              state={{
                categoryId: props.categoryId,
                categoryName: props.title,
              }}
              className="bg-white cursor-pointer rounded-full px-3 py-2 font-bold translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            >
              View Product
            </Link>
          </div>
        </div>
        <div className="p-5 w-full flex justify-between">
          <div>
            <h2 className="font-semibold text-2xl">{props.title}</h2>

            <p className="">{props.subject}</p>
          </div>

          <div className="mt-4 flex justify-between">
            {/* <div className="text-3xl font-bold text-pink-500">₹{props.price}</div> */}
            {/* <div className="flex flex-row justify-end items-start gap-4">
              <div>
                <SquarePen
                  color="#000000"
                  size={20}
                  onClick={() => setIsModal2Visible(true)}
                  className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
                />
              </div>
              <div>
                <Trash2
                  color="#ff0000"
                  size={20}
                  onClick={() => {
                    setDeleteModal(true);
                    deleteTimeout();
                  }}
                  className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EssentialsCategoryCardAdmin;
