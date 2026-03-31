// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, Users, Clock10, ChevronDown, FileDown, Star } from "lucide-react";
// import "plyr/dist/plyr.css";
// import Plyr from "plyr";
// import { useRef } from "react";

// const url = "http://localhost:5000";

// function OnlineCourseDetails() {
//   const { courseId } = useParams();

//   const [course, setCourse] = useState(null);
//   const [visibleSection, setVisibleSection] = useState(null);
//   const [currentLesson, setCurrentLesson] = useState(null);
//   const [videoLoading, setVideoLoading] = useState(true);

//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   // fetch course
//   useEffect(() => {
//     async function fetchCourse() {
//       try {
//         const res = await axios.get(`${url}/course/${courseId}`);

//         setCourse(res.data);
//         setVisibleSection(0);

//         if (res.data.sections.length > 0) {
//           const firstLesson = res.data.sections[0].lessons[0];
//           setCurrentLesson(firstLesson);
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//     }

//     fetchCourse();
//   }, [courseId]);

//   // scroll to the active video lesson
//   useEffect(() => {
//     const active = document.getElementById(currentLesson?._id);
//     active?.scrollIntoView({ behavior: "smooth", block: "center" });
//   }, [currentLesson]);

//   // update source in lesson change
//   // useEffect(() => {
//   //   if (!videoRef.current || playerRef.current) return; // skip if already initialized

//   //   playerRef.current = new Plyr(videoRef.current, {
//   //     controls: [
//   //       "play-large",
//   //       "play",
//   //       "progress",
//   //       "current-time",
//   //       "mute",
//   //       "volume",
//   //       "settings",
//   //       "fullscreen",
//   //     ],
//   //   });

//   //   return () => {
//   //     playerRef.current?.destroy();
//   //     playerRef.current = null;
//   //   };
//   // }, [currentLesson]);

//   // video UI
//   // useEffect(() => {
//   //   if (!playerRef.current || !currentLesson) return;

//   //   playerRef.current.source = {
//   //     type: "video",
//   //     sources: [{ src: `${url}${currentLesson.videoUrl}`, type: "video/mp4" }],
//   //   };
//   // }, [currentLesson]);

//   useEffect(() => {
//     if (!videoRef.current || playerRef.current) return;

//     playerRef.current = new Plyr(videoRef.current, {
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

//     return () => {
//       playerRef.current?.destroy();
//       playerRef.current = null;
//     };
//   }, [currentLesson]);

//   useEffect(() => {
//     if (!playerRef.current || !currentLesson) return;

//     playerRef.current.source = {
//       type: "video",
//       sources: [{ src: `${url}${currentLesson.videoUrl}`, type: "video/mp4" }],
//     };
//   }, [currentLesson]);

//   // useEffect(() => {
//   //   if (!videoRef.current) return;

//   //   playerRef.current = new Plyr(videoRef.current, {
//   //     controls: [
//   //       "play-large",
//   //       "play",
//   //       "progress",
//   //       "current-time",
//   //       "mute",
//   //       "volume",
//   //       "settings",
//   //       "fullscreen",
//   //     ],
//   //   });

//   //   return () => {
//   //     playerRef.current?.destroy();
//   //   };
//   // }, []);

//   if (!course)
//     return (
//       <div className="w-6 h-6 border-3 border-pink-700 border-t-pink-300 rounded-full animate-spin"></div>
//     );

//   return (
//     <div className="bg pt-20">
//       {/* HEADER */}
//       <div className="py-12 px-8 border-b border-gray-400">
//         <Link
//           to="/courses/my-learning"
//           className="flex items-center text-sm text-gray-600 hover:text-sky-500 mb-3"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" /> Back
//         </Link>

//         <h1 className="text-4xl font-bold">{course.title}</h1>
//         <p className="text-gray-700 mt-3 text-lg">{course.description}</p>

//         <div className="mt-4 inline-flex justify-center items-center gap-5 text-gray-600">
//           <p>
//             <Star className="inline mb-1 text-amber-500 fill-amber-500" size={20} />{" "}
//             {course.rating}
//           </p>
//           <p>{course.totalReviews} reviews</p>
//           <p className="flex items-center gap-2">
//             <Users size={16} /> {course.totalStudents} Students
//           </p>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="grid md:grid-cols-4 gap-6 px-8 py-10">
//         {/* VIDEO */}
//         <div className="md:col-span-3">
//           {currentLesson ? (
//             <div className="relative">
//               {videoLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black rounded-xl">
//                   <div className="w-8 h-8 border-4 border-pink-700 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//               )}

//               <div className="relative rounded-xl overflow-hidden shadow-xl bg-black">
//                 <video
//                   // key={currentLesson?._id}
//                   // className="w-full h-[220px] sm:h-[350px] md:h-[500px]"
//                   ref={videoRef}
//                   className="w-full h-[500px] rounded-xl plyr-react plyr--full-ui"
//                   // controls
//                   onLoadStart={() => setVideoLoading(true)}
//                   onLoadedData={() => setVideoLoading(false)}
//                   crossOrigin="anonymous"
//                 >
//                   <source src={`${url}${currentLesson.videoUrl}`} type="video/mp4" />
//                 </video>
//               </div>
//             </div>
//           ) : (
//             <div className="w-6 h-6 border-3 border-pink-700 border-t-pink-300 rounded-full animate-spin"></div>
//           )}

//           {/* LESSON DETAILS */}
//           <div className="mt-6 bg-white p-6 rounded-xl shadow">
//             <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
//             <p className="text-gray-600 mt-2">Duration: {currentLesson?.duration}</p>
//           </div>
//         </div>

//         {/* SIDEBAR */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">Course Content</h2>

//           {course.sections.map((section, index) => (
//             <div
//               key={section._id}
//               className="mb-4 bg-white p-4 rounded-xl shadow cursor-pointer"
//               onClick={() => setVisibleSection(visibleSection === index ? null : index)}
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="font-semibold">{section.title}</h3>
//                 <p className="text-sm text-gray-500">{section.lessons.length} lessons</p>
//                 <ChevronDown
//                   className={`transition ${visibleSection === index ? "rotate-180" : ""}`}
//                 />
//               </div>

//               {/* LESSONS */}
//               {visibleSection === index && (
//                 // <div className="mt-3">
//                 <div
//                   className={`overflow-hidden transition-all duration-300 ${
//                     visibleSection === index ? "max-h-96 mt-3" : "max-h-0"
//                   }`}
//                 >
//                   {section.lessons.map((lesson) => (
//                     <div
//                       key={lesson._id}
//                       id={lesson._id}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCurrentLesson(lesson);
//                       }}
//                       // className="p-2 hover:bg-pink-100 rounded cursor-pointer"
//                       className={`p-3 flex justify-between rounded-md cursor-pointer ${currentLesson?._id === lesson._id ? "bg-pink-200 border-l-4 border-pink-600" : "hover:bg-pink-100"}`}
//                     >
//                       <div>
//                         <p className="font-medium">{lesson.title}</p>
//                         <p className="text-sm text-gray-500 flex items-center gap-1">
//                           <Clock10 size={14} /> {lesson.duration}
//                         </p>
//                       </div>

//                       {lesson.pdfUrl && (
//                         <a
//                           href={`${url}/download?file=${lesson.pdfUrl}`}
//                           download
//                           className="text-gray-600 hover:text-gray-900"
//                         >
//                           <FileDown size={18} />
//                         </a>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OnlineCourseDetails;

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Clock10, ChevronDown, FileDown, Star } from "lucide-react";
import "plyr/dist/plyr.css";
import Plyr from "plyr";

const url = "http://localhost:5000";

function OnlineCourseDetails() {
  const { courseId } = useParams();

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
        setCourse(res.data);
        setVisibleSection(0);
        if (res.data.sections.length > 0) {
          setCurrentLesson(res.data.sections[0].lessons[0]);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchCourse();
  }, [courseId]);

  // scroll to active lesson
  useEffect(() => {
    const active = document.getElementById(currentLesson?._id);
    active?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentLesson]);

  // Plyr: init once, then swap source on lesson change
  useEffect(() => {
    if (!videoRef.current || !currentLesson) return;

    if (!playerRef.current) {
      // First time: initialize Plyr
      playerRef.current = new Plyr(videoRef.current, {
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
    } else {
      // Subsequent times: just swap the source
      playerRef.current.source = {
        type: "video",
        sources: [{ src: `${url}${currentLesson.videoUrl}`, type: "video/mp4" }],
      };
    }

    return () => {
      // Only destroy when the component fully unmounts
      // (don't destroy on every lesson change)
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
    <div className="bg pt-20">
      {/* HEADER */}
      <div className="py-12 px-8 border-b border-gray-400">
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
      <div className="grid md:grid-cols-4 gap-6 px-8 py-10">
        {/* VIDEO */}
        <div className="md:col-span-3">
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
                  className="w-full h-[500px] plyr-react plyr--full-ui"
                  onLoadStart={() => setVideoLoading(true)}
                  onLoadedData={() => setVideoLoading(false)}
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          ) : (
            <div className="w-6 h-6 border-3 border-pink-700 border-t-pink-300 rounded-full animate-spin"></div>
          )}

          {/* LESSON DETAILS */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
            <p className="text-gray-600 mt-2">Duration: {currentLesson?.duration}</p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <h2 className="text-xl font-bold mb-4">Course Content</h2>

          {course.sections.map((section, index) => (
            <div
              key={section._id}
              className="mb-4 bg-white p-4 rounded-xl shadow cursor-pointer"
              onClick={() => setVisibleSection(visibleSection === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.lessons.length} lessons</p>
                <ChevronDown
                  className={`transition ${visibleSection === index ? "rotate-180" : ""}`}
                />
              </div>

              {visibleSection === index && (
                <div className="overflow-hidden transition-all duration-300 max-h-96 mt-3">
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
      </div>
    </div>
  );
}

export default OnlineCourseDetails;
