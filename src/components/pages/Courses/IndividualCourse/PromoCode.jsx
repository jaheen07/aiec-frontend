/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../../../Context/Context";
import moment from "moment";

const PromoCode = ({
  discountAmount,
  discount,
  courseFee,
  course,
  enrolled,
  endDate,
}) => {
  const { language } = useContext(MyContext);
  const [promo, setPromo] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState("");
  const [payable, setPayable] = useState("");
  const [promoUpdate, setUpdate] = useState("");
  const [finalPromo, setfinalpromo] = useState("");

  useEffect(() => {
    fetch("https://ai-server-sooty.vercel.app/promo")
      .then((response) => response.json())
      .then((data) => setPromo(data));
  }, []);

  const applyPromoCode = () => {
    const matchingPromo = promo.find((p) => p.promo === appliedPromo && p.course_name === course.title || p.promo === appliedPromo && p.course_name === "All");

    
    if (matchingPromo) {
      setfinalpromo(matchingPromo.promo)
      const discountPercentage = parseFloat(matchingPromo.discount);
      const discountedAmount = (discountPercentage / 100) * discountAmount;
      const newdiscountAmount = discountAmount - discountedAmount;
      setPayable(newdiscountAmount);

      setUpdate("The Price is reduced by ৳ " + discountedAmount.toFixed(0));
      return newdiscountAmount.toFixed(0);
    } else {
      setUpdate("The Promo Code is not valid");
      setPayable(discountAmount)
      setfinalpromo("")
      
      // Promo code not found
      return discountAmount;
    }
  };
  const now = moment().utcOffset("+06:00");
  const parsedEndDate = moment(endDate, "YYYY-MM-DD HH:mm:ss").utcOffset(
    "+06:00"
  );
  const endOfAdmission = moment(parsedEndDate).endOf("day");
  const endDiff = moment.duration(endOfAdmission.diff(now));

  return (
    <div>
      <section className="p-1 my-5 space-y-5 font-semibold text-slate-900 ">
        <p className="flex justify-between border-b-2 ">
          <span className="text-xl">
            {" "}
            {language == "bn" ? "কোর্সের মূল্য:" : "Course Fee:"}
          </span>{" "}
          {discount ? (
            discount != 0 ? (
              <span className="mx-2 text-gray-500 line-through text-md">
                ৳ {courseFee} 
              </span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <span className="text-xl">৳{discountAmount}</span>
          {/* <span className="ml-4 text-red-600"> Save: {discount}%</span> */}
        </p>
        <div className="flex items-center justify-center gap-3">
          {" "}
          <input
            type="text"
            placeholder="Enter Promo Code"
            value={appliedPromo}
            onChange={(e) => setAppliedPromo(e.target.value)}
            className="input input-bordered border-primary rounded-md input-sm w-full max-w-[300px] py-6 text-black text-lg"
          />
          <button
            onClick={() => {
              applyPromoCode();
              // Update the state or perform any other actions if needed
            }}
            className="btn-view btn-sm w-[20%] text-md"
          >
            Apply
          </button>
        </div>
        <p className="font-thin text-center text-slate-600">{promoUpdate}</p>
        {/* TODO _________ change the final amount by fetching the dis count */}
        <p className="flex justify-between text-xl border-b-2 ">
          {language == "bn" ? "সর্বমোট:" : "Payable Total:"}
          <span className="font-normal">
            ৳ {payable ? payable.toFixed(0): discountAmount.toFixed(0)}{" "}
          </span>{" "}
          
        </p>
        <div className="text-center md:block">
          {enrolled ? (
            <div>
              <p>You&apos;ve Enrolled Already</p>
              <Link className="text-blue-600 " to="/dashboard/my-courses">
                Check Here
              </Link>
            </div>
          ) : (
            <Link
              to="/enroll"
              state={{ course, payable, discountAmount, courseFee, finalPromo}}
              disabled={endDiff.asMilliseconds() < 0}
              className="w-full text-lg text-white bg-black text btn hover:bg-black hover:text-white"
            >
              Enroll Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default PromoCode;
