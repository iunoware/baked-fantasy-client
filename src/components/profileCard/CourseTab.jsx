import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

import { PlayCircle } from "lucide-react";

const courses = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjA0MTIwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Web Development Masterclass",
    progress: 65,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1522204538344-922f76ecc041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvdXJzZXxlbnwxfHx8fDE3NjA1MDgyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Business Strategy Fundamentals",
    progress: 40,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjb3Vyc2V8ZW58MXx8fHwxNzYwNDQ1MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "UX/UI Design Principles",
    progress: 85,
  },
];

export function CoursesTab() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {courses.map((course, index) => (
        <div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white rounded-[18px] shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="w-full md:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 w-full space-y-3">
            <h4 className="text-foreground">{course.title}</h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm text-pink-700">
                  {course.progress}%
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              >
                <Progress value={course.progress} className="h-2" />
              </motion.div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button className="rounded-xl gap-2 shadow-md bg-pink-300">
              <PlayCircle className="w-4 h-4" />
              Continue
            </Button>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
