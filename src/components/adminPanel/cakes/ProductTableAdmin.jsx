/* eslint-disable no-unused-vars */
import axios from "axios";
import { SquarePen, X, Check, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function ProductAdmin(props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isActive, setIsActive] = useState(props.isActive);
  const [inStock, setInStock] = useState(props.inStock);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  // new delete timer useState
  const [deleteTimer, setDeleteTimer] = useState(3);

  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc3MjUyNjIxNywiZXhwIjoxNzcyNjEyNjE3fQ.vWlcrqHvxh3Nb6pj8TuItnzBsjtfh21ahtuBp1w1_CE";
  // localStorage.setItem("token", token);

  function deleteTimeout() {
    setTimeout(() => {
      setIsBtnVisible(true);
    }, 3000);
  }

  async function deleteFunction() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/products/${props.productId}`,
      );
      // console.log(response.data);
      toast.success(`${props.title} deleted successfully`);
      setDeleteModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 200);
      // console.log(`Deleted: ${props.title}`);
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

  async function patchProduct(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.productTitle.value.trim() || props.title;
    const subject = form.productSubject.value.trim() || props.subject;
    const files = form.productFile?.files;
    const originalPrice = form.productOriginalPrice.value.trim() || props.originalPrice;
    const discountedPrice = form.productPrice.value.trim() || props.discountedPrice;
    const description = form.productDescription.value.trim() || props.description;
    const info = form.productInfo.value.trim() || props.info;
    // const active = isActive;
    // if (files.length > 4) {
    //   window.alert("You can only upload up to 4 images.");
    //   return;
    // }

    const formData = new FormData();
    if (name) formData.append("title", name);
    if (subject) formData.append("subject", subject);
    if (originalPrice) formData.append("originalPrice", originalPrice);
    if (discountedPrice) formData.append("discountedPrice", discountedPrice);
    if (description) formData.append("description", description);
    if (info) formData.append("info", info);
    // if (props.categoryName) formData.append("category", props.categoryName);
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }
    formData.append("isActive", isActive);
    formData.append("inStock", inStock);

    try {
      const postResponse = await axios.patch(
        `http://localhost:5000/products/${props.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("product status: ", postResponse.data);
      toast.success("Product success fully added");
      setIsEditModal(false);
      setTimeout(() => {
        window.location.reload();
        // }, 1000);
      }, 300);
    } catch (error) {
      toast.error("Can't add products");
      console.error("error message: ", error.message);
    }
  }

  // path individual images
  const handleReplaceImage = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png, image/jpeg, image/webp, image/gif";
    fileInput.onchange = async (e) => {
      const newFile = e.target.files[0];
      if (!newFile) return;

      const formData = new FormData();
      formData.append("image", newFile);
      formData.append("replaceIndex", index);

      try {
        const res = await axios.patch(
          `http://localhost:5000/products/${props.productId}/replace-image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        toast.success("Image replaced successfully!");
        console.log("Updated product:", res.data);
        setTimeout(() => window.location.reload(), 800);
      } catch (error) {
        console.error("Image replace failed:", error);
        toast.error("Couldn't replace image");
      }
    };
    fileInput.click();
  };

  return (
    <>
      <tr>
        <td>
          {/* modal for edit products */}
          <div
            className={`${
              isEditModal ? "block" : "hidden"
            } fixed inset-0 z-50 grid place-content-center bg-black/50 p-4`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="w-full max-w-md rounded-xl edit-modal overflow-auto h-150 bg-white backdrop-blur-xl p-10 shadow-lg">
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
                    setIsEditModal(false);
                    toast.error("No edit saved");
                  }}
                  className="-me-4 -mt-4 rounded-full p-2 transition-all transform ease-in hover:rotate-90 focus:outline-none"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={patchProduct} className="mt-4 flex flex-col gap-3">
                {/* title */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productTitle"
                    id="productTitle"
                    defaultValue={props.title}
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Product name"
                  />
                </div>

                {/* file */}
                <div className="flex flex-col gap-3 justify-between items-center">
                  {/* <input
                    type="file"
                    id="productFile"
                    name="productFile"
                    multiple
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    className="h-20 border-2 cursor-pointer border-dashed border-gray-500 text-black rounded-lg p-2 w-full"
                  /> */}

                  <h2 className="font-semibold">Click an image to replace</h2>
                  <div className="flex gap-1 cursor-pointer">
                    {props.images.map((image, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={`http://localhost:5000${image}`}
                          alt={`product image ${i} `}
                          className="h-20 w-20 object-center object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <SquarePen
                            color="#ffffff"
                            className="cursor-pointer"
                            onClick={() => handleReplaceImage(i)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* subject */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productSubject"
                    id="productSubject"
                    defaultValue={props.subject}
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Subject"
                  />
                </div>

                {/* discounted price */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productPrice"
                    id="productPrice"
                    defaultValue={props.discountedPrice}
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Price"
                  />
                </div>

                {/* original price */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productOriginalPrice"
                    id="productOriginalPrice"
                    defaultValue={props.originalPrice}
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Original Price"
                  />
                </div>

                {/* description */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productDescription"
                    id="productDescription"
                    defaultValue={props.description}
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Description"
                  />
                </div>

                {/* info */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productInfo"
                    id="productInfo"
                    defaultValue={props.info}
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Info"
                  />
                </div>

                {/* isActive */}
                {/* to hide or show the product */}
                <div className="flex justify-between mt-5">
                  <div>
                    {/* <h4>{isActive ? "🟢 Active" : "🔴 De-active"}</h4> */}
                    <h4>{isActive ? "🟢 Visible" : "🔴 Hidden"}</h4>
                  </div>
                  <input
                    type="checkbox"
                    checked={isActive}
                    // onClick={() => setIsActive((prev) => !prev)}
                    onChange={() => setIsActive((prev) => !prev)}
                    id={props.title}
                    className="h-6 w-6"
                  />
                  {/* <label
                    htmlFor={props.title}
                    className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
                  >
                    <input
                      type="checkbox"
                      checked={!isActive}
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

                {/* inStock */}
                <div className="flex gap-3 my-5 justify-between items-center">
                  <div>
                    <h4>{inStock ? "🟢 In-stock" : "🔴 Not-in-stock"}</h4>
                  </div>
                  <input
                    type="checkbox"
                    checked={inStock}
                    // onClick={() => setInStock((prev) => !prev)}
                    onChange={() => setInStock((prev) => !prev)}
                    id={props._id}
                    className="h-6 w-6"
                  />

                  {/* <label
                    htmlFor={props._id}
                    className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
                  >
                    <input
                      type="checkbox"
                      checked={inStock}
                      onClick={() => setInStock((prev) => !prev)}
                      id={props._id}
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
                    Update changes
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
                    <span className="text-red-600">{props.title}</span>
                  </h2>
                  <p className=" text-center w-full mb-5 text-black">
                    The product{" "}
                    <span className="text-red-600 font-bold text-lg">{props.title}</span>{" "}
                    will be{" "}
                    <span className="text-red-600 font-bold">permanently deleted</span>,
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
              <p className="text-lg font-medium text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-bold">"{props.title}"</span>? This action cannot be
                undone.
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
        </td>
      </tr>
      <tr
        className={`${props.i % 2 === 0 ? "bg-gray-50" : ""} ${
          !props.isActive ? "bg-red-200" : ""
        } my-3 divide-y text-lg divide-gray-300 `}
      >
        <td className="p-4">{props.i + 1}</td>
        <td className="p-4">
          <img
            src={`http://localhost:5000${props.images[0]}`}
            alt="Product Image"
            className="h-20 rounded-lg object-center object-cover w-20"
          />
        </td>
        <td className="p-4">
          <span className="font-semibold">{props.title}</span>
          <span className="text-md text-gray-800 block">({props.subject})</span>
        </td>
        <td className="p-4">₹{props.originalPrice}</td>
        <td className="p-4">₹{props.discountedPrice}</td>
        <td className="p-4">{props.description}</td>
        <td className="p-4">{props.info}</td>
        <td className="p-4 ">{props.inStock ? "🟢 Yes" : "🔴 No"}</td>
        <td className="p-4 text-center align-middle">
          <div className="flex gap-3 !h-full !w-full justify-center items-center">
            <div>
              <SquarePen
                size={20}
                className="cursor-pointer hover:-translate-y-1 transition-all duration-200"
                onClick={() => setIsEditModal(true)}
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
                className="cursor-pointer hover:-translate-y-1 transition-all duration-200"
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ProductAdmin;
