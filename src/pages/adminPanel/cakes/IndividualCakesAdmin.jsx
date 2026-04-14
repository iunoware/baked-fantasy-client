/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SquarePen, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import ProductAdmin from "../../../components/adminPanel/cakes/ProductTableAdmin";

function IndividualCakesAdmin() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [inStock, setInStock] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const dropdownRef = useRef(null);

  // filter function
  function filterProducts(selectedFilter) {
    let updatedProducts = [...products];

    switch (selectedFilter) {
      case "inStock":
        updatedProducts = updatedProducts.filter((p) => p.inStock);
        break;
      case "notInStock":
        updatedProducts = updatedProducts.filter((p) => !p.inStock);
        break;
      case "visible":
        updatedProducts = updatedProducts.filter((p) => p.isActive);
        break;
      case "hidden":
        updatedProducts = updatedProducts.filter((p) => !p.isActive);
        break;
      case "newestFirst":
        updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldestFirst":
        updatedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        updatedProducts = [...products];
    }
    setDisplayProducts(updatedProducts);
  }

  // product fetching function
  async function fetchProducts() {
    try {
      const response = await axios.get(
        `http://localhost:5000/products/category/${categoryName}`,
      );
      // console.log("products id: ", response.data[1]._id, response.data[1].title);
      setProducts(response.data);
      setDisplayProducts(response.data);
    } catch (err) {
      if (err.response && err.response.data.status === 404) {
        console.warn("no products found in: ", categoryName);
        setProducts([]);
      } else {
        console.error("Error fetching products:", err);
      }
    }
  }

  // to close the dropdown when clicked outside the dropdown
  function handleOutsideClick(e) {
    // logic: if the dropdown exists AND the clicked element is NOT inside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsFilterOpen(false);
    }
  }

  useEffect(() => {
    fetchProducts();

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const token = "";

  async function postCategory(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.productTitle.value.trim();
    const subject = form.productSubject.value.trim();
    const files = form.productFile.files;
    const originalPrice = form.productOriginalPrice.value.trim();
    const discountedPrice = form.productPrice.value.trim();
    const description = form.productDescription.value.trim();
    const deliveryType = form.productDeliveryType.value;
    const info = form.productInfo.value.trim();
    // const isActive = form.productIsActive.value.trim();
    if (files.length !== 4) {
      toast.error("Please upload exactly 4 images");
      return;
    }

    if (
      !form ||
      !name ||
      !subject ||
      // !files ||
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
      formData.append("deliveryType", deliveryType);
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
          },
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
        console.error("Full error response:", error.response?.data);
      }
    }
  }

  return (
    <div className="lg:pl-28 pl-20 pt-10 lg:pr-10 pr-5">
      {/* modal for POST category */}
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
              <p className="text-sm text-gray-500">Exactly 4 images required.</p>
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

            {/* deliveryType */}
            <div className="flex gap-3 justify-between items-center">
              <p className="w-1/2">Delivery type:</p>
              <select
                name="productDeliveryType"
                id="productDeliveryType"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-1/2"
              >
                <option value="local">Local</option>
                <option value="pickup">Pickup</option>
                <option value="national">National</option>
              </select>
            </div>

            {/* inStock */}
            <div className="flex gap-3 my-5 justify-between items-center">
              <div>
                <h4>{inStock ? "🟢 In-stock" : "🔴 Not-in-stock"}</h4>
              </div>

              <input
                type="checkbox"
                checked={inStock}
                id="inStockProduct"
                // onClick={() => setInStock((prev) => !prev)}
                onChange={() => setInStock((prev) => !prev)}
                className="h-6 w-6"
              />
              {/* <label
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
              </label> */}
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
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-5 px-3">
          <div>
            <h2 className="text-2xl font-semibold new-primary-text">
              All {categoryName} Products
            </h2>
            <p className="text-lg">
              Total products:{" "}
              <span className="font-bold text-xl">{displayProducts.length}</span>
            </p>
          </div>

          {/* dropdown */}
          <div className="flex gap-5 justify-center items-center">
            {/* clear filter button */}
            <button
              onClick={() => setDisplayProducts(products)}
              className="active:scale-95 px-3 py-2 cursor-pointer text-lg font-medium text-black border rounded-lg transition-colors focus:relative"
            >
              Clear Filter
            </button>

            {/* filter */}
            <div ref={dropdownRef} className="relative inline-flex ">
              <span
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="inline-flex overflow-hidden rounded-lg border border-gray-300 new-primary-bg shadow-sm"
              >
                <button
                  type="button"
                  className="px-3 py-2 cursor-pointer text-lg font-medium text-white transition-colors focus:relative"
                >
                  Filter
                </button>

                <button
                  type="button"
                  className="px-3 py-2 cursor-pointer text-sm font-medium text-white transition-colors focus:relative"
                  aria-label="Menu"
                >
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    ></path>
                  </svg>
                </button>
              </span>

              {/* dropdown divs */}
              <div
                role="menu"
                className={`${isFilterOpen ? "absolute" : "hidden"} md:end-0 md:left-auto left-0 top-12 z-auto w-35 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm`}
              >
                <div
                  onClick={() => {
                    setIsFilterOpen(false);
                    // setFilter("inStock");
                    filterProducts("inStock");
                  }}
                  className="block cursor-pointer px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  In-stock
                </div>

                <div
                  onClick={() => {
                    setIsFilterOpen(false);
                    // setFilter("notInStock");
                    filterProducts("notInStock");
                  }}
                  className="block cursor-pointer px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Not-in-stock
                </div>

                <div
                  onClick={() => {
                    setIsFilterOpen(false);
                    // setFilter("visible");
                    filterProducts("visible");
                  }}
                  className="block cursor-pointer px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Visible
                </div>

                <div
                  onClick={() => {
                    setIsFilterOpen(false);
                    // setFilter("hidden");
                    filterProducts("hidden");
                  }}
                  className="block cursor-pointer px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Hidden
                </div>

                <div
                  onClick={() => {
                    setIsFilterOpen(false);
                    // setFilter("newestFirst");
                    filterProducts("newestFirst");
                  }}
                  className="block cursor-pointer px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Newest first
                </div>

                <div
                  onClick={() => {
                    setIsFilterOpen(false);
                    // setFilter("oldestFirst");
                    filterProducts("oldestFirst");
                  }}
                  className="block cursor-pointer px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Oldest first
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-lg bg-white rounded-2xl mt-5 p-3 space-x-4 ">
          {displayProducts.length > 0 ? (
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
                {displayProducts.map((product, i) => (
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
              <p className="text-xl text-center text-gray-600 h-40 flex justify-center items-center">
                There are no products in the {categoryName} category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IndividualCakesAdmin;
