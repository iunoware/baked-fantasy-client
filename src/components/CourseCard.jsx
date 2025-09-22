function CourseCard() {
  // const colors = [
  //   "bg-pink-500/70",
  //   "bg-cyan-600/60",
  //   "bg-yellow-600/60",
  //   "bg-red-600/60",
  // ];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <>
      <div>
        <div
          to="/courses/online"
          className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:scale-[1.02] bg-white"
        >
          <img
            src="https://images.unsplash.com/photo-1606788075761-37733be66d11"
            alt="Online Baking Course"
            className="h-72 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-800 transition duration-500"></div>

          <div className="absolute bottom-0 p-6 text-white">
            <h2 className="text-2xl font-bold drop-shadow-lg">Online Courses</h2>
            <p className="text-sm mt-2 drop-shadow-md">
              Learn baking at your own pace, from anywhere in the world.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-200 hover:ring-blue-400 hover:ring-2 hover:ring-offset-2 rounded-2xl group hover:scale-101 shadow-lg hover:shadow-2xl transition-all duration-200 my-10">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={`/images/${props.img}`}
              alt="cake image"
              className="h-100 w-full group-hover:scale-105 transition-all duration-200 object-cover rounded-t-2xl"
            />
          </div> */}

      {/* <div className={`absolute inset-0 rounded-t-2xl`}></div> */}

      {/* <div className="absolute bg-black/25 rounded-tl-2xl rounded-tr-2xl inset-0 h-full w-full flex flex-col justify-end">
            <h2 className="text-white  text-3xl font-bold ml-10 mb-3">
              {props.courseGenre}
            </h2>
            <p className="text-white text-lg font-bold ml-10 mb-10">
              {props.courseCount} courses available
            </p>
          </div>
        </div> */}

      {/* <div className="p-10 rounded-bl-2xl rounded-br-2xl bg-pink-100">
          <h3 className="text-xl  mb-5 text-gray-800">{props.description}</h3>

          <div className="flex lg:flex-row flex-col">
            <ul className="inline-block">
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-700">
                {props.list1}
              </li>
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-700">
                {props.list2}
              </li>
            </ul>
            <ul className="inline-block lg:ml-30">
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-700">
                {props.list3}
              </li>
              <li className="before:content-['•'] before:mr-3 text-xl text-gray-700">
                {props.list4}
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default CourseCard;
