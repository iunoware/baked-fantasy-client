import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header className="bg-[#ffffffa2] backdrop-blur-sm fixed w-full top-0 shadow-lg">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link to="/" className="block text-sky-600 text-xl">
                THE BACKED FANTASY
              </Link>
            </div>

            {/* Home */}
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-500 transition hover:text-black text-lg hover:bg-sky-300 rounded-lg p-3"
                    >
                      Home
                    </Link>
                  </li>

                  {/* about us */}
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-500 transition hover:text-black text-lg hover:bg-sky-300 rounded-lg p-3"
                    >
                      About
                    </Link>
                  </li>

                  {/* products */}
                  <li>
                    <Link
                      to="/products"
                      className="text-gray-500 transition hover:text-black text-lg hover:bg-sky-300 rounded-lg p-3"
                    >
                      Products
                    </Link>
                  </li>

                  {/* courses */}
                  <li>
                    <Link
                      to="/courses"
                      className="text-gray-500 transition hover:text-black text-lg hover:bg-sky-300 rounded-lg p-3"
                    >
                      Courses
                    </Link>
                  </li>

                  {/* contact */}
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-500 transition hover:text-black text-lg hover:bg-sky-300 rounded-lg p-3"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <a
                  className="rounded-md bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  href="#"
                >
                  Login
                </a>

                <div className="hidden sm:flex">
                  <a
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-sky-600"
                    href="#"
                  >
                    Register
                  </a>
                </div>
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

export default Navbar;
