/* eslint-disable no-unused-vars */
import { ChevronDown, X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryCardAdmin from "../../../components/adminPanel/cakes/CategoryCardAdmin.jsx";

function CakesAdmin() {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`http://localhost:5000/categories`);
        // console.log(response.data);
        setProducts(response.data);
        // console.log("products: ", products);
      } catch (error) {
        console.error("error message: ", error);
      }
    }
    // fetchCourses();
    fetchProducts();
  }, []);

  const token = "";

  async function postCategory(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.categoryTitle.value.trim();
    const subject = form.categorySubject.value.trim();
    const file = form.categoryFile.files[0];

    if (!name) {
      // window.alert("Please fill all fields and select an image!");
      toast.error("Please enter a Name");
      return;
    } else if (!subject) {
      toast.error("Please enter a Subject");
      return;
    } else if (!file) {
      toast.error("Please enter an Image");
      return;
    } else {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("subject", subject);
      formData.append("image", file);

      try {
        const postResponse = await axios.post(
          `http://localhost:5000/categories`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // setProducts((prev) => [...prev, postResponse.data]);

        // const newResponse = await axios.get(`http://localhost:5000/categories`);
        // setProducts(newResponse.data);
        console.log("category added: ", postResponse.data);
        toast.success("Category added");
        setIsModalVisible(false);
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } catch (error) {
        toast.error("Can't add Category");
        console.error("error message: ", error.message);
      }
    }
  }

  return (
    <div className="bg-white">
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
              Add new Category
            </h2>

            <button
              type="button"
              onClick={() => {
                setIsModalVisible(false);
                toast.error("Category not added!");
              }}
              className="-me-4 -mt-4 rounded-full p-2 cursor-pointer transition-all hover:rotate-90 ease-in focus:outline-none"
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
                name="categoryTitle"
                id="categoryTitle"
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
                className="h-20 border-2 cursor-pointer border-dashed border-gray-500 text-black rounded-lg p-2 w-full"
              />
            </div>

            {/* isActive */}
            {/* <div className="flex justify-between mb-5">
              <div>
                <h4>{isActive ? "Activate" : "De-activate"}</h4>
              </div>
              <label
                htmlFor="category"
                className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
              >
                <input
                  type="checkbox"
                  onClick={() => setIsActive((prev) => !prev)}
                  id="category"
                  className="peer sr-only"
                />

                <span className="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                  <Check size={10} />

                  <X size={10} />
                </span>
              </label>
            </div> */}

            <div className="flex mt-5 justify-center items-center">
              <button
                type="submit"
                className="new-primary-bg w-full font-semibold hover:cursor-pointer hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Add new category
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:pl-28 pl-20 pt-10 pr-10">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl lora new-primary-text font-semibold">
              Cakes and Cookies Categories
            </h1>

            <p className="text-md pt-1">Manage your bakery products' category</p>
          </div>
          <div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="new-primary-bg cursor-pointer text-white font-semibold py-3 px-5 rounded-xl hover:bg-pink-600 transition-colors duration-200"
            >
              + Add Category
            </button>
          </div>
        </div>

        <div className="bg shadow-xl w-full p-5 my-10 rounded-xl">
          {/* heading content */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
            <div>
              <h2 className="font-semibold new-primary-text text-xl">
                Cakes and cookies inventory
              </h2>
              <p className="text-lg">
                Total Categories:{" "}
                <span className="font-bold text-xl">{products.length}</span>
              </p>
            </div>
            <div></div>
          </div>

          {/* product cards */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
              {products.map((course, i) => (
                <div key={i} className="">
                  <CategoryCardAdmin
                    title={course.title}
                    subject={course.subject}
                    sliderBtn={course.title}
                    image={course.imageUrl}
                    categoryId={course._id}
                    activate={course.isActive}
                    // modal={`setIsModal2Visible(true)`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[60vh] flex flex-col space-y-3 items-center justify-center">
              <h1 className="text-2xl font-bold">No Products Added</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CakesAdmin;
