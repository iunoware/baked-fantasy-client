/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GraduationCap } from "lucide-react";

function OnlineCourseCard(props) {
  return (
    <div className="">
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"> */}
      {/* {[...Array(10)].map((_, i) => ( */}
      <div className="rounded-2xl bg-white shadow-xl m-10">
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
            to={`/courses/course-payment-page/${props.endPoint}`}
            state={{ price: props.price, courseId: props.endPoint }}
            className="group mt-3 w-full relative inline-flex items-center overflow-hidden rounded-xl bg-sky-500 px-8 py-4 text-white"
          >
            <span className="absolute -start-full transition-all group-hover:start-4">
              <GraduationCap size={25} />
            </span>

            <span className="text-lg w-full text-center font-medium transition-all group-hover:ms-4">
              <span>Buy now</span>&nbsp;&nbsp;
              <span>₹{props.price}</span>&nbsp;&nbsp;
              <span className="line-through">₹{props.originalPrice}</span>
              {/* {export let price = props.price} */}
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
