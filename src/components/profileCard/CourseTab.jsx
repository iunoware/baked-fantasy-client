import { useEffect, useState } from "react";
import api from "../../api";
import { GraduationCap } from "lucide-react";
import OnlineCourseCard from "../OnlineCourseCard.jsx";
import Loading from "../Loading.jsx";

export function CoursesTab() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchingPurchasedCourses() {
      try {
        const response = await api.get(`/courses/my-learning`);
        const coursesList = response.data.courses.map((c) => c.courseId);
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchingPurchasedCourses();
  }, []);

  if (loading) {
    return <Loading text="Loading your courses..." />;
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500 min-h-[300px]">
        <GraduationCap className="w-12 h-12 text-gray-200 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No courses found</h3>
        <p className="text-sm">You haven't purchased any courses yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <OnlineCourseCard
          key={course._id}
          courseId={course._id}
          title={course.title}
          description={course.description}
          rating={course.rating}
          totalReviews={course.totalReviews}
          ratingSum={course.ratingSum}
          link={`/course/my-learning/${course._id}`}
        />
      ))}
    </div>
  );
}
