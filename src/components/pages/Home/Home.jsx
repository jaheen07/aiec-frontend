import { useEffect, useState } from "react";
import HeroAria from "./HeroAria";
import HomeAbout from "./HomeAbout";
// import HomeBlogs from "./HomeBlogs";
import HomePartnership from "./HomePartnership";
import HomeTestimonial from "./HomeTestimonial";
import HomeBlogsSection from "./HomeBlogsSection";
import HomeCourseSection from "./HomeCourseSection";
import socialImg from "../../../../public/img/unnamed.jpg";
import Roadmap from "./Sections/Roadmap";
import HomeConsultantSection from "./Sections/HomeConsultantsection";
import { Link, useLocation } from "react-router-dom";
import { AiFillUpCircle } from "react-icons/ai";
import { GoMoveToTop } from "react-icons/go";
import { FaArrowCircleUp } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Home = () => {
  const [scrollNav, setScrollNav] = useState(false);
  const location = useLocation();

  const scrollEffect = () => {
    const scrollTop = window.scrollY;

    if (scrollTop >= 50) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollEffect);

    return () => {
      window.removeEventListener("scroll", scrollEffect);
    };
  }, []);
  // scrollTo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Helmet>
        <meta name="description" content="AI Expert Career is the first ever AI based Ed-tech and Consultancy Service Platform in Bangladesh.Explore our AI courses, career guidelines, consultancy services."/>
        <meta name="keywords" content="ai expert career,edtech, ai guideline, ai career guideline, ai consultancy, ai blog, ai, ai expert, ai expert bd, ai consultancy in bangladesh , ai consultancy in bd" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Expert Career|Home" />
        <meta property="og:url" content="https://www.aiexpertcareer.com" />
        <meta property="og:description" content="AI Expert Career is the first ever Artificial Intelligence based Ed-tech and Consultancy Service Platform in Bangladesh. Explore our AI courses, career guidelines and consultancy services." />
        <meta property="og:site_name" content=" AI Expert Career " />
        <meta name="og:image" content={socialImg} />
        
        <link rel="canonical" href= {`https://www.aiexpertcareer.com/`}/>
        
        <meta name="geo.region" content="BD-13" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="24.476929;90.293441" />
        <meta name="ICBM" content="24.476929, 90.293441" />
      </Helmet>

      {/* Google Tag Manager (noscript) */}
      {/* <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLCLKWNK"
         height="0"
         width="0"
         style="display:none;visibility:hidden">
        </iframe>
      </noscript> */}
      {/* End Google Tag Manager (noscript) */}
      <HeroAria />
      
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8">
        <HomeAbout />
        
      </div>
      
      {/* <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8"> */}
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8">

        {/* <HomeSearch /> */}
        
        <HomeCourseSection />
        <Roadmap />
        <HomeConsultantSection />
        {/* <HomeHeading /> */}
        <HomeBlogsSection />
        <HomeTestimonial />
        {/* <HomeEvent /> */}
        <HomePartnership />
      </div>

      <div
        className={`transform ${
          scrollNav ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-1000 fixed right-1 bottom-2 z-50  rounded-full`}
      >
        <div
          className={` md:tooltip tooltip-left  duration-200 ${
            scrollNav ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
          data-tip="Scroll to top"
        >
          {scrollNav && (
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              spy= "true"
              smooth="true"
              offset={-150}
              duration={500}
            >
              <FaArrowCircleUp className="text-2xl font-semibold text-black rounded-full shadow-xl md:text-2xl md:w-8 md:h-8" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
