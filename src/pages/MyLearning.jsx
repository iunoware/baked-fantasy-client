import { useEffect, useState } from "react";
import axios from "axios";
import OnlineCourseCard from "../components/OnlineCourseCard.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Heading from "../components/Heading.jsx";
import Loading from "../components/Loading.jsx";
import { GraduationCap } from "lucide-react";

function MyLearningEmpty() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-20 h-20 rounded-full bg-gray-200 justify-center items-center flex mb-6">
        <GraduationCap size={36} className="text-gray-600" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">No courses yet</h2>
      <p className="text-gray-500 mb-8 max-w-sm text-center">
        You haven't purchased any courses yet. Browse our collection and start learning
        today.
      </p>
      <Link
        to="/courses"
        className="px-7 py-3 bg-pbrown text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Browse courses
      </Link>
    </div>
  );
}

export default function MyLearning() {
  // use the localstorage's getItem  and setItem
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc3NDg1Njk1NywiZXhwIjoxNzc0OTQzMzU3fQ.KoYR3NW3PQQ-vTGRe4sUER_hRwKxuonU1H8WGsNokjg";
  const token = localStorage.getItem("token");

  let [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchingPurchasedCourses() {
      const response = await axios.get(`http://localhost:5000/courses/my-learning`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setCourses(response.data.courses);
      // console.log("response: ", response.data.courses);
      // console.log("purchased course: ", response.data.courses[0].courseId._id);
      let coursesList = response.data.courses.map((c) => c.courseId);
      setCourses(coursesList);
      // console.log("courses list: ", coursesList);
    }
    fetchingPurchasedCourses();
  }, [token]);

  return (
    <div className="bg md::pt-20 pt-45">
      {/* <Link
        to="/courses"
        className="flex pt-10 pl-10 items-center w-fit text-sm text-gray-600 hover:text-sky-500 mb-3"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
      </Link> */}

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"> */}
      <div>
        {courses.length > 0 ? (
          <>
            <div className="pb-10">
              <Heading title="Your Learning Journey" />
              <p className="text-center text-xl mt-4 px-5">
                All the courses you've purchased in one place. Track your progress,
                continue learning, and access course materials anytime, anywhere.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {courses.map((course, index) => {
                return (
                  <div key={index}>
                    <div>
                      <OnlineCourseCard
                        courseId={course._id}
                        title={course.title}
                        description={course.description}
                        rating={course.rating}
                        totalReviews={course.totalReviews}
                        ratingSum={course.ratingSum}
                        link={`/course/my-learning/${course._id}`}
                        // link={`/courses/my-learning/${course.title}-${course._id}`}

                        // discountedPrice={course.discountedPrice}
                        // originalPrice={course.originalPrice}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="">
            <MyLearningEmpty />
            {/* <Loading text={"Courses are coming soon"} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
