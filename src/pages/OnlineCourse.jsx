import OnlineCourseCard from "@/components/OnlineCourseCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Heading from "../components/Heading.jsx";
import Loading from "../components/Loading.jsx";
import { useAuth } from "../context/AuthContext";

const url = `http://localhost:5000`;

function OnlineCourse() {
  let [courses, setCourses] = useState([]);
  const [purchasedIds, setPurchasedIds] = useState(new Set());
  const { user } = useAuth();

  useEffect(() => {
    const ids = new Set(user?.purchasedCourses?.map((c) => c._id || c.courseId) || []);
    setPurchasedIds(ids);

    async function fetchCourse() {
      try {
        const response = await axios.get(`${url}/course`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchCourse();
  }, []);

  return (
    <div className="bg md:pt-20 pt-40">
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {courses.length > 0 ? (
          courses
            .filter((course) => !purchasedIds.has(course._id))
            .map((course, index) => {
              return (
                <div key={index}>
                  <div>
                    <OnlineCourseCard
                      thumbnail={course.thumbnail}
                      title={course.title}
                      description={course.description}
                      rating={course.rating}
                      totalReviews={course.totalReviews}
                      duration={course.duration}
                      ratingSum={course.ratingSum}
                      discountedPrice={course.discountedPrice}
                      originalPrice={course.originalPrice}
                      link={`/cart`}
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
