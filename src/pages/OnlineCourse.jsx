import OnlineCourseCard from "@/components/OnlineCourseCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Heading from "@/components/Heading";

// let coursePrices = [];

// export function getCoursePrices() {
//   return coursePrices;
// }

function OnlineCourse() {
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    // localStorage.setItem(
    //   "token",
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTZlYTE3MTExZDA2NDFhZTg4ZmRjOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4NTI1NzQ5LCJleHAiOjE3NTg2MTIxNDl9.GBja9cx4geiFNk_xBf7xcTp8J8e5T0R44cZLfAxaQso"
    // );

    async function fetchCourse() {
      try {
        const response = await axios.get("http://localhost:5000/course");
        setCourses(response.data.courses);
        // coursePrices = response.data.courses.map((c) => c.price);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchCourse();
  }, []);

  return (
    <div className="bg-[#f1faee] pt-20">
      <Link
        to="/courses"
        className="flex pt-10 pl-10 items-center text-sm text-gray-600 hover:text-sky-500 mb-3"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
      </Link>

      {/* hero section */}
      {/* <div className="pt-15">
        <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl flex font-semibold justify-center">
          Choose our <span className="text-black">&nbsp;Learning path</span>
        </h1>
        <div className="flex justify-center">
          <p className="text-center lg:text-2xl md:text-xl sm:text-lg max-w-[600px] mx-3 pt-10 text-gray-700">
            Master the art of baking with our expert-led courses designed for all skill
            levels. Whether you prefer learning online or in-person, we have the perfect
            program for you.
          </p>
        </div>
      </div> */}

      <div className="pb-10">
        <Heading title="Learn Anytime, Bake Anywhere" />
        <p className="text-center text-xl mt-4 px-5">
          Join our online baking courses and master your favorite recipes from the comfort
          of your home - step by step, guided by our expert chefs.
        </p>
      </div>

      {/* <h1 className="pt-40 text-5xl font-bold text-center">Online course</h1> */}

      {/* <div className="py-20 grid grid-cols-1 lg:grid-cols-2"> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {courses.length > 0 ? (
          courses.map((course, index) => {
            return (
              <div key={index}>
                <div>
                  <OnlineCourseCard
                    endPoint={course._id}
                    image={course.ImageUrl}
                    rating={course.rating}
                    reviews={course.reviews}
                    students={course.students}
                    description={course.description}
                    title={course.title}
                    subtitle={course.subtitle}
                    duration={course.duration}
                    totalHours={course.totalHours}
                    totalVideos={course.totalVideos}
                    highlights={course.highlights}
                    price={course.price}
                    originalPrice={course.originalPrice}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-screen">
            <p className="text-2xl text-center w-full">no courses found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineCourse;
