function Card(props) {
  return (
    <>
      <div className=" rounded bg-gray-300">
        <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
          <img
            alt="cakes"
            src={props.img}
            className="h-56 w-full object-cover hover:scale-105 transition-all duration-200 ease-in-out"
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
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
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
