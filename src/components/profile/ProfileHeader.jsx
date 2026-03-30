import { Button } from "../ui/button";

export function ProfileHeader({ name, email, mobileNumber }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
      <div className="flex flex-col gap-1 mb-4 sm:mb-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
        <div className="flex items-center gap-4 text-gray-500 text-sm sm:text-base">
          <span>{mobileNumber}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{email}</span>
        </div>
      </div>
      <Button className="rounded-xl px-6 bg-pink-500 hover:bg-pink-600 text-white font-medium shadow-sm transition-all">
        Edit Profile
      </Button>
    </div>
  );
}
