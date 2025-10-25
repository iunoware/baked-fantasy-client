import { SquarePen } from "lucide-react";
import { useState } from "react";

function SettingsAdmin() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="bg h-[100vh]">
      {/* modal */}
      <div
        className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="w-[60vh] rounded-lg bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Add New Banner</h2>
          <form className="mt-4 flex flex-col gap-3">
            {/* <p className="text-pretty text-gray-700">this is a test run</p> */}
            <div className="flex gap-3 justify-between items-center">
              {/* <label htmlFor="categoryName" className="text-lg">
                Category Name:{" "}
              </label> */}
              <input
                type="text"
                name="categoryTitle"
                id="categoryTitle"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder="Banner Title"
              />
            </div>

            <div className="flex gap-3 justify-between items-center">
              {/* <label htmlFor="categorySubject" className="text-lg">
                Subject:{" "}
              </label> */}
              <input
                type="text"
                name="categorySubject"
                id="categorySubject"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder="Banner Sub Heading"
              />
            </div>

            <div className="flex gap-3 justify-between items-center">
              {/* <label htmlFor="categoryFile" className="text-lg">
                Category Name:{" "}
              </label> */}
              <input
                type="file"
                id="categoryFile"
                name="categoryFile"
                className="ring h-20 ring-gray-500 text-black rounded-lg p-2 w-full"
              />
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
            <h1 className="text-3xl font-semibold">
              Cakes and Cookies Categories
            </h1>

            <p className="text-md pt-1">
              Manage your bakery products and inventory
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="bg-pink-500 text-white font-semibold py-3 px-5 rounded-xl hover:bg-pink-600 transition-colors duration-200"
            >
              + Add Category
            </button>
          </div>
        </div>
        {/* main section */}
        {/* <div className="flex items-center justify-center mt-10">
          <div className="bg-white relative p-5 rounded-2xl shadow-2xl w-[50%] h-fit">
            <div className="">
              <h2 className="font-bold text-xl">Banner Information</h2>
              <p className="pt-2">Temporary Banner</p>
            </div>

            <div className="mt-7 flex flex-col space-y-5">
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">Heading</h2>
                <p className="pl-4 text-lg pt-1">15 Days Baking Course</p>
              </div>
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">Sub Heading</h2>
                <p className="pl-4 pt-1 text-lg">
                  Learn the basic to pro skills of baking!
                </p>
              </div>
              <div className="">
                <h2 className="font-bold text-black/90 text-xl">
                  Button Title
                </h2>
                <p className="pl-4 pt-1 text-lg">Enroll Now</p>
              </div>
            </div>
            
            <div className="absolute flex items-center justify-center right-5 bottom-5 flex-row gap-5">
              <SquarePen
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
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SettingsAdmin;
