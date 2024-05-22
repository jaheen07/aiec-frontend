import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import BlogCard from "../Blog/BlogCard";
import { Link, useParams } from "react-router-dom"; // Import useParams
import { useContext } from "react";
import { MyContext } from "../../../Context/Context";
import useCourses from "../../../hooks/UseCourses";
import CourseCard from "../Courses/CourseCard";
import Loader from "../../common/loader/Loader";

const categories = ["Free", "Fundamental", "Professional"];

const HomeCourseSection = () => {
  const { language } = useContext(MyContext);
  const [courses, isLoading] = useCourses();
  const { category } = useParams(); // Get the selected category from the URL
  if (isLoading) return <Loader />;
  return (
    <div className="mt-5 mb-10 md:mt-20">
      <h2 className="md:text-[40px] text-[28px] font-bold text-center">
        {language == "bn" ? "কোর্স সমূহ" : "Choose Your AI Journey"}
      </h2>
      <h3 className="text-center text-[14px] md:text-[16px] md:px-24">
        {language == "bn"? <>টেক বা নন টেক ব্যাকগ্রাউন্ড সহ যেকোনো প্রফেশন থাকুক না কেনো,<br/> আমাদের ফাউন্ডেশন লেভেল থেকে শুরু করে জব রিকোয়ারমেন্ট বেইজড হ্যান্ডস অন কোর্সের মাধ্যমে নিজেকে এগিয়ে রাখুন এ আই ফিল্ডে।</> : "We are the first-ever Artificial Intelligence based Ed-tech and Consultancy Service Platform in Bangladesh" }
      </h3>

      <div className="px-2 py-5 mx-auto md:py-16 sm:px-0">
        <Tab.Group>
          <div className="justify-between md:flex">
            <Tab.List className="flex p-1 overflow-x-auto text-black border rounded-lg md:space-x-5 md:w-3/4 whitespace-nowrap">
              {categories.map((cat) => (
                <Tab
                  key={cat}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2 text-sm  leading-5 text-black
                  ring-white/60  focus:outline-none font-semibold mr-2
                  ${
                    selected
                      ? "bg-black shadow text-white px-2"
                      : "text-black hover:bg-black hover:text-white px-2"
                  }`
                  }
                >
                  {cat} Courses
                </Tab>
              ))}
            </Tab.List>
            <Link
              to="/courses"
              className="flex justify-center mt-5 normal-case border-black btn btn-md btn-ghost btn-outline hover:shadow-lg hover:bg-black hover:text-white md:mt-0"
            >
              {language == "bn" ? "সকল কোর্স দেখুন" : "View All Courses"}
              
            </Link>
          </div>
          <Tab.Panels className="mt-2">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              categories.map((cat, index) => (
                <Tab.Panel
                  key={index}
                  className="bg-white rounded-full md:p-3 focus:outline-none "
                >
                  <div className="pt-3 grid gap-x-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-[24px] md:gap-[34px] mb-10">
                    {courses
                      .filter((course) => course.mainCategory === cat)
                      .slice(0, 8)
                      .map((filteredCourse, idx) => (
                        <CourseCard
                          key={idx}
                          course={filteredCourse}
                        ></CourseCard>
                      ))}
                    {courses.filter((course) => course.mainCategory === cat)
                      .length === 0 && (
                      <div
                        className="flex items-center justify-center text-center col-span-full"
                        style={{ gridColumn: "1 / -1" }}
                      >
                        <p className="text-lg">Courses are Coming Soon</p>
                      </div>
                    )}
                  </div>
                  <Link
                    state={courses}
                    to={`/allCourses/${cat}`} // Use the selected category to generate the link
                    className="flex justify-center mx-auto btn-view w-fit "
                  >
                     {language == "bn" ? "আরো দেখুন" : "View More"}
                    
                  </Link>
                </Tab.Panel>
              ))
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default HomeCourseSection;
