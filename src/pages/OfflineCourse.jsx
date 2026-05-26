import { GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Heading from "../components/Heading.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading.jsx";

function OfflineCourse() {
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    // localStorage.setItem(
    //   "token",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTZlYTE3MTExZDA2NDFhZTg4ZmRjOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4NTI1NzQ5LCJleHAiOjE3NTg2MTIxNDl9.GBja9cx4geiFNk_xBf7xcTp8J8e5T0R44cZLfAxaQso"
    // );

    async function fetchCourse() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/offline-course`);
        // console.log(response.data.courses);

        setCourses(response.data.courses);
        // coursePrices = response.data.courses.map((c) => c.price);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchCourse();
  }, []);

  return (
    <div className="bg pt-20">
      <Link
        to="/courses"
        className="flex pt-10 pl-10 w-fit items-center text-sm text-gray-600 hover:text-[#870D32] mb-3"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
      </Link>

      <div className="pb-10">
        <Heading title="Learn the Art of Baking" />
        <p className="text-center text-xl mt-4 px-5">
          Join our hands-on classes and master the secrets behind mouthwatering cakes,
          pastries, and breads — all in a fun, friendly environment.
        </p>
      </div>

      {/* bg-[url('/images/cake-2.jpg')] bg-cover bg-center */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {/* {[...Array(10)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-white shadow-xl m-10">
            <div className="rounded-xl m-2 flex align-bottom overflow-hidden">
              <img
                src="/images/cake-2.jpg"
                alt="course-img"
                className="rounded-xl hover:scale-104 transition-all duration-200"
              />
            </div>
            <div className="p-5 w-full">
              <h2 className="font-semibold text-2xl ">Offline course {i + 1}</h2>
              <p className="">course description goes here</p>
              <div className="space-y-4 my-5">
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="">Face-to-face interaction {i + 1}</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="">Hands-on practical sessions {i + 1}</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="">Networking opportunities {i + 1}</span>
                </div>
              </div>

              <Link
                className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-xl bg-sky-500 px-8 py-4 text-white"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <GraduationCap size={25} />
                </span>

                <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
                  Enroll now
                </span>
              </Link>
            </div>
          </div>
        ))} */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {courses.length > 0 ? (
          courses.map((course, i) => (
            <div key={i} className="">
              <div className="rounded-2xl bg-white shadow-xl m-10">
                <div className="rounded-xl m-2 flex align-bottom overflow-hidden">
                  <img
                    src={course.image ? course.image : `/images/cake-2.jpg`}
                    alt={course.title}
                    className="rounded-xl hover:scale-104 transition-all duration-200"
                  />
                </div>
                <div className="p-5 w-full">
                  <h2 className="font-semibold text-2xl ">{course.title}</h2>
                  <p>{course.description}</p>
                  <div className="space-y-4 my-5">
                    {course.highlights?.slice(0, 3).map((point, idx) => (
                      <div className="flex items-center" key={idx}>
                        <div className="w-2 h-2 rounded-full new-primary-bg mr-3"></div>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-xl new-primary-bg px-8 py-4 text-white"
                    to="/contact"
                  >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                      <GraduationCap size={25} />
                    </span>

                    <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
                      Enroll now
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-screen">
            <Loading text={"Offline courses are coming soon"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OfflineCourse;
