import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { PlayCircle, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../api"; // Assuming the axios instance is correctly set up
import { Link } from "react-router-dom";

export function CoursesTab() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await api.get("/courses/my-learning");
        // Ensure we always have an array, even if the backend behaves unexpectedly
        if (response.data && response.data.courses) {
          setCourses(response.data.courses);
        } else if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
        <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-600">No Courses Enrolled</h3>
        <p className="mt-1">Looks like you haven't bought any courses yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {courses.map((purchasedCourse, index) => {
        // Safe extractions just in case populated document fails
        const courseData = purchasedCourse?.courseId || {};
        const courseId = courseData._id || purchasedCourse._id || Math.random();

        // Progress could be dynamic later if tracking is implemented in the DB.
        // For now, defaulting to 0 or any available property from backend
        const progress = purchasedCourse?.progress || courseData?.progress || 0;

        const fallbackImage =
          "https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjA0MTIwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
        const image = courseData.image || courseData.thumbnail || fallbackImage;
        const title = courseData.title || "Course Details Not Available";

        return (
          <motion.div
            key={courseId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100 flex items-center justify-center">
              {typeof image === "string" ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              ) : (
                <BookOpen className="w-8 h-8 text-gray-300" />
              )}
            </div>

            <div className="flex-1 w-full space-y-3 px-1">
              <h4 className="text-gray-900 font-bold text-base line-clamp-2 md:line-clamp-1 pr-2">
                {title}
              </h4>

              <div className="space-y-2 max-w-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Course Progress
                  </span>
                  <span className="text-xs font-bold text-pink-600">{progress}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className="bg-pink-100 rounded-full h-2 w-full overflow-hidden"
                >
                  <div
                    className="bg-pink-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </motion.div>
                <div className="text-[10px] text-gray-400 font-medium">
                  {purchasedCourse.purchasedAt &&
                    `Purchased on: ${new Date(purchasedCourse.purchasedAt).toLocaleDateString()}`}
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 md:mt-0 self-start md:self-auto w-full md:w-auto"
            >
              <Link to={`/course/my-learning/${courseData._id}`}>
                <Button className="w-full md:w-auto rounded-lg gap-2 shadow-sm border border-pink-200 bg-pink-50 text-pink-700 hover:bg-pink-100 hover:text-pink-800 transition-colors">
                  <PlayCircle className="w-4 h-4" />
                  <span className="font-semibold">Continue</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
