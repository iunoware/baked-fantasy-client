import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Clock10, ChevronDown, File } from "lucide-react";
import Loading from "../components/Loading.jsx";

const url = "http://localhost:5000";

function OnlineCourseDetails() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [visibleSection, setVisibleSection] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(`${url}/course/${courseId}`);

        setCourse(res.data);
        setVisibleSection(0); // opens the first video by default, change this in future (maybe)

        // 👉 set first lesson as default
        if (res.data.sections.length > 0) {
          const firstLesson = res.data.sections[0].lessons[0];
          setCurrentLesson(firstLesson);
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (!course) return <Loading height="150px" width="150px" />;

  return (
    <div className="bg-gray-200 pt-20">
      {/* HEADER */}
      {/* <div className="py-10 px-8"> */}
      <div className="py-12 px-8 border-b border-gray-400">
        <Link
          to="/courses/my-learning"
          className="flex items-center text-sm text-gray-600 hover:text-sky-500 mb-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Link>

        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-gray-700 mt-3 text-lg">{course.description}</p>

        <div className="mt-4 flex gap-5 text-gray-600">
          <p>⭐ {course.rating}</p>
          <p>{course.totalReviews} reviews</p>
          <p className="flex items-center gap-2">
            <Users size={18} /> {course.totalStudents} Students
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid md:grid-cols-4 gap-6 px-8 py-10">
        {/* VIDEO */}
        <div className="md:col-span-3">
          {currentLesson ? (
            <video
              // className="w-full h-[500px] rounded-xl shadow-lg"
              className="w-full h-[220px] sm:h-[350px] md:h-[500px] rounded-xl bg-black"
              controls
              src={`${url}${currentLesson.videoUrl}`}
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
            />
          ) : (
            <Loading height="150px" width="150px" />
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
              <div className="flex justify-between">
                <h3 className="font-semibold">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.lessons.length} lessons</p>
                <ChevronDown
                  className={`transition ${visibleSection === index ? "rotate-180" : ""}`}
                />
              </div>

              {/* LESSONS */}
              {visibleSection === index && (
                <div className="mt-3">
                  {section.lessons.map((lesson) => (
                    <div
                      key={lesson._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentLesson(lesson);
                      }}
                      // className="p-2 hover:bg-pink-100 rounded cursor-pointer"
                      className={`p-3 flex justify-between rounded-md cursor-pointer transition-all duration-200 ${currentLesson?._id === lesson._id ? "bg-pink-200" : "hover:bg-pink-100"}`}
                    >
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock10 size={14} /> {lesson.duration}
                        </p>
                      </div>
                      <p>
                        <File size={18} />
                      </p>
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

// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import { ArrowLeft, Users, Clock10, ChevronDown, Lock, LockOpen } from "lucide-react";
// import Loading from "../components/Loading.jsx";
// // import { cnBase } from "tailwind-variants";

// const url = "http://localhost:5000";

// function OnlineCourseDetails() {
//   console.log("course details page is working");

//   let [videos, setVideos] = useState([]);
//   let [videoDetails, setVideoDetails] = useState();
//   let [videosBySection, setVideosBySection] = useState({});
//   let [videoSrc, setVideoSrc] = useState();

//   const { courseId } = useParams();

//   let [visible, setVisible] = useState(null);
//   let [isUnlocked, setIsUnlocked] = useState(false);
//   let [currentVideo, setCurrentVideo] = useState();
//   let [totalSections, setTotalSections] = useState();

//   var token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc3NDY4MDc2NywiZXhwIjoxNzc0NzY3MTY3fQ.u18vgJ5XOANeCr9HQeAyQrZYE1z34H39X9P71ZU3I7s";

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         const response = await axios.get(
//           // `${url}/course/online-course/${courseId}`,
//           `${url}/course/${courseId}`,
//           // {
//           //   headers: {
//           //     Authorization: `Bearer ${token}`,
//           //   },
//           // }
//         );

//         setVideos(response.data.videos);
//         // console.log("total video: ", response.data.videos);
//         // console.log("1st video: ", response.data.videos[0]);
//         setCurrentVideo(response.data.videos[0]); // to set the 1st video

//         const grouped = response.data.videos.reduce((groups, video) => {
//           const section = video.section;
//           if (!groups[section]) groups[section] = [];
//           groups[section].push(video);
//           return groups;
//         }, {});
//         setVideosBySection(grouped);
//         // console.log("grouped videos", grouped);
//       } catch (error) {
//         console.error(error.message);
//       }
//     }

//     async function fetchCourseName() {
//       try {
//         const details = await axios.get(`${url}/course/${courseId}`);
//         setVideoDetails(details.data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     }

//     fetchVideos();
//     fetchCourseName();
//   }, [courseId]);

//   // new code
//   // async function fetchVideoUrl(currentVideoUrl) {
//   //   try {
//   //     const response = await axios.get(
//   //       `${url}${encodeURIComponent(currentVideoUrl)}`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //         responseType: "blob",
//   //       }
//   //     );

//   //     const videoBlob = new Blob([response.data], { type: "video/mp4" });
//   //     const videoObjectUrl = URL.createObjectURL(videoBlob);
//   //     setVideoSrc(videoObjectUrl);
//   //   } catch (error) {
//   //     console.log("error: ", error.message);
//   //   }
//   // }

//   // useEffect(() => {
//   //   if (currentVideo?.videoUrl) {
//   //     console.log("fetching video: ", currentVideo.videoUrl);
//   //     fetchVideoUrl(currentVideo.videoUrl);
//   //   }
//   // }, [currentVideo]);
//   // new code
//   // CURRENTLY NEED TO WORK ON THIS

//   return (
//     <div className="bg pt-20">
//       {/* Top Banner */}
//       <div className="py-10 px-8">
//         <Link
//           to="/courses/my-learning"
//           className="flex items-center w-fit text-sm text-gray-600 hover:text-sky-500 mb-3"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Learning
//         </Link>

//         <h1 className="text-4xl font-bold">
//           {videoDetails ? videoDetails.title : "Loading..."}
//         </h1>
//         <p className="text-gray-700 mt-3 text-lg">
//           {videoDetails ? videoDetails.description : "Loading..."}
//         </p>

//         <div className="mt-4 flex gap-5 items-center text-gray-600">
//           <p>⭐ {videoDetails?.rating || "Loading..."}</p>
//           <p>({videoDetails?.reviews || "0"} reviews)</p>
//           <p className="flex items-center gap-2">
//             <Users size={18} /> {videoDetails?.students || "0"} Students
//           </p>
//         </div>
//       </div>

//       {/* Course Content */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 py-10 relative">
//         {/* Main Video Player + Details */}
//         <div className="col-span-1 md:col-span-3 items-start">
//           {currentVideo ? (
//             <video
//               className="rounded-xl object-center object-cover w-full shadow-lg h-[200px] sm:h-[300px] md:h-[500px]"
//               controls
//               // src={`http://localhost:5000${currentVideo.videoUrl}?nocache=${Date.now()}`}
//               src={`${url}${currentVideo.videoUrl}`} // new
//               // src={videoSrc}
//               // style={{ height: "500px", width: "100%" }}
//               onContextMenu={(e) => e.preventDefault()}
//               controlsList="nodownload"
//             ></video>
//           ) : (
//             <div className="flex items-center justify-center h-96 bg-gray-200 rounded-lg">
//               <Loading height="150px" width="150px" />
//             </div>
//           )}

//           {/* Course Details Below Video */}
//           <div className="mt-8 bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-4">
//               {currentVideo?.title || "No title available"}
//             </h2>
//             <p>{currentVideo?.description || "No description available."}</p>
//             {/* <p className="mt-4">lesson 1 of 3</p> */}
//             {/* <h2 className="text-2xl font-bold mt-8 mb-4">Requirements</h2>
//             <ul className="list-disc ml-6 text-gray-700">
//               <li>Basic baking tools</li>
//               <li>Oven access</li>
//               <li>Passion for learning 🎂</li>
//             </ul> */}

//             {/* <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2> */}
//             {/* <p className="text-gray-600">⭐⭐⭐⭐⭐ 4.8 average rating</p> */}
//           </div>
//         </div>

//         {/* Curriculum Sidebar */}
//         <div className="col-span-1 md:col-span-1 w-full">
//           <div className="sticky top-10">
//             <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
//             {Object.keys(videosBySection).map((sectionName, index) => (
//               <div
//                 key={sectionName}
//                 className="mb-5 bg-white p-4 rounded-xl shadow-md cursor-pointer"
//                 onClick={() => setVisible(visible === index ? null : index)}
//               >
//                 <div className="flex justify-between items-center ">
//                   <h3 className="text-lg font-semibold">{sectionName}</h3>
//                   <ChevronDown
//                     size={24}
//                     className={`transition-transform ${
//                       visible === index ? "rotate-180" : ""
//                     }`}
//                   />
//                 </div>

//                 {visible === index && (
//                   <div className="mt-3">
//                     {videosBySection[sectionName].map((video) => (
//                       <div
//                         key={video._id}
//                         onClick={() => setCurrentVideo(video)}
//                         className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-pink-100 transition-all duration-200 cursor-pointer"
//                       >
//                         <div>
//                           <p className="font-medium">{video.title}</p>
//                           <p className="text-sm text-gray-500 flex items-center gap-1">
//                             <Clock10 size={14} /> {video.duration}
//                           </p>
//                         </div>
//                         {/* {isUnlocked ? (
//                           <LockOpen size={18} color="green" />
//                         ) : (
//                           <Lock size={18} color="red" />
//                         )} */}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OnlineCourseDetails;
