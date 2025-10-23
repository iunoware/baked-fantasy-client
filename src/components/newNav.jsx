/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  NotebookText,
  GraduationCap,
  Menu,
  CakeSlice,
  House,
  Users,
  Book,
  Phone,
} from "lucide-react";

export default function NewNav() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setOpen(false);
    setOpen2(false);
  }, [location]);

  const openRegisterFromLogin = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };
  const openLoginFromRegister = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="w-screen">
        <nav className="bg-white shadow-xl h-18 fixed top-0 left-0 w-screen z-50 px-15 hidden lg:block md:hidden ">
          <div className="flex h-18 items-center justify-between">
            {/* logo */}
            <div className="md:flex md:items-center md:gap-12">
              <Link
                to="/"
                className="text-pink-500 inline-block [@media(max-width:440px)]:text-xs [@media(max-width:1180px)]:text-md [@media(max-width:1220px)]:text-xl text-2xl font-bold brand-name"
              >
                The Backed Fantasy
              </Link>
            </div>
            {/* navbar */}
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm text-black">
                  {/* Home */}
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-pink-500 font-semibold text-white"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      Home
                      <span className=" absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-pink-500 transition-all duration-300 group-hover:w-[90%]"></span>
                    </NavLink>
                  </li>

                  {/* about us */}
                  <li className="">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-pink-500 text-white font-semibold"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      About
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-pink-500 transition-all duration-300 group-hover:w-[90%]"></span>
                      {/* <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 origin-center rounded-xl bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span> */}
                    </NavLink>
                  </li>

                  {/* products */}
                  {/* <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-pink-500 text-white font-semibold"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      Products
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-pink-500 transition-all duration-300 group-hover:w-[90%]"></span>
                    </NavLink>
                  </li> */}
                  <li>
                    <div
                      className="relative inline-flex"
                      onMouseEnter={() => setOpen2(true)}
                      onMouseLeave={() => setOpen2(false)}
                    >
                      <span className="inline-flex overflow-hidden ">
                        <NavLink
                          id="parent-container"
                          to="/categories"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen2((prev) => !prev);
                          }}
                          className={({ isActive }) =>
                            `flex items-center gap-2 text-lg relative group rounded-lg p-3 transition focus:relative ${
                              isActive
                                ? "bg-pink-500 text-white font-semibold"
                                : "hover:text-black text-gray-800 "
                            } `
                          }
                        >
                          Shop <ChevronDown size={15} />
                        </NavLink>
                      </span>
                      {open2 && (
                        <div
                          id="menu"
                          role="menu"
                          className="absolute end-0 top-12 z-auto w-45 rounded-2xl overflow-hidden border border-gray-300 bg-white shadow-sm"
                        >
                          <Link
                            to="/categories"
                            className="block text-center px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-sky-50 hover:text-gray-900"
                            role="menuitem"
                          >
                            <div className="flex items-center gap-2">
                              <CakeSlice size={19} />
                              Bakery
                            </div>
                          </Link>

                          <Link
                            to="/ess-categories"
                            className="block text-center px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-sky-50 hover:text-gray-900"
                            role="menuitem"
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                fill="#000000"
                                className="size-6"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 470.083 470.083"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                enable-background="new 0 0 470.083 470.083"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <path d="m338.709,216.081c29.87,0 59.658-13.339 83.876-37.555 22.296-22.297 38.629-52.115 44.811-81.809 6.714-32.248 0.748-59.67-16.797-77.216-12.718-12.717-30.921-19.439-52.642-19.439-35.794-1.16573e-15-77.55,18.628-106.38,47.457-18.993,18.994-31.37,41.517-35.793,65.133-3.83,20.451-1.314,40.824 7.067,58.077l-244.317,207.224c-1.153,0.978-2.198,1.937-3.192,2.932-20.368,20.368-20.368,53.51 0,73.878 9.867,9.866 22.985,15.3 36.939,15.3 13.954,0 27.072-5.434 36.941-15.303 1.001-1.002 1.958-2.046 2.927-3.188l207.229-244.323c11.918,5.793 25.387,8.831 39.331,8.832zm-46.858-23.148l-211.143,248.939c-0.703,0.829-1.389,1.577-2.095,2.283-7.034,7.034-16.385,10.907-26.332,10.907-9.947,0-19.299-3.873-26.333-10.907-14.52-14.52-14.52-38.145 0.001-52.665 0.701-0.701 1.448-1.387 2.285-2.096l248.932-211.138c2.776-2.355 3.461-6.365 1.621-9.508-19.26-32.913-9.856-77.368 23.397-110.622 26.16-26.161 63.753-43.064 95.772-43.064 17.655,0 32.191,5.203 42.034,15.047 13.851,13.85 18.368,36.419 12.72,63.551-5.602,26.908-20.448,53.975-40.732,74.259-21.387,21.387-47.407,33.163-73.269,33.162-13.516-0.001-26.431-3.379-37.352-9.77-3.141-1.838-7.15-1.153-9.506,1.622z"></path>{" "}
                                    <path d="m304.682,153.596c-5.268-9.001-6.925-20.601-4.666-32.66 2.746-14.662 10.831-29.046 23.382-41.597 16.022-16.021 38.139-28.199 59.161-32.576 11.962-2.491 22.582-2.276 29.9,0.603 3.855,1.516 8.209-0.38 9.725-4.234 1.517-3.854-0.38-8.209-4.234-9.725-10.149-3.992-23.445-4.45-38.447-1.329-23.768,4.948-48.706,18.651-66.711,36.654-14.698,14.699-24.215,31.796-27.52,49.442-2.923,15.609-0.628,30.879 6.463,42.998 1.396,2.384 3.904,3.713 6.48,3.713 1.287,0 2.591-0.331 3.781-1.027 3.574-2.092 4.778-6.687 2.686-10.262z"></path>{" "}
                                    <path d="m390.764,146.705c-12.549,12.55-26.932,20.635-41.594,23.38-4.071,0.763-6.754,4.682-5.991,8.753 0.676,3.604 3.824,6.12 7.363,6.12 0.458,0 0.923-0.042 1.39-0.129 17.646-3.305 34.742-12.82 49.439-27.517 2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.677-2.928-10.607-2.84217e-14z"></path>{" "}
                                    <path d="m68.407,421.599c-3.157-2.683-7.89-2.295-10.572,0.859-0.16,0.188-0.307,0.354-0.436,0.483-2.822,2.821-7.415,2.823-10.238,0-2.822-2.822-2.822-7.415 0-10.237 0.133-0.133 0.296-0.278 0.481-0.435 3.159-2.68 3.547-7.412 0.868-10.571-2.679-3.157-7.412-3.546-10.571-0.868-0.514,0.437-0.98,0.862-1.385,1.268-8.67,8.671-8.67,22.78 0,31.451 4.335,4.334 10.029,6.502 15.724,6.502 5.696,0 11.394-2.169 15.732-6.508 0.397-0.397 0.82-0.859 1.256-1.372 2.682-3.157 2.298-7.89-0.859-10.572z"></path>{" "}
                                    <path d="m47.498,178.526c18.992,18.991 41.514,31.367 65.131,35.789 20.448,3.828 40.821,1.313 58.074-7.067l5.986,7.059c1.483,1.749 3.597,2.648 5.724,2.648 1.714,0 3.438-0.584 4.847-1.78 3.159-2.679 3.548-7.412 0.869-10.571l-9.897-11.67c-2.354-2.776-6.363-3.461-9.507-1.622-32.914,19.26-77.369,9.857-110.62-23.393-20.285-20.284-35.131-47.352-40.733-74.26-5.648-27.131-1.131-49.7 12.719-63.551 13.849-13.848 36.417-18.361 63.547-12.716 26.909,5.603 53.975,20.449 74.259,40.734 33.254,33.254 42.656,77.709 23.396,110.621-1.839,3.143-1.155,7.152 1.622,9.508l14.085,11.947c3.159,2.68 7.892,2.29 10.571-0.868 2.679-3.159 2.291-7.892-0.868-10.571l-9.473-8.034c8.382-17.252 10.897-37.625 7.067-58.076-4.423-23.616-16.8-46.139-35.793-65.133-22.296-22.297-52.114-38.63-81.808-44.812-32.246-6.713-59.668-0.75-77.211,16.793-17.546,17.545-23.512,44.967-16.798,77.215 6.181,29.695 22.514,59.513 44.811,81.81z"></path>{" "}
                                    <path d="m451.551,377.955l-155.554-131.937c-3.16-2.682-7.893-2.29-10.571,0.868-2.68,3.159-2.29,7.892 0.868,10.571l155.555,131.938c0.836,0.708 1.583,1.394 2.284,2.096 14.521,14.52 14.521,38.145 0,52.664-14.517,14.52-38.144,14.521-52.66,0.003-0.703-0.703-1.391-1.453-2.101-2.289l-128.942-152.025c-2.678-3.157-7.411-3.547-10.571-0.868-3.158,2.68-3.548,7.412-0.868,10.571l128.944,152.026c0.977,1.15 1.934,2.192 2.928,3.188 10.185,10.184 23.562,15.275 36.938,15.275 13.378,0 26.755-5.092 36.939-15.275 20.368-20.369 20.368-53.511 0-73.879-0.995-0.993-2.039-1.952-3.189-2.927z"></path>{" "}
                                    <path d="m43.11,47.919c-3.855-1.517-8.208,0.38-9.725,4.234-3.992,10.151-4.452,23.446-1.328,38.447 4.949,23.77 18.651,48.708 36.654,66.711 14.698,14.698 31.795,24.214 49.442,27.52 4.423,0.828 8.817,1.237 13.122,1.237 10.886,0 21.191-2.618 29.875-7.699 3.575-2.092 4.778-6.686 2.687-10.261-2.093-3.576-6.687-4.778-10.261-2.687-9.002,5.268-20.602,6.924-32.662,4.665-14.662-2.746-29.046-10.831-41.597-23.383-16.021-16.02-28.198-38.136-32.575-59.16-2.491-11.962-2.276-22.581 0.602-29.9 1.517-3.853-0.379-8.208-4.234-9.724z"></path>{" "}
                                    <path d="m177.427,127.053c0.458,0 0.922-0.042 1.389-0.129 4.071-0.763 6.754-4.682 5.992-8.753-3.305-17.646-12.82-34.742-27.517-49.439-2.929-2.928-7.678-2.929-10.606,0.001-2.929,2.929-2.929,7.678 0,10.606 12.549,12.549 20.634,26.932 23.379,41.594 0.674,3.605 3.824,6.12 7.363,6.12z"></path>{" "}
                                    <path d="m412.693,422.953c-0.134-0.135-0.281-0.301-0.441-0.489-2.679-3.157-7.41-3.546-10.571-0.868-3.159,2.68-3.548,7.412-0.868,10.571 0.432,0.508 0.854,0.97 1.265,1.383 4.336,4.335 10.03,6.503 15.726,6.503 5.694,0 11.39-2.168 15.726-6.503 8.671-8.672 8.671-22.78 0-31.452-0.405-0.404-0.87-0.83-1.385-1.267-3.16-2.678-7.893-2.29-10.571,0.868-2.679,3.159-2.291,7.892 0.868,10.571 0.185,0.156 0.348,0.302 0.48,0.435 2.823,2.822 2.823,7.415 0,10.237-2.823,2.823-7.416,2.822-10.229,0.011z"></path>{" "}
                                  </g>{" "}
                                </g>
                              </svg>
                              Equipments
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>

                  <li>
                    <div
                      className="relative inline-flex"
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                      // onClick={() => setOpen((prev) => !prev)}
                    >
                      <span className="inline-flex overflow-hidden ">
                        <NavLink
                          id="parent-container"
                          to="/courses"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen((prev) => !prev);
                          }}
                          className={({ isActive }) =>
                            `flex items-center gap-2 text-lg relative group rounded-lg p-3 transition focus:relative ${
                              isActive
                                ? "bg-pink-500 text-white font-semibold"
                                : "hover:text-black text-gray-800 "
                            } `
                          }
                        >
                          Course
                          <ChevronDown size={15} />
                        </NavLink>
                      </span>
                      {open && (
                        <div
                          id="menu"
                          role="menu"
                          className="absolute end-0 top-12 z-auto w-45 rounded-2xl overflow-hidden border border-gray-300 bg-white shadow-sm"
                        >
                          <Link
                            to="/courses"
                            className="block text-center px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-gray-900"
                            role="menuitem"
                          >
                            <div className="flex items-center gap-2">
                              <NotebookText size={19} />
                              Courses
                            </div>
                          </Link>

                          <Link
                            to="/courses/my-learning/"
                            className="block text-center px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-pink-50 hover:text-gray-900"
                            role="menuitem"
                          >
                            <div className="flex items-center gap-2">
                              <GraduationCap size={19} />
                              My Learnings
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </li>

                  {/* contact */}
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-pink-500 text-white font-semibold"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      Contact
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-pink-500 transition-all duration-300 group-hover:w-[90%]"></span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="searchBar">
              <search className="px-5 py-2.5 bg-pink-100 rounded-2xl font-medium text-pink-600  flex items-center">
                <label htmlFor="search">
                  <Search size={20} />
                </label>
                <input
                  type="search"
                  id="search"
                  placeholder="search cakes"
                  className="border-none w-70 bg-pink-100 rounded-2xl focus:outline-none pl-3 "
                />
              </search>
            </div>
            <div className="flex items-center gap-4">
              <div className="sm:flex rounded-2xl p-1 bg-pink-100 sm:gap-4">
                <div className="hidden sm:flex">
                  <Link
                    className=" px-5 cursor-pointer py-2.5 text-sm font-medium text-pink-600"
                    to="/cart"
                  >
                    <ShoppingCart size={20} />
                  </Link>
                </div>
                <Link
                  className=" px-5 py-2.5 cursor-pointer text-sm font-medium text-pink-600"
                  // onClick={() => setLoginOpen(true)}
                  to="/profile"
                >
                  <User size={20} />
                </Link>
              </div>

              {/* Overlay
              {isLoginOpen && (
                <div
                  className="fixed inset-0 bg-white/60 bg-opacity-50 z-40"
                  onClick={() => setLoginOpen(false)}
                ></div>
              )} */}
            </div>
          </div>
        </nav>
        <nav className="block md:block shadow-lg lg:hidden z-50 fixed top-0 left-0 w-full h-35 bg-pink-50">
          <div className="flex justify-between pt-4 pl-3">
            <div className="logo flex items-center">
              <Link to="/" className="text-pink-500 text-xl font-bold brand-name">
                The Backed Fantasy
              </Link>
            </div>
            <div className="links flex items-center gap-8 mr-5">
              <div className="bg-pink-200 flex items-center gap-6 rounded-2xl p-3 px-5">
                <Link to="/cart">
                  <ShoppingCart size={20} />
                </Link>
                <a onClick={() => setLoginOpen(true)}>
                  <User size={20} />
                </a>
              </div>
              <div className="menu">
                <Menu size={24} onClick={() => setMenuOpen(true)} />
              </div>
            </div>
          </div>
          <div className="searchBar pt-5 mx-5">
            <search className="px-5 py-2.5 bg-pink-200 text-pink-600 rounded-2xl flex items-center">
              <label htmlFor="search">
                <Search size={20} />
              </label>
              <input
                type="search"
                id="search"
                placeholder="search cakes"
                className="border-none w-full font-medium text-pink-600 bg-pink-200 rounded-2xl   focus:outline-none pl-3"
              />
            </search>
          </div>
        </nav>
        {/* sideBar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${menuOpen ? "-translate-x-0" : "translate-x-full"}`}
        >
          <button className="p-4 text-xl" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
          <nav className="p-4">
            <ul className="space-y-4">
              {/* #0084d1 sky-600 color */}
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1 justify-start items-center"
                >
                  <House color="#0084d1" size={15} />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1 justify-start items-center"
                >
                  <Users color="#0084d1" size={15} />
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1 justify-start items-center"
                >
                  <ShoppingCart size={15} color="#0084d1" />
                  Shop
                </Link>
              </li>
              <li className="rounded-lg">
                <Link
                  to="/categories"
                  onClick={() => setMenuOpen(false)}
                  className="ml-4"
                >
                  • Bakery
                </Link>
              </li>
              <li className="rounded-lg">
                <Link
                  to="/ess-categories"
                  onClick={() => setMenuOpen(false)}
                  className="ml-4"
                >
                  • Equipments
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1 justify-start items-center"
                >
                  <Book size={15} color="#0084d1" />
                  Course
                </Link>
              </li>
              <li className="rounded-lg">
                <Link to="/courses" onClick={() => setMenuOpen(false)} className="ml-4">
                  • Courses
                </Link>
              </li>
              <li className="rounded-lg">
                <Link
                  to="/courses/my-learning/"
                  onClick={() => setMenuOpen(false)}
                  className="ml-4"
                >
                  • My Learning
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex gap-1 justify-start items-center"
                >
                  <Phone size={15} color="#0084d1" />
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-white/60 backdrop-blur-sm bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </header>
      <Login
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={openRegisterFromLogin}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenLogin={openLoginFromRegister}
      />
    </>
  );
}
