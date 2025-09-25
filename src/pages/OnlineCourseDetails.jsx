import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function OnlineCourseDetails() {
  let [videos, setVideos] = useState([]);
  let [videoDetails, setVideoDetails] = useState();
  const { courseId } = useParams();

  // window.addEventListener("DOMContentLoaded", () => {
  //   const courseVideo = document.querySelector(".course-video");
  //   if (courseVideo) {
  //     courseVideo.addEventListener("contextmenu", (e) => e.preventDefault());
  //   }
  // });

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get(
          `http://localhost:5000/course/online-course/${courseId}`
        );
        console.log("videos:", response.data.videos);
        setVideos(response.data.videos);
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

  // useEffect(() => {
  //   if (videoDetails) {
  //     console.log("course Details 3: ", videoDetails);
  //   } else {
  //     console.log("video details has not been uploaded yet");
  //   }
  // }, [videoDetails]);

  // console.log("course ID:", courseId);

  return (
    <div className="bg">
      <div className="absolute inset-0 top-23 left-3 sm:left-10 space-x-2 mb-8">
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

      <div className="p-10 pt-25 sm:p-20 md:p-30 text-2xl">
        <div className="my-10">
          <h2 className="font-bold text-4xl">
            {videoDetails ? videoDetails.title : "Loading..."}
          </h2>
          <p className="text-sky-500 mt-3">
            {videoDetails ? videoDetails.description : "Loading..."}
          </p>
        </div>

        {/* video thing */}
        <div>
          {videos.map((video, index) => {
            return (
              <div key={video._id}>
                Video ID {index + 1}: {video._id}
                <h2 className="text-3xl font-semibold">{video.title}</h2>
                <p>{video.description}</p>
                <video
                  onContextMenu={(e) => e.preventDefault()}
                  src={`http://localhost:5000${video.videoUrl}`}
                  width="320"
                  height="240"
                  controls
                  type="video/mp4"
                  className="rounded-xl course-video"
                  controlsList="nodownload"
                ></video>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OnlineCourseDetails;
