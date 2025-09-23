/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

function OnlineCourseDetails() {
  let [courses, setCourses] = useState();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get(`http://localhost:5000/courses/:courseId`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCourses();
  }, []);

  return (
    <>
      <h1>hello world</h1>
    </>
  );
}

export default OnlineCourseDetails;
