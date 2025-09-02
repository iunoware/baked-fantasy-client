import CourseCard from "@/components/CourseCard";

function Courses() {
  return (
    <>
      {/* hero section */}
      <div>
        <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl flex font-semibold justify-center pt-30">
          Choose our <span className="text-orange-900">&nbsp;Learning path</span>
        </h1>
        <div className="flex justify-center">
          <p className="text-center lg:text-2xl md:text-xl sm:text-lg max-w-[600px] mx-3 text-gray-700 py-10">
            Master the art of baking with our expert-led courses designed for all skill
            levels. Whether you prefer learning online or in-person, we have the perfect
            program for you.
          </p>
        </div>
      </div>

      {/* courses online and offline */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        {/* online course */}
        <div className="m-4 lg:ml-20">
          <CourseCard />
        </div>

        {/* offline course */}
        <div className="m-4 lg:mr-20">
          <CourseCard />
        </div>
      </div>
    </>
  );
}

export default Courses;
