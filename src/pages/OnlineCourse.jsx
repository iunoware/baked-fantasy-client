import OnlineCourseCard from "@/components/OnlineCourseCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OnlineCourse() {
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NzA3ODE2MSwiZXhwIjoxNzU3MTY0NTYxfQ.s5viXRBcl7wTiZtWXlsB61w_w1rfhZhsZiqE7_qjzfE"
    );

    async function fetchCourse() {
      try {
        const response = await axios.get("http://localhost:5000/course", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(localStorage.getItem("token"));
        // if (!response) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        setCourses(response.data.courses);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCourse();
  }, []);

  return (
    <>
      {/* <h1 className="pt-40 text-5xl font-bold text-center">Online course</h1> */}

      <div className="pt-30 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {courses.map((course, index) => {
          return (
            <div key={index}>
              <Link>
                <OnlineCourseCard
                  image={course.image}
                  rating={course.rating}
                  reviews={course.reviews}
                  students={course.students}
                  title={course.title}
                  subtitle={course.subtitle}
                  duration={course.duration}
                  totalHours={course.totalHours}
                  totalVideos={course.totalVideos}
                  highlights={course.highlights}
                  price={course.price}
                  originalPrice={course.originalPrice}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default OnlineCourse;
