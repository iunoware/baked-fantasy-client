function Card(props) {
  return (
    <>
      <div className=" rounded bg-gray-300">
        <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
          <img
            alt="cakes"
            src={props.img}
            className="h-56 w-full object-cover"
            loading="lazy"
          />
          <div className="bg-white p-4 sm:p-6">
            <a href="#">
              <h3 className="mt-0.5 text-lg text-gray-900 font-bold">
                {props.name}
              </h3>
            </a>
            <p className="mt-2 line-clamp-3 text-xl/relaxed text-blue-500 font-extrabold">
              ₹{props.price}
              <span className="text-[15px] strike line-through text-gray-500 font-medium pl-2">
                ₹{props.discount}
              </span>
            </p>
            {/* primary buttons */}
            <div className="buttons pt-5">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded-sm bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                  Add to cart
                </span>
              </a>
              <a
                className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-3 py-3 text-pink-600 focus:ring-3 focus:outline-hidden"
                href="#"
              >
                <span className="absolute -start-full transition-all group-hover:start-1">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:ms-4">
                  view more
                </span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
export default Card;
