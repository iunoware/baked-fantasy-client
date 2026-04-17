/* eslint-disable no-unused-vars */
import {
  Megaphone,
  Settings,
  ChartColumn,
  GraduationCap,
  ShoppingCart,
  Cake,
  Users,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import api from "../api";

function Sidebar() {
  let location = useLocation();

  return (
    <>
      <div className="fixed z-50 flex h-screen w-16 flex-col group hover:w-45 justify-between shadow-xl border-r border-gray-300 bg-white transition-all duration-300">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            {/* <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              L
            </span> */}
            <img src="/images/baked-fantasy-logo.png" alt="" className="h-15" />
            {/* <span
              className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap new-primary-text`}
            >
              <span className="text-sm">Baked </span>
              <span className="text-sm">Fantasy</span>
            </span> */}
          </div>

          <div className="border-t border-gray-300">
            <div className="px-2">
              <div className="py-4">
                <NavLink
                  to={`/admin`}
                  className={`flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`}
                // className={({ isActive }) =>
                //   `${isActive ? "bg-pbrown/10" : ""} flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`
                // }
                >
                  {({ isActive }) => (
                    <>
                      <ChartColumn
                        size={20}
                        className={`shrink-0 ${isActive ? "new-primary-text" : "text-gray-500"
                          }`}
                        strokeWidth={`${isActive ? 2 : 3}`}
                      />
                      <span
                        className={`text-lg pointer-events-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive ? "new-primary-text" : "text-gray-800"
                          }`}
                      >
                        Dashboard
                      </span>
                    </>
                  )}
                </NavLink>
              </div>

              <ul className="space-y-1 border-t border-gray-300 pt-4">
                {/* courses */}
                <li>
                  <NavLink
                    to={`/admin/courses`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${isActive ? "bg-pbrown/10" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <GraduationCap
                          size={20}
                          className={`shrink-0 ${isActive ? "new-primary-text" : "text-gray-500"
                            }`}
                        />
                        <span
                          className={`text-lg pointer-events-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive ? "new-primary-text" : "text-gray-800"
                            }`}
                        >
                          Courses
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                {/* products */}
                <li>
                  <NavLink
                    to={`/admin/essentials`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${isActive ? "bg-pbrown/10" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <ShoppingCart
                          size={20}
                          className={`shrink-0 ${isActive ? "new-primary-text" : "text-gray-500"
                            }`}
                        />
                        <span
                          className={`text-lg pointer-events-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive ? "new-primary-text" : "text-gray-800"
                            }`}
                        >
                          Products
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                {/* cakes */}
                <li>
                  <NavLink
                    to={`/admin/cakes`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${isActive ? "bg-pbrown/10" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Cake
                          size={20}
                          className={`shrink-0 ${isActive ? "new-primary-text" : "text-gray-500"
                            }`}
                        />
                        <span
                          className={`text-lg pointer-events-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive ? "new-primary-text" : "text-gray-800"
                            }`}
                        >
                          Cakes
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                {/* orders */}
                <li>
                  <NavLink
                    to={`/admin/orders`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${isActive ? "bg-pbrown/10" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Users
                          size={20}
                          className={`shrink-0 ${isActive ? "new-primary-text" : "text-gray-500"
                            }`}
                        />
                        <span
                          className={`text-lg pointer-events-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive ? "new-primary-text" : "text-gray-800"
                            }`}
                        >
                          Orders
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                {/* banner */}
                <li>
                  <NavLink
                    to={`/admin/banner`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${isActive ? "bg-pbrown/10" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Megaphone
                          size={20}
                          className={`shrink-0 ${isActive ? "new-primary-text" : "text-gray-500"
                            }`}
                        />
                        <span
                          className={`text-lg pointer-events-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive ? "new-primary-text" : "text-gray-800"
                            }`}
                        >
                          Banner
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                {/* settings */}
                <li>
                  <NavLink
                    to={`/admin/settings`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${isActive ? "bg-pbrown/10" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pbrown/10 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Settings
                          size={20}
                          className={`shrink-0 ${isActive ? "new-primary-text" : "text-gray-500"
                            }`}
                        />
                        <span
                          className={`text-lg pointer-events-none font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${isActive ? "new-primary-text" : "text-gray-800"
                            }`}
                        >
                          Settings
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <button
            onClick={() => {
              sessionStorage.removeItem("token");
              // Also clear localStorage just in case it was used elsewhere
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/admin-login";
            }}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut
              size={20}
              className="shrink-0 text-gray-500 group-hover:text-red-500 transition-colors"
            />
            <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Logout Session
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
