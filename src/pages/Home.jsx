import Product from "../components/Products.jsx";
import Heading from "../components/Heading.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronsDown, ContrastIcon, Notebook } from "lucide-react";
import OnlineCourseCard from "../components/OnlineCourseCard.jsx";
import Modal from "../components/Modal.jsx";
import Essentials from "../components/EssProduct.jsx";
import Loading from "@/components/Loading.jsx";
// import RazorpayCheckout from "@/components/RazorpayCheckout.jsx";

function Home() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [essentials, setEssentials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [banner, setBanner] = useState({});

  // for offline course
  const phone = "916379240125";
  const message = encodeURIComponent(
    `Hi ma'am, I would like to enroll for the baking course`,
  );

  useEffect(() => {
    // for fetching Bakery Products
    const fetchProducts = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/products`).then((res) => {
          const shuffled = res.data.sort(() => 0.5 - Math.random());
          setProducts(shuffled.slice(0, 4));
        });
      } catch (err) {
        console.error("Error fetching Products:", err);
      }
    };
    fetchProducts();

    // for fetching courses
    async function fetchCourse() {
      try {
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/course`);
        // console.log("all response: ", response.data.courses);
        setCourses(response.data.courses?.slice(0, 3));
      } catch (error) {
        console.error("can't fetch courses", error);
      }
    }
    fetchCourse();

    //  for fetching Banner
    const fetchBaner = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/banner`);
        setBanner(res.data[0]);
        // console.log(res.data);
      } catch (error) {
        console.error("Error Fetching Banner", error);
      }
    };
    fetchBaner();

    // for fetching Baking Essentials
    const fetchEssentials = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_API_URL}/bakingEssentials`)
          .then((res) => {
            const shuffled = res.data.sort(() => 0.5 - Math.random());
            setEssentials(shuffled.slice(0, 4));
          });
      } catch (err) {
        console.error("Error fetching Products:", err);
      }
    };
    fetchEssentials();
  }, []);

  return (
    <div className="bg">
      {banner?.active == true ? <Modal /> : ""}

      {/* hero section */}
      <div className="pt-35 z-51 md:pt-15 h-screen w-screen relative bg-pink-100 flex justify-center items-center">
        <div className="">
          <video
            src={`/videos/cake-3.mov?nocache=1`}
            autoPlay
            muted
            loop
            className="absolute inset-0 h-full w-full object-cover"
          ></video>

          <div className="flex flex-col gap-2 absolute inset-0 justify-center items-center">
            <h2 className="font-extrabold pb-3 text-[#C08552] text-2xl md:text-3xl px-2 text-center brand-name">
              The Baked Fantasy
            </h2>
            <h2 className="text-3xl md:text-6xl pb-3 font-extrabold px-2 text-center text-white luckyGuy">
              For Bakers. By Bakers.
            </h2>
            <p className="text-center max-w-3xl luckyGuy text-white text-lg px-2 md:text-xl">
              From oven-fresh cakes to premium baking essentials, experience the
              joy of baking — whether you’re buying or creating.
            </p>
          </div>
        </div>
        <div className="absolute gap-5 w-full flex items-center justify-center bottom-45">
          <Link
            className="group relative inline-flex items-center overflow-hidden rounded-lg bg-pbrown px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
            to="/categories"
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
                    d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </span>

            <span className="text-lg font-medium transition-all group-hover:ms-4">
              Order Now
            </span>
          </Link>
          <Link
            to="/courses"
            className="group relative inline-flex items-center overflow-hidden rounded-lg border border-[#fef9ec] px-3 py-2.5 text-[#fef9ec] focus:ring-3 focus:outline-hidden"
          >
            <span className="absolute -start-full transition-all group-hover:start-1">
              <Notebook size={20} />
            </span>

            <span className="text-lg font-medium pl-1 transition-all group-hover:ms-4">
              Browse Courses
            </span>
          </Link>
          {/* <RazorpayCheckout amount={500} /> */}
        </div>

        <a href="#section-2" className="z-50 absolute bottom-5">
          <ChevronsDown className=" animate-bounce" color="#ffffff" size={35} />
        </a>
      </div>

      {/* featured Bakery products */}
      <section id="section-2" className="feature-section bg py-18 pb-12">
        <Heading title="Featured Products" />
        <p className="subHeading">
          Handcrafted with love using premium ingredients and traditional
          techniques
        </p>
        {/* products section */}
        {products.length > 0 ? (
          <div>
            <div className="grid [@media(max-width:553px)]:!grid-cols-1 [@media(max-width:846px)]:grid-cols-2 [@media(max-width:1111px)]:grid-cols-3 [@media(min-width:1111px)]:grid-cols-4 gap-5 py-15 px-10">
              {products.map((p) =>
                p.isActive ? (
                  <Product
                    key={p._id}
                    id={p._id}
                    category={categoryName}
                    img={`${import.meta.env.VITE_API_URL}${p.images?.[0]}`}
                    originalPrice={p.originalPrice}
                    discountedPrice={p.discountedPrice}
                    inStock={p.inStock}
                    title={p.title}
                    subject={p.subject}
                  />
                ) : (
                  <div></div>
                ),
              )}
            </div>
            <div className="see-all-products flex justify-center">
              <Link
                className="group relative inline-flex items-center overflow-hidden rounded-lg px-3 py-3 new-primary-bg "
                to={`/categories`}
              >
                <span className="absolute -start-full transition-all group-hover:start-1">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#ffffff"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-lg text-white font-medium transition-all group-hover:ms-4">
                  View All Products
                </span>
              </Link>
            </div>
          </div>
        ) : (
          // <div className="flex flex-col items-center justify-center">
          //   <dotlottie-wc
          //     src="https://lottie.host/eca676f3-586d-448f-bf3a-5d6a0c59ba6f/RDwRt4kKPP.lottie"
          //     className="h-60 w-70"
          //     autoplay
          //     loop
          //   ></dotlottie-wc>
          //   <p className="text-3xl font-bold">Products Coming Soon</p>
          // </div>
          <div className="text-center">
            <Loading text="Products coming soon" />
          </div>
        )}
      </section>

      {/* Featured Essentials */}
      <section className="feature-section bg py-8 pb-12">
        <Heading title="Featured Baking Essentials" />
        <p className="subHeading">
          Premium-quality tools and ingredients for your everyday baking
          journey.
        </p>
        {/* products section */}
        {essentials.length > 0 ? (
          <div>
            <div className="grid [@media(max-width:553px)]:!grid-cols-1 [@media(max-width:846px)]:grid-cols-2 [@media(max-width:1111px)]:grid-cols-3 [@media(min-width:1111px)]:grid-cols-4 gap-5 py-15 px-10">
              {essentials.map((p) => (
                <Essentials
                  key={p._id}
                  id={p._id}
                  category={categoryName}
                  img={`${import.meta.env.VITE_API_URL}${p.images?.[0]}`}
                  originalPrice={p.originalPrice}
                  discountedPrice={p.discountedPrice}
                  inStock={p.inStock}
                  title={p.title}
                  subject={p.subject}
                />
              ))}
            </div>
            <div className="see-all-products flex justify-center">
              <Link
                className="group relative inline-flex items-center overflow-hidden rounded-lg px-3 py-3 new-primary-bg text-white"
                to={"/ess-categories"}
              >
                <span className="absolute -start-full transition-all group-hover:start-1">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-lg font-medium transition-all group-hover:ms-4">
                  View All Products
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-start col-span-full items-center">
            <Loading text={"Products are coming soon"} />
          </div>
        )}
      </section>

      {/* banner */}
      <div className="mx-auto text-center rounded-4xl shadow-2xl md:bg-[url('/images/banner.jpg')] bg-[url('/images/mobile-banner.jpg')] bg-center bg-cover w-[100vw] h-[100vh] md:w-[80vw] md:h-[70vh]">
        <div className="flex flex-col items center w-full h-full justify-center">
          <h1 className="flex mx-auto luckyGuy justify-center text-5xl/15 items-center text-sbrown font-bold">
            Still thinking about dessert? <br />
            Your cravings won’t wait!
          </h1>
          <div className="flex mx-auto pt-10">
            <Link
              className="group relative inline-flex items-center overflow-hidden rounded-lg new-primary-bg px-8 py-3 text-white focus:ring-3 focus:outline-hidden mr-3"
              to="/categories"
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
                      d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </span>

              <span className="text-lg font-medium transition-all group-hover:ms-4">
                Order Now
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* online course section */}
      <section className="py-20 mb-10">
        <Heading title="Learn, Bake, and Grow with Sweet Dreams Academy" />
        <div className="text-center text-lg !mt-5 mb-10">
          <p>
            Join our online courses to master baking skills, explore creative
            recipes, and turn your passion into a thriving business—anytime,
            anywhere.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {courses.length > 0 ? (
            courses.map((course, index) => {
              return (
                <div key={index}>
                  <div>
                    <OnlineCourseCard
                      title={course.title}
                      description={course.description}
                      rating={course.rating}
                      totalReviews={course.totalReviews}
                      duration={course.duration}
                      totalStudents={course.totalStudents}
                      ratingSum={course.ratingSum}
                      discountedPrice={course.discountedPrice}
                      originalPrice={course.originalPrice}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            // <div className="w-screen flex flex-col items-center justify-center">
            //   <dotlottie-wc
            //     src="https://lottie.host/eca676f3-586d-448f-bf3a-5d6a0c59ba6f/RDwRt4kKPP.lottie"
            //     className="h-60 w-70"
            //     autoplay
            //     loop
            //   ></dotlottie-wc>
            //   <p className="text-3xl font-bold">Courses Coming Soon</p>
            // </div>
            <div className="w-full flex justify-start col-span-full items-center">
              <Loading text={"Products are coming soon"} />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <Link
            to="/courses"
            className="px-8 py-4 bg-pbrown text-white rounded-xl text-md font-medium hover:opacity-90 transition-opacity"
          >
            Browse courses
          </Link>
        </div>
      </section>

      {/* event section */}
      <section className="lg:grid lg:h-[80vh] md:h-[45vh] h-[42vh] lg:bg-cover lg:bg-center md:bg-center md:bg-cover relative md:bg-violet-300 bg-violet-300  lg:bg-[url('/images/bulk-orders.png')] mt-18 py-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 px-8">
          <div className="textSide flex space-y-15 ">
            <div className="max-w-prose flex flex-col space-y-5 ">
              <h1 className="lg:text-6xl text-white md:text-5xl text-2xl font-bold sm:text-5xl">
                <strong className="text-[#ed8b37] mb-5 font-extrabold">
                  Bulk Orders
                </strong>
                <br />
                <span>for Every Occasion</span>
              </h1>

              <p className="mt-4 text-base text-pretty text-white sm:text-lg/relaxed">
                Order bulk cakes & desserts for birthdays, weddings, or events.
                Fresh, delicious treats delivered to make every celebration
                memorable.
              </p>

              <div className="mt-4 flex gap-4 sm:mt-6">
                <Link
                  className="group relative inline-flex items-center overflow-hidden rounded-lg bg-[#ed8b37] px-8 py-3 text-white mr-3"
                  to="/contact"
                >
                  <span className="absolute -start-full transition-all group-hover:start-4">
                    <svg
                      className="size-5 rtl:rotate-180"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      fill="#fff"
                      style={{ transform: "rotate(90deg)" }}
                    >
                      <g>
                        <path
                          style={{ fill: "#fff" }}
                          d="M408.387,512H159.603c-8.313,0-15.054-6.741-15.054-15.054v-71.829
        c0-8.313,6.741-15.054,15.054-15.054h132.043c8.313,0,15.054,6.741,15.054,15.054c0,8.313-6.741,15.054-15.054,15.054H174.657
        v41.722h218.676v-41.722h-28.605c-8.313,0-15.054-6.741-15.054-15.054c0-8.313,6.741-15.054,15.054-15.054h43.659
        c8.313,0,15.054,6.741,15.054,15.054v71.829C423.441,505.26,416.7,512,408.387,512z"
                        />
                        <path
                          style={{ fill: "#fff" }}
                          d="M302.481,198.013v-15.951c0-15.948-13.009-29.53-29.728-30.096
        c-17.553-0.595-31.979,12.793-31.979,29.391v17.213l-0.333-154.106c0-16.243-13.813-29.411-30.854-29.411H208.4
        c-17.039,0-30.854,13.168-30.854,29.411v110.671v25.447v76.908l-30.02-73.097c-5.281-15.769-22.984-24.465-39.527-19.431
        c-16.543,5.043-25.665,21.909-20.384,37.684l65.918,135.745c8.141,16.765,25.756,27.5,45.137,27.509l177.423,0.077
        c27.491,0.012,49.783-21.226,49.786-47.432l0.018-116.556c0-16.243-13.813-29.411-30.854-29.411l0,0
        c-17.039,0-30.854,13.168-30.854,29.411v-6.989c0-16.243-13.813-29.411-30.854-29.411l0,0c-17.039,0-30.854,13.168-30.854,29.411"
                        />
                        <path
                          style={{ fill: "#fff" }}
                          d="M376.115,381.032c-0.011,0-0.02,0-0.03,0l-177.421-0.077c-25.033-0.012-48.062-14.139-58.672-35.988
        L74.073,209.223c-0.283-0.583-0.528-1.182-0.733-1.796c-3.788-11.308-2.854-23.391,2.625-34.022
        c5.684-11.03,15.502-19.142,27.643-22.843c24.074-7.325,49.967,5.457,58.011,28.529l0.872,2.121V44.463
        C162.492,19.946,183.087,0,208.4,0h1.186c25.313,0,45.907,19.946,45.907,44.464l0.206,95.206c5.564-1.993,11.525-2.958,17.56-2.75
        c15.338,0.521,28.625,8.286,36.537,19.916c6.886-3.998,14.939-6.3,23.537-6.3c13.886,0,26.35,6,34.776,15.465
        c7.569-5.329,16.88-8.475,26.933-8.475c25.313,0,45.908,19.946,45.908,44.464l-0.02,116.557
        c-0.001,16.832-6.84,32.616-19.255,44.442C409.465,374.625,393.285,381.032,376.115,381.032z"
                        />
                      </g>
                    </svg>
                  </span>

                  <span className="text-lg font-semibold transition-all group-hover:ms-4">
                    Book Now
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-xl h-[400px] overflow-hidden">
            {/* <img
              src="/images/event.jpg"
              alt="Birthday Event"
              className="rounded-xl h-[400px]  object-cover hover:scale-108 transition-all duration-200"
            /> */}
          </div>
        </div>
      </section>

      {/* offline course section */}
      <section className="py-20 bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Heading title="Featured Courses" />
            <p className="subHeading">
              Learn from industry experts with our comprehensive online and
              offline baking courses
            </p>
          </div>
          {/* Offline Course Popup */}
          <div className="relative flex md:justify-end md:items-center justify-center pt-3 h-[60vh] md:pt-0 items-start lg:justify-end lg:pr-20 md:pr-10 bg-center bg-cover md:bg-[url('/images/baking-class.png')] bg-[url('/images/mobile-baking.png')] rounded-2xl">
            <div className="">
              <h1 className="mansalva-regular drop-shadow-5xl md:translate-x-10 sm:px-0 px-5 w-full text-pbrown md:text-6xl text-4xl text-center">
                {/* {banner?.title || "Titles not yet"} */}
                {banner?.active ? banner?.title : "Join our offline classes"}
              </h1>
              <p className="luckyGuy pt-5 px-4 w-full text-pbrown font-bold text-lg text-center">
                {/* {banner?.subject || "Subjects not yet"} */}
                {banner?.active
                  ? banner?.subject
                  : "Contact us to know more about the courses"}
              </p>
              <div className="w-full flex justify-center">
                <a
                  href={`https://wa.me/${phone}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-30 p-2 mt-5 text-center bg-pbrown backdrop-blur-2xl hover:scale-108 transition-all ease-in text-white font-bold rounded-2xl"
                >
                  Enroll now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonial section */}
      <div className="bg">
        <section className="mt-10 mx-15 pt-10">
          <Heading title="What Our Students Say" />
          <p className="subHeading">
            Join thousands of satisfied students and customers who trust Sweet
            Dreams
          </p>
          <div className="flex lg:flex-row flex-col gap-5 py-10 items-center">
            <div className="video flex justify-center lg:w-4/12 md:w-6/12 w-full">
              <video
                src={`/videos/review.mp4?nocache=1`}
                controls
                autoPlay
                muted
                loop
                className="rounded-xl h-130"
              ></video>
            </div>

            <div className="flex flex-col gap-5">
              <div className="cards w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 ">
                <div className="block rounded-md p-4 new-primary-bg shadow-sm sm:p-6 hover:scale-102 transition-all duration-200 ease-in-out ">
                  <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                    <div className="sm:order-last sm:shrink-0">
                      <div className="size-16  rounded-full object-cover sm:size-[72px] bg-sbrown text-white flex justify-center items-center text-xl font-bold">
                        SM
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <h3 className="text-lg font-medium text-pretty text-gray-900">
                        <div className="star flex">⭐⭐⭐⭐⭐</div>
                      </h3>

                      <p className="mt-1 text-lg font-bold text-white">
                        Sujitha Mani
                      </p>

                      <p className="mt-4 text-md text-pretty text-white">
                        "I joined Baking class in baked fantasy best teaching I
                        got from my mentor thank you mam I suggested to my
                        friends"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="block rounded-md p-4 shadow-sm sm:p-6 hover:scale-102 transition-all duration-200 ease-in-out new-primary-bg">
                  <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                    <div className="sm:order-last sm:shrink-0">
                      <div className="size-16 rounded-full object-cover sm:size-[72px] bg-sbrown text-white flex justify-center items-center text-xl font-bold">
                        RR
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <h3 className="text-lg font-medium text-pretty text-white">
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                      </h3>

                      <p className="mt-1 text-lg font-bold text-white">
                        Revathy Rathnavel
                      </p>

                      <p className="mt-4 text-md text-pretty text-white">
                        "The taste of the cakes and pastry were delicious.......
                        Very tasty and also healthy"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="block rounded-md p-4 shadow-sm sm:p-6 hover:scale-102 transition-all duration-200 ease-in-out new-primary-bg">
                  <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                    <div className="sm:order-last sm:shrink-0">
                      <div className="size-16 rounded-full object-cover sm:size-[72px] bg-sbrown text-white flex justify-center items-center text-xl font-bold">
                        VM
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <h3 className="text-lg font-medium text-pretty text-white">
                        <div className="stars">⭐⭐⭐⭐</div>
                      </h3>

                      <p className="mt-1 text-lg font-bold text-white">
                        Valar Mathi
                      </p>

                      <p className="mt-4 text-md text-pretty text-white">
                        "Well equipped hands on practice and individual
                        attention for all students"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="block rounded-md p-4 shadow-sm sm:p-6 hover:scale-102 transition-all duration-200 ease-in-out new-primary-bg">
                  <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
                    <div className="sm:order-last sm:shrink-0">
                      <div className="size-16 rounded-full object-cover sm:size-[72px] bg-sbrown text-white flex justify-center items-center text-xl font-bold">
                        HJ
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <h3 className="text-lg font-medium text-pretty text-white">
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                      </h3>

                      <p className="mt-1 text-lg font-bold text-white">
                        H.Jeyasudha 217
                      </p>

                      <p className="mt-4 text-md text-pretty text-white">
                        "The best shop and good quality."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btn col-span-2 flex justify-center mt-5">
                <a
                  className="group relative inline-flex items-center overflow-hidden rounded-lg px-3 py-3 new-primary-bg"
                  href="https://www.google.com/search?sca_esv=2522d5777cdbdc58&hl=en-IN&sxsrf=AE3TifM5O43bpWbi0h4G7E4CC6revb5kUw:1756809251615&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EyA5slTbW5eqP8ucakgreX9x5iS9IjevVKjBh3MoISwnxvEXSJrMtaQHVVz68EGLEUFcXSqJuheZ6Pgqck4By3xgI21U9ATN03pkW79iZnC_AWvL4saAap8ttk0zFqIEHFMdl2o%3D&q=The+Baked+Fantasy+%7C+Baking+Academy+in+Madurai+Reviews&sa=X&ved=2ahUKEwjHyoW78LmPAxVWT2wGHdG9OG0Q0bkNegQIHxAD&biw=1536&bih=695&dpr=1.25"
                  target="blank"
                >
                  <span className="absolute -start-full transition-all group-hover:start-1">
                    <svg
                      className="size-5 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#ffffff"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  <span className="text-lg text-white font-medium transition-all group-hover:ms-4">
                    View All Reviews
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA section */}
      <section className="lg:grid lg:h-[80vh] lg:bg-cover lg:bg-center md:bg-center md:bg-cover relative bg-[url('/images/home-page-last.png')]">
        <div className="lg:absolute lg:left-0 lg:top-[3vh] mt-18 w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-prose text-left">
            <h1 className="lg:text-4xl font-bold text-white text-xl text-left">
              <strong className=""> Learn, Shop & Order </strong>
              with The Baked Fantasy
            </h1>

            <p className="mt-4 text-base text-pretty text-white/80 sm:text-lg/relaxed">
              Join our baking courses, shop eco-friendly products, or place bulk
              orders with ease. From beginners to café owners, we have the
              perfect baking solutions for you.
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
              <Link
                to="/contact"
                className="group relative inline-flex items-center overflow-hidden rounded-lg bg-[#fef9ec] px-8 py-3 text-black focus:ring-3 focus:outline-hidden mr-3"
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
                      {" "}
                      <path
                        d="M16.1007 13.359L15.5719 12.8272H15.5719L16.1007 13.359ZM16.5562 12.9062L17.085 13.438H17.085L16.5562 12.9062ZM18.9728 12.5894L18.6146 13.2483L18.9728 12.5894ZM20.8833 13.628L20.5251 14.2869L20.8833 13.628ZM21.4217 16.883L21.9505 17.4148L21.4217 16.883ZM20.0011 18.2954L19.4723 17.7636L20.0011 18.2954ZM18.6763 18.9651L18.7459 19.7119H18.7459L18.6763 18.9651ZM8.81536 14.7266L9.34418 14.1947L8.81536 14.7266ZM4.00289 5.74561L3.2541 5.78816L3.2541 5.78816L4.00289 5.74561ZM10.4775 7.19738L11.0063 7.72922H11.0063L10.4775 7.19738ZM10.6342 4.54348L11.2346 4.09401L10.6342 4.54348ZM9.37326 2.85908L8.77286 3.30855V3.30855L9.37326 2.85908ZM6.26145 2.57483L6.79027 3.10667H6.79027L6.26145 2.57483ZM4.69185 4.13552L4.16303 3.60368H4.16303L4.69185 4.13552ZM12.0631 11.4972L12.5919 10.9654L12.0631 11.4972ZM16.6295 13.8909L17.085 13.438L16.0273 12.3743L15.5719 12.8272L16.6295 13.8909ZM18.6146 13.2483L20.5251 14.2869L21.2415 12.9691L19.331 11.9305L18.6146 13.2483ZM20.8929 16.3511L19.4723 17.7636L20.5299 18.8273L21.9505 17.4148L20.8929 16.3511ZM18.6067 18.2184C17.1568 18.3535 13.4056 18.2331 9.34418 14.1947L8.28654 15.2584C12.7186 19.6653 16.9369 19.8805 18.7459 19.7119L18.6067 18.2184ZM9.34418 14.1947C5.4728 10.3453 4.83151 7.10765 4.75168 5.70305L3.2541 5.78816C3.35456 7.55599 4.14863 11.144 8.28654 15.2584L9.34418 14.1947ZM10.7195 8.01441L11.0063 7.72922L9.9487 6.66555L9.66189 6.95073L10.7195 8.01441ZM11.2346 4.09401L9.97365 2.40961L8.77286 3.30855L10.0338 4.99296L11.2346 4.09401ZM5.73263 2.04299L4.16303 3.60368L5.22067 4.66736L6.79027 3.10667L5.73263 2.04299ZM10.1907 7.48257C9.66189 6.95073 9.66117 6.95144 9.66045 6.95216C9.66021 6.9524 9.65949 6.95313 9.659 6.95362C9.65802 6.95461 9.65702 6.95561 9.65601 6.95664C9.65398 6.95871 9.65188 6.96086 9.64972 6.9631C9.64539 6.96759 9.64081 6.97245 9.63599 6.97769C9.62634 6.98816 9.61575 7.00014 9.60441 7.01367C9.58174 7.04072 9.55605 7.07403 9.52905 7.11388C9.47492 7.19377 9.41594 7.2994 9.36589 7.43224C9.26376 7.70329 9.20901 8.0606 9.27765 8.50305C9.41189 9.36833 10.0078 10.5113 11.5343 12.0291L12.5919 10.9654C11.1634 9.54499 10.8231 8.68059 10.7599 8.27309C10.7298 8.07916 10.761 7.98371 10.7696 7.96111C10.7748 7.94713 10.7773 7.9457 10.7709 7.95525C10.7677 7.95992 10.7624 7.96723 10.7541 7.97708C10.75 7.98201 10.7451 7.98759 10.7394 7.99381C10.7365 7.99692 10.7335 8.00019 10.7301 8.00362C10.7285 8.00534 10.7268 8.00709 10.725 8.00889C10.7241 8.00979 10.7232 8.0107 10.7223 8.01162C10.7219 8.01208 10.7212 8.01278 10.7209 8.01301C10.7202 8.01371 10.7195 8.01441 10.1907 7.48257ZM11.5343 12.0291C13.0613 13.5474 14.2096 14.1383 15.0763 14.2713C15.5192 14.3392 15.8763 14.285 16.1472 14.1841C16.28 14.1346 16.3858 14.0763 16.4658 14.0227C16.5058 13.9959 16.5392 13.9704 16.5663 13.9479C16.5799 13.9367 16.5919 13.9262 16.6024 13.9166C16.6077 13.9118 16.6126 13.9073 16.6171 13.903C16.6194 13.9008 16.6215 13.8987 16.6236 13.8967C16.6246 13.8957 16.6256 13.8947 16.6266 13.8937C16.6271 13.8932 16.6279 13.8925 16.6281 13.8923C16.6288 13.8916 16.6295 13.8909 16.1007 13.359C15.5719 12.8272 15.5726 12.8265 15.5733 12.8258C15.5735 12.8256 15.5742 12.8249 15.5747 12.8244C15.5756 12.8235 15.5765 12.8226 15.5774 12.8217C15.5793 12.82 15.581 12.8183 15.5827 12.8166C15.5862 12.8133 15.5895 12.8103 15.5926 12.8074C15.5988 12.8018 15.6044 12.7969 15.6094 12.7929C15.6192 12.7847 15.6265 12.7795 15.631 12.7764C15.6403 12.7702 15.6384 12.773 15.6236 12.7785C15.5991 12.7876 15.501 12.8189 15.3038 12.7886C14.8905 12.7253 14.02 12.3853 12.5919 10.9654L11.5343 12.0291ZM9.97365 2.40961C8.95434 1.04802 6.94996 0.83257 5.73263 2.04299L6.79027 3.10667C7.32195 2.578 8.26623 2.63181 8.77286 3.30855L9.97365 2.40961ZM4.75168 5.70305C4.73201 5.35694 4.89075 4.9954 5.22067 4.66736L4.16303 3.60368C3.62571 4.13795 3.20329 4.89425 3.2541 5.78816L4.75168 5.70305ZM19.4723 17.7636C19.1975 18.0369 18.9029 18.1908 18.6067 18.2184L18.7459 19.7119C19.4805 19.6434 20.0824 19.2723 20.5299 18.8273L19.4723 17.7636ZM11.0063 7.72922C11.9908 6.7503 12.064 5.2019 11.2346 4.09401L10.0338 4.99295C10.4373 5.53193 10.3773 6.23938 9.9487 6.66555L11.0063 7.72922ZM20.5251 14.2869C21.3429 14.7315 21.4703 15.7769 20.8929 16.3511L21.9505 17.4148C23.2908 16.0821 22.8775 13.8584 21.2415 12.9691L20.5251 14.2869ZM17.085 13.438C17.469 13.0562 18.0871 12.9616 18.6146 13.2483L19.331 11.9305C18.2474 11.3414 16.9026 11.5041 16.0273 12.3743L17.085 13.438Z"
                        fill="#000"
                      ></path>{" "}
                    </g>
                  </svg>
                </span>

                <span className="text-lg font-medium transition-all group-hover:ms-4">
                  Contact Us
                </span>
              </Link>

              <Link
                to="/categories"
                className="group relative inline-flex items-center overflow-hidden rounded-lg border border-[#fef9ec] px-3 py-3 text-[#fef9ec] focus:ring-3 focus:outline-hidden"
              >
                <span className="absolute -start-full transition-all group-hover:start-1">
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
                      {" "}
                      <path
                        d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                        // stroke="#dc0c7c"
                        className=""
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </span>

                <span className="text-lg font-medium transition-all group-hover:ms-4">
                  Shop Products
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
