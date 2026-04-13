/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GraduationCap, Star, Clock, Users } from "lucide-react";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const full = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 >= 0.5;

        return (
          <div key={i} className="relative w-5 h-5">
            {/* gray star */}
            <Star className="absolute text-gray-300 w-5 h-5 fill-gray-300" />

            {/* full star */}
            {full && <Star className="absolute w-5 h-5 text-amber-500 fill-amber-500" />}

            {/* half star */}
            {half && (
              <div className="absolute overflow-hidden w-1/2">
                <Star className="text-amber-500 w-5 h-5 fill-amber-500" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OnlineCourseCard(props) {
  const location = useLocation();
  // console.log("path: ", location.pathname);
  const isMyLearning = location.pathname.startsWith("/courses/my-learning");

  return (
    <div className="">
      <div className="rounded-2xl bg-white shadow-lg m-10">
        <div className="rounded-xl !m-2 h-60 w-auto translate-y-2 flex align-bottom overflow-hidden">
          <img
            src={
              props.thumbnail
                ? `http://localhost:5000${props.thumbnail}`
                : "/images/fallback.png"
            }
            alt="course-img"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "/images/fallback.png";
            }}
            className="rounded-xl hover:scale-104 transition-all object-cover object-center duration-200 w-full h-full"
          />
        </div>

        <div className="p-5 w-full flex flex-col justify-between h-80">
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">{props.title}</h2>
            <p className="text-gray-700 line-clamp-2">{props.description}</p>
            <p className="text-gray-700">
              <Clock className="inline" size={15} /> {props.duration} •{" "}
              {/* <Users className="inline" size={15} />  */}
              {props.totalStudents ? props.totalStudents : 0} students
            </p>

            <div className="flex gap-2 items-center">
              <p className="text-2xl font-semibold">{props.rating}</p>
              <div>
                <StarRating rating={props.rating} />
              </div>
              <p className="text-gray-400">({props.totalReviews})</p>
            </div>

            <p className="text-2xl font-semibold new-primary-text">
              {props.discountedPrice && props.originalPrice ? (
                <>
                  ₹{props.discountedPrice}{" "}
                  <span className="line-through text-gray-600 ml-2 text-lg">
                    ₹{props.originalPrice}
                  </span>
                </>
              ) : (
                <></>
              )}
            </p>
          </div>

          {/* new link */}
          <div>
            {isMyLearning ? (
              <Link
                to={props.link}
                state={{ courseId: props.courseId }}
                className=" text-center block mt-3 w-full rounded-xl transition-all new-primary-bg active:scale-98 shadow-md px-8 py-4 text-white"
              >
                Watch Now
              </Link>
            ) : (
              <Link
                to={props.link}
                state={{ courseId: props.courseId }}
                className="text-center block mt-3 w-full rounded-xl transition-all new-primary-bg active:scale-98 shadow-md px-8 py-4 text-white"
              >
                Buy Now
              </Link>
            )}
          </div>

          {/* old link */}
          {/* <Link
              to={props.link}
              state={{ courseId: props.courseId }}
              className="text-center block mt-3 w-full rounded-xl transition-all new-primary-bg active:scale-98 shadow-md px-8 py-4 text-white"
            >
              {isMyLearning ? "Watch Now" : "Buy Now"}
            </Link> */}
        </div>
      </div>
    </div>
  );
}
export default OnlineCourseCard;
