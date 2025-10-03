import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
} from "lucide-react";

export default function NewNav() {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
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
                  <li className="">
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

                  <li>
                    <div
                      className="relative inline-flex"
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      <span className="inline-flex overflow-hidden ">
                        <NavLink
                          id="parent-container"
                          to="/courses"
                          className={({ isActive }) =>
                            `flex items-center gap-2 text-lg relative group rounded-lg p-3 transition focus:relative ${
                              isActive
                                ? "bg-sky-500 text-white font-semibold"
                                : "hover:text-black text-gray-800 "
                            } `
                          }
                        >
                          Course <ChevronDown size={15} />
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
                            className="block text-center px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-sky-50 hover:text-gray-900"
                            role="menuitem"
                          >
                            <div className="flex items-center gap-2">
                              <NotebookText size={19} />
                              Courses
                            </div>
                          </Link>

                          <a
                            href="#"
                            className="block text-center px-3 py-2 text-lg font-medium text-gray-700 transition-colors hover:bg-sky-50 hover:text-gray-900"
                            role="menuitem"
                          >
                            <div className="flex items-center gap-2">
                              <GraduationCap size={19} />
                              My Learnings
                            </div>
                          </a>
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
                <a
                  className=" px-5 py-2.5 cursor-pointer text-sm font-medium text-pink-600"
                  onClick={() => setLoginOpen(true)}
                >
                  <User size={20} />
                </a>
              </div>

              {/* <div className="block md:hidden">
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
              </div> */}
            </div>
          </div>
        </nav>
        <nav className="block md:block lg:hidden z-50 fixed top-0 left-0 w-full h-35 bg-pink-50">
          <div className="flex justify-between pt-4 pl-3">
            <div className="logo flex items-center">
              <Link
                to="/"
                className="text-pink-500 text-xl font-bold brand-name"
              >
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
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/categories" onClick={() => setMenuOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/courses" onClick={() => setMenuOpen(false)}>
                  Course
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-white/60 bg-opacity-50 z-40"
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
