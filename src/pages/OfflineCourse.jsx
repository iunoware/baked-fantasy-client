import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import Heading from "../components/Heading.jsx";

function OfflineCourse() {
  return (
    <div className="bg pt-40">
      <div className="pb-10">
        <Heading title="Learn the Art of Baking" />
        <p className="text-center text-xl mt-4 px-5">
          Join our hands-on classes and master the secrets behind mouthwatering cakes,
          pastries, and breads — all in a fun, friendly environment.
        </p>
      </div>

      {/* bg-[url('/images/cake-2.jpg')] bg-cover bg-center */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-white shadow-2xl m-10">
            <div className="rounded-xl m-2 flex align-bottom overflow-hidden">
              <img
                src="/images/cake-2.jpg"
                alt="course-img"
                className="rounded-xl hover:scale-104 transition-all duration-200"
              />
            </div>
            <div className="p-5 w-full">
              <h2 className="font-semibold text-2xl ">Offline course {i + 1}</h2>
              <p className="">course description goes here</p>
              <div className="space-y-4 my-5">
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="">Face-to-face interaction {i + 1}</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="">Hands-on practical sessions {i + 1}</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="">Networking opportunities {i + 1}</span>
                </div>
              </div>

              <Link
                className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-xl bg-sky-500 px-8 py-4 text-white"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <GraduationCap size={25} />
                </span>

                <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
                  Enroll now
                </span>
              </Link>
            </div>
          </div>
        ))}

        {/* <div className="rounded-4xl bg-gray-300 m-10">
          <div className=" bg-[url('/images/cake-2.jpg')] bg-cover bg-center rounded-3xl m-2 flex align-bottom">
            <div className="p-5 mt-80 backdrop-blur-sm rounded-bl-3xl rounded-br-3xl w-full">
              <h2 className="font-semibold text-2xl text-white">
                Course title goes here
              </h2>
              <p className="text-white">course description goes here</p>
              <div className="space-y-4 my-5">
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Face-to-face interaction</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Hands-on practical sessions</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Networking opportunities</span>
                </div>
              </div>

              <Link
                className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-full bg-sky-600 px-8 py-4 text-white"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <GraduationCap size={25} />
                </span>

                <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
                  Enroll now
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-4xl bg-gray-300 m-10">
          <div className=" bg-[url('/images/cake-2.jpg')] bg-cover bg-center rounded-3xl m-2 flex align-bottom">
            <div className="p-5 mt-80 backdrop-blur-sm rounded-bl-3xl rounded-br-3xl w-full">
              <h2 className="font-semibold text-2xl text-white">
                Course title goes here
              </h2>
              <p className="text-white">course description goes here</p>
              <div className="space-y-4 my-5">
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Face-to-face interaction</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Hands-on practical sessions</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Networking opportunities</span>
                </div>
              </div>

              <Link
                className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-full bg-sky-600 px-8 py-4 text-white"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <GraduationCap size={25} />
                </span>

                <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
                  Enroll now
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-4xl bg-gray-300 m-10">
          <div className=" bg-[url('/images/cake-2.jpg')] bg-cover bg-center rounded-3xl m-2 flex align-bottom">
            <div className="p-5 mt-80 backdrop-blur-sm rounded-bl-3xl rounded-br-3xl w-full">
              <h2 className="font-semibold text-2xl text-white">
                Course title goes here
              </h2>
              <p className="text-white">course description goes here</p>
              <div className="space-y-4 my-5">
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Face-to-face interaction</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Hands-on practical sessions</span>
                </div>
                <div className="flex items-center ">
                  <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
                  <span className="text-white">Networking opportunities</span>
                </div>
              </div>

              <Link
                className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-full bg-sky-600 px-8 py-4 text-white"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <GraduationCap size={25} />
                </span>

                <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
                  Enroll now
                </span>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default OfflineCourse;
