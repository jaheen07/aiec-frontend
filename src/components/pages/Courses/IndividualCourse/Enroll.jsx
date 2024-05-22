import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import UseUsers from "../../../../hooks/useUsers";
import { toast } from "react-toastify";
import PromoCode from "./PromoCode";
import { useContext } from "react";
import { MyContext } from "../../../../Context/Context";
import { AuthContext } from "../../../../Context/AuthProvider";
import useEnrollmentCheck from "../../../../hooks/useEnrollmentCheck";
import { useForm } from "react-hook-form";

const Enroll = () => {
  const location = useLocation();
  const { language } = useContext(MyContext);
  const { user } = useContext(AuthContext);
  const { course, payable, discountAmount, courseFee, discount, finalPromo } = location.state;
  const { _id, title } = course;
  // const [userinfo] = UseUsers();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [tId, setTid] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setcell] = useState("");
  const [paymethod, setmethod] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const enrolled = useEnrollmentCheck(_id);
  const { handleSubmit } = useForm();


 
  const getSubmit = async () => {
    //  const usercheck = userinfo.find((u)=> u.displayName === name && u.email === email);
    
    try {
      // Prepare Enroll Data
      const courseData = {
        name: name,
        email: email,
        courseId: _id,
        courseTitle: title,
        course: course,
        progress: 0,
        certificate: false,
        tId: tId,
        sender: number,
        amount: payable || discountAmount,
        courseModel: course?.courseModel,
        coupon: finalPromo,
        paymethod: paymethod,
        status: "pending",
      };

      
        // const userData = {
        //   displayName: name,
        //   email: email,
        //   phone: phone,
        //   role: "user",
        // };
      
        // const userResponse = await fetch(
        //   "https://ai-server-sooty.vercel.app/users",
        //   {
        //     method: "POST",
        //     headers: {
        //       "content-type": "application/json",
        //     },
        //     body: JSON.stringify(userData),
        //   }
        // );

        
        
     

      // Send Course Data to API
      const apiResponse = await fetch(
        "https://ai-server-sooty.vercel.app/enroll",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Course insertion failed");
      }

      const responseData = await apiResponse.json();

      if (responseData.insertedId) {
        toast.success("You've Successfully Enrolled the Course");
        navigate("/complete-enroll");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, try again");
    }
  };

  const handleTIdChange = (event) => {
    const id = event.target.value;
    setTid(id);
  };

  const isValidPhoneNumber = (input) => /^01\d{9}$/.test(input);

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;

    if (isValidPhoneNumber(newNumber) || newNumber === "") {
      setNumber(newNumber);
      setError("");
    } else {
      // Handle invalid input (e.g., show a message or prevent updating state)
      setError("Please enter a valid number");
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     toast.error("You need to log in first");
  //     navigate("/login", { state: { from: location } });
  //   }
  // }, [user]);

  // if(!user) {
  //   toast.error("You need to log in first");
  //   navigate("/login", { state: { from: location}});
  // }

  return (
    <>
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLCLKWNK"
         height="0"
         width="0"
         style="display:none;visibility:hidden">
        </iframe>
      </noscript>
      {enrolled ? (
        <div className="h-[50dvh] mt-32">
          <div className="w-11/12 mx-auto my-5 text-xl section md:my-10 md:w-2/5 md:p-14">
            <p>You&apos;ve Enrolled Already</p>
            <Link className="text-blue-600 " to="/dashboard/my-courses">
              Check Here
            </Link>
          </div>
        </div>
      ) : (
        <div className="md:flex justify-evenly md:h-[100vh] mb-10 px-3 mt-20 md:px-0 md:mt-20 ">
          <div className="p-5 my-5 mb-10 space-y-3 text-xl md:mt-0 md:w-2/5 h-fit">
            {/* <h1 className="my-4 text-3xl font-bold">Billing Information</h1> */}
            <p className="text-3xl font-semibold">Course Name: {title}</p>

            <div>
              <section className="p-1 my-5 space-y-4 font-semibold text-slate-900 ">
                <div className="space-y-4 md:block">
                  <p className="flex justify-between border-b-2 ">
                    <span className="text-xl">
                      {" "}
                      {language == "bn" ? "কোর্সের মূল্য:" : "Course Fee:"}
                    </span>{" "}
                    {discount ? (
                      <span className="mx-2 text-gray-500 line-through text-md">
                        ৳ {courseFee}
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="text-xl">৳{discountAmount}</span>
                    {/* <span className="ml-4 text-red-600"> Save: {discount}%</span> */}
                  </p>

                  {finalPromo ? (
                  <p className="flex justify-between border-b-2 ">
                    <span className="text-xl">
                      {language == "bn" ? "প্রোমো কোড:" : "Promo Code:"}
                    </span>
                    <span className="text-red-500 text-md">
                      {finalPromo}
                    </span>
                  </p>):""}
                  
                  <br />

                  <p className="flex justify-between text-xl border-b-2 ">
                    {language == "bn" ? "সর্বমোট:" : "Sub Total:"}
                    <span className="font-normal">
                      ৳{" "}
                      {payable ? payable.toFixed(0) : discountAmount.toFixed(0)}{" "}
                    </span>{" "}
                  </p>
                </div>

                {/* <div className="md:hidden">
                  <PromoCode
                    discountAmount={discountAmount}
                    courseFee={courseFee}
                    discount={discount}
                    course={course}
                  />
                </div> */}

                <br />
                
                {language == "bn" ? (
                  <>
                    <p className="text-sm font-normal">
                      আপনি নিম্নলিখিত পদক্ষেপগুলি অনুসরণ করে আপনার পেমেন্ট
                      সম্পূর্ণ করতে হবে:
                    </p>
                    {/* <ol className="pl-5 list-decimal">
                      <li className="text-sm font-normal">
                        নিম্নোক্ত নম্বরে{" "}
                        <span className="text-lg text-primary">
                          {payable ? payable : discountAmount}
                        </span>{" "}
                        টাকা সরবরাহ করুন:
                        <p>
                          <span>
                            {" "}
                            বিকাশ -
                            <span className="text-lg text-primary">
                              {" "}
                              ০১৯৯৫৫৩৬৮৯৮
                            </span>{" "}
                          </span>
                          <span>
                            <br /> নগদ -
                            <span className="text-lg text-primary">
                              {" "}
                              ০১৮২৭১০০২৪২ <br />
                            </span>{" "}
                          </span>
                        </p>
                      </li>

                      <li className="text-sm font-normal">
                        নীচের ইনপুট ফিল্ডে আপনার লেনদেনের ট্রান্সঅ্যাকশন আইডি
                        এবং যে মোবাইল নম্বরটি ব্যবহার করেছেন, সেই নম্বরটি প্রদান
                        করুন।
                      </li>
                      <li className="text-sm font-normal">
                        "সাবমিট" বোতামে ক্লিক করুন এবং অ্যাডমিনের অনুমোদনের জন্য
                        অপেক্ষা করুন।
                      </li>
                    </ol> */}
                  </>
                ) : (
                  <div className="p-4 mt-12 bg-slate-100">
                    <p className="mb-5 text-md">
                      To complete your payment, please follow these steps:
                    </p>
                    {/* <ol className="pl-5 my-2 space-y-2 list-decimal">
                      <li className="text-sm font-normal">
                        Transfer{" "}
                        <span className="text-lg text-primary">
                          {payable
                            ? payable.toFixed(0)
                            : discountAmount.toFixed(0)}
                        </span>{" "}
                        TK to the following number:
                        <p>
                          <span>
                            {" "}
                            Bkash -
                            <span className="text-lg text-primary">
                              {" "}
                              01995536898
                            </span>{" "}
                          </span>
                          <span>
                            <br /> Nagad -
                            <span className="text-lg text-primary">
                              {" "}
                              01827100242 <br />
                            </span>{" "}
                          </span>
                        </p>
                      </li>

                      <li className="text-sm font-normal">
                        Enter your Transaction ID and the phone number you used
                        for the transaction in the input fields below.
                      </li>
                      <li className="text-sm font-normal">
                        Click the "Submit" button to request Admin approval.
                      </li>
                    </ol> */}
                    <span className="font-normal text-md">
                      01. Go to your Nagad app or Bkash app <br />
                      02. Choose “Send Money” <br />
                      03. Enter below Nagad/Bkash Account Number: <br />
                      <ul className="ml-5"> 
                        <li>For Nagad - <span className="text-red-500">01827100242</span></li> 
                        <li>For Bkash - <span className="text-red-500">01995536898</span></li> 
                      </ul>
                      04. Enter sub total amount <br />
                      05. Now enter your Account PIN to confirm the transaction <br />
                      06. Copy Transaction ID from payment confirmation message and paste that Transaction ID in the Billing Information form. <br />
                    </span>
                  </div>
                )}
              </section>
                
            </div>

            
          </div>

          <div className="p-5 my-5 mb-10 space-y-3 text-xl md:mt-0 md:w-[30%] h-fit">
            <h1 className="my-4 text-3xl font-bold">Billing Information</h1>
            

            <div>
              <form onSubmit={handleSubmit(getSubmit)}>
              <section className="p-1 my-5 font-semibold text-slate-900 ">
              <label className="flex items-center mb-1 text-md">
                  Name:
                </label>
                <input
                  required
                  type="text"
                  onChange={(event)=>{setname(event.target.value)}}
                  placeholder="Enter Your Name"
                  className="w-full max-w-xs py-6 mb-3 text-lg font-normal input input-bordered input-sm"
                />

                <label className="flex items-center mb-1 text-md">
                  Email:
                </label>
                <input
                  required
                  type="text"
                  onChange={(event)=>{setemail(event.target.value)}}
                  placeholder="Enter Your Email"
                  className="w-full max-w-xs py-6 mb-3 text-lg font-normal input input-bordered input-sm"
                />
                <label className="flex items-center mb-1 text-md">
                  Phone:
                </label>
                <input
                  required
                  type="text"
                  onChange={(event)=>{setphone(event.target.value)}}
                  placeholder="Enter Your Phone"
                  className="w-full max-w-xs py-6 mb-3 text-lg font-normal input input-bordered input-sm"
                />
                <label className="flex items-center mb-2 text-md">
                  Payment Method:
                </label>
                <select
                required
                type="text"
                onChange={(event) => {setmethod(event.target.value)}}
                className="input input-bordered  w-[70%] text-black/70 mb-3">
                <option value="">Select a method</option>
                <option value="nagad" className="py-8"> NAGAD</option>
                <option value="bkash" className="py-8"> Bkash</option>

                </select>

                <label className="flex items-center gap-3 mb-1 text-md">
                  Transaction ID (Trx):
                </label>  
                  <input
                    required
                    type="text"
                    onChange={handleTIdChange}
                    placeholder="Example; 2M4AKQ"
                    className="w-full max-w-xs py-6 mb-3 text-lg font-normal input input-bordered input-sm"
                  />
                  
                
                <label className="flex items-center gap-3 mb-1 text-md">
                  Sender Number: 
                </label>  
                <input
                  required
                  type="tel"
                  onChange={handleNumberChange}
                  placeholder="01xxxxxxxxx"
                  className="w-full max-w-xs py-6 mb-3 text-lg font-normal input input-bordered input-sm"
                />
                <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="bg-black checkbox-black checkbox-xs md:checkbox-sm checkbox-error "
              />
              <Link
                to="/policies/Terms-&-Conditions"
                className="flex items-center gap-3 text-sm"
              >
                {language == "bn" ? (
                  "সমস্ত শর্তাবলীর সাথে রাজী হোন"
                ) : (
                  <p>
                    Accept All{" "}
                    <span className="font-semibold underline">
                      Terms and Conditions
                    </span>
                  </p>
                )}
              </Link>
              <br />
            </div>
            <button
            type="submit"
              
              // disabled={
              //   error.length > 0 ||
              //   !isChecked ||
              //   tId.length < 6 ||
              //   number.length < 11 
              // }
              // state={title}
              // to="/complete-enroll"
              className="w-[70%] mt-6 bg-black text-white text-[100%] hover:bg-black hover:text-white p-3"
            >
              Confirm Purchase
            </button> 
                
              </section>
              </form>
              <p className="text-sm text-primary">{error ? error : ""}</p>
            </div>

            
          </div>
          
        </div>
      )}
    </>
  );
};

export default Enroll;