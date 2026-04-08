import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Trash2, SquarePen, X } from "lucide-react";

function CourseCardAdmin({ course, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden relative group border border-gray-100">
      {/* <div className="absolute top-2 right-2 flex gap-2 z-10 bg-white/80 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"> */}
      <div>
        <div className="absolute top-4 right-4 flex gap-2 z-10 bg-white/60 p-1.5 rounded-lg">
          <SquarePen
            className="cursor-pointer text-blue-600 hover:-translate-y-1 transition-all duration-200"
            onClick={() => onEdit(course)}
            size={20}
          />
          <Trash2
            className="cursor-pointer text-red-600 hover:-translate-y-1 transition-all duration-200"
            onClick={() => onDelete(course)}
            size={20}
          />
        </div>
      </div>
      <div className="relative p-2">
        {/* <div className="absolute flex justify-center items-center h-full w-full">
          <div className=" opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 bg-white rounded-full py-1 px-3">
            Visit Course
          </div>
        </div> */}
        <div className="absolute inset-0 flex justify-center items-center">
          <Link
            to={`/admin/courses/${course._id}`}
            className="bg-white cursor-pointer rounded-full px-3 py-2 font-bold translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            View Course
          </Link>
        </div>
        <img
          src={
            course.thumbnail?.includes("http")
              ? course.thumbnail
              : `http://localhost:5000/${course.thumbnail?.replace(/^\//, "")}`
          }
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
          }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg leading-tight line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {course.category} • {course.language} • {course.duration}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-xl text-black">₹{course.discountedPrice}</span>
          <span className="text-gray-400 line-through text-sm">
            ₹{course.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CourseAdmin() {
  const [courses, setCourses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [deleteTimer, setDeleteTimer] = useState(3);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (isDeleteModalOpen) {
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
  }, [isDeleteModalOpen]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/course");
      setCourses(response.data?.courses || response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses");
    }
  };

  const openEditModal = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value.trim();
    const language = form.language.value.trim();
    const originalPrice = form.originalPrice.value.trim();
    const discountedPrice = form.discountedPrice.value.trim();
    const duration = form.duration.value.trim();
    const thumbnail = form.thumbnail.files[0];

    if (!title) return toast.error("Title is required");
    if (!description) return toast.error("Description is required");
    if (!category) return toast.error("Category is required");
    if (!language) return toast.error("Language is required");
    if (!originalPrice) return toast.error("Original Price is required");
    if (!discountedPrice) return toast.error("Discounted Price is required");
    if (!duration) return toast.error("Duration is required");
    if (!thumbnail) return toast.error("Thumbnail is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("language", language);
    formData.append("originalPrice", originalPrice);
    formData.append("discountedPrice", discountedPrice);
    formData.append("duration", duration);
    formData.append("thumbnail", thumbnail);

    try {
      const token = sessionStorage.getItem("token");
      await axios.post("http://localhost:5000/course", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course added");
      setIsAddModalOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Can't add course");
      console.error(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value.trim();
    const language = form.language.value.trim();
    const originalPrice = form.originalPrice.value.trim();
    const discountedPrice = form.discountedPrice.value.trim();
    const duration = form.duration.value.trim();
    const thumbnail = form.thumbnail.files[0];

    if (!title) return toast.error("Title is required");
    if (!description) return toast.error("Description is required");
    if (!category) return toast.error("Category is required");
    if (!language) return toast.error("Language is required");
    if (!originalPrice) return toast.error("Original Price is required");
    if (!discountedPrice) return toast.error("Discounted Price is required");
    if (!duration) return toast.error("Duration is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("language", language);
    formData.append("originalPrice", originalPrice);
    formData.append("discountedPrice", discountedPrice);
    formData.append("duration", duration);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const token = sessionStorage.getItem("token");
      const courseId = selectedCourse._id || selectedCourse.id;
      await axios.patch(`http://localhost:5000/course/${courseId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // await axios.patch(`http://localhost:5000/course/${courseId}`);
      toast.success("Course updated");
      setIsEditModalOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Can't edit course");
      console.error(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const courseId = selectedCourse._id || selectedCourse.id;
      await axios.delete(`http://localhost:5000/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course deleted");
      setIsDeleteModalOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Can't delete course");
      console.error(error);
    }
  };

  return (
    <div className="bg lg:pl-28 pl-20 pt-10 pr-10 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl lora new-primary-text font-semibold">Courses</h1>
          <p className="text-md pt-1 text-gray-600">Manage your courses</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="new-primary-bg cursor-pointer text-white font-semibold py-3 px-5 rounded-xl hover:scale-102 transition-all duration-200"
        >
          + Add Course
        </button>
      </div>

      <div className="bg shadow-md w-full p-5 my-10 rounded-xl">
        <p className="mb-4 font-medium text-gray-700">Total Courses: {courses.length}</p>

        {courses.length === 0 ? (
          <div className="text-center w-full py-10 mt-10 text-gray-500 font-medium text-lg">
            No Courses Added
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {courses.map((course, idx) => (
              <CourseCardAdmin
                key={course._id || course.id || idx}
                course={course}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsAddModalOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-5 new-primary-text">Add Course</h2>
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <textarea
                name="description"
                placeholder="Description"
                rows="3"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black resize-none"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="text"
                name="language"
                placeholder="Language"
                defaultValue="Tamil"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="number"
                min={0}
                name="originalPrice"
                placeholder="Original Price"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="number"
                min={0}
                name="discountedPrice"
                placeholder="Discounted Price"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. 5 Hours)"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="w-full h-20 border-2 border-dashed border-gray-500 text-black rounded-lg p-2 outline-none focus:border-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100 cursor-pointer"
              />
              <button
                type="submit"
                className="new-primary-bg cursor-pointer w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsEditModalOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-5 new-primary-text">Edit Course</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                defaultValue={selectedCourse.title}
                placeholder="Title"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <textarea
                name="description"
                defaultValue={selectedCourse.description}
                placeholder="Description"
                rows="3"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black resize-none"
              />
              <input
                type="text"
                name="category"
                defaultValue={selectedCourse.category}
                placeholder="Category"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="text"
                name="language"
                defaultValue={selectedCourse.language}
                placeholder="Language"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="number"
                min={0}
                name="originalPrice"
                defaultValue={selectedCourse.originalPrice}
                placeholder="Original Price"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="number"
                min={0}
                name="discountedPrice"
                defaultValue={selectedCourse.discountedPrice}
                placeholder="Discounted Price"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <input
                type="text"
                name="duration"
                defaultValue={selectedCourse.duration}
                placeholder="Duration"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <div className="text-sm text-gray-500 pt-1">
                Pick a new thumbnail only if you want to change it.
              </div>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="w-full h-20 border-2 border-dashed border-gray-500 text-black rounded-lg p-2 outline-none focus:border-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-black hover:file:bg-gray-100 cursor-pointer"
              />
              <button
                type="submit"
                className="new-primary-bg w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl mt-3"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative text-center">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-4 text-red-600">Warning</h2>
            <p className="text-lg font-medium text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">"{selectedCourse.title}"</span>? This action
              cannot be undone.
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
                onClick={handleDeleteConfirm}
                className="bg-red-600 w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Yes, Delete Course
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
