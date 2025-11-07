/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SquarePen, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import ProductAdmin from "../../../components/adminPanel/cakes/ProductTableAdmin";

function IndividualCakesAdmin() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/category/${categoryName}`
        );
        // console.log("products id: ", response.data[1]._id, response.data[1].title);
        setProducts(response.data);
      } catch (err) {
        if (err.response && err.response.data.status === 404) {
          console.warn("no products found in: ", categoryName);
          setProducts([]);
        } else {
          console.error("Error fetching products:", err);
        }
      }
    }
    fetchProducts();
  }, []);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc2MTcxNDEyMiwiZXhwIjoxNzYxODAwNTIyfQ.nHMQbJNUxXQKQ7xbabLDl018xkl0mFTcLeLvx9a9644";

  async function postCategory(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.productTitle.value.trim();
    const subject = form.productSubject.value.trim();
    const files = form.productFile.files;
    const originalPrice = form.productOriginalPrice.value.trim();
    const discountedPrice = form.productPrice.value.trim();
    const description = form.productDescription.value.trim();
    const info = form.productInfo.value.trim();
    // const isActive = form.productIsActive.value.trim();
    if (files.length > 4) {
      window.alert("You can only upload up to 4 images.");
      return;
    }

    if (
      !form ||
      !name ||
      !subject ||
      !files ||
      !originalPrice ||
      !discountedPrice ||
      !description ||
      !info
    ) {
      // window.alert("Please fill all fields and select an image!");
      toast.error("Please fill all fields!");
      return;
    } else {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("originalPrice", originalPrice);
      formData.append("discountedPrice", discountedPrice);
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("info", info);
      formData.append("category", categoryName);
      // formData.append("isActive", isActive);
      formData.append("inStock", inStock);
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      try {
        const postResponse = await axios.post(
          `http://localhost:5000/products`,
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
        setIsModalVisible(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error("Can't add products");
        console.error("error message: ", error.message);
      }
    }
  }

  return (
    <div className="lg:pl-28 pl-20 pt-10 pr-10">
      {/* modal for post category */}
      <div
        className={`${
          isModalVisible ? "block" : "hidden"
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
              Add new Product
            </h2>

            <button
              type="button"
              onClick={() => {
                setIsModalVisible(false);
                toast.error("No product added");
              }}
              className="-me-4 -mt-4 rounded-full p-2 transition-all ease-in hover:rotate-90 focus:outline-none"
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
              {/* <label htmlFor="productFile">Choose a file</label> */}
              <input
                type="file"
                id="productFile"
                name="productFile"
                multiple
                placeholder="Choose your images"
                accept="image/png, image/jpeg, image/webp, image/gif"
                className="h-20 border-2 cursor-pointer border-dashed border-gray-500 text-black rounded-lg p-2 w-full"
              />
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

            {/* inStock */}
            <div className="flex gap-3 my-5 justify-between items-center">
              <div>
                <h4>{inStock ? "🟢 In-stock" : "🔴 Not-in-stock"}</h4>
              </div>
              <label
                htmlFor="inStockProduct"
                className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
              >
                <input
                  type="checkbox"
                  onClick={() => setInStock((prev) => !prev)}
                  id="inStockProduct"
                  className="peer sr-only"
                />

                <span className="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                  <Check size={10} />

                  <X size={10} />
                </span>
              </label>
            </div>

            {/* isActive */}
            {/* <div className="flex gap-3 mt-5 justify-between items-center">
              <div>
                <h4>{isActive ? "🟢 Active" : "🔴 De-active"}</h4>
              </div>
              <label
                htmlFor="isActiveProduct"
                className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
              >
                <input
                  type="checkbox"
                  onClick={() => setIsActive((prev) => !prev)}
                  id="isActiveProduct"
                  className="peer sr-only"
                />

                <span className="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                  <Check size={10} />

                  <X size={10} />
                </span>
              </label>
            </div> */}

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="new-primary-bg w-full font-semibold hover:cursor-pointer hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Add new Product
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* add product button */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
        <div>
          <h1 className="text-3xl lora font-semibold new-primary-text Manage your bakery products">
            {categoryName}
          </h1>

          <p className="text-md pt-1">Manage your bakery products</p>
        </div>
        <div>
          <button
            onClick={() => setIsModalVisible(true)}
            className="new-primary-bg cursor-pointer text-white font-semibold py-3 px-5 rounded-xl hover:scale-102 transition-colors duration-200"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="bg shadow-xl w-full pt-5 md:p-5 my-10 rounded-xl">
        <h2 className="text-2xl font-semibold new-primary-text">
          All {categoryName} Products
        </h2>

        <div className="overflow-x-auto shadow-lg bg-white rounded-2xl mt-5 p-3 space-x-4 ">
          {products.length > 0 ? (
            <table>
              <thead>
                <tr className="divide-y text-xl divide-gray-300">
                  <th className="p-4 text-start">S.no</th>
                  <th className="p-4 text-start">Images</th>
                  <th className="p-4 text-start">Name</th>
                  <th className="p-4 text-start">Original Price</th>
                  <th className="p-4 text-start">Discounted Price</th>
                  <th className="p-4 text-start">description</th>
                  <th className="p-4 text-start">info</th>
                  <th className="p-4 text-start">InStock</th>
                  <th className="p-4 text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <ProductAdmin
                    key={i}
                    productId={product._id}
                    i={i}
                    images={product.images}
                    title={product.title}
                    subject={product.subject}
                    originalPrice={product.originalPrice}
                    discountedPrice={product.discountedPrice}
                    description={product.description}
                    info={product.info}
                    isActive={product.isActive}
                    inStock={product.inStock}
                    categoryName={categoryName}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <h2 className="text-4xl h-40 flex justify-center items-center">
                There are no products in this {categoryName} category
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IndividualCakesAdmin;
