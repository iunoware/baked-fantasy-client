import { Link } from "react-router-dom";

function Product(props) {
  return (
    <>
      <article className="cat-card overflow-hidden rounded-lg shadow-xl hover:-translate-y-2 transition-all duration-200">
        <div className="relative p-2 h-56">
          <img
            alt="Cake"
            src={props.img} // first image only
            className="h-full w-full rounded-2xl object-cover cat-img"
          />

          {/* <div className={`absolute inset-0 ${colors[props.color]}`}></div> */}

          {/* Centered hover button */}
          <div className="hover-content">
            <Link
              to={`/products/${props.category}/${props.id}`}
              className="bg-white rounded-lg px-4 py-2 font-bold shadow"
            >
              View details
            </Link>
          </div>
        </div>

        {/* Bottom white content */}
        <div className="bg-gray-100 p-4 sm:p-6">
          <div className="text-black flex">
            <div className="flex items-center gap-2 w-10/12">
              <div>
                <h3 className="font-bold text-xl">{props.title}</h3>
                <p className="text-md pt-2">{props.subject}</p>
              </div>
            </div>
            <p className="mt-2 pb-3 font-extrabold text-3xl text-blue-500">
              ₹{props.price}
            </p>
          </div>
          <div className="pt-3">
            <button
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
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:ms-4">
                Add to cart
              </span>
            </button>
            <button
              className="group relative inline-flex items-center overflow-hidden rounded-sm border border-current px-3 py-3 text-sky-600 focus:ring-3 focus:outline-hidden"
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
                Buy Now
              </span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
export default Product;
