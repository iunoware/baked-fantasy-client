import { GraduationCap, SquarePen, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CategoryCardAdmin(props) {
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [anyError, setAnyError] = useState(false);
  // const [title, setTitle] = useState(props.title);
  // const [subject, setSubject] = useState(props.subject);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc2MTU0NjYyMCwiZXhwIjoxNzYxNjMzMDIwfQ.3Hbn0HxnFNK2td5hUfirMLpSGKcUFs87PIBldDjFNsk";

  async function patchCategory(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.categoryTitle.value.trim() || props.title;
    const subject = form.categorySubject.value.trim() || props.subject;
    const file = form.categoryFile.files[0];

    const formData = new FormData();
    if (name) formData.append("title", name);
    // formData.append("title", name);

    if (subject) formData.append("subject", subject);
    // formData.append("subject", subject);

    if (file) formData.append("image", file);
    // formData.append("image", file);

    try {
      const response = await axios.patch(
        `http://localhost:5000/categories/${props.categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModal2Visible(false);
      window.location.reload();
      console.log("patch data: ", response.data);
    } catch (error) {
      setAnyError(true);
      console.error("something went wrong", error.message);
    }
  }

  return (
    <div>
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
              onClick={() => setIsModal2Visible(false)}
              className="-me-4 -mt-4 rounded-full p-2 transition-colors hover:bg-gray-300 focus:outline-none"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={patchCategory} className="mt-4 flex flex-col gap-3">
            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="categoryTitle"
                id="categoryTitle"
                // onChange={(e) => setTitle(e.target.value)}
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder="Category name"
              />
            </div>

            <div className="flex gap-3 justify-between items-center">
              <input
                type="text"
                name="categorySubject"
                id="categorySubject"
                // onChange={(e) => setSubject(e.target.value)}
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full"
                placeholder="Subject"
              />
            </div>

            <div className="flex gap-3 justify-between items-center">
              <input
                type="file"
                id="categoryFile"
                name="categoryFile"
                className="ring h-20 ring-gray-500 text-black rounded-lg p-2 w-full"
              />
            </div>

            <div className={`${anyError ? "block" : "hidden"}`}>
              <h2 className="text-xl text-red-500 font-semibold text-center">
                Title and subject should be unique!
              </h2>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-pink-600 w-full font-semibold hover:cursor-pointer hover:bg-pink-500 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Confirm Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <h1>hello world</h1> */}
      {/* <p>Current category: {props.title}</p> */}
      <div className="rounded-2xl min-h-75 bg-white shadow-xl m-2 group">
        <div className="rounded-xl relative h-40 w-auto !m-2 translate-y-2 flex align-bottom overflow-hidden">
          <img
            src={`http://localhost:5000${props.image}`}
            alt="course-img"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "/images/cake-2.jpg";
            }}
            className="rounded-xl w-full h-full object-center object-cover !z-0 hover:scale-104 transition-all duration-200"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <Link
              to={`/admin/cakes/${props.title}`}
              state={{ categoryId: props.categoryId, categoryName: props.title }}
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
            <div className="flex flex-row justify-end items-start gap-4">
              <div>
                <SquarePen
                  color="#808080"
                  size={20}
                  onClick={() => setIsModal2Visible(true)}
                  className="hover:text-black hover:cursor-pointer hover:-translate-y-1 transition-all duration-200"
                />
              </div>
              <div>
                {/* <label
                  htmlFor={props.sliderBtn}
                  className="group hover:cursor-pointer relative block h-6 w-12 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-red-500"
                >
                  <input type="checkbox" id={props.sliderBtn} className="peer sr-only" />

                  <span className="absolute inset-y-0 start-0 m-1 grid size-4 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                    <Check size={10} />

                    <X size={10} />
                  </span>
                </label> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCardAdmin;
