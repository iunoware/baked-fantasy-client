import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Award } from "lucide-react";

export function ProfileCard({
  name,
  email,
  avatar,
  membershipLevel,
  joinedDate,
}) {
  return (
    <div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-[20px] bg-white/60 backdrop-blur-md shadow-lg border border-white/40 p-8"
    >
      <div className="flex flex-col items-center gap-6">
        <div
          whileHover={{
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 },
          }}
          className="cursor-pointer"
        >
          <Avatar className="w-32 h-32 ring-4 ring-white/80 shadow-xl">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-foreground">{name}</h2>
          <p className="text-muted-foreground">{email}</p>
        </div>

        <div className="w-full space-y-3 pt-2">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Award className="w-4 h-4 text-pink-400" />
            <span className="text-sm">{membershipLevel}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-4 h-4 text-pink-400" />
            <span className="text-sm">Joined {joinedDate}</span>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-full pt-4"
        >
          <Button className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-pink-300">
            Edit Profile
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
