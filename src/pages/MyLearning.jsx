import { useEffect, useState } from "react";
import api from "../api";
import OnlineCourseCard from "../components/OnlineCourseCard.jsx";
import { Link } from "react-router-dom";
import Heading from "../components/Heading.jsx";
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
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchingPurchasedCourses() {
      try {
        const response = await api.get(`/courses/my-learning`);
        let coursesList = response.data.courses.map((c) => c.courseId);
        setCourses(coursesList);
      } catch (error) {
        console.error("Failed to fetch purchased courses:", error);
      }
    }
    fetchingPurchasedCourses();
  }, []);

  return (
    <div className="bg md:pt-20 pt-45">
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
                        duration={course.duration}
                        totalStudents={course.totalStudents}
                        totalReviews={course.totalReviews}
                        ratingSum={course.ratingSum}
                        link={`/course/my-learning/${course._id}`}
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
          </div>
        )}
      </div>
    </div>
  );
}
