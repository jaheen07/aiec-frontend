import { useLocation, useParams } from "react-router-dom";
import CourseCard from "../CourseCard";
import { useEffect } from "react";
import { useState } from "react";

const AllCategoryCourses = () => {
  const { category } = useParams();
  const location = useLocation();
  const courses = location.state;
  const filteredCourses = courses?.filter(
    (course) => course.category == category
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;


  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the sorted and filtered data for pagination
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-11/12 mx-auto mt-32 mb-10">
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLCLKWNK"
         height="0"
         width="0"
         style="display:none;visibility:hidden">
        </iframe>
      </noscript>
      <h1 className="my-10 text-3xl text-center">All {category} Courses</h1>
      {paginatedCourses.length > 0 ? (
        <>
          <div className="grid justify-center gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCourses?.map((course) => (
              <CourseCard key={course._id} course={course}></CourseCard>
            ))}
          </div>
          {/* pagination */}
          {paginatedCourses.length > 12 ? (
            <div className="flex justify-center mt-8">
              <button
                className={`px-4 py-2 rounded-md mx-2 ${
                  currentPage === 1
                    ? "bg-slate-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-slate-200 hover:bg-gray-300 text-gray-700"
                  } px-3 py-1 mx-1 rounded-md cursor-pointer`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className={`px-4 py-2 rounded-md mx-2 ${
                  currentPage === totalPages
                    ? "bg-slate-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div>
          <h3 className="text-3xl h-[40vh] flex justify-center items-center">
            Courses are Coming Soon
          </h3>
        </div>
      )}
    </div>
  );
};

export default AllCategoryCourses;
