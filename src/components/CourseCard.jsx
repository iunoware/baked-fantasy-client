function CourseCard() {
  const colors = {
    pink: "bg-pink-500/70",
    blue: "bg-cyan-600/60",
    yellow: "bg-yellow-600/60",
    red: "bg-red-600/60",
  };

  return (
    <>
      <div className="bg-gray-200 rounded-2xl hover:scale-101 hover:shadow-xl transition-all duration-200 my-10">
        <div className="relative">
          <img
            src="/images/cake-3.jpg"
            alt=""
            className="h-100 w-full object-cover rounded-t-2xl"
          />

          <div className={`${colors["pink"]} absolute inset-0 rounded-t-2xl`}></div>

          <div className="absolute inset-0 h-full w-full flex flex-col justify-end">
            <h2 className="text-white text-3xl font-bold ml-10 mb-3">Online courses</h2>
            <p className="text-white text-lg ml-10 mb-10">3 courses available</p>
          </div>
        </div>

        <div className="p-10">
          <h3 className="text-xl mb-5 text-gray-800">
            Learn at your own pace with our comprehensive video library taught by industry
            professionals
          </h3>

          <div className="flex lg:flex-row flex-col">
            <ul className="inline-block">
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-800">
                24/7 Access
              </li>
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-800">
                Lifetime updates
              </li>
            </ul>
            <ul className="inline-block lg:ml-30">
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-800">
                Certificate of completion
              </li>
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-800">
                Expert support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseCard;
