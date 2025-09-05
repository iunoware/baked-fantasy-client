/* eslint-disable no-unused-vars */
import CourseCard from "@/components/CourseCard";
import { Link } from "react-router-dom";

function Courses() {
  const whyChooseUs = [
    {
      svg: (
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
              stroke="#3B82F6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      ),
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
      heading: "Flexible Online & Offline Learning",
      content: "Join in-person or attend interactive online courses from anywhere.",
    },
    {
      svg: (
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.25285 4.25547C8.09403 2.47951 9.90263 1.25 12 1.25C14.0974 1.25 15.906 2.47951 16.7471 4.25547C16.831 4.25184 16.9153 4.25 17 4.25C20.1756 4.25 22.75 6.82436 22.75 10C22.75 12.1806 21.5363 14.0762 19.75 15.0508L19.75 18.052C19.75 18.9505 19.7501 19.6997 19.6701 20.2945C19.5857 20.9223 19.4 21.4891 18.9445 21.9445C18.4891 22.4 17.9223 22.5857 17.2945 22.6701C16.6997 22.7501 15.9505 22.75 15.052 22.75H8.94801C8.04952 22.75 7.3003 22.7501 6.70552 22.6701C6.07773 22.5857 5.51093 22.4 5.05546 21.9445C4.59999 21.4891 4.41432 20.9223 4.32991 20.2945C4.24994 19.6997 4.24997 18.9505 4.25 18.052L4.25 15.0508C2.46371 14.0762 1.25 12.1806 1.25 10C1.25 6.82436 3.82436 4.25 7 4.25C7.08469 4.25 7.16899 4.25184 7.25285 4.25547ZM6.80262 5.7545C4.54704 5.85762 2.75 7.71895 2.75 10C2.75 11.7416 3.79769 13.2402 5.30028 13.8967C5.57345 14.016 5.75 14.2859 5.75 14.584V17.25H18.25L18.25 14.584C18.25 14.2859 18.4265 14.016 18.6997 13.8967C20.2023 13.2402 21.25 11.7416 21.25 10C21.25 7.71895 19.453 5.85761 17.1974 5.7545C17.2321 5.99825 17.25 6.24718 17.25 6.5V7C17.25 7.41421 16.9142 7.75 16.5 7.75C16.0858 7.75 15.75 7.41421 15.75 7V6.5C15.75 6.07715 15.6803 5.67212 15.5524 5.29486C15.0502 3.81402 13.6484 2.75 12 2.75C10.3516 2.75 8.94981 3.81402 8.44763 5.29486C8.3197 5.67212 8.25 6.07715 8.25 6.5V7C8.25 7.41421 7.91421 7.75 7.5 7.75C7.08579 7.75 6.75 7.41421 6.75 7V6.5C6.75 6.24717 6.76792 5.99825 6.80262 5.7545ZM18.2482 18.75H5.75181C5.75604 19.3194 5.77008 19.7491 5.81654 20.0946C5.87858 20.5561 5.9858 20.7536 6.11612 20.8839C6.24643 21.0142 6.44393 21.1214 6.90539 21.1835C7.38843 21.2484 8.03599 21.25 9 21.25H15C15.964 21.25 16.6116 21.2484 17.0946 21.1835C17.5561 21.1214 17.7536 21.0142 17.8839 20.8839C18.0142 20.7536 18.1214 20.5561 18.1835 20.0946C18.2299 19.7491 18.244 19.3194 18.2482 18.75Z"
              fill="#F43F5E"
            ></path>
          </g>
        </svg>
      ),
      bgColor: "bg-pink-100",
      textColor: "text-pink-500",
      heading: "Expert Chefs",
      content:
        "Learn from internationally acclaimed pastry chefs and culinary masters with decades of experience.",
    },
    {
      svg: (
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect>{" "}
            <path
              d="M42 6H6C4.89543 6 4 6.89543 4 8V34C4 35.1046 4.89543 36 6 36H42C43.1046 36 44 35.1046 44 34V8C44 6.89543 43.1046 6 42 6Z"
              stroke="#3B82F6"
              stroke-width="2.688"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 14L36 14"
              stroke="#3B82F6"
              stroke-width="2.688"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 21H18"
              stroke="#3B82F6"
              stroke-width="2.688"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 28H16"
              stroke="#3B82F6"
              stroke-width="2.688"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <circle
              cx="30"
              cy="27"
              r="6"
              fill="#"
              stroke="#3B82F6"
              stroke-width="2.688"
            ></circle>
            <path
              d="M30 40L34 42V31.4722C34 31.4722 32.8594 33 30 33C27.1406 33 26 31.5 26 31.5V42L30 40Z"
              fill="#"
              stroke="#3B82F6"
              stroke-width="2.688"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      ),
      bgColor: "bg-blue-100",
      textColor: "text-blue-500",
      heading: "Certificate of Completion",
      content:
        "Receive an industry-recognized certificate upon successful completion of your course.",
    },
    {
      svg: (
        <svg
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          stroke-width="0.00024000000000000003"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2.75C8.27208 2.75 5.25 5.77208 5.25 9.5C5.25 11.4985 6.11758 13.2934 7.49907 14.5304L7.50342 14.5343C8.06008 15.0328 8.48295 15.4114 8.78527 15.6886C9.06989 15.9495 9.29537 16.1628 9.41353 16.3086L9.42636 16.3244C9.64763 16.5974 9.84045 16.8353 9.9676 17.1199C10.0948 17.4044 10.1434 17.7067 10.1992 18.0537L10.2024 18.0738C10.231 18.2517 10.2425 18.4701 10.247 18.75H13.753C13.7575 18.4701 13.769 18.2517 13.7976 18.0738L13.8008 18.0537C13.8566 17.7067 13.9052 17.4044 14.0324 17.1199C14.1596 16.8353 14.3524 16.5974 14.5736 16.3244L14.5865 16.3086C14.7046 16.1628 14.9301 15.9495 15.2147 15.6886C15.5171 15.4114 15.94 15.0327 16.4966 14.5343L16.5009 14.5304C17.8824 13.2934 18.75 11.4985 18.75 9.5C18.75 5.77208 15.7279 2.75 12 2.75ZM13.7436 20.25H10.2564C10.2597 20.3542 10.2646 20.4453 10.2721 20.5273C10.2925 20.7524 10.3269 20.8341 10.3505 20.875C10.4163 20.989 10.511 21.0837 10.625 21.1495C10.6659 21.1731 10.7476 21.2075 10.9727 21.2279C11.2082 21.2493 11.5189 21.25 12 21.25C12.4811 21.25 12.7918 21.2493 13.0273 21.2279C13.2524 21.2075 13.3341 21.1731 13.375 21.1495C13.489 21.0837 13.5837 20.989 13.6495 20.875C13.6731 20.8341 13.7075 20.7524 13.7279 20.5273C13.7354 20.4453 13.7403 20.3542 13.7436 20.25ZM3.75 9.5C3.75 4.94365 7.44365 1.25 12 1.25C16.5563 1.25 20.25 4.94365 20.25 9.5C20.25 11.9428 19.1874 14.1384 17.5016 15.6479C16.9397 16.151 16.5234 16.5238 16.2284 16.7942C16.0809 16.9295 15.9681 17.0351 15.8849 17.1162C15.8434 17.1566 15.8117 17.1886 15.788 17.2134C15.7763 17.2256 15.7675 17.2352 15.7611 17.2423C15.7546 17.2496 15.7519 17.2529 15.7519 17.2529C15.4917 17.574 15.4354 17.6568 15.4019 17.7319C15.3683 17.8069 15.3442 17.9041 15.2786 18.3121C15.2527 18.4732 15.25 18.7491 15.25 19.5V19.5322C15.25 19.972 15.25 20.3514 15.2218 20.6627C15.192 20.9918 15.1259 21.3178 14.9486 21.625C14.7511 21.967 14.467 22.2511 14.125 22.4486C13.8178 22.6259 13.4918 22.692 13.1627 22.7218C12.8514 22.75 12.472 22.75 12.0322 22.75H11.9678C11.528 22.75 11.1486 22.75 10.8374 22.7218C10.5082 22.692 10.1822 22.6259 9.875 22.4486C9.53296 22.2511 9.24892 21.967 9.05144 21.625C8.87407 21.3178 8.80802 20.9918 8.77818 20.6627C8.74997 20.3514 8.74998 19.972 8.75 19.5322L8.75 19.5C8.75 18.7491 8.74735 18.4732 8.72144 18.3121C8.6558 17.9041 8.63166 17.8069 8.59812 17.7319C8.56459 17.6568 8.50828 17.574 8.24812 17.2529C8.24812 17.2529 8.24514 17.2493 8.23888 17.2423C8.23249 17.2352 8.22369 17.2256 8.21199 17.2134C8.18835 17.1886 8.15661 17.1566 8.11513 17.1162C8.03189 17.0351 7.91912 16.9295 7.77161 16.7942C7.4766 16.5238 7.06034 16.151 6.49845 15.6479C4.81263 14.1384 3.75 11.9428 3.75 9.5Z"
              fill="#F43F5E"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.2215 7.8897C13.5586 8.13046 13.6366 8.59887 13.3959 8.93593L12.1001 10.75H13.6427C13.9237 10.75 14.181 10.907 14.3096 11.1568C14.4382 11.4066 14.4163 11.7073 14.253 11.9359L12.1102 14.9359C11.8694 15.273 11.401 15.3511 11.0639 15.1103C10.7269 14.8695 10.6488 14.4011 10.8896 14.0641L12.1853 12.25H10.6427C10.3618 12.25 10.1044 12.093 9.97585 11.8432C9.84729 11.5934 9.86913 11.2927 10.0324 11.0641L12.1753 8.06407C12.416 7.72701 12.8844 7.64894 13.2215 7.8897Z"
              fill="#F43F5E"
            ></path>{" "}
          </g>
        </svg>
      ),
      bgColor: "bg-pink-100",
      textColor: "text-pink-500",
      heading: "Hands-on Learning",
      content:
        "Get practical experience with real kitchen equipment and techniques in our state-of-the-art facilities.",
    },
  ];

  return (
    <>
      {/* hero section */}
      <div>
        <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl flex font-semibold justify-center pt-30">
          Choose our <span className="text-orange-900">&nbsp;Learning path</span>
        </h1>
        <div className="flex justify-center">
          <p className="text-center lg:text-2xl md:text-xl sm:text-lg max-w-[600px] mx-3 text-gray-700 py-10">
            Master the art of baking with our expert-led courses designed for all skill
            levels. Whether you prefer learning online or in-person, we have the perfect
            program for you.
          </p>
        </div>
      </div>

      {/* courses online and offline */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        {/* online course */}
        <Link to="/courses/online-course" className="m-4 lg:ml-20">
          <CourseCard
            img="onlineCourse.png"
            courseGenre="Online Courses"
            courseCount="3"
            description="Learn at your own pace with our comprehensive video library taught by industry professionals."
            list1="24/7 Access"
            list2="Certificate of Completion"
            list3="Lifetime Updates"
            list4="Expert Support"
          />
        </Link>

        {/* offline course */}
        <Link to="/courses/offline-course" className="m-4 lg:mr-20">
          <CourseCard
            img="offlineCourse.png"
            courseGenre="Offline Courses"
            courseCount="4"
            description="Join our hands-on classes at our state-of-the-art facility with expert instructors."
            list1="Small class sizes"
            list2="Professional Equipment"
            list3="Hands-on practice"
            list4="Take home goodies"
          />
        </Link>
      </div>

      {/* why choose our courses */}
      <div className="py-10">
        <h2 className="text-center text-4xl font-bold mb-4 text-orange-900">
          Why Choose Our Delightful Courses?
        </h2>
        <p className="text-center text-xl text-gray-600">
          Experience world-class baking education with these exclusive benefits
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:gap-8 md:m-12 sm:m-4 m-4">
          {whyChooseUs.map((detail, index) => {
            return (
              <div
                key={index}
                className={` rounded-2xl flex flex-col place-items-center hover:shadow-xl hover:-translate-y-2 transition-all duration-200 ${detail.bgColor}`}
              >
                <div className="flex justify-center w-full pt-5">{detail.svg}</div>
                <h3
                  className={`text-2xl text-center w-full px-8 pt-5 ${detail.textColor} font-bold pb-4`}
                >
                  {detail.heading}
                </h3>
                <p className="text-center px-8 pt-5 pb-8 text-lg text-gray-700">
                  {detail.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Courses;
