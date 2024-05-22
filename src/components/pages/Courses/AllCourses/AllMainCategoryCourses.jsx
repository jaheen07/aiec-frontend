import { useLocation, useParams } from "react-router-dom";
import CourseCard from "../CourseCard";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";

const AllMainCategoryCourses = () => {
  const { mainCategory } = useParams();

  const location = useLocation();
  const courses = location.state;
  const filteredCourses = courses?.filter(
    (course) => course.mainCategory == mainCategory
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



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
      <Helmet>
        <meta name="description" content={`Explore all the ${mainCategory} AI courses in bangla that AI Expert Career is offering to you to enhance your career and be the next AI specialist.`}/>
        <meta name="keywords" content="ai expert career,edtech, ai courses,ai courses in bangla,bangla ai courses,how to become ai expert, machine learning courses in bd, power bi, BI, tablue, excel, data analysis, data science courses in bd, free data science courses, free data analysis courses in bd, fundamental courses, professional courses in bd" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`AI Expert Career|${mainCategory} courses`} />
        <meta property="og:url" content="https://www.aiexpertcareer.com" />
        <meta property="og:description" content="AI Expert Career is the first ever Artificial Intelligence based Ed-tech and Consultancy Service Platform in Bangladesh. Explore our AI courses, career guidelines and consultancy services." />
        <meta property="og:site_name" content=" AI Expert Career " />
        {/* <meta name="og:image" content={socialImg} /> */}
        
        {/* <link rel="canonical" href= {`https://www.aiexpertcareer.com`}/> */}
        
        <meta name="geo.region" content="BD-13" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="24.476929;90.293441" />
        <meta name="ICBM" content="24.476929, 90.293441" />
      </Helmet>
      <h1 className="my-10 text-3xl text-center">All {mainCategory} Courses</h1>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
{
  paginatedCourses.length > 0 ? <>{paginatedCourses?.map((course) => (
    <CourseCard key={course._id} course={course}></CourseCard>
  ))}</> :  <div
  className="flex items-center justify-center text-center col-span-full"
  style={{ gridColumn: "1 / -1" }}
>
  <p className="text-lg">Courses are Coming Soon</p>
</div>
}

        
      </div>
      {/* pagination */}
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
    </div>
  );
};

export default AllMainCategoryCourses;
