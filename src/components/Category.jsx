function Category(props) {
  const colors = {
    pink: "bg-pink-400/50",
    blue: "bg-cyan-400/50",
    yellow: "bg-yellow-300/50",
    red: "bg-red-400/50",
  };
  return (
    <>
      <div className="card">
        <article className="overflow-hidden rounded-lg shadow-sm hover:-translate-y-2 transition-all duration-200 ">
          {/* Image section with overlay */}
          <div className="relative h-56">
            <img
              alt="Cake"
              src={props.img}
              className="h-full w-full object-cover"
            />
            {/* Pink overlay */}
            <div className={`absolute inset-0 ${colors[props.color]}`}></div>

            {/* Text inside overlay */}
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xl">{props.emoji}</span>
                {/* You can replace with an SVG icon */}
                <div>
                  <h3 className="font-bold text-lg">{props.title}</h3>
                  <p className="text-sm">15 products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom white content */}
          <div className="bg-white p-4 sm:p-6">
            <p className="mt-2 text-sm text-gray-600">{props.subject}</p>
          </div>
        </article>
      </div>
    </>
  );
}
export default Category;
