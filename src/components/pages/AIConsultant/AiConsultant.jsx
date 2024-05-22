import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { MyContext } from "../../../Context/Context";
import CallBtn from "./CallBtn";
import Loader from "../../common/loader/Loader";
import moment from "moment";
import { toast } from "react-toastify";
import { FaRegDotCircle } from "react-icons/fa";
import { SiSocketdotio } from "react-icons/si";
import useTitle from "../../../hooks/useTitle";
import useConsultants from "../../../hooks/UseConsultants";
// import ReactGA from "react-ga4";
import { AiOutlineSearch } from "react-icons/ai";
import { Input, Button ,Form,ConfigProvider } from 'antd';
import { Helmet } from "react-helmet";



const AiConsultant = () => {
  const { language } = useContext(MyContext);
  const { consultants, loading } = useConsultants();
  // const consultants = users?.filter((user) => user?.role === "consultant");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredCon, setFilteredCon] = useState([]);
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedWorkingWith, setSelectedWorkingWith] = useState("All");
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { TextArea } = Input;
  
  const [form] = Form.useForm();
  //
  useEffect(() => {
    setFilteredCon(consultants);
  }, [consultants]);

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


  const today = moment().format("dddd");


  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
    filterCon(event.target.value);
  };

  const filterCon = (search) => {

    const filtered = consultants.filter((c) => {
      // Define flags to check if a match is found in any of the arrays
      let qualificationMatch = false;
      let recentWorksMatch = false;
      let selectedDaysMatch = false;

      // Check if the search text is found in qualification array
      c?.qualification?.forEach((qualification) => {
        if (
          qualification &&
          qualification.toLowerCase().includes(search.toLowerCase())
        ) {
          qualificationMatch = true;
        }
      });

      // Check if the search text is found in recentWorks array
      // c?.recentWorks?.forEach((work) => {
      //   if (work && work.toLowerCase().includes(search.toLowerCase())) {
      //     recentWorksMatch = true;
      //   }
      // });

      // Check if the search text is found in selectedDays array
      c?.selectedDays?.forEach((day) => {
        if (day && day.toLowerCase().includes(search.toLowerCase())) {
          selectedDaysMatch = true;
        }
      });

      // Return true if any of the fields match the search text
      return (
        c?.displayName?.toLowerCase().includes(search.toLowerCase()) ||
        c?.designation?.toLowerCase().includes(search.toLowerCase()) ||
        c?.description?.toLowerCase().includes(search.toLowerCase()) ||
        qualificationMatch ||
        recentWorksMatch ||
        selectedDaysMatch
      );
    });

    setFilteredCon(filtered);
  };


  

  const daysOfWeek = [
    "All",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const workingWithOptions = [
    "All",
    "Career Consultancy",
    "Corporate Consultancy",
    "1:1 Mentorship Program",
    "Research (Thesis/Report/Patent)",
    "AI Project (Basic to Advanced)",
     /* Add more options as needed */,
  ];

  const handleDayChange = (e) => {
    const selected = e.target.value;
    setSelectedDay(selected);
    filterConsultants(selected, selectedWorkingWith);
  };

  const handleWorkingWithChange = (e) => {
    const selected = e.target.value;
    setSelectedWorkingWith(selected);
    filterConsultants(selectedDay, selected);
  };

  const filterConsultants = (day, workingWith) => {
    if (day === "All" && workingWith === "All") {
      setFilteredCon(consultants);
    } else if (day === "All") {
      const filtered = consultants.filter((consultant) =>
        consultant?.workingWith?.includes(workingWith)
      );
      setFilteredCon(filtered);
    } else if (workingWith === "All") {
      const filtered = consultants.filter((consultant) =>
        consultant?.selectedDays?.includes(day)
      );
      setFilteredCon(filtered);
    } 
    else {
      const filtered = consultants.filter(
        (consultant) =>
          consultant?.selectedDays.includes(day) &&
          consultant?.workingWith?.includes(workingWith)
      );
      setFilteredCon(filtered);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredCon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the sorted and filtered data for pagination
  const paginatedCon = filteredCon.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useTitle("Consultants");
  // ReactGA.send({ hitType: "pageview", page: "/ai-consultant", title: "Consultants" });


  
  const [isOpen, setOpen] = useState('s1');
  const handlecollapse = (e) =>{
    const get = e.target.id;
    setOpen(get);

  }
  const onSubmit = async (data) => {
    const {
    full_name,
    email,
    phone,
    problem,
    } = data;
    
    try {
    // Prepare faq Data
    const faqData = {
    full_name,
    email,
    phone,
    problem,
    };
  
    //Send Course Data to API
    const apiResponse = await fetch(
    "https://ai-server-sooty.vercel.app/add_faq",
    {
    method: "POST",
    headers: {
    "content-type": "application/json",
    },
    body: JSON.stringify(faqData),
    }
    );
    
    if (!apiResponse.ok) {
    throw new Error("Request failed");
    }
    
    const responseData = await apiResponse.json();
    
    if (responseData.insertedId) {
      // reset();
      form.resetFields();
    
    toast.success("You've Successfully submitted your query.");
    
    }
    } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong, try again");
    }
    };
  
  // scrollTo
  useEffect(() => {
    window.scrollTo(0,0);
  }, [location]);
  if (loading && filterCon ) return <Loader />;
  return (
    <div className="px-4 py-5 mx-auto mt-32 sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:px-8">
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLCLKWNK"
         height="0"
         width="0"
         style="display:none;visibility:hidden">
        </iframe>
      </noscript>
      <Helmet>
        <title>AI Consultancy Services | One Stop Solution in AI Career Paths</title>
        <meta name="description" content="AI Expert Career offers consultancy to build your lucrative careers into AI job sectors. we offer career consultation, customised corporate consultancy and 1:1 mentorship"/>
        <meta name="keywords" content="ai career consultancy, ai, ai career guidance,ai consulting services in bd,1:1 mentorship, ai corporate consultancy, ai roadmap, ai job sectors in bd, ai career paths,how to become ai expert"/>
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content=" AI Expert Career " />
        <meta property="og:title" content="AI Expert Career|consultancy" />
        <meta property="og:url" content="https://www.aiexpertcareer.com/ai-consultant" />
        <meta name="og:image" content="/img/unnamed.jpg" />

        <meta property="og:description" content="AI Expert Career is the first ever AI based Ed-tech and Consultancy Service Platform in Bangladesh. Explore our AI courses, career guidelines and consultancy services." />

        <meta name="geo.region" content="BD-13" />
        <meta name="geo.placename" content="Dhaka" />
        <meta name="geo.position" content="24.476929;90.293441" />
        <meta name="ICBM" content="24.476929, 90.293441" />
      </Helmet>
      <div className="">
        <div className="">
          <div className="mx-auto md:w-4/5 ">
            <h1 className="font-bold text-center text-[28px] md:text-[35px] pb-3">
              {language == "bn"
                ? "ক্যারিয়ারের সঠিক দিক নির্দেশনার জন্য কনসালটেন্ট খুঁজুন"
                : "One Stop Solution in your AI Career paths"}
            </h1>
            <p className="text-center ">
              {language == "bn"
                ? "আমাদের এআই ভিত্তিক কন্সাল্টেন্সি সেবার মাধ্যমে আপনি আপনার এআই ক্যারিয়ার গড়তে একটি সুন্দর ও সংগঠিত রোডম্যাপ পেতে পারেন।আমাদের দক্ষ এক্সপার্টদের দ্বারা পরিচালিত এই পরিষেবায় আপনি আপনার এআই ক্যারিয়ারের সকল সমস্যার সমাধান করতেন পারবেন।"
                : "No matter what background you are a student or learner, the right roadmap can take you to the pinnacle of success. Our AI roadmap and consultancy services are developed by these experts in various fields"}
            </p>
            <div className="mx-auto my-8 w-fit">
              <CallBtn />
            </div>
          </div>

          <div className="items-center justify-between gap-5 mt-10 space-y-2 md:my-12 md:flex ">
            <h3 className="text-lg font-semibold lg:text-xl">
              {language == "bn"
                ? "ক্যাটাগরি নির্বাচন করুণ"
                : "Search Your Consultant"}
            </h3>
            <div className="flex justify-between px-1.5 py-2 border md:justify-evenly ">
              <label htmlFor="daySelect" className="mr-2 text-left">
                Select Day:
              </label>
              <select
                id="daySelect"
                className="w-[50%] border px-2"
                onChange={handleDayChange}
                value={selectedDay}
              >
                {daysOfWeek.map((day, index) => (
                  <option key={index} value={day} className="bg-white">
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between px-1.5 py-2 border md:justify-evenly">
              <label htmlFor="workingWithSelect" className="mr-2">
                Select Working With:
              </label>
              <select
                className="w-[60%] border px-2"
                id="workingWithSelect"
                onChange={handleWorkingWithChange}
                value={selectedWorkingWith}
              >
                {workingWithOptions.map((workingWith, index) => (
                  <option key={index} value={workingWith} className="bg-white">
                    {workingWith}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative ">
            <AiOutlineSearch className="absolute text-xl left-3 top-3 text-black/50" />
              <input
                type="text"
                placeholder="Search Consultants"
                className="w-full px-4 py-2 pl-10 border border-black/50 "
                value={searchText}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>

          <hr className="border-[0.5px] border-[#ACACAC] my-4" />

          {paginatedCon.length > 0 && paginatedCon ? (
            <div className="grid mx-auto mt-10 md:grid-cols-2 gap-y-4 gap-x-5 md:w-5/6">
              {paginatedCon.map((c, i) => (
                <Link
                  key={i}
                  to={`/consultant/${c.displayName.trim().replace(/\s+/g, '-')}`}
                  state={c}
                  className="flex p-2 "
                >
                  <div className="relative flex flex-col w-full gap-2 mx-auto md:flex-col section">
                    <div className="my-2 md:my-3">
                      <p className="mb-3">
                        {c?.selectedDays?.includes(today) ? (
                          <span className="absolute px-2 text-white rounded-full bg-primary top-2 left-4">
                            Available
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                      
                      <div className="grid grid-cols-4 md:flex md:flex-row">
                        <div className="col-span-3 md:inline-block md:w-5/6">
                          <h2 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] md:text-left font-bold md:my-2">
                            {c.displayName}
                          </h2>
                          <p className="mb-5 md:text-left">{c.designation}, {c.description}</p>
                          
                        </div>
                        <div className="col-span-1 md:w-2/5">
                          <img
                          className="inline-block float-right ml-4 rounded-full lg:h-28 lg:w-28 shrink sm:w-28 sm:h-28 object-fit md:w-20 md:h-20"
                          src={c.photoURL}
                          alt="consultant image"
                        />
                        </div>
                        
                      </div>
                      
                      {/* <h2 className="text-[17px] font-bold">Availability</h2>
                      <p className="text-[#515151]/90 flex flex-wrap gap-3 mt-1 mb-2">
                        {c?.selectedDays?.map((d) => (
                          <p className="flex items-center gap-1" key={d}>
                            <FaRegDotCircle /> {d}
                          </p>
                        ))}
                      </p> */}
                      <h2 className="text-[17px] font-bold">Works With</h2>
                      <p className=" text-[#515151]/90 flex flex-wrap gap-3 mt-1">
                        {c?.workingWith?.map((d) => (
                          <p className="flex items-center gap-1" key={d}>
                            {" "}
                            <SiSocketdotio /> {d}
                          </p>
                        ))}
                      </p>

                      <button className="w-full mt-4 btn-black md:hidden">View Profile</button>
                    </div>
                    <div className="flex flex-row-reverse justify-between text-center">
                      <button className="hidden md:float-right btn-black md:block">View Profile</button>
                    </div>
                      
                    
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="my-20 text-2xl text-center">Coming Soon</p>
          )}
        </div>

        <div className="flex gap-4 justify-center pt-[40px]">
          {/* pagination */}

          {paginatedCon.length > 5 && paginatedCon ? (
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
        </div>

        
        <div className="grid justify-center max-w-full p-4 mx-auto rounded-lg md:gap-5 lg:gap-20 sm:my-28 md:grid-cols-2">
          {/* faq form */}
          <div className="grid faq-form md:col-start-1">
            <h1 className="font-bold text-[24px] md:text-[30px] md:text-center pb-3">Frequently Ask & Questions<h4 className="sm:font-bold text-[18px] md:text-[16px] pt-4 pb-8 text-slate-400">If you want to know more, please send us your requirement</h4></h1>
            
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: 'black',
                  borderRadius: 6,
                  colorBorder:'gray',
                  controlOutlineWidth:0,
                  
                  

                  // Alias Token
                  colorBgContainer: 'white',
                },
              }}
            >
            <Form
            autoComplete="on"
            onFinish={onSubmit}
            form={form}
            >
              <Form.Item name="full_name"
              rules={[
                { required: true, 
                  message: "Please write your name" 
                }
                ]}
                hasFeedback >
                <Input placeholder="Full Name" style={{padding:'1rem',marginTop:'0.5rem'}}></Input>
              </Form.Item>
              
              
              <Form.Item name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
                hasFeedback >
                <Input placeholder="Email" style={{padding:'1rem',marginTop:'0.5rem'}}></Input>
              </Form.Item>

              
              <Form.Item name="phone"
                
                rules={[
                  // {
                  //   type:'number',
                  //   message: "the number is not valid",
                  // },
                  // {
                  //   required: true,
                  //   message: "Please enter your phone number",
                  // },
                  // { min:11,message:"number must be 11 character long"},
                  // { max:11, message: "Please enter a valid number (e.g. 01XXXXXXXXX)"},
                  {
                    validator(_,value) {
                      if (/^01\d{9}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Please enter a valid number (e.g. 01XXXXXXXXX)'));
                    },
                  },
                ]}
                hasFeedback >
                <Input placeholder="Phone" style={{padding:'1rem',marginTop:'0.5rem'}} onChange={handleNumberChange}></Input>
              </Form.Item>

              
              <Form.Item
                name="problem"
                style={{marginTop:"0.5rem"}}
                rules={[
                  { required: true, 
                    message: "Please write your problem in details" 
                  }
                  ]}
                  hasFeedback 
                >
                  <TextArea rows={6}  placeholder="Enter your problems" />
              </Form.Item>

              <button type="submit" className="w-full py-4 mt-2 text-white bg-black rounded-lg">
                <p className="text-xl">Submit</p>
              </button>

            </Form>

              
            </ConfigProvider>
            
          </div>
            
          {/* faq dropdown */}
          <div className="pb-0 my-5 md:col-span-3 faq-drop md:col-start-2 md:my-0 md:pb-5 lg:pb-0">
            
            <div>
              <div className="pb-4 space-y-2" >
                <div className="group border-s-4 border-black bg-gray-50 p-5 [&_summary::-webkit-details-marker]:hidden rounded-lg">
                  <div className="flex cursor-pointer items-center justify-between gap-1.5 " >
                    <h2 className="text-lg font-bold text-gray-900" id="s1" onClick={handlecollapse}>
                      What is AI Career Consultancy?
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 transition duration-300 shrink-0 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>

                  <p className={isOpen === "s1"?" mt-4 font-normal leading-relaxed text-gray-700": "hidden"}>
                  AI Career Consultancy is to guiding individuals towards lucrative and fulfilling careers in AI job sectors. Whether you're a recent graduate or a seasoned professional looking to dive into AI, our experienced AI career consultants will help you to identify the most suitable AI career paths through one-on-one consultations.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="pb-4 space-y-2">
                <div className="group border-s-4 border-black bg-gray-50 p-5 [&_summary::-webkit-details-marker]:hidden rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 className="text-lg font-bold text-gray-900" id="s2" onClick={handlecollapse}>
                      What is Corporate Consultancy?
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 transition duration-300 shrink-0 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className={isOpen === "s2"?" mt-4 font-normal leading-relaxed text-gray-700": "hidden"}>
                  Our Corporate Consultancy is for any organization which wants a customised and dedicated training program for several days for their data team or requires consultancy on how to develop an automated Reporting System/Dashboard for their organization. 
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="pb-4 space-y-2">
                <div className="group border-s-4 border-black bg-gray-50 p-5 [&_summary::-webkit-details-marker]:hidden rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 className="text-lg font-bold text-gray-900" id="s3" onClick={handlecollapse}>
                      What is 1:1 Mentorship Program?
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 transition duration-300 shrink-0 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className={isOpen === "s3"?" mt-4 font-normal leading-relaxed text-gray-700": "hidden"}>
                  1:1 Mentorship program facilitates you with answering questions on whether switching careers would be an option or not and why?.And also to learn any AI technology,topics or research paper writing personally, our 1:1 Mentorship program can help you perfectly.

                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="pb-4 space-y-2">
                <div className="group border-s-4 border-black bg-gray-50 p-5 [&_summary::-webkit-details-marker]:hidden rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 className="text-lg font-bold text-gray-900 "id="s4" onClick={handlecollapse}>
                      What is Research Consultancy?
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 transition duration-300 shrink-0 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className={isOpen === "s4"?" mt-4 font-normal leading-relaxed text-gray-700": "hidden"}>
                  Research Consultancy helps you in highlighting your research contributions, publications, and successful thesis.  Whether you're a novice or a professional, our consultants provide possible guidance to meet your specific needs.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="pb-4 space-y-2">
                <div className="group border-s-4 border-black bg-gray-50 p-5 [&_summary::-webkit-details-marker]:hidden rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                    <h2 className="text-lg font-bold text-gray-900" id="s5" onClick={handlecollapse}>
                      What is Project Based Consultancy?
                    </h2>

                    <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 transition duration-300 shrink-0 group-open:-rotate-45"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className={isOpen === "s5"?" mt-4 font-normal leading-relaxed text-gray-700": "hidden"}>
                    Project-Based Consultancy is a collaborative endeavor between experienced consultants and your ambitious project work.Our expert Consultant will ensure that you receive the right support and guidance you need at every stage of your project development.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        
          
        </div>
      </div>
    </div>
  );
};

export default AiConsultant;
