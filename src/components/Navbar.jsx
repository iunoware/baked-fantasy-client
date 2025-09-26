import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { ShoppingCart } from "lucide-react";

// function Navbar() {
//   let [isMenuOpen, setIsMenuOpen] = useState(false);

//   // import gsap from "gsap";
//   // import { useGSAP } from "@gsap/react";
//   // import { ScrollTrigger } from "gsap/all";
//   // import { useRef } from "react";

//   // gsap.registerPlugin(ScrollTrigger);
// }

function Navbar() {
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

  // const scrollRef = useRef();

  // useGSAP(() => {
  //   gsap.fromTo(
  //     "#brand",
  //     {
  //       x: 1550,
  //       y: 500,
  //       borderRadius: "0%",
  //       rotation: 0,
  //       fontSize: "3800%",
  //       // color: "red",
  //     },
  //     {
  //       rotation: 360,
  //       duration: 3,
  //       fontSize: "200%",
  //       borderRadius: "100%",
  //       ease: "slow",
  //       // repeat: -1,
  //       // yoyo: true,
  //       // color: "blue",
  //     }
  //   );
  // }, []);

  return (
    <>
      <header className="w-full absolute z-50">
        <div className="mx-auto max-w-screen-xl flex justify-center p-4 sm:px-6 lg:px-8 mt-[-10px]">
          {/* brand name */}
          <div className="mr-10 absolute [@media(max-width:440px)]:left-7 left-10 top-4 z-50 md:gap-12">
            <Link
              to="/"
              className="text-pink-500 inline-block [@media(max-width:440px)]:text-xs [@media(max-width:1120px)]:text-md [@media(max-width:1220px)]:text-xl text-2xl font-bold brand-name"
            >
              The Backed Fantasy
            </Link>
          </div>

          {/* navbar */}
          <div className="flex h-16 fixed top-4 md:items-center md:justify-center pb-5 w-full ">
            <div className="hidden lg:block top-2 left-1/2 transform-all duration-200  bg-white rounded-xl p-2 px-[8px] shadow-xl z-40 sm:w-[80%] md:w-auto">
              <nav aria-label="Global">
                <ul className="flex items-center justify-center gap-6 text-sm text-black">
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
                      <span className="absolute left-1 bottom-0 h-[3px] rounded-xl w-0 bg-sky-500 transition-all duration-300 group-hover:w-[90%]"></span>
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
                    <NavLink
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
                    </NavLink>
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

                  {/* login */}
                  <li>
                    <button
                      className="group relative inline-flex items-center overflow-hidden cursor-pointer rounded-full bg-pink-400 px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
                      onClick={() => setLoginOpen(true)}
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
                              d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M11 16L15 12M15 12L11 8M15 12H3"
                              stroke="#fff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                        </svg>
                      </span>

                      <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Log in
                      </span>
                    </button>
                  </li>

                  {/* cart */}
                  <li>
                    <div className="hidden sm:flex">
                      <NavLink
                        className="inline-flex items-center overflow-hidden rounded-full px-8 py-3 border-2 text-pink-500 focus:ring-3 focus:outline-hidden mr-1"
                        to="/cart"
                      >
                        <span className="absolute -start-full transition-all group-hover:start-4"></span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                          <ShoppingCart
                            strokeWidth={1.75}
                            absoluteStrokeWidth
                            size={15}
                          />
                        </span>
                      </NavLink>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>

            {/* login and Register */}
            <div className="flex items-center p-4 px-2 rounded-2xl gap-4 m-5 z-50">
              {/* <div className="sm:flex sm:gap-4 "></div> */}

              {/* login and cart button for mobile screen */}
              <div className="inline-block absolute right-15 top-0 -translate-y-2 sm:inline-block md:inline-block lg:hidden">
                <ul className="flex">
                  {/* cart */}
                  <li>
                    <div className="">
                      <button className="inline-flex items-center overflow-hidden rounded-full px-8 py-3 border-2 text-pink-500 focus:ring-3 focus:outline-hidden mr-1">
                        <span className="absolute -start-full transition-all group-hover:start-4"></span>

                        <span className="text-sm font-medium transition-all group-hover:ms-4">
                          <ShoppingCart size={15} />
                        </span>
                      </button>
                    </div>
                  </li>

                  <li>
                    <a
                      onClick={() => setLoginOpen(true)}
                      className="group relative inline-flex items-center overflow-hidden [@media-(max-width:450px)]:px-6 [@media-(max-width:450px)]:p-2 rounded-full bg-pink-400 px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
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
                              d="M15 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H15M11 16L15 12M15 12L11 8M15 12H3"
                              stroke="#fff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                        </svg>
                      </span>

                      <span className="text-sm font-medium transition-all group-hover:ms-4">
                        Log in
                      </span>
                    </a>
                  </li>
                </ul>

                {/* login */}
              </div>

              {/* burger button */}
              <div className="block lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="rounded-sm sm:-translate-y-9 -translate-y-10 md:-translate-y-7 [@media(max-width:1017px)]:absolute [@media(max-width:1017px)]:right-3 bg-sky-500 p-2 text-white "
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

          {/* <div></div> */}
        </div>
      </header>

      {/* {isMenuOpen && (
        <div className="">
          <nav className="fixed z-50 top-16 left-0 w-full mt-10 bg-[#ffffffa2] backdrop-blur-sm shadow-md lg:hidden transition-all duration-200">
            <ul className="flex flex-col items-start p-4 space-y-4">
              
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
      )} */}

      {isMenuOpen && (
        <div>
          {/* Overlay */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          ></div>

          <nav
            className={`fixed flex flex-col justify-between z-50 top-0 right-0 h-screen w-64 bg-[#f7f7f7] backdrop-blur-md shadow-lg transform transition-transform duration-300 lg:hidden ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <ul className="flex flex-col items-start p-6 space-y-4">
              {/* home */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg rounded-lg p-3 w-full transition ${
                      isActive
                        ? "text-sky-500 font-bold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    }`
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
                    `text-lg rounded-lg p-3 w-full transition ${
                      isActive
                        ? "text-sky-500 font-bold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    }`
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
                    `text-lg rounded-lg p-3 w-full transition ${
                      isActive
                        ? "text-sky-500 font-bold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    }`
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
                    `text-lg rounded-lg p-3 w-full transition ${
                      isActive
                        ? "text-sky-500 font-bold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    }`
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
                    `text-lg rounded-lg p-3 w-full transition ${
                      isActive
                        ? "text-sky-500 font-bold"
                        : "hover:text-black text-black hover:bg-sky-200"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
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

export default Navbar;
