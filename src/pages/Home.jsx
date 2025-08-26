import heroImage from "../assets/images/bfHero.png";
import ambassador from "../assets/images/BakedMamImage.png";

function Home() {
  return (
    <>
      {/* hero section */}
      <section
        className="overflow-hidden bg-cover bg-no-repeat h-screen grid grid-cols-1 md:grid-cols-2"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* left column */}
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 mt-35">
          <div className="text-start ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              From Oven to Heart – and From Us to Your Kitchen.
            </h2>

            <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              The Baked Fantasy brings you fresh cakes, pastries, and desserts
              made with love. Celebrate life’s moments with us—or join our
              baking courses to create your own oven-fresh treats at home.
            </p>
            <div className="flex gap-10 items-center">
              <div className="mt-4 sm:mt-8">
                <a
                  href="#"
                  className="bg-sky-500 inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-sky-700 focus:ring-3 focus:ring-white-400 focus:outline-hidden"
                >
                  Shop products
                </a>
              </div>
              <div className="mt-4 sm:mt-8">
                <a
                  href="#"
                  className="bg-pink-500 inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:ring-3 focus:ring-white-400 focus:outline-hidden"
                >
                  Explore course
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* right column */}
        <div>
          <img src={ambassador} alt="" />
        </div>
      </section>

      {/* card section */}
      <div className="flex justify-around py-10">
        <div className="card-1 text-center flex flex-col items-center">
          <svg
            width="100px"
            height="100px"
            viewBox="-10.56 -10.56 53.12 53.12"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            strokeWidth="0.096"
          >
            <defs>
              {/* Gradient definition */}
              <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsla(199, 100%, 68%, 1.00)" />
                <stop offset="50%" stopColor="hsla(332, 100%, 69%, 1.00)" />
                <stop offset="100%" stopColor="hsla(329, 31%, 75%, 1.00)" />
              </linearGradient>
            </defs>

            <g
              id="SVGRepo_bgCarrier"
              strokeWidth="0"
              transform="translate(0.8,0.8), scale(0.95)"
            >
              <rect
                x="-10.56"
                y="-10.56"
                width="53.12"
                height="53.12"
                rx="26.56"
                fill="url(#myGradient)"
                strokeWidth="0"
              />
            </g>

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.192"
            >
              <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>
            </g>
          </svg>

          <div className="pt-5">
            <h2 className="text-2xl font-bold">100+</h2>
            <p className="text-lg">Happy Students</p>
          </div>
        </div>
        <div className="card-2 text-center flex flex-col items-center">
          <svg
            width="101px"
            height="101px"
            viewBox="-5.76 -5.76 35.52 35.52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradient definition */}
              <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsla(199, 100%, 68%, 1.00)" />
                <stop offset="50%" stopColor="hsla(332, 100%, 69%, 1.00)" />
                <stop offset="100%" stopColor="hsla(329, 31%, 75%, 1.00)" />
              </linearGradient>
            </defs>
            <g id="SVGRepo_bgCarrier" stroke-width="0">
              <rect
                x="-5.76"
                y="-5.76"
                width="35.52"
                height="35.52"
                rx="17.76"
                fill="url(#myGradient)"
                strokewidth="0"
              ></rect>
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M19 18H19.75H19ZM5 14.584H5.75C5.75 14.2859 5.57345 14.016 5.30028 13.8967L5 14.584ZM19 14.584L18.6997 13.8967C18.4265 14.016 18.25 14.2859 18.25 14.584H19ZM15.75 7C15.75 7.41421 16.0858 7.75 16.5 7.75C16.9142 7.75 17.25 7.41421 17.25 7H15.75ZM6.75 7C6.75 7.41421 7.08579 7.75 7.5 7.75C7.91421 7.75 8.25 7.41421 8.25 7H6.75ZM7 4.25C3.82436 4.25 1.25 6.82436 1.25 10H2.75C2.75 7.65279 4.65279 5.75 7 5.75V4.25ZM17 5.75C19.3472 5.75 21.25 7.65279 21.25 10H22.75C22.75 6.82436 20.1756 4.25 17 4.25V5.75ZM15 21.25H9V22.75H15V21.25ZM9 21.25C8.03599 21.25 7.38843 21.2484 6.90539 21.1835C6.44393 21.1214 6.24643 21.0142 6.11612 20.8839L5.05546 21.9445C5.51093 22.4 6.07773 22.5857 6.70552 22.6701C7.31174 22.7516 8.07839 22.75 9 22.75V21.25ZM4.25 18C4.25 18.9216 4.24841 19.6883 4.32991 20.2945C4.41432 20.9223 4.59999 21.4891 5.05546 21.9445L6.11612 20.8839C5.9858 20.7536 5.87858 20.5561 5.81654 20.0946C5.75159 19.6116 5.75 18.964 5.75 18H4.25ZM18.25 18C18.25 18.964 18.2484 19.6116 18.1835 20.0946C18.1214 20.5561 18.0142 20.7536 17.8839 20.8839L18.9445 21.9445C19.4 21.4891 19.5857 20.9223 19.6701 20.2945C19.7516 19.6883 19.75 18.9216 19.75 18H18.25ZM15 22.75C15.9216 22.75 16.6883 22.7516 17.2945 22.6701C17.9223 22.5857 18.4891 22.4 18.9445 21.9445L17.8839 20.8839C17.7536 21.0142 17.5561 21.1214 17.0946 21.1835C16.6116 21.2484 15.964 21.25 15 21.25V22.75ZM7 5.75C7.2137 5.75 7.42326 5.76571 7.6277 5.79593L7.84703 4.31205C7.57021 4.27114 7.28734 4.25 7 4.25V5.75ZM12 1.25C9.68949 1.25 7.72942 2.7421 7.02709 4.81312L8.44763 5.29486C8.94981 3.81402 10.3516 2.75 12 2.75V1.25ZM7.02709 4.81312C6.84722 5.34352 6.75 5.91118 6.75 6.5H8.25C8.25 6.07715 8.3197 5.67212 8.44763 5.29486L7.02709 4.81312ZM17 4.25C16.7127 4.25 16.4298 4.27114 16.153 4.31205L16.3723 5.79593C16.5767 5.76571 16.7863 5.75 17 5.75V4.25ZM12 2.75C13.6484 2.75 15.0502 3.81402 15.5524 5.29486L16.9729 4.81312C16.2706 2.7421 14.3105 1.25 12 1.25V2.75ZM15.5524 5.29486C15.6803 5.67212 15.75 6.07715 15.75 6.5H17.25C17.25 5.91118 17.1528 5.34352 16.9729 4.81312L15.5524 5.29486ZM5.75 18V14.584H4.25V18H5.75ZM5.30028 13.8967C3.79769 13.2402 2.75 11.7416 2.75 10H1.25C1.25 12.359 2.6705 14.3846 4.69972 15.2712L5.30028 13.8967ZM18.25 14.584L18.25 18H19.75L19.75 14.584H18.25ZM21.25 10C21.25 11.7416 20.2023 13.2402 18.6997 13.8967L19.3003 15.2712C21.3295 14.3846 22.75 12.359 22.75 10H21.25ZM15.75 6.5V7H17.25V6.5H15.75ZM6.75 6.5V7H8.25V6.5H6.75Z"
                fill="#000000"
              ></path>{" "}
              <path
                d="M5 18H19"
                stroke="#000000"
                stroke-width="0.576"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <div className="pt-5">
            <h2 className="text-2xl font-bold">5+ years</h2>
            <p className="text-lg">Experience</p>
          </div>
        </div>
        <div className="card-3 text-center flex flex-col items-center">
          <svg
            width="100px"
            height="100px"
            viewBox="-5.76 -5.76 35.52 35.52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradient definition */}
              <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsla(199, 100%, 68%, 1.00)" />
                <stop offset="50%" stopColor="hsla(332, 100%, 69%, 1.00)" />
                <stop offset="100%" stopColor="hsla(329, 31%, 75%, 1.00)" />
              </linearGradient>
            </defs>
            <g id="SVGRepo_bgCarrier" stroke-width="0">
              <rect
                x="-5.76"
                y="-5.76"
                width="35.52"
                height="35.52"
                rx="17.76"
                fill="url(#myGradient)"
                strokewidth="0"
              ></rect>
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M7.96668 14.7219L7 22L11.5884 19.247C11.7381 19.1572 11.8129 19.1123 11.8928 19.0947C11.9634 19.0792 12.0366 19.0792 12.1072 19.0947C12.1871 19.1123 12.2619 19.1572 12.4116 19.247L17 22L16.0343 14.7212M19 9C19 12.866 15.866 16 12 16C8.13401 16 5 12.866 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <div className="pt-5">
            <h2 className="text-2xl font-bold">50+</h2>
            <p className="text-lg">Awards</p>
          </div>
        </div>
        <div className="card-4 text-center flex flex-col items-center ">
          <svg
            className="flex justify-center"
            width="100px"
            height="100px"
            viewBox="-5.76 -5.76 35.52 35.52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradient definition */}
              <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsla(199, 100%, 68%, 1.00)" />
                <stop offset="50%" stopColor="hsla(332, 100%, 69%, 1.00)" />
                <stop offset="100%" stopColor="hsla(329, 31%, 75%, 1.00)" />
              </linearGradient>
            </defs>
            <g id="SVGRepo_bgCarrier" stroke-width="0">
              <rect
                x="-5.76"
                y="-5.76"
                width="35.52"
                height="35.52"
                rx="17.76"
                fill="url(#myGradient)"
                strokewidth="0"
              ></rect>
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          <div className="pt-5">
            <h2 className="text-2xl font-bold">4.9/5</h2>
            <p className="text-lg">Average Rating</p>
          </div>
        </div>
      </div>
      {/* featured products */}
      <section className="feature-section">
        <h2 className="text-center text-5xl font-bold">Featured Products</h2>
        <p className="text-center text-xl pt-5">
          Handcrafted with love using premium ingredients and traditional
          techniques
        </p>
      </section>
    </>
  );
}

export default Home;
