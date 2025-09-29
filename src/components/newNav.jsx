import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { ShoppingCart, User, Search, ChevronDown } from "lucide-react";

export default function newNav() {
  function openCourse() {
    let menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
  }
  return (
    <>
      <header className="bg-white h-18 fixed top-0 left-0 w-screen z-50">
        <div className="mx-13">
          <div className="flex h-18 items-center justify-between">
            {/* logo */}
            <div className="md:flex md:items-center md:gap-12">
              <Link
                to="/"
                className="text-pink-500 inline-block [@media(max-width:440px)]:text-xs [@media(max-width:1120px)]:text-md [@media(max-width:1220px)]:text-xl text-2xl font-bold brand-name"
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
                            ? "bg-sky-500 font-semibold text-white"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      Home
                      <span className=" absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span>
                    </NavLink>
                  </li>

                  {/* about us */}
                  <li className="w-fit">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-sky-500 text-white font-semibold"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      About
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span>
                      {/* <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 origin-center rounded-xl bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span> */}
                    </NavLink>
                  </li>

                  {/* products */}
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-sky-500 text-white font-semibold"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      Products
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span>
                    </NavLink>
                  </li>

                  {/* courses */}
                  <li>
                    {/* <NavLink
                      to="/courses"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-sky-500 text-white font-semibold"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      Courses
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span>
                    </NavLink> */}
                    <div className="relative inline-flex">
                      <span className="inline-flex overflow-hidden ">
                        <NavLink
                          to="/courses"
                          onClick={openCourse}
                          // className="text-lg relative group rounded-lg p-3 transition focus:relative"
                          className={({ isActive }) =>
                            `text-lg relative group rounded-lg p-3 transition focus:relative ${
                              isActive
                                ? "bg-sky-500 text-white font-semibold"
                                : "hover:text-black text-gray-800 "
                            } `
                          }
                        >
                          Course <ChevronDown size={15} />
                        </NavLink>

                        {/* <button
                          type="button"
                          className=" text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 focus:relative"
                          aria-label="Menu"
                          onClick={openCourse}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </button> */}
                      </span>

                      <div
                        id="menu"
                        role="menu"
                        className="hidden absolute end-0 top-12 z-auto w-56 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
                      >
                        <a
                          href="#"
                          className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                          role="menuitem"
                        >
                          Courses
                        </a>

                        <a
                          href="#"
                          className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                          role="menuitem"
                        >
                          My Learnings
                        </a>
                      </div>
                    </div>
                  </li>

                  {/* contact */}
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `text-lg relative group rounded-lg p-3 transition ${
                          isActive
                            ? "bg-sky-500 text-white font-semibold"
                            : "hover:text-black text-gray-800 "
                        } `
                      }
                    >
                      Contact
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex rounded-2xl p-1 bg-pink-100 sm:gap-4">
                <a
                  className=" px-5 py-2.5   font-medium text-pink-600 "
                  href="#"
                >
                  <Search size={20} />
                </a>

                <div className="hidden sm:flex">
                  <a
                    className=" px-5 py-2.5 text-sm font-medium text-pink-600"
                    href="#"
                  >
                    <ShoppingCart size={20} />
                  </a>
                </div>
                <a
                  className=" px-5 py-2.5 text-sm font-medium text-pink-600"
                  href="#"
                >
                  <User size={20} />
                </a>
              </div>

              <div className="block md:hidden">
                <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
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
    </>
  );
}
