import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import completed from "../../../../assets/aiload/completed.json";
import { useEffect } from "react";

const CompletePurchaseCourse = () => {
    const location = useLocation();
    

     // scrollTo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
    return (
      <div className="h-[80vh] mt-20 flex  justify-center items-center">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLCLKWNK"
          height="0"
          width="0"
          style="display:none;visibility:hidden">
          </iframe>
        </noscript>
        <div className="text-center md:section md:text-2xl w-[500px] h-[500px] flex flex-col mx-auto justify-center items-center text-xl space-y-3">
          <div className="w-32">
            <Lottie
              className="w-full pointer-events-none select-none no-select unselectable"
              animationData={completed}
              loop={true}
            />
          </div>
          <h1>Congratulations!</h1>
          <h3>You've Successfully Enrolled the course</h3>
          <h5>Please wait for a confirmation email with instructions. Keep your eyes on mail inbox/spam. </h5>
          {/* <p>Course Name : {title}</p> */}
          <p className ="font-semibold text-black-600">For Emergency - 01995536898</p>
        </div>
      </div>
    );
};

export default CompletePurchaseCourse;