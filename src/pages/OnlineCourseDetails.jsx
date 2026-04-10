/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Clock10,
  ChevronDown,
  FileDown,
  Star,
  Pencil,
  Trash2,
} from "lucide-react";
import "plyr/dist/plyr.css";
import Plyr from "plyr";

const url = "http://localhost:5000";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          className={`cursor-pointer transition ${
            star <= (hovered || value) ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
}

function ReviewSection({ courseId }) {
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");
  // const userData = localStorage.getItem("user");

  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get(`${url}/course/${courseId}`);
        const allReviews = res.data.reviews || [];
        setReviews(allReviews);
        const mine = allReviews.find(
          (r) => r.student === currentUserId || r.student?._id === currentUserId,
        );
        if (mine) {
          setMyReview(mine);
          setRating(mine.rating);
          setComment(mine.comment);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchReviews();
  }, [courseId]);

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchUser();
  // }, [currentUserId]);

  async function submitReview() {
    if (!rating) return setError("Please select a rating");
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${url}/course/${courseId}/review`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const updated = res.data.course.reviews;
      setReviews(updated);
      setMyReview(
        updated.find(
          (r) => r.student === currentUserId || r.student?._id === currentUserId,
        ),
      );
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function updateReview() {
    if (!rating) return setError("Please select a rating");
    setLoading(true);
    setError("");
    try {
      const res = await axios.patch(
        `${url}/course/${courseId}/review/${myReview._id}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const updated = res.data.course.reviews;
      setReviews(updated);
      setMyReview(
        updated.find(
          (r) => r.student === currentUserId || r.student?._id === currentUserId,
        ),
      );
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteReview() {
    if (!window.confirm("Delete your review?")) return;
    setLoading(true);
    try {
      await axios.delete(`${url}/course/${courseId}/review/${myReview._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prev) => prev.filter((r) => r._id !== myReview._id));
      setMyReview(null);
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const showForm = !myReview || editing;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>

      {/* enter review box */}
      {token && showForm && (
        <div className="bg-white rounded-xl shadow p-5 mb-8">
          <h3 className="font-semibold text-lg mb-3">
            {editing ? "Edit your review" : "Leave a review"}
          </h3>

          <StarPicker value={rating} onChange={setRating} />

          <textarea
            className="w-full mt-3 p-3 border border-gray-200 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            rows={3}
            placeholder="Write your review... (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="flex gap-3 mt-3">
            <button
              onClick={editing ? updateReview : submitReview}
              disabled={loading}
              className="bg-pbrown text-white px-5 py-2 rounded-lg text-sm hover:opacity-95 active:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : editing ? "Update" : "Submit"}
            </button>
            {editing && (
              <button
                onClick={() => {
                  setEditing(false);
                  setRating(myReview.rating);
                  setComment(myReview.comment);
                }}
                className="px-5 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* client review grid */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {reviews.length === 0 && (
          <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>
        )}
        {reviews.map((r) => {
          const isOwn = r.student === currentUserId || r.student?._id === currentUserId;
          const studentName =
            typeof r.student === "object" ? r.student?.name : "Anonymous";
          const studentInitial = studentName ? studentName.charAt(0) : "?";
          return (
            <div
              key={r._id}
              className={`bg-white rounded-xl shadow-md p-4 ${
                isOwn ? "border-l-4 border-pink-500" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="">
                  <div className="flex justify-start items-center gap-3 mb-5">
                    <div className="bg-gray-200 h-8 w-8 rounded-full flex justify-center items-center">
                      {/* {r.student?.name.charAt(0)} */}
                      {studentInitial}
                    </div>
                    <p>{r.student?.name || "Anonymous"}</p>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={16}
                        className={
                          s <= r.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>

                  {r.comment && <p className="text-gray-700 text-sm mt-1">{r.comment}</p>}

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {isOwn && !editing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(true)}
                      className="text-gray-400 hover:text-pink-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={deleteReview}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OnlineCourseDetails() {
  const { courseId } = useParams();

  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [visibleSection, setVisibleSection] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  // fetch course
  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(`${url}/course/${courseId}`);
        const data = res.data;
        // setCourse(res.data);

        const sorted = {
          ...data,
          sections: [...data.sections]
            .sort((a, b) => a.order - b.order)
            .map((section) => ({
              ...section,
              lessons: [...section.lessons].sort((a, b) => a.order - b.order),
            })),
        };
        setCourse(sorted);
        setVisibleSection(0);
        if (sorted.sections.length > 0 && sorted.sections[0].lessons.length > 0) {
          setCurrentLesson(sorted.sections[0].lessons[0]);
        }
        // if (res.data.sections.length > 0) {
        //   setCurrentLesson(res.data.sections[0].lessons[0]);
        // }
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchCourse();
  }, [courseId]);

  // scroll to active lesson
  // useEffect(() => {
  //   const active = document.getElementById(currentLesson?._id);
  //   active?.scrollIntoView({ behavior: "smooth", block: "center" });
  // }, [currentLesson]);

  // useEffect(() => {
  //   if (!videoRef.current || !currentLesson) return;

  //   if (!playerRef.current) {
  //     // First time: initialize Plyr
  //     playerRef.current = new Plyr(videoRef.current, {
  //       ratio: "16:9",
  //       controls: [
  //         "play-large",
  //         "play",
  //         "progress",
  //         "current-time",
  //         "mute",
  //         "volume",
  //         "settings",
  //         "fullscreen",
  //       ],
  //     });
  //   } else {
  //     // Subsequent times: just swap the source
  //     playerRef.current.source = {
  //       type: "video",
  //       // sources: [{ src: `${url}${currentLesson.videoUrl}`, type: "video/mp4" }],
  //       sources: [
  //         {
  //           src: `${url}/video/${currentLesson.videoUrl}?token=${token}`,
  //           type: "video/mp4",
  //         },
  //       ],
  //     };
  //   }

  //   return () => {
  //     // Only destroy when the component fully unmounts
  //     // (don't destroy on every lesson change)
  //   };
  // }, [currentLesson]);

  // OnlineCourseDetails.jsx

  useEffect(() => {
    if (!videoRef.current || !currentLesson) return;

    let blobUrl = null;

    async function loadVideo() {
      setVideoLoading(true);
      try {
        const res = await fetch(`${url}/video/${currentLesson.videoUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const blob = await res.blob();
        blobUrl = URL.createObjectURL(blob);

        if (!playerRef.current) {
          playerRef.current = new Plyr(videoRef.current, {
            ratio: "16:9",
            controls: [
              "play-large",
              "play",
              "progress",
              "current-time",
              "mute",
              "volume",
              "settings",
              "fullscreen",
            ],
          });
        }

        playerRef.current.source = {
          type: "video",
          sources: [{ src: blobUrl, type: "video/mp4" }],
        };

        // URL.revokeObjectURL(blobUrl);
        // blobUrl = null;

        // ✅ Wait for the video to actually load, THEN revoke
        videoRef.current.addEventListener(
          "loadeddata",
          () => {
            if (blobUrl) {
              URL.revokeObjectURL(blobUrl);
              blobUrl = null;
            }
          },
          { once: true },
        );
      } catch (err) {
        console.error("Video load error:", err);
      } finally {
        setVideoLoading(false);
      }
    }

    loadVideo();

    // Revoke previous blob URL to free memory
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [currentLesson]);

  // Cleanup Plyr only on unmount
  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  if (!course)
    return (
      <div className="w-6 h-6 border-3 border-pink-700 border-t-pink-300 rounded-full animate-spin"></div>
    );

  return (
    <div className="bg pt-20 relative">
      {/* HEADER */}
      <div className="py-12 px-5 border-b border-gray-400 ">
        <Link
          to="/courses/my-learning"
          className="flex items-center text-sm text-gray-600 hover:text-sky-500 mb-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Link>

        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-gray-700 mt-3 text-lg">{course.description}</p>

        <div className="mt-4 inline-flex justify-center items-center gap-5 text-gray-600">
          <p>
            <Star className="inline mb-1 text-amber-500 fill-amber-500" size={20} />{" "}
            {course.rating}
          </p>
          <p>{course.totalReviews} reviews</p>
          <p className="flex items-center gap-2">
            <Users size={16} /> {course.totalStudents} Students
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-4 gap-6 px-8 py-10 ">
        {/* VIDEO */}
        <div className="lg:col-span-3 order-1 lg:order-1">
          {/* current video */}
          {currentLesson ? (
            <div className="relative">
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black rounded-xl z-10">
                  <div className="w-8 h-8 border-4 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="relative rounded-xl overflow-hidden shadow-xl bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-[400px] plyr-react plyr--full-ui"
                  onContextMenu={(e) => e.preventDefault()}
                  onLoadStart={() => setVideoLoading(true)}
                  onLoadedData={() => setVideoLoading(false)}
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-[400px] flex justify-center items-center bg-black rounded-xl overflow-hidden shadow-xl">
              <div className="w-6 h-6 border-3 border-amber-700 border-t-amber-300 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Lesson details */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
            <p className="text-gray-600 mt-2">Duration: {currentLesson?.duration}</p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="sticky top-20 h-fit order-2 lg:order-2">
          {/* <div className="w-[320px] sticky top-20 h-fit max-h-[80vh] overflow-y-auto"> */}
          <h2 className="text-xl font-bold mb-4">Course content</h2>

          {course.sections.map((section, index) => (
            <div
              key={section._id}
              className="mb-4 bg-white p-4 rounded-xl shadow cursor-pointer"
              onClick={() => setVisibleSection(visibleSection === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                {/* <h3>Section {index + 1}:</h3> */}
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.lessons.length} lessons</p>
                <ChevronDown
                  className={`transition ${visibleSection === index ? "rotate-180" : ""}`}
                />
              </div>

              {visibleSection === index && (
                <div className="transition-all duration-300 max-h-96 mt-3">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson._id}
                      id={lesson._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLesson(lesson);
                      }}
                      className={`p-3 flex justify-between rounded-md cursor-pointer ${
                        currentLesson?._id === lesson._id
                          ? "bg-pink-200 border-l-4 border-pink-600"
                          : "hover:bg-pink-100"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock10 size={14} /> {lesson.duration}
                        </p>
                      </div>

                      {lesson.pdfUrl && (
                        <a
                          href={`${url}/download?file=${lesson.pdfUrl}`}
                          download
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FileDown size={18} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 order-3 lg:order-3">
          <ReviewSection courseId={courseId} />
        </div>
      </div>
    </div>
  );
}

export default OnlineCourseDetails;
