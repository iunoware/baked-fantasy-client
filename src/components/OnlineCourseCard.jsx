/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GraduationCap } from "lucide-react";

function OnlineCourseCard(props) {
  // const paymentMethods = [
  //   {
  //     id: "1",
  //     type: "card",
  //     label: "Credit/Debit Card",
  //     details: "**** **** **** 1234",
  //   },
  //   { id: "2", type: "upi", label: "UPI", details: "user@paytm" },
  //   {
  //     id: "3",
  //     type: "wallet",
  //     label: "Paytm Wallet",
  //     details: "₹2,450 available",
  //   },
  //   { id: "4", type: "cod", label: "Cash on Delivery" },
  // ];
  // const [orderNumber, setOrderNumber] = useState("");
  // const [currentStep, setCurrentStep] = useState("payment");

  // const calculateOrderSummary = () => {
  //   const subtotal = props.price;
  //   const discount = 10;
  //   // const taxes = (subtotal - discount) * 0.18; // 18% GST
  //   const total = subtotal - discount;

  //   return {
  //     subtotal,
  //     discount,
  //     total,
  //   };
  // };

  // const handleNextStep = () => {
  //   // Generate order number
  //   const orderNum = "OD" + Date.now().toString().slice(-6);
  //   setOrderNumber(orderNum);
  //   setCurrentStep("confirmation");
  // };

  // let orderSummary = calculateOrderSummary();

  // const [selectedAddress, setSelectedAddress] = useState(null);
  // const [selectedPayment, setSelectedPayment] = useState(null);
  // const [deliveryInstructions, setDeliveryInstructions] = useState("");

  // let [purchasedCourses, setPurchasedCourses] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   localStorage.setItem(
  //     "token",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZGY4NDIxZTU3MTFmOTYyYzMyZTQyMiIsImlhdCI6MTc1OTQ3OTU4NywiZXhwIjoxNzU5NTY1OTg3fQ.nmVQcr3gO4U96q3GP5wZGgVs1r3TGriA-xaaAshrftU"
  //   );

  //   const fetchPurchasedCourses = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) return; // maybe redirect to login

  //     // const res = await axios.get("http://localhost:5000/user-verification", {
  //     //   headers: { Authorization: `Bearer ${token}` },
  //     // });
  //     // setPurchasedCourses(res.data.purchasedCourses.map((c) => c.courseId));

  //     const response = await axios.get("http://localhost:5000/user-verification", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setPurchasedCourses(
  //       response.data.currentUser.purchasedCourses.map((c) => c.courseId)
  //     );
  //   };

  //   fetchPurchasedCourses();
  // }, []);

  // async function checkUser(courseId) {
  //   if (purchasedCourses.some((pc) => pc === courseId)) {
  //     navigate(`/course/online-course/${courseId}`);
  //   } else {
  //     <PaymentPage
  //       paymentMethods={paymentMethods}
  //       selectedPayment={selectedPayment}
  //       setSelectedPayment={setSelectedPayment}
  //       orderSummary={orderSummary}
  //       onNext={handleNextStep}
  //       onPrevious={`/courses/online-course`}
  //     />;
  //   }
  // }

  return (
    <div className="">
      {/* <div className="px-10 m-10">
        <div
          className={`overflow-hidden group card-hover cursor-pointer relative fade-in bg-white rounded-xl`}
        >
          <div className="relative h-64 overflow-hidden">
            <div className="h-full w-full overflow-hidden">
              <img
                src={`http://localhost:5000${props.image}`}
                alt="online course 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <div className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">⭐{props.rating}</span>
                  <span className="text-xs opacity-75">({props.reviews})</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <div className="h-4 w-4" />
                  <span>{props.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>

            <div className="card-button-reveal opacity-0 group-hover:opacity-100 group-hover:-translate-y-3 translate-y-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-400">
              <div className="bg-white text-foreground px-6 py-3 rounded-full font-semibold shadow-lg flex items-center space-x-2">
                <div className="">
                  <Link className="text-xl" onClick={() => checkUser(props._id)}>
                    <svg
                      width="24px"
                      className="inline-block mr-5"
                      viewBox="0 0 117 117"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="#3b82f6"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title></title> <desc></desc> <defs></defs>{" "}
                        <g
                          fill="none"
                          fillRule="evenodd"
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                        >
                          {" "}
                          <g fillRule="nonzero" id="play-button">
                            {" "}
                            <path
                              d="M58.5,116.7 C90.6,116.7 116.7,90.6 116.7,58.5 C116.7,26.4 90.6,0.3 58.5,0.3 C26.4,0.3 0.3,26.4 0.3,58.5 C0.3,90.6 26.4,116.7 58.5,116.7 Z M58.5,8.5 C86.1,8.5 108.5,30.9 108.5,58.5 C108.5,86.1 86.1,108.5 58.5,108.5 C30.9,108.5 8.5,86 8.5,58.5 C8.5,31 30.9,8.5 58.5,8.5 Z"
                              fill="#3b82f6"
                              id="Shape"
                            ></path>{" "}
                            <path
                              d="M47.1,88.5 C47.6,88.7 48.1,88.8 48.7,88.8 C49.8,88.8 50.8,88.4 51.6,87.6 L78,61.1 C78.8,60.3 79.2,59.3 79.2,58.2 C79.2,57.1 78.8,56 78,55.3 L51.5,28.8 C50.3,27.6 48.6,27.3 47,27.9 C45.5,28.5 44.5,30 44.5,31.7 L44.5,84.7 C44.5,86.3 45.5,87.8 47.1,88.5 Z M52.7,41.6 L69.3,58.2 L52.7,74.8 L52.7,41.6 Z"
                              fill="#3b82f6"
                              id="Shape"
                            ></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-foreground mb-2">{props.title}</h3>
              <p className="text-lg text-[#00BCD4] font-medium mb-3">{props.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed">{props.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-[#00BCD4] rounded-lg mx-auto mb-2">
                  <div className="" id="clock">
                    <svg
                      width="24px"
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
                          d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">{props.duration}</p>
                <p className="text-xs text-muted-foreground">{props.totalHours}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-[#FF80AB] rounded-lg mx-auto mb-2">
                  <div id="certificate">
                    <svg
                      width="28px"
                      className=""
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
                          d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {props.totalVideos} Videos
                </p>
                <p className="text-xs text-muted-foreground">{props.level}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-[#00BCD4] rounded-lg mx-auto mb-2">
                  <div id="certificate">
                    <svg
                      width="24px"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      stroke="none"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>certificate-check</title>{" "}
                        <g id="Layer_2" data-name="Layer 2">
                          {" "}
                          <g id="invisible_box" data-name="invisible box">
                            {" "}
                            <rect width="48" height="48" fill="none"></rect>{" "}
                            <rect width="48" height="48" fill="none"></rect>{" "}
                          </g>{" "}
                          <g id="icons_Q2" data-name="icons Q2">
                            {" "}
                            <path d="M20.6,23.4l-4-3.9a2.1,2.1,0,0,1-.2-2.7,1.9,1.9,0,0,1,3-.2L22,19.2l6.6-6.6a2,2,0,0,1,2.8,2.8l-8,8A1.9,1.9,0,0,1,20.6,23.4Z"></path>{" "}
                            <path d="M40,18A16,16,0,1,0,15,31.2V43.9A2.1,2.1,0,0,0,17,46a1.5,1.5,0,0,0,1.1-.4L24,41l5.9,4.6A1.5,1.5,0,0,0,31,46a2.1,2.1,0,0,0,2-2.1V31.2A16,16,0,0,0,40,18ZM12,18A12,12,0,1,1,24,30,12,12,0,0,1,12,18ZM29,39.8l-4.4-3.4a.9.9,0,0,0-1.2,0L19,39.8V33.2a16.9,16.9,0,0,0,5,.8,16.9,16.9,0,0,0,5-.8Z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">Certified</p>
                <p className="text-xs text-muted-foreground">Completion</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3 ">Course Highlights</h4>
              <div className="grid grid-cols-1 gap-2">
                {props.highlights.slice(0, 4).map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-sm text-muted-foreground"
                  >
                    <span className={`before:content-['•'] ml-2`}>
                      &nbsp;&nbsp;{highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-[#00BCD4]">₹{props.price}</span>

                <span className="text-lg text-muted-foreground line-through">
                  ₹{props.originalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"> */}
      {/* {[...Array(10)].map((_, i) => ( */}
      <div className="rounded-2xl bg-white shadow-2xl m-10">
        <div className="rounded-xl !m-2 translate-y-2 flex align-bottom overflow-hidden">
          <img
            src={
              props.image ? `http://localhost:5000${props.image}` : "/images/cake-2.jpg"
            }
            alt="course-img"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "/images/cake-2.jpg";
            }}
            className="rounded-xl hover:scale-104 transition-all duration-200"
          />
        </div>
        <div className="p-5 w-full">
          <h2 className="font-semibold text-2xl ">{props.title}</h2>
          <p className="">{props.description}</p>
          <div className="space-y-2 my-5">
            <div className="flex items-center ">
              <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
              <span className="">
                {props.highlights[0] ? props.highlights[0] : "Course highlight"}
              </span>
            </div>
            <div className="flex items-center ">
              <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
              <span className="">
                {props.highlights[1] ? props.highlights[1] : "Course highlight"}
              </span>
            </div>
            <div className="flex items-center ">
              <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
              <span className="">
                {props.highlights[2] ? props.highlights[2] : "Course highlight"}
              </span>
            </div>
            <div className="flex items-center ">
              <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
              <span className="">
                {props.highlights[3] ? props.highlights[3] : "Course highlight"}
              </span>
            </div>
            <div className="flex items-center ">
              <div className="w-2 h-2 rounded-full bg-sky-500 mr-3"></div>
              <span className="">
                {props.highlights[4] ? props.highlights[4] : "Course highlight"}
              </span>
            </div>
          </div>

          <Link
            className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-xl bg-sky-500 px-8 py-4 text-white"
            href="#"
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <GraduationCap size={25} />
            </span>

            <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
              <span>Buy now</span>&nbsp;&nbsp;
              <span>₹{props.price}</span>&nbsp;&nbsp;
              <span className="line-through">₹{props.originalPrice}</span>
            </span>
          </Link>
        </div>
      </div>
      {/* ))} */}
      {/* </div> */}
    </div>
  );
}

export default OnlineCourseCard;
