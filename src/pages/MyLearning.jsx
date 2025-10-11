import { useEffect, useState } from "react";
import axios from "axios";

function MyLearning() {
  // use the localstorage's getItem  and setItem
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGY4NDIxZTU3MTFmOTYyYzMyZTQyMiIsImlhdCI6MTc2MDE3OTQ4NCwiZXhwIjoxNzYwMjY1ODg0fQ.RUVBaRUq_lF8aB3TyuQptdFKLG-_yIIpNYblEO-faVI";

  let [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchingPurchasedCourses() {
      const response = await axios.get(`http://localhost:5000/courses/my-learning`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.courses);
      console.log("response: ", response.data.courses);
    }
    fetchingPurchasedCourses();

    async function fetchingCourseData() {
      const courseData = await axios.get(`http://localhost:5000/course`);
      console.log("total courses:", courseData.data.courses);

      courseData.data.courses.foreach((c) => {
        const isPurchased = courses.some((purchased) => purchased.courseId === c._id);
        if (isPurchased) {
          console.log("purchased: ", c._id || c.title);
        } else {
          console.log("not purchased", c._id || c.title);
        }
      });
    }
    fetchingCourseData();
    // need to work on this...
  }, []);

  return (
    <div className="bg">
      <h2 className="pt-40 text-center text-3xl font-semibold">My Learning page</h2>
      <ul className="px-30 mt-10">
        {courses.map((c, i) => (
          <li key={i}>
            {i + 1}. Purchased course: <span className="font-semibold">{c.courseId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyLearning;
