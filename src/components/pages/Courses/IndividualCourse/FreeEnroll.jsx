import { Link, useLocation, useNavigate } from "react-router-dom";
import UseUser from "../../../../hooks/useUser";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { MyContext } from "../../../../Context/Context";
import { useEffect } from "react";
import { AuthContext } from "../../../../Context/AuthProvider";
import useEnrollmentCheck from "../../../../hooks/useEnrollmentCheck";

const FreeEnroll = () => {
  const { language } = useContext(MyContext);
  const { user } = useContext(AuthContext);
  const [userinfo] = UseUser();
  const location = useLocation();

  const { _id, title, course } = location.state;
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const enrolled = useEnrollmentCheck(_id);
  const handleSubmit = async () => {
    try {
      // Prepare course enroll Data
      const courseData = {
        userId: userinfo._id,
        name: userinfo.displayName,
        email: userinfo.email,
        course: course,
        courseId: _id,
        courseTitle: title,
        progress: 0,
        certificate: false,
        status: "approved",
      };

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
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, try again");
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // scrollTo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
 

  useEffect(() => {
    if (!user) {
      toast.error("You need to log in first");
      navigate("/login", { state: { from: location } });
    }
  }, [user]);

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
        <div className="h-[50dvh]">
          
          <div className="w-11/12 mx-auto my-20 text-xl section md:my-10 md:w-2/5 md:p-14">
            <p>You&apos;ve Enrolled Already</p>
            <Link className="text-blue-600 " to="/dashboard/my-courses">
              Check Here
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-11/12 mx-auto my-24 text-xl section md:mt-28 md:w-2/5 md:p-14">
          <h1 className="my-4 text-2xl font-bold">Your Information:</h1>

          <div className="space-y-4">
            <p className="font-semibold">
              Name: <span className="text-primary">{userinfo.displayName}</span>
            </p>
            <hr className="border-t border-gray-300" />
            <p className="font-semibold">
              Email: <span className="text-primary">{userinfo.email}</span>
            </p>
            <hr className="border-t border-gray-300" />
            <p className="font-semibold">
              Phone:{" "}
              {userinfo.phone ? (
                <span className="text-primary">{userinfo.phone}</span>
              ) : (
                <span className="text-gray-400">null</span>
              )}
            </p>
            <p>
              If you want to update your Information{" "}
              <Link to="/dashboard/my-profile" className="text-blue-600">
                Click Here
              </Link>
            </p>
          </div>
          {/* </div> */}
          <div className="py-5 space-y-3 text-xl ">
            <h1 className="my-4 text-2xl font-bold">Course Details</h1>
            <p className="font-semibold">{title}</p>
            <p>Free Course</p>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="items-center mr-2 checkbox checkbox-md"
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
            </div>
            <div className="pt-5">
              <Link
                onClick={handleSubmit}
                disabled={!isChecked}
                state={title}
                to="/complete-enroll"
                className={`btn-add ${
                  !isChecked && "opacity-50 cursor-not-allowed"
                }`}
              >
                Complete Enrollment
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FreeEnroll;
