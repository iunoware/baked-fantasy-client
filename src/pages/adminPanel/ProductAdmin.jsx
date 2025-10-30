// /* eslint-disable no-unused-vars */
import axios from "axios";
import { SquarePen, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function ProductAdmin(props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const token = "";

  async function postCategory(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.productTitle.value.trim();
    const subject = form.productSubject.value.trim();
    // const files = form.productFile.files;
    const originalPrice = form.productOriginalPrice.value.trim();
    const discountedPrice = form.productPrice.value.trim();
    const description = form.productDescription.value.trim();
    const info = form.productInfo.value.trim();
    const isActive = form.productIsActive.value.trim();
    // if (files.length > 4) {
    //   window.alert("You can only upload up to 4 images.");
    //   return;
    // }

    const formData = new FormData();
    if (name) formData.append("title", name);
    if (originalPrice) formData.append("originalPrice", originalPrice);
    if (discountedPrice) formData.append("discountedPrice", discountedPrice);
    if (subject) formData.append("subject", subject);
    if (description) formData.append("description", description);
    if (info) formData.append("info", info);
    // if (props.categoryName) formData.append("category", props.categoryName);
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("images", files[i]);
    // }
    formData.append("isActive", isActive);

    try {
      const postResponse = await axios.patch(
        `http://localhost:5000/products/${props.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("product status: ", postResponse.data);
      toast.success("Product success fully added");
      setIsEditModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast.error("Can't add products");
      console.error("error message: ", error.message);
    }
  }

  return (
    <>
      <tr>
        <td>
          {/* modal for post category */}
          <div
            className={`${
              isEditModal ? "block" : "hidden"
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
                  onClick={() => setIsEditModal(false)}
                  className="-me-4 -mt-4 rounded-full p-2 transition-all transform ease-in hover:rotate-90 focus:outline-none"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={postCategory} className="mt-4 flex flex-col gap-3">
                {/* title */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productTitle"
                    id="productTitle"
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Product name"
                  />
                </div>

                {/* file */}
                <div className="flex gap-3 justify-between items-center">
                  {/* <input
                    type="file"
                    id="productFile"
                    name="productFile"
                    multiple
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    className="ring h-20 ring-gray-500 text-black rounded-lg p-2 w-full"
                  /> */}

                  <div className="flex gap-1 cursor-pointer">
                    {props.images.map((image, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={`http://localhost:5000${image}`}
                          alt={`product image ${i} `}
                          className="h-20 w-20 object-center object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                          <SquarePen color="#ffffff" />
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
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Info"
                  />
                </div>

                {/* isActive */}
                <div className="flex gap-3 justify-between items-center">
                  <input
                    type="text"
                    name="productIsActive"
                    id="productIsActive"
                    className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                    placeholder="Is it in Stock? (y/n)"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="bg-pink-600 w-full font-semibold hover:cursor-pointer hover:bg-pink-500 transition-all duration-200 text-white px-4 py-3 rounded-xl"
                  >
                    Update changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </td>
      </tr>
      <tr
        className={`${
          props.i % 2 === 0 ? "bg-gray-100" : ""
        } my-3 divide-y text-lg divide-gray-300`}
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
          {props.title}
          <span className="text-md text-gray-500 block">({props.subject})</span>
        </td>
        <td className="p-4">₹{props.originalPrice}</td>
        <td className="p-4">₹{props.discountedPrice}</td>
        <td className="p-4">{props.description}</td>
        <td className="p-4">{props.info}</td>
        <td className="p-4">{props.isActive ? "true" : "false"}</td>
        <td className="p-4">
          <SquarePen
            size={20}
            className="cursor-pointer"
            onClick={() => setIsEditModal(true)}
          />
        </td>
      </tr>
    </>
  );
}

export default ProductAdmin;
