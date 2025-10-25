/* eslint-disable no-unused-vars */
import {
  Settings,
  ChartColumn,
  GraduationCap,
  ShoppingCart,
  Cake,
  Users,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

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
              className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-pink-500`}
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
                  className={`flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors`}
                  // className={({ isActive }) =>
                  //   `${
                  //     isActive ? "bg-sky-50" : ""
                  //   } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors`
                  // }
                >
                  {({ isActive }) => (
                    <>
                      <ChartColumn
                        size={20}
                        className={`shrink-0 ${
                          isActive ? "text-pink-600" : "text-gray-500"
                        }`}
                        strokeWidth={`${isActive ? 2 : 3}`}
                      />
                      <span
                        className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                          isActive ? "text-pink-500" : "text-gray-800"
                        }`}
                      >
                        Dashboard
                      </span>
                    </>
                  )}
                </NavLink>
              </div>

              <ul className="space-y-1 border-t border-gray-300 pt-4">
                <li>
                  <NavLink
                    to={`/admin/courses`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-pink-50" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <GraduationCap
                          size={20}
                          className={`shrink-0 ${
                            isActive ? "text-pink-600" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                            isActive ? "text-pink-500" : "text-gray-800"
                          }`}
                        >
                          Courses
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={`/admin/products`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-pink-50" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <ShoppingCart
                          size={20}
                          className={`shrink-0 ${
                            isActive ? "text-pink-600" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                            isActive ? "text-pink-500" : "text-gray-800"
                          }`}
                        >
                          Products
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={`/admin/cakes`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-pink-50" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Cake
                          size={20}
                          className={`shrink-0 ${
                            isActive ? "text-pink-600" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                            isActive ? "text-pink-500" : "text-gray-800"
                          }`}
                        >
                          Cakes
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={`/admin/orders`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-pink-50" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Users
                          size={20}
                          className={`shrink-0 ${
                            isActive ? "text-pink-600" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                            isActive ? "text-pink-500" : "text-gray-800"
                          }`}
                        >
                          Orders
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={`/admin/settings`}
                    // className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-pink-50" : ""
                      } flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Settings
                          size={20}
                          className={`shrink-0 ${
                            isActive ? "text-pink-600" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                            isActive ? "text-pink-500" : "text-gray-800"
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
          <NavLink
            to={`/admin`}
            className="flex items-center gap-3 rounded-md px-2 py-2 text-gray-700 hover:bg-pink-50 transition-colors"
          >
            {({ isActive }) => (
              <>
                <LogOut
                  size={20}
                  className={`shrink-0 ${isActive ? "text-pink-600" : "text-gray-500"}`}
                />
                <span
                  className={`text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                    isActive ? "text-pink-500" : "text-gray-800"
                  }`}
                >
                  LogOut
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
