import OnlineCourseCard from "@/components/OnlineCourseCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OnlineCourse() {
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTk3ZDYxOTdlMjcxMDM0OWUwNmI0MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NzU5NDU2NSwiZXhwIjoxNzU3NjgwOTY1fQ.giUcl522K0SzusqAFuK1scAvEg6hyiBkrheuZYBI2cI"
    );

    async function fetchCourse() {
      try {
        const response = await axios.get("http://localhost:5000/course", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(localStorage.getItem("token"));
        setCourses(response.data.courses);
        // console.log("Course image value:", courses.image);
        console.log("Course image value:", response.data.courses[0].ImageUrl);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCourse();
  }, []);

  return (
    <div className="bg-rose-50">
      {/* <h1 className="pt-40 text-5xl font-bold text-center">Online course</h1> */}

      <div className="pt-30 grid grid-cols-1 lg:grid-cols-2">
        {courses.length > 0 ? (
          courses.map((course, index) => {
            return (  
              <div key={index}>
                <Link>
                  <OnlineCourseCard
                    image={`http://localhost:5000${course.ImageUrl}`}
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
