/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CourseCart = ({ courseData, userId }) => {
  const { course, _id } = courseData;

  return (
    <div className="flex w-11/12 mx-auto section md:w-96 md:p-5">
      <img src={course?.cover} alt="" className="w-32 h-20 mr-4" />
      <div className="space-y-1 md:space-y-3">
        <h3 className="font-bold">{course.title}</h3>
        {/* <p className="text-sm font-bold text-black/70">{course.instructor}</p> */}

        {/* <div className="w-full bg-[#D9D9D9] h-4 rounded-full mb-1"> */}
          {/* <div
            className="bg-[#ED1B24] h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p
          className={`text-primary ${
            progress === 100 ? "text-[10px] font-bold" : ""
          }`}
        >
          {progress === 100 ? "Completed" : `${progress}% Complete`}
        </p> */}
        <div className="h-6  w-[129px]  rounded-full text-white font-bold text-sm">
          {
            courseData?.courseModel === 'live' ?
            <Link
            disabled={courseData.status === "pending"}
            className="btn-add"
            to={course?.liveInstruction}
            target="_blank"
            >
            Continue
            </Link>
            
             :  <Link
            disabled={courseData.status === "pending"}
            className=" btn-add"
            to={`/my-course/${_id}`}
            state={{course, userId}}
          >
            Continue
          </Link>
          }
         
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
