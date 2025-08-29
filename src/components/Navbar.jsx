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
            <div className="md:flex md:items-center md:gap-12">
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
                bg-rose-200 rounded-xl p-4 px-[8px] shadow-md z-40 w-[90%] sm:w-[80%] md:w-auto"
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
                            : "hover:text-white hover:bg-sky-500 hover:font-semibold"
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
                            : "hover:text-black text-gray-500 hover:bg-sky-200"
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
                            ? "bg-cyan-500 text-white font-semibold"
                            : "hover:text-black text-gray-500 hover:bg-sky-200"
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
                            : "hover:text-black text-gray-500 hover:bg-sky-200"
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
                            : "hover:text-black text-gray-500 hover:bg-sky-200"
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
            <div className="flex items-center gap-4 m-5">
              <div className="sm:flex sm:gap-4 hover:scale-105 ">
                <a
                  className="rounded-md bg-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-700 "
                  href="#"
                >
                  Login
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-pink-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-700 hover:scale-105"
                    href="#"
                  >
                    Register
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
