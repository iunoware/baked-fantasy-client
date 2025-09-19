import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full absolute">
        <div className="mx-auto max-w-screen-xl p-4 sm:px-6 lg:px-8 mt-[-10px]">
          <div className="flex h-16 items-center justify-between w-full ">
            {/* brand name */}
            <div className="md:flex md:items-center md:gap-12 z-50">
              <Link
                to="/"
                className="text-pink-500 text-2xl font-bold brand-name"
              >
                The Backed Fantasy
              </Link>
            </div>
            {/* navbar */}
            <div
              className="hidden lg:block fixed top left-1/2 transform -translate-x-1/2 
                bg-[#f1e5ff] rounded-xl p-4 px-[8px] shadow-md z-40 w-[90%] sm:w-[80%] md:w-auto"
            >
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm text-black">
                  {/* Home */}
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `text-lg rounded-lg p-3 transition ${
                          isActive
                            ? "bg-cyan-500 font-semibold text-white"
                            : "hover:text-black text-gray-500 hover:bg-sky-400/50"
                        } `
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  {/* about us */}
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `text-lg rounded-lg p-3 transition ${
                          isActive
                            ? "bg-cyan-500 text-white font-semibold"
                            : "hover:text-black text-gray-500 hover:bg-sky-400/50"
                        } `
                      }
                    >
                      About
                    </NavLink>
                  </li>

                  {/* products */}
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        `text-lg rounded-lg p-3 transition ${
                          isActive
                            ? "bg-cyan-500 text-white font-semibold"
                            : "hover:text-black text-gray-500 hover:bg-sky-400/50"
                        } `
                      }
                    >
                      Products
                    </NavLink>
                  </li>

                  {/* courses */}
                  <li>
                    <NavLink
                      to="/courses"
                      className={({ isActive }) =>
                        `text-lg rounded-lg p-3 transition ${
                          isActive
                            ? "bg-cyan-500 text-white font-semibold"
                            : "hover:text-black text-gray-500 hover:bg-sky-400/50"
                        } `
                      }
                    >
                      Courses
                    </NavLink>
                  </li>

                  {/* contact */}
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `text-lg rounded-lg p-3 transition ${
                          isActive
                            ? "bg-cyan-500 text-white font-semibold"
                            : "hover:text-black text-gray-500 hover:bg-sky-400/50"
                        } `
                      }
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            {/* login and Register */}
            <div className="flex items-center gap-4 m-5 z-50">
              <div className="sm:flex sm:gap-4 ">
                <a
                  className="group relative inline-flex items-center overflow-hidden rounded-full bg-cyan-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
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
                        {" "}
                        <path
                          d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M11 16L15 12M15 12L11 8M15 12H3"
                          stroke="#fff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:ms-4">
                    Log in
                  </span>
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="group relative inline-flex items-center overflow-hidden rounded-full bg-pink-500 px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
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
                      Cart
                    </span>
                  </a>
                </div>
              </div>

              <div className="block lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="">
          <nav className="fixed top-16 left-0 w-full bg-[#ffffffa2] backdrop-blur-sm shadow-md lg:hidden transition-all duration-200">
            <ul className="flex flex-col items-start p-4 space-y-4">
              {/* home */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg rounded-lg p-3 w-full transition ${
                      isActive
                        ? "bg-sky-500 text-white font-semibold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    } `
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* about */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-lg rounded-lg p-3 transition ${
                      isActive
                        ? "bg-sky-500 text-white font-semibold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    } `
                  }
                >
                  About
                </NavLink>
              </li>

              {/* products */}
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-lg rounded-lg p-3 transition ${
                      isActive
                        ? "bg-sky-500 text-white font-semibold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    } `
                  }
                >
                  Products
                </NavLink>
              </li>

              {/* courses */}
              <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    `text-lg rounded-lg p-3 transition ${
                      isActive
                        ? "bg-sky-500 text-white font-semibold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    } `
                  }
                >
                  Courses
                </NavLink>
              </li>

              {/* contact */}
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-lg rounded-lg p-3 transition ${
                      isActive
                        ? "bg-sky-500 text-white font-semibold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    } `
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
