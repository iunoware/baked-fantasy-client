/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SquarePen, Check, X } from "lucide-react";

function IndividualCakesAdmin() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/category/${categoryName}`
        );
        // setProducts(res.data);
        console.log("products: ", response.data);
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc2MTY0NjA0MCwiZXhwIjoxNzYxNzMyNDQwfQ.by9qSWdklxR4AE9J2QquZ5oFIZTul1qAh3o-xzVGL0c";

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
    const inStock = form.productInStock.value.trim();
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
      !info ||
      !inStock
    ) {
      window.alert("Please fill all fields and select an image!");
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
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      formData.append("inStock", inStock);

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
        setIsModalVisible(false);
        window.location.reload();
      } catch (error) {
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
              onClick={() => setIsModalVisible(false)}
              className="-me-4 -mt-4 rounded-full p-2 transition-colors hover:bg-gray-300 focus:outline-none"
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
              <input
                type="file"
                id="productFile"
                name="productFile"
                multiple
                accept="image/png, image/jpeg, image/webp, image/gif"
                className="ring h-20 ring-gray-500 text-black rounded-lg p-2 w-full"
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
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="productInStock"
                id="productInStock"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder="Is it in Stock? (y/n)"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-pink-600 w-full font-semibold hover:cursor-pointer hover:bg-pink-500 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Add new category
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* add product button */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-pink-600">{categoryName}</h1>

          <p className="text-md pt-1">Manage your bakery products</p>
        </div>
        <div>
          <button
            onClick={() => setIsModalVisible(true)}
            className="bg-pink-500 cursor-pointer text-white font-semibold py-3 px-5 rounded-xl hover:bg-pink-600 transition-colors duration-200"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="bg shadow-xl w-full pt-5 md:p-5 my-10 rounded-xl">
        <h2 className="text-2xl font-semibold text-pink-600">
          All {categoryName} Products
        </h2>

        <div className="overflow-x-auto shadow-lg bg-white rounded-2xl mt-5 p-3 space-x-4 ">
          {products.length > 0 ? (
            <table className="table-auto ">
              <thead>
                <tr className="divide-y text-xl divide-gray-300">
                  <th className="p-4 text-start">S.no</th>
                  <th className="p-4 text-start">Images</th>
                  <th className="p-4 text-start">Name</th>
                  <th className="p-4 text-start">Discounted Price</th>
                  <th className="p-4 text-start">Original Price</th>
                  <th className="p-4 text-start">description</th>
                  <th className="p-4 text-start">info</th>
                  <th className="p-4 text-start">inStock</th>
                  <th className="p-4 text-start">Actions</th>
                </tr>
              </thead>

              {products.map((product, i) => (
                <tbody key={product._id} className={i % 2 === 0 ? "bg-gray-100" : ""}>
                  <tr className="my-3 divide-y text-lg divide-gray-300">
                    <td className="p-4">{i + 1}</td>
                    <td className="p-4">
                      {/* <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2">
                    {product.images.map((image, i) => (
                      <img
                        src={`http://localhost:5000${image}`}
                        alt="product image"
                        className="h-10 rounded-lg object-center object-cover w-10"
                      />
                    ))}
                  </div> */}
                      <img
                        src={`http://localhost:5000${product.images[0]}`}
                        alt="Product Image"
                        className="h-20 rounded-lg object-center object-cover w-20"
                      />
                    </td>
                    <td className="p-4">
                      {product.title}
                      <span className="text-md text-gray-500 block">
                        ({product.subject})
                      </span>
                    </td>
                    <td className="p-4">₹{product.originalPrice}</td>
                    <td className="p-4">₹{product.discountedPrice}</td>
                    <td className="p-4">{product.description}</td>
                    <td className="p-4">{product.info}</td>
                    <td className="p-4">{product.inStock ? "true" : "false"}</td>
                    <td className="p-4">
                      <SquarePen size={20} className="cursor-pointer" />
                      {/* <label
                      htmlFor={product.title}
                      className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
                    >
                      <input
                        type="checkbox"
                        id={product.title}
                        className="peer sr-only"
                      />

                      <span className="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                        <Check size={10} />

                        <X size={10} />
                      </span>
                    </label> */}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold">
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
