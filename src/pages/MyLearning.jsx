import { useEffect, useState } from "react";
import axios from "axios";
import OnlineCourseCard from "../components/OnlineCourseCard.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Heading from "../components/Heading.jsx";
import Loading from "../components/Loading.jsx";

function MyLearning() {
  // use the localstorage's getItem  and setItem
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsImlhdCI6MTc3NDYxMDY0NywiZXhwIjoxNzc0Njk3MDQ3fQ.WNIn7uSuqovRYIOiJdOOvLu0X2vV_KjdjAuzrk9Kxdc";

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
  }, []);

  return (
    <div className="bg pt-20">
      <Link
        to="/courses"
        className="flex pt-10 pl-10 items-center w-fit text-sm text-gray-600 hover:text-sky-500 mb-3"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
      </Link>

      <div className="pb-10">
        <Heading title="Your Learning Journey" />
        <p className="text-center text-xl mt-4 px-5">
          All the courses you've purchased in one place. Track your progress, continue
          learning, and access course materials anytime, anywhere.
        </p>
      </div>
      {/* <ul className="px-30 pt-30 mt-10">
        {courses.length === 0 ? (
          <p>No courses found</p>
        ) : (
          courses.map((c, i) => (
            <li key={c._id} className="text-xl">
              {i + 1}. Purchased course: <span className="font-semibold">{c.title}</span>
              <br />
              <span className="pl-4">
                Course Id: <span className="font-semibold">{c._id}</span>
              </span>
            </li>
          ))
        )}
      </ul> */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {courses.length > 0 ? (
          courses.map((course, index) => {
            return (
              <div key={index}>
                <div>
                  <OnlineCourseCard
                    path={`/course/my-learning/`}
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
                    // price={course.price}
                    // originalPrice={course.originalPrice}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-screen">
            {/* <p className="text-4xl px-2 font-bold my-10 mb-10 text-center lora  w-full">
              You haven't purchased any courses yet!
            </p> */}
            {/* <Heading title={"You haven't purchased any courses yet"} /> */}
            <Loading text={"Courses are coming soon"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyLearning;
