/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import { toast } from "react-hot-toast";
import { Trash2, SquarePen, X, ArrowLeft } from "lucide-react";
import api from "@/api";

// const url = import.meta.env.VITE_API_URL;

export default function CourseDetailsAdmin() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  // Section state
  const [selectedSection, setSelectedSection] = useState(null);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isEditSectionOpen, setIsEditSectionOpen] = useState(false);
  const [isDeleteSectionOpen, setIsDeleteSectionOpen] = useState(false);
  const [sectionDeleteTimer, setSectionDeleteTimer] = useState(3);

  // Lesson state
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [isDeleteLessonOpen, setIsDeleteLessonOpen] = useState(false);
  const [lessonDeleteTimer, setLessonDeleteTimer] = useState(3);
  const [removePdf, setRemovePdf] = useState(false);

  useEffect(() => {
    fetchCourseInfo();
  }, [courseId]);

  // Section Delete Countdown
  useEffect(() => {
    if (isDeleteSectionOpen) {
      setSectionDeleteTimer(3);
      const timer1 = setTimeout(() => setSectionDeleteTimer(2), 1000);
      const timer2 = setTimeout(() => setSectionDeleteTimer(1), 2000);
      const timer3 = setTimeout(() => setSectionDeleteTimer(0), 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isDeleteSectionOpen]);

  // Lesson Delete Countdown
  useEffect(() => {
    if (isDeleteLessonOpen) {
      setLessonDeleteTimer(3);
      const timer1 = setTimeout(() => setLessonDeleteTimer(2), 1000);
      const timer2 = setTimeout(() => setLessonDeleteTimer(1), 2000);
      const timer3 = setTimeout(() => setLessonDeleteTimer(0), 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isDeleteLessonOpen]);

  const fetchCourseInfo = async () => {
    try {
      // const response = await axios.get(`${url}/course/${courseId}`);
      const response = await api.get(`/course/${courseId}`);
      // Usually backend returns { course: ... } or just the object
      setCourse(response.data?.course || response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch course details");
    }
  };

  // section handlers
  const handleAddSectionSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const order = form.order.value.trim();

    if (!title) return toast.error("Title is required");
    if (!order) return toast.error("Order is required");

    try {
      // const token = sessionStorage.getItem("token");
      // await axios.post(
      //   `${url}/course/${courseId}/section`,
      //   { title, order: Number(order) },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   },
      // );
      await api.post(`/course/${courseId}/section`, { title, order: Number(order) });
      toast.success("Section added");
      setIsAddSectionOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Can't add section");
    }
  };

  const handleEditSectionSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const order = form.order.value.trim();

    if (!title) return toast.error("Title is required");
    if (!order) return toast.error("Order is required");

    try {
      // const token = sessionStorage.getItem("token");
      const sectionId = selectedSection._id || selectedSection.id;
      // await axios.patch(
      //   `${url}/course/${courseId}/section/${sectionId}`,
      //   { title, order: Number(order) },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   },
      // );
      await api.patch(`/course/${courseId}/section/${sectionId}`, {
        title,
        order: Number(order),
      });

      toast.success("Section updated");
      setIsEditSectionOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Can't edit section");
    }
  };

  const handleDeleteSectionConfirm = async () => {
    try {
      // const token = sessionStorage.getItem("token");
      const sectionId = selectedSection._id || selectedSection.id;
      // await axios.delete(`${url}/course/${courseId}/section/${sectionId}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      await api.delete(`/course/${courseId}/section/${sectionId}`);

      toast.success("Section deleted");
      setIsDeleteSectionOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Can't delete section");
    }
  };

  // lesson handlers
  const openAddLessonModal = (sectionId) => {
    setSelectedSectionId(sectionId);
    setIsAddLessonOpen(true);
  };

  const handleAddLessonSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const order = form.order.value.trim();
    const duration = form.duration.value.trim();
    const video = form.video.files[0];
    const pdf = form.pdfFile.files[0];

    if (!title) return toast.error("Title is required");
    if (!duration) return toast.error("Duration is required");
    if (!order) return toast.error("Order is required");
    if (!video) return toast.error("Video file is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("order", order);
    if (duration) formData.append("duration", duration);
    formData.append("video", video);
    if (pdf) formData.append("pdf", pdf); // name matching expected backend convention, or standard

    try {
      // const token = sessionStorage.getItem("token");
      // await axios.post(
      //   `${url}/course/${courseId}/section/${selectedSectionId}/lesson`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      await api.post(`/course/${courseId}/section/${selectedSectionId}/lesson`, formData);

      toast.success("Lesson added");
      setIsAddLessonOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Can't add lesson");
    }
  };

  const handleEditLessonSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const order = form.order.value.trim();
    const duration = form.duration.value.trim();
    const video = form.video.files[0];
    const pdf = form.pdfFile.files[0];

    if (!title) return toast.error("Title is required");
    if (!order) return toast.error("Order is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("order", order);
    if (duration) formData.append("duration", duration);
    if (video) formData.append("video", video);
    if (pdf) formData.append("pdf", pdf);
    if (removePdf) formData.append("removePdf", "true");

    try {
      // const token = sessionStorage.getItem("token");
      const lessonId = selectedLesson._id || selectedLesson.id;
      const sectionId = selectedSectionId; // Stored when edit button is clicked
      // await axios.patch(
      //   `${url}/course/${courseId}/section/${sectionId}/lesson/${lessonId}`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      await api.patch(
        `/course/${courseId}/section/${sectionId}/lesson/${lessonId}`,
        formData,
      );

      toast.success("Lesson updated");
      setIsEditLessonOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Can't edit lesson");
    }
  };

  const handleDeleteLessonConfirm = async () => {
    try {
      // const token = sessionStorage.getItem("token");
      const lessonId = selectedLesson._id || selectedLesson.id;
      const sectionId = selectedSectionId;
      // await axios.delete(
      //   `${url}/course/${courseId}/section/${sectionId}/lesson/${lessonId}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      await api.delete(`/course/${courseId}/section/${sectionId}/lesson/${lessonId}`);

      toast.success("Lesson deleted");
      setIsDeleteLessonOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Can't delete lesson");
    }
  };

  if (!course)
    return <div className="p-20 text-center font-medium">Loading course...</div>;

  // const sections = course.sections || [];
  // Sort sections by order
  // sections.sort((a, b) => a.order - b.order);
  const sections = [...(course.sections || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white lg:pl-28 pl-20 pt-10 pr-10 min-h-screen">
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/courses")}
          className="text-gray-600 hover:text-black font-semibold flex items-center gap-1 transition-all"
        >
          <ArrowLeft className="inline" size={18} /> Back
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl lora new-primary-text font-semibold">
            {course.title || "Course Details"}
          </h1>
          <p className="text-md pt-1 text-gray-600">Manage sections & lessons</p>
        </div>
        <button
          onClick={() => setIsAddSectionOpen(true)}
          className="new-primary-bg cursor-pointer text-white font-semibold py-3 px-5 rounded-xl hover:scale-102 transition-all duration-200"
        >
          + Add Section
        </button>
      </div>

      <div className="bg-white shadow-md w-full p-5 my-10 rounded-xl">
        <p className="mb-6 font-medium text-gray-700">
          Total Sections: {sections.length}
        </p>

        {sections.length === 0 ? (
          <div className="text-center w-full py-10 mt-10 text-gray-500 font-medium text-lg">
            No Sections Added
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {sections.map((section) => {
              const lessons = section.lessons || [];
              lessons.sort((a, b) => a.order - b.order);

              return (
                <div
                  key={section._id}
                  className="border border-gray-200 p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-black">
                        <span className="text-gray-500 mr-2">#{section.order}</span>
                        {section.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {lessons.length} {lessons.length === 1 ? "Lesson" : "Lessons"}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <SquarePen
                        className="cursor-pointer text-blue-600 hover:-translate-y-1 transition-all duration-200"
                        size={20}
                        onClick={() => {
                          setSelectedSection(section);
                          setIsEditSectionOpen(true);
                        }}
                      />
                      <Trash2
                        className="cursor-pointer text-red-600 hover:-translate-y-1 transition-all duration-200"
                        size={20}
                        onClick={() => {
                          setSelectedSection(section);
                          setIsDeleteSectionOpen(true);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson._id}
                        className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg shadow-sm"
                      >
                        <div className="flex md:flex-row flex-col md:items-center items-start gap-3">
                          <span className="font-semibold text-gray-500">
                            {lesson.order}.
                          </span>
                          <h3 className="font-bold text-md">{lesson.title}</h3>
                          {lesson.duration && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                              {lesson.duration}
                            </span>
                          )}
                          {lesson.videoUrl && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                              Video
                            </span>
                          )}
                          {lesson.pdfUrl && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
                              PDF
                            </span>
                          )}
                        </div>
                        <div className="flex gap-3">
                          <SquarePen
                            className="cursor-pointer text-blue-600 hover:-translate-y-1 transition-all duration-200"
                            size={18}
                            onClick={() => {
                              setSelectedSectionId(section._id || section.id);
                              setSelectedLesson(lesson);
                              setIsEditLessonOpen(true);
                            }}
                          />
                          <Trash2
                            className="cursor-pointer text-red-600 hover:-translate-y-1 transition-all duration-200"
                            size={18}
                            onClick={() => {
                              setSelectedSectionId(section._id || section.id);
                              setSelectedLesson(lesson);
                              setIsDeleteLessonOpen(true);
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => openAddLessonModal(section._id || section.id)}
                      className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors w-max"
                    >
                      + Add Lesson
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ADD SECTION MODAL */}
      {isAddSectionOpen && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsAddSectionOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-5 new-primary-text">Add Section</h2>
            <form onSubmit={handleAddSectionSubmit} className="flex flex-col gap-3">
              <p className="text-sm text-gray-700">Section title:</p>
              <input
                type="text"
                name="title"
                placeholder="Section Title"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />

              <p className="text-sm text-gray-700">Order:</p>
              <input
                type="number"
                min={0}
                name="order"
                placeholder="Order Number (e.g. 1)"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <button
                type="submit"
                className="new-primary-bg w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SECTION MODAL */}
      {isEditSectionOpen && selectedSection && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsEditSectionOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-5 new-primary-text">Edit Section</h2>
            <form onSubmit={handleEditSectionSubmit} className="flex flex-col gap-3">
              <p className="text-sm text-gray-700">Title:</p>
              <input
                type="text"
                name="title"
                defaultValue={selectedSection.title}
                placeholder="Section Title"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />

              <p className="text-sm text-gray-700">Order:</p>
              <input
                type="number"
                min={0}
                name="order"
                defaultValue={selectedSection.order}
                placeholder="Order Number"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
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

      {/* DELETE SECTION MODAL */}
      {isDeleteSectionOpen && selectedSection && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative text-center">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsDeleteSectionOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-4 text-red-600">Warning</h2>
            <p className="text-lg font-medium text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">"{selectedSection.title}"</span>? This will also
              remove all lessons inside it.
            </p>
            {sectionDeleteTimer > 0 ? (
              <button
                disabled
                className="bg-gray-400 w-full font-semibold text-white px-4 py-3 rounded-xl cursor-not-allowed"
              >
                Wait {sectionDeleteTimer}s to Confirm
              </button>
            ) : (
              <button
                onClick={handleDeleteSectionConfirm}
                className="bg-red-600 w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Yes, Delete Section
              </button>
            )}
          </div>
        </div>
      )}

      {/* ADD LESSON MODAL */}
      {isAddLessonOpen && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md edit-modal overflow-auto rounded-xl bg-white p-10 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsAddLessonOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-5 new-primary-text">Add Lesson</h2>
            <form onSubmit={handleAddLessonSubmit} className="flex flex-col gap-3">
              <p className="text-sm text-gray-700">Title:</p>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />

              <p className="text-sm text-gray-700">Duration:</p>

              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g. 10:30)"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />

              <p className="text-sm text-gray-700">Order number:</p>
              <input
                type="number"
                min={0}
                name="order"
                placeholder="Order Number (e.g. 1)"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />

              <div className="text-sm font-semibold mt-2">Video (Required)</div>
              <input
                type="file"
                name="video"
                accept="video/*"
                className="w-full h-20 border-2 border-dashed border-gray-500 text-black rounded-lg p-2 cursor-pointer"
              />
              <div className="text-sm font-semibold mt-2">PDF Document (Optional)</div>
              <input
                type="file"
                name="pdfFile"
                accept="application/pdf"
                className="w-full h-20 border-2 border-dashed border-gray-500 text-black rounded-lg p-2 cursor-pointer"
              />
              <button
                type="submit"
                className="new-primary-bg w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl mt-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* edit lesson model */}
      {isEditLessonOpen && selectedLesson && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl edit-modal overflow-auto bg-white p-10 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => {
                setIsEditLessonOpen(false);
                setRemovePdf(false);
              }}
            />
            <h2 className="text-2xl font-bold mb-5 new-primary-text">Edit Lesson</h2>
            <form onSubmit={handleEditLessonSubmit} className="flex flex-col gap-3">
              <p className="text-sm text-gray-700">Title:</p>
              <input
                type="text"
                name="title"
                defaultValue={selectedLesson.title}
                placeholder="Title"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />

              <p className="text-sm text-gray-700">Duration:</p>
              <input
                type="text"
                name="duration"
                defaultValue={selectedLesson.duration}
                placeholder="Duration (e.g. 10:30)"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />

              <p className="text-sm text-gray-700">Order:</p>
              <input
                type="number"
                min={0}
                name="order"
                defaultValue={selectedLesson.order}
                placeholder="Order Number"
                className="ring ring-gray-500 text-black rounded-lg p-2 w-full outline-none focus:ring-black"
              />
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Pick a new video/PDF only if you want to replace it
              </p>
              <div className="text-sm font-semibold mt-1">New Video (Optional)</div>
              <input
                type="file"
                name="video"
                accept="video/*"
                className="w-full h-20 border-2 border-dashed border-gray-500 text-black rounded-lg p-2 cursor-pointer"
              />
              <div className="text-sm font-semibold mt-2">New PDF (Optional)</div>
              <input
                type="file"
                name="pdfFile"
                accept="application/pdf"
                className="w-full h-20 border-2 border-dashed border-gray-500 text-black rounded-lg p-2 cursor-pointer"
              />
              {selectedLesson?.pdfUrl && (
                <label className="flex items-center gap-2 text-sm text-red-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={removePdf}
                    onChange={(e) => setRemovePdf(e.target.checked)}
                  />
                  Remove existing PDF
                </label>
              )}
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

      {/* DELETE LESSON MODAL */}
      {isDeleteLessonOpen && selectedLesson && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg relative text-center">
            <X
              className="absolute top-4 right-4 cursor-pointer hover:rotate-90 transition text-gray-500 hover:text-black"
              onClick={() => setIsDeleteLessonOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-4 text-red-600">Warning</h2>
            <p className="text-lg font-medium text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">"{selectedLesson.title}"</span>? This action
              cannot be undone.
            </p>
            {lessonDeleteTimer > 0 ? (
              <button
                disabled
                className="bg-gray-400 w-full font-semibold text-white px-4 py-3 rounded-xl cursor-not-allowed"
              >
                Wait {lessonDeleteTimer}s to Confirm
              </button>
            ) : (
              <button
                onClick={handleDeleteLessonConfirm}
                className="bg-red-600 w-full font-semibold hover:scale-102 transition-all duration-200 text-white px-4 py-3 rounded-xl"
              >
                Yes, Delete Lesson
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
