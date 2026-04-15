/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LaptopMinimal } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ChefHat } from "lucide-react";
import { Store } from "lucide-react";
import { Cake } from "lucide-react";
import { Rocket } from "lucide-react";
import { Truck } from "lucide-react";

const images = [
  {
    img: "/images/cake-bg-5(3).jpg",
    heading: "Crafting Sweet Memories",
    content:
      "We create beautifully customized cakes that turn every celebration into a memorable experience.",
  },
  {
    // img: "/images/cake-bg-5(3).jpg",
    img: "/images/cake-bg-3.jpg",
    heading: "Personalized Designs for Every Occasion",
    content:
      "From birthdays to weddings, each cake is designed to match your vision and style.",
  },
  {
    img: "/images/cake-bg-6.jpg",
    heading: "Fresh Ingredients, Delicious Taste",
    content:
      "Our cakes are made with high-quality ingredients, ensuring every bite is as delightful as it looks.",
  },
];

function About() {
  // for hero section slider
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, delay);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const goToSlide = (index) => setCurrentIndex(index);

  // timeline milestones

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Started our journey as a small home bakery, baking fresh cakes and treats with love.",
      icon: <ChefHat size={25} color="#ffffff" />,
      image: "cake-dot.png",
    },
    {
      year: "2021",
      title: "First Bakery Store",
      description:
        "Opened our first bakery shop and welcomed our very first walk-in customers.",
      icon: <Store size={25} color="#ffffff" />,
      image: "cake-dot-2.png",
    },
    {
      year: "2022",
      title: "Signature Cakes Launched",
      description: "Introduced our signature customized cakes and special dessert menu.",
      icon: <Cake color="#ffffff" size={27} />,
      image: "cake-dot-3.png",
    },
    {
      year: "2023",
      title: "Event & Celebration Cakes",
      description:
        "Expanded our services to create cakes for weddings, birthdays, and big celebrations.",
      icon: <Rocket color="#ffffff" />,
      image: "cake-dot-4.png",
    },
    {
      year: "2024",
      title: "Online Ordering & Delivery",
      description:
        "Launched online ordering and started delivering our fresh bakes across the city.",
      icon: <Truck color="#ffffff" />,
      image: "cake-dot-5.png",
    },
  ];

  // testimonial
  const testimonials = [
    {
      name: "Subalakshmi",
      stars: "⭐⭐⭐⭐⭐",
      description: "Super tasty brownies 😋😋😋😋. Highly recommended",
    },
    {
      name: "Padmavathy Shivagurunathan",
      stars: "⭐⭐⭐⭐",
      description:
        "Sweet Dreams Baking Institute offers the most comprehensive baking education. Highly recommended!",
    },
    {
      name: "karthi micky",
      stars: "⭐⭐⭐⭐⭐",
      description:
        "Their bulk order service is exceptional. Quality products delivered on time, every time.",
    },
    {
      name: "Selvarani Nagaraj",
      stars: "⭐⭐⭐⭐",
      description:
        "Loved everything from Baked Fantasy! The cakes and pastries are super fresh, soft, and full of flavor.",
    },
  ];

  return (
    <div className="bg-white">
      {/* hero section 2 */}
      <section className="overflow-hidden bg-cover bg-no-repeat h-screen grid grid-cols-1 md:grid-cols-2 bg-[url('/images/about-brown.png')]">
        {/* left column */}
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 mt-38">
          <div className="text-start ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold lora text-black sm:text-3xl md:text-5xl">
              From <span className="text-pbrown">Oven to Heart</span> - and From Us to
              Your Kitchen.
            </h2>

            <p className="hidden max-w-lg text-black/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              The Baked Fantasy brings you fresh cakes, pastries, and desserts made with
              love. Celebrate life’s moments with us-or join our baking courses to create
              your own oven-fresh treats at home.
            </p>
            <div className="flex gap-10 items-center">
              <div className="mt-4 sm:mt-8">
                <Link
                  className="group relative inline-flex items-center overflow-hidden rounded-lg bg-pbrown px-8 py-3 text-white mr-3"
                  to="/categories"
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
                    Shop now
                  </span>
                </Link>
              </div>
              <div className="mt-4 sm:mt-8">
                {/* <Link
                  to={`/courses`}
                  className="border-2 border-pbrown hover:-translate-y-2 text-pbrown font-bold inline-block rounded-xl px-12 py-3 text-md transition focus:ring-3 focus:outline-hidden"
                >
                  Explore course
                </Link> */}
                <Link
                  to="/courses"
                  className="group relative inline-flex items-center overflow-hidden rounded-lg border-2 border-pbrown px-3 py-3 text-pbrown focus:ring-3 focus:outline-hidden"
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
                          className="stroke-pbrown"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </span>

                  <span className="text-lg font-medium transition-all group-hover:ms-4">
                    Explore course
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* right column */}
        <div className="h-full flex flex-end">
          <img
            src="/images/BakedMam-2.png"
            alt="Brand Ambassador"
            className="max-h-full object-center object-cover"
          />
        </div>
      </section>

      {/* time line section */}
      <section className="pt-16 bg-white bg-[url('/images/swirl.png')]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lora text-black font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-black/70 max-w-3xl mx-auto">
              From a passionate home baker to a skilled academy instructor and a thriving
              large-scale home bakery, our journey is driven by love for the craft and
              dedication to sharing it with others.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* candle */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 rounded-full new-primary-bg h-full hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"
                    }`}
                  >
                    {/* cards */}
                    <div className="border-2 border-transparent rounded-2xl hover:-translate-y-2 shadow-lg hover:shadow-xl bg-white bg-cover transition-all duration-300">
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 new-primary-bg rounded-full flex items-center justify-center mr-4">
                            {milestone.icon}
                          </div>
                          <div>
                            {/* year */}
                            {/* <div className="text-2xl font-bold text-amber-700">
                              {milestone.year}
                            </div> */}

                            {/* title */}
                            <h3 className="text-xl font-bold text-black">
                              {milestone.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-black">{milestone.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div
                      className={`h-18 w-18 m-2 bg-center bg-contain bg-no-repeat z-30 drop-shadow-2xl`}
                      style={{
                        backgroundImage: `url(/images/${milestone.image})`,
                      }}
                    ></div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-white bg-[url('/images/swirl.png')]">
        <section className="overflow-hidden bg-[url(/images/cta-cake-bg-3.png)] pt-40 bg-center sm:grid sm:grid-cols-2 sm:items-center">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="!text-4xl font-semibold mb-5 text-gray-900 pt-60 md:text-3xl">
                Turn Your Passion for <span className="text-pbrown">Baking</span> Into{" "}
                <span className="text-pbrown">Perfection</span>
              </h2>

              <p className="hidden text-xl mb-5 lg:w-100 text-gray-800 md:mt-4 md:block">
                Join our academy to turn your home baking into professional mastery!
              </p>

              <div className="mt-4 flex md:justify-start justify-center items-center md:mt-8">
                <Link
                  className="group relative inline-flex items-center overflow-hidden rounded-lg new-primary-bg px-8 py-3 text-white mr-3"
                  to="/courses"
                >
                  <span className="absolute -start-full transition-all group-hover:start-4">
                    <LaptopMinimal size={20} />
                  </span>

                  <span className="text-md font-medium transition-all group-hover:ms-4">
                    Our Courses
                  </span>
                </Link>

                <Link
                  className="group relative inline-flex items-center overflow-hidden rounded-lg border border-current px-3 py-3 text-pbrown"
                  to="/categories"
                >
                  <span className="absolute -start-full transition-all group-hover:start-1">
                    <ShoppingCart size={36} className="pr-5" />
                  </span>

                  <span className="text-md text-pbrown font-bold transition-all group-hover:ms-4">
                    Our Products
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* <img
          alt=""
          src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full object-cover "
        /> */}
        </section>
      </section>

      {/* award section */}
      <section className="awards py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl lora font-bold md:text-4xl text-black text-center mb-18">
            Awards & Recognition
          </h2>

          <div className="lg:grid md:flex md:flex-col grid md:mx-20 sm:mx-10 lg:grid-cols-2 lg:grid-rows-2 gap-7 md:gap-9 lg:gap-12">
            {/* First image - Top-left */}
            <div className="overflow-hidden shadow-lg h-72 rounded-xl">
              <img
                src="/images/award-img-1.jpg"
                alt="Award ceremony trophy"
                className="w-full h-72 shadow-md object-cover hover:scale-105 transition-all duration-300"
              />
            </div>

            {/* Second image - Top-right */}
            <div className="overflow-hidden shadow-lg rounded-xl lg:row-span-2">
              <img
                src="/images/award-img-2.jpg"
                alt="Bakery recognition certificate"
                className="w-full h-full shadow-md object-cover hover:scale-105 transition-all duration-300"
              />
            </div>

            {/* Content - Bottom-left */}
            <div>
              <h3 className="!text-4xl font-bold lora text-black mb-7">
                Recognized Excellence
              </h3>
              <p className="text-lg text-black/80 leading-relaxed">
                Our commitment to quality craftsmanship and exceptional customer service
                has been recognized by industry leaders and our community. These awards
                reflect our dedication to traditional baking methods and innovative
                approaches to creating memorable experiences.
              </p>

              <div className="space-y-4 mt-7 transition-all duration-200">
                <div className="bg-white shadow-lg rounded-lg p-4 flex items-start gap-4">
                  {/* Award icon */}
                  <div className="w-8 h-8 new-primary-text flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-full h-full fill-sbrown" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                    </svg>
                  </div>

                  {/* Award info */}
                  <div className="flex-1">
                    <h2 className="text-black font-bold">Rising star</h2>
                    <p className="text-sm text-black font-medium">2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* testimonial */}
      <section className="py-12 lg:px-12 md:px-8 px-3 bg-white">
        <div>
          <h2 className="text-5xl lora font-semibold text-black text-center mb-6">
            Sweet words from our customers
          </h2>
          <p className="text-xl text-gray-800/80 text-center">
            Discover what makes our bakery special through the heartfelt stories of our
            beloved customers
          </p>
        </div>

        <div className="lg:grid lg:grid-rows-2 md:gap-6 flex flex-col gap-5 lg:grid-cols-2 place-items-center mt-12">
          {testimonials.map((testimonial, index) => {
            return (
              <div
                key={index}
                className="shadow-lg p-5 h-fit md:h-42 bg-sbrown text-white rounded-xl gap-2 w-[70%] place-items-start transition-all duration-200"
              >
                <div>
                  <h4 className="text-white text-xl pl-1 font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="mb-5">{testimonial.stars}</p>
                  <p className="pl-1">{testimonial.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <a
            className="group relative inline-flex items-center overflow-hidden text-white rounded-xl px-8 py-3 new-primary-bg"
            target="_blank"
            href="https://www.google.com/search?sca_esv=2522d5777cdbdc58&hl=en-IN&sxsrf=AE3TifM5O43bpWbi0h4G7E4CC6revb5kUw:1756809251615&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EyA5slTbW5eqP8ucakgreX9x5iS9IjevVKjBh3MoISwnxvEXSJrMtaQHVVz68EGLEUFcXSqJuheZ6Pgqck4By3xgI21U9ATN03pkW79iZnC_AWvL4saAap8ttk0zFqIEHFMdl2o%3D&q=The+Baked+Fantasy+%7C+Baking+Academy+in+Madurai+Reviews&sa=X&ved=2ahUKEwjHyoW78LmPAxVWT2wGHdG9OG0Q0bkNegQIHxAD&biw=1536&bih=695&dpr=1.25"
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
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

            <span className="text-lg font-semibold transition-all group-hover:ms-4">
              See more Reviews
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
