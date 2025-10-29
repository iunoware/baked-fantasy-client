// /* eslint-disable no-unused-vars */
import { ChevronDown, X, Check } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryCardAdmin from "../../components/adminPanel/CategoryCardAdmin.jsx";

function CakesAdmin() {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(`http://localhost:5000/categories`);
        // console.log(response.data);
        setCourses(response.data);
        // console.log("courses: ", courses);
      } catch (error) {
        console.error("error message: ", error);
      }
    }
    fetchCourses();
  }, []);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc2MTcxNDEyMiwiZXhwIjoxNzYxODAwNTIyfQ.nHMQbJNUxXQKQ7xbabLDl018xkl0mFTcLeLvx9a9644";

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
          }
        );
        // setCourses((prev) => [...prev, postResponse.data]);

        // const newResponse = await axios.get(`http://localhost:5000/categories`);
        // setCourses(newResponse.data);
        console.log("category added: ", postResponse.data);
        toast.success("Category added");
        setIsModalVisible(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
              onClick={() => setIsModalVisible(false)}
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
                className="ring h-20 ring-gray-500 text-black rounded-lg p-2 w-full"
              />
            </div>

            {/* isActive */}
            <div className="flex justify-between mb-5">
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

      <div className="lg:pl-28 pl-20 pt-10 pr-10">
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Cakes and Cookies Categories</h1>

            <p className="text-md pt-1">Manage your bakery products' category</p>
          </div>
          <div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="bg-pink-500 cursor-pointer text-white font-semibold py-3 px-5 rounded-xl hover:bg-pink-600 transition-colors duration-200"
            >
              + Add Category
            </button>
          </div>
        </div>

        <div className="bg shadow-xl w-full p-5 my-10 rounded-xl">
          {/* heading content */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
            <div>
              <h2 className="font-semibold text-xl">Cakes and cookies inventory</h2>
              <p>Manage all your bakery products' categories</p>
            </div>
            <div>
              {/* dropdown */}
              {/* <div className="relative inline-flex">
                <span
                  onClick={() => setIsDropdownVisible(isDropdownVisible ? false : true)}
                  className="inline-flex bg-pink-500 text-white divide-gray-300 overflow-hidden rounded-xl border hover:bg-pink-400 border-gray-300 shadow-sm"
                >
                  <button
                    type="button"
                    className="px-3 py-2 hover:cursor-pointer text-md font-medium text-white transition-colors   focus:relative"
                  >
                    Categories
                  </button>

                  <button
                    type="button"
                    className="px-3 py-2 hover:cursor-pointer font-medium text-white transition-color focus:relative"
                    aria-label="Menu"
                  >
                    <ChevronDown
                      size={18}
                      className={`${isDropdownVisible ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                </span>

                <div
                  role="menu"
                  className={`${
                    isDropdownVisible ? "block" : "hidden"
                  } absolute end-0 top-12 z-auto w-37.5 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm`}
                >
                  <div
                    role="menuitem"
                    onClick={() => {
                      setCurrentCategory("allCategories");
                      setIsDropdownVisible(false);
                    }}
                    className="block hover:cursor-pointer px-3 py-2 text-md font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    All Categories
                  </div>
                  {courses.map((course, i) => (
                    <div
                      key={i}
                      role="menuitem"
                      onClick={() => {
                        setCurrentCategory(course.title);
                        setIsDropdownVisible(false);
                      }}
                      className="block hover:cursor-pointer px-3 py-2 text-md font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                      {course.title}
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>

          {/* product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {courses.map((course, i) => (
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
        </div>
      </div>
    </div>
  );
}

export default CakesAdmin;
