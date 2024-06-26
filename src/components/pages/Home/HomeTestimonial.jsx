
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import { BsQuote } from "react-icons/bs";
import { MyContext } from "../../../Context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../common/loader/Loader";
import LazyLoad from "react-lazy-load";

const HomeTestimonial = () => {
  const { language } = useContext(MyContext);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch("https://ai-server-sooty.vercel.app/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedback(data);
        // setIsLoading(false);
      });
  }, []);
  if(!feedback) return <Loader/>
  return (
    <div className="mt-[80px] mb-[35px] relative">
      <h3 className="text-center font-bold text-[30px]">
        {" "}
        {language === "bn" ? "শিক্ষার্থীরা যা বলছেন" : "Our Testimonial"}
      </h3>
     
      <div className="mx-auto ">
        <Swiper
          // slidesPerView={3}
          // spaceBetween={30}
          autoplay={{
            delay: 3000,
          }}
          loop={true}
          breakpoints={{
            440: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper "
        >
          {feedback?.map(({ _id, name, imageURL, designation, feedback }) => (
            <SwiperSlide key={_id} className="pb-16 ">
              <div className="p-10 mx-7 bg-[#fff] shadow-[0_-5px_30px_rgba(217,217,217,217)] rounded-[20px] text-center mt-[120px] relative">
                <span className="absolute left-[16px] top-[-15px]">
                  <BsQuote className="text-4xl text-black" />
                </span>
               <LazyLoad>
                  <img
                    className="w-20 h-20 mx-auto rounded-full"
                    src={imageURL}
                    alt="reviewer"
                    />
                    </LazyLoad>

                <h3 className="text-[20px] font-bold mt-4">{name}</h3>
                <h4 className="text-[14px]   mb-[15px]">
                  {designation}
                </h4>
                <p className="text-sm">{feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
      </div>
    </div>
  );
};

export default HomeTestimonial;
