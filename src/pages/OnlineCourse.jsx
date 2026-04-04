import OnlineCourseCard from "@/components/OnlineCourseCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Heading from "../components/Heading.jsx";
import Loading from "../components/Loading.jsx";

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
    <div className="bg pt-20">
      <Link
        to="/courses"
        className="flex pt-10 pl-10 w-fit items-center text-sm text-gray-600 hover:text-[#870D32] mb-3"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
      </Link>

      <div className="pb-10">
        <Heading title="Learn Anytime, Bake Anywhere" />
        <p className="text-center text-xl mt-4 px-5">
          Join our online baking courses and master your favorite recipes from the comfort
          of your home - step by step, guided by our expert chefs.
        </p>
      </div>

      {/* <div className="py-20 grid grid-cols-1 lg:grid-cols-2"> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {courses.length > 0 ? (
          courses.map((course, index) => {
            return (
              <div key={index}>
                <div>
                  <OnlineCourseCard
                    title={course.title}
                    description={course.description}
                    rating={course.rating}
                    totalReviews={course.totalReviews}
                    duration={course.duration}
                    ratingSum={course.ratingSum}
                    discountedPrice={course.discountedPrice}
                    originalPrice={course.originalPrice}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-screen">
            <Loading text={"Online courses are coming soon"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineCourse;
