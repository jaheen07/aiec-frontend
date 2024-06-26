import { useContext, useState } from "react";
import Navbar from "../../common/Navbar";
import {
  BsChevronRight,
  BsChevronLeft,
  BsPerson,
  BsLaptop,
  BsImage,
  BsLaptopFill,
} from "react-icons/bs";
import { AiFillMail, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import Footer from "../../common/footer/Footer";
import { MyContext } from "../../../Context/Context";
import { AuthContext } from "../../../Context/AuthProvider";
import {
  FaBloggerB,
  FaPercentage,
  FaUserEdit,
  FaUsersCog,
} from "react-icons/fa";
import {
  MdManageSearch,
  MdOutlineNotificationAdd,
  MdReviews,
  MdVideoCameraFront,
} from "react-icons/md";
import UseUser from "../../../hooks/useUser";
import { FiLogOut } from "react-icons/fi";
import useTitle from "../../../hooks/useTitle";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { NotificationContext } from "../../../Context/NotificationProvider";
import Loader from "../../common/loader/Loader";
import { useNavigate } from "react-router-dom";




const DashboardLayout = () => {
  const { language } = useContext(MyContext);
  const navigate = useNavigate();
  const { unopenedCount } =
    useContext(NotificationContext);
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userinfo] = UseUser();
  const isAdmin = userinfo?.role === "admin";
 

  // const gradientColor =
  //   "linear-gradient(176.98deg, #FFF3F8 -4.94%, #E1F9F0 42.2%, rgba(244, 213, 255, 0.96) 110.23%)";

const handleLogOut =()=>{
  navigate('/')
  logOut();
}



  useTitle("Dashboard");

  if (!user) return <Loader/>

  return (
    <div className="mt-28">
      <Navbar />
      <div className="">
        {" "}
        {/* style={{ background: gradientColor }} */}
        {
          <button
            onClick={() => setIsOpen(true)}
            className={`absolute ${
              isOpen ? "hidden" : ""
            } z-50 top-1/2 left-1 bg-[#ED1B24] h-6 w-6 lg:hidden sticky text-white flex  justify-center items-center rounded-full`}
          >
            <BsChevronRight />
          </button>
        }
        <div
          // eslint-disable-next-line react/no-unknown-property
          x-data="{ isOpen: false }"
          className="max-w-full mx-auto mb-10 md:pt-10 md:max-w-full 2xl:max-w-screen-2xl md:px-8 "
        >
          <div className="flex space-x-0 lg:space-x-[18px] ">
            <div
            
              className={`${
                isOpen
                  ? " translate-x-0 opacity-95 "
                  : " opacity-0 -translate-x-full "
              }  h-fit fixed bg-white top-0 lg:w-72 md:w-72 inset-x-0 z-20 w-72 md:px-6 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative  lg:opacity-100 lg:translate-x-0 lg:flex  `}
            >
              <button
                onClick={() => setIsOpen(false)}
                className={`absolute ${
                  isOpen ? "" : "hidden"
                } top-1/2 -right-2 bg-[#ED1B24] h-6 w-6 lg:hidden  text-white flex  justify-center items-center rounded-full`}
              >
                <BsChevronLeft />
              </button>
              <div>
                {isAdmin || userinfo?.role === "super admin" ? (
                  // Admin Dashboard link starts from here
                  <ul className="flex flex-col w-full py-5 md:py-5 md:px-4 bg-slate-100">
                    <NavLink
                      to={"/dashboard/my-profile"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900 py-[10px] items-center w-[234px] pl-4  my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <BsPerson
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "আমার প্রোফাইল" : "My Profile"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/manage-users"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900 py-[10px] items-center w-[234px] pl-4  my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <FaUsersCog
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "ইউজার লিস্ট" : "User Control"}
                    </NavLink>

                    <NavLink
                      to={"/dashboard/add-blog"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <FaBloggerB
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "ব্লগ যোগ করুন" : "Add Blog"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/manage-blog"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <MdManageSearch
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "ব্লগ পরিচালনা করুন" : "Manage Blog"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/add-course"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <AiOutlineVideoCameraAdd
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "কোর্স যোগ করুন" : "Publish Course"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/manage-courses"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <BsLaptopFill
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn"
                        ? "কোর্স পরিচালনা করুন"
                        : "Manage courses"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/control-enrollments"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <MdVideoCameraFront
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn"
                        ? "কোর্স এনরোলমেন্টস"
                        : "Control Enrollments"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/control-appointments"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <FaUserEdit
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn"
                        ? "এপয়েন্টমেন্টেস"
                        : "Control Appointments"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/course-banner"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <BsImage
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "ইভেন্ট যোগ করুন" : "Add Event"}
                    </NavLink>

                    <NavLink
                      to={"/dashboard/promo"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <FaPercentage
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white "
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "প্রোমো কোড" : "Add Promo Codes"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/add-reviews"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <MdReviews
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "রিভিউ যোগ করুন" : "Add Reviews"}
                    </NavLink>

                    <NavLink
                      to={"/dashboard/show-reviews"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <MdReviews
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "ফিডব্যাক দেখুন" : "Show Feedbacks"}
                    </NavLink>
                    
                    <NavLink
                      to={"/dashboard/send-notifications"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <MdOutlineNotificationAdd
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 font-semibold`}
                      />
                      {language === "bn" ? "নোটিফিকেশন" : "Send Notifications"}
                    </NavLink>
                    
                    <NavLink
                      to={"/dashboard/newsletter"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <AiFillMail
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "মেইল সমূহ" : "All submitted mails"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/show-faqs"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-slate-900  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      }
                    >
                      <MdReviews
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "ইউজারের জিজ্ঞাসাগুলো" : "Show FAQs"}
                    </NavLink>
                    
                    <div
                      className=" my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-200"
                      onClick={()=>handleLogOut()}
                    >
                      <FiLogOut />
                      <button className="pl-2 font-bold">
                        {language === "bn" ? "লগ আউট" : "Logout"}
                      </button>
                    </div>
                  </ul>
                ) : userinfo?.role === "consultant" ? (
                  // Consultant Dashboard link starts from here
                  ""
                ) : (
                  // User Routes starts from Here
                  <ul className="w-full py-20 md:py-24 md:px-4 flex h-[100vh]  flex-col  bg-slate-200 ">
                    <NavLink
                      to={"/dashboard/my-profile"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-black py-[10px] items-center w-[234px] pl-4  my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  py-[10px] items-center w-[234px] pl-4 hover:bg-slate-100"
                      }
                    >
                      <BsPerson
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "আমার প্রোফাইল" : "My Profile"}
                    </NavLink>

                    <NavLink
                      to={"/dashboard/my-courses"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-black  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-100"
                      }
                    >
                      <BsLaptop
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "কোর্স সমূূহ" : "My courses"}
                    </NavLink>
                    <NavLink
                      to={"/dashboard/my-appointments"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-black  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-100"
                      }
                    >
                      <FaHeadphonesSimple
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "কনসালটেন্ট" : "My Consultants"}
                    </NavLink>

                    <NavLink
                      to={"/dashboard/notifications"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-black  py-[10px] items-center w-[234px] pl-4 my-1 text-lg font-bold flex   rounded-[10px]"
                          : "my-1 text-lg font-bold flex   rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-100"
                      }
                    >
                      <IoMdNotificationsOutline 
                        className={`${({ isActive }) =>
                          isActive
                            ? "text-white"
                            : "text-red-600"}mb-[4px] mr-2 `}
                      />
                      {language === "bn" ? "নোটিফিকেশন" : "Notifications"}
                      <div className="ml-2 badge">
                        {unopenedCount <= 0 ? 0 : unopenedCount}
                      </div>
                    </NavLink>

                    <div
                      className=" my-1 text-lg font-bold flex rounded-[10px] text-gray-700 transition-colors duration-300 transform  hover:text-maroon py-[10px] items-center w-[234px] pl-4 hover:bg-slate-100"
                      onClick={()=>handleLogOut()}
                    >
                      <FiLogOut />
                      <button className="pl-2 font-bold">
                        {language === "bn" ? "লগ আউট" : "Logout"}
                      </button>
                    </div>
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
