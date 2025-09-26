/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Users } from "lucide-react";
import { Clock10 } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Lock } from "lucide-react";
import { LockOpen } from "lucide-react";

function OnlineCourseDetails() {
  let [videos, setVideos] = useState([]);
  let [videoDetails, setVideoDetails] = useState();
  let [videosBySection, setVideosBySection] = useState({});
  const { courseId } = useParams();

  // let [visibility, setVisibility] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // fetch the videos
        const response = await axios.get(
          `http://localhost:5000/course/online-course/${courseId}`
        );

        // const videoList = response.data.videos;
        setVideos(response.data.videos);

        // fetching each video as blob
        // const videosWithBlob = await Promise.all(
        //   videoList.map(async (video) => {
        //     const file = await axios.get(`http://localhost:5000${video.videoUrl}`, {
        //       responseType: "blob",
        //     });

        //     // Convert blob to temporary URL
        //     const blobUrl = URL.createObjectURL(file.data);

        //     return {
        //       ...video,
        //       blobUrl,
        //     };
        //   })
        // );

        // separating the videos by section name
        const grouped = response.data.videos.reduce((groups, video) => {
          const section = video.section;
          if (!groups[section]) {
            groups[section] = [];
          }
          groups[section].push(video);
          return groups;
        }, {});
        setVideosBySection(grouped);

        console.log("videos by section", grouped);

        console.log("videos:", response.data.videos);
        // setVideos(videosWithBlob);
      } catch (error) {
        console.error(error.message);
      }
    }

    async function fetchCourseName() {
      try {
        const details = await axios.get(`http://localhost:5000/course/${courseId}`);
        setVideoDetails(details.data);
        console.log("course details: ", details.data);
        // console.log("course details 2:", videoDetails);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchVideos();
    fetchCourseName();
  }, [courseId]);

  // console.log("course ID:", courseId);

  let [visible, setVisible] = useState(false);

  return (
    <div className="bg pt-30 px-10 sm:px-14 md:px-18 lg:px-25">
      {/* back arrow */}
      <div className="absolute inset-0 h-fit top-23 left-3 sm:left-10 space-x-2 mb-8">
        <Link
          variant="ghost"
          size="sm"
          to="/courses/online-course"
          className="flex hover:underline hover:underline-offset-3 items-center text-muted-foreground hover:text-[#00BCD4]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Online Courses
        </Link>
      </div>

      {/* heading */}
      <div className="my-10">
        <h2 className="font-bold text-5xl">
          {videoDetails ? videoDetails.title : "Loading..."}
        </h2>

        <p className="text-sky-500 mt-3">
          {videoDetails ? videoDetails.description : "Loading..."}
        </p>

        <div className="mt-4 flex gap-4">
          <p className="text-lg text-gray-700">
            ⭐{videoDetails ? videoDetails.rating : "Loading..."}
          </p>
          <p className="text-lg text-gray-700">
            ({videoDetails ? videoDetails.reviews : "Loading..."} reviews)
          </p>
          <p className="text-lg text-gray-700 flex gap-2">
            <Users color="#616161" size={20} className="inline-block" />
            <span>{videoDetails ? videoDetails.students : "Loading..."}</span>
            <span>Students</span>
          </p>
        </div>
      </div>

      {/* course curriculum */}
      <div className="my-10 flex flex-col bg-[url('/images/scribble.png')] p-5 rounded-xl gap-3">
        <h2 className="text-center mb-4 text-5xl font-bold">Course Curriculum</h2>
        <div className="text-center">
          <div className="text-3xl mb-3 font-extrabold text-sky-500">
            {videoDetails ? videoDetails.totalHours : "Loading..."}
          </div>
          <div className="text-3xl font-extrabold text-sky-500">
            {videoDetails ? videoDetails.totalVideos : "Loading..."}
          </div>
        </div>
      </div>

      {Object.keys(videosBySection).map((sectionName, index) => (
        <div key={sectionName} className="my-5 bg-white p-5 rounded-xl">
          <div className="p-3 flex justify-between">
            <div>
              <div className="bg-sky-400 inline-block mr-5 p-2 px-5 text-white font-bold rounded-xl text-2xl">
                {index + 1}
              </div>
              <h2 className="text-3xl font-semibold inline-block">{sectionName}</h2>
            </div>

            <div>
              <ChevronDown
                size={40}
                color="#ffffff"
                className="bg-sky-400 p-2 rounded-lg"
                onClick={() => setVisible(visible === index ? null : index)}
              />
            </div>
          </div>

          <div className={visible === index ? "block" : "hidden"}>
            {videosBySection[sectionName].map((video) => (
              <div
                key={video._id}
                className="my-4 bg-[url('/images/scribble.png')] p-4 flex justify-between items-center rounded-xl shadow-md hover:shadow-xl hover:scale-102 transition-all duration-200"
              >
                <div className="flex justify-start">
                  <div className="inline-block mr-7">
                    {/* <img
                    src={video.thumbnail}
                    alt="thumbnail"
                    className="h-20 w-20 object-center object-cover"
                  /> */}
                    <img
                      src="https://i.pinimg.com/1200x/ad/9d/17/ad9d179d29a1c33978878e544f5f9b1f.jpg"
                      alt="thumbnail"
                      className="h-20 w-20 object-center object-cover rounded-lg"
                    />
                  </div>

                  <div className="inline-block h-fit w-fit">
                    <p key={video._id}>{video.title}</p>
                    <p>
                      <Clock10 size={15} color="#454545" className="inline-block" />{" "}
                      {video.duration}
                    </p>
                    <div className="inline-block mt-2 font-semibold">
                      <Lock size={18} className=" inline-block" /> Locked
                      {/* <LockOpen /> */}
                    </div>
                  </div>
                </div>

                {/* <div></div> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OnlineCourseDetails;
