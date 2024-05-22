import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../../../components/common/loader/Loader";
import { AiOutlineSearch } from "react-icons/ai";


const ControlEnrollments = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setText] = useState('');
  const [filteredCon, setFilteredCon] = useState([]);
  const [toEmail1, setToEmail1] = useState("");
  const [toEmail2, setToEmail2] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");  
  const [disabledAcceptButtons, setDisabledAcceptButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://ai-server-sooty.vercel.app/enrolled")
      .then((response) => response.json())
      .then((data) => setEnrolled(data));
    setIsLoading(false);
  }, []);

  
  // const disableAcceptButton = (id) => {
    
  // };

  const handleApprove = async (a) => {
    setToEmail1(a.email);
    setToEmail2("");
    
    let subjectText = `Congratulations! you have Successfully enrolled to the ${a.courseTitle} course.`;
    
    let text = `Dear ${a.name},<br />
    your request for enrolling into ${a.courseTitle} course has been approaved. please check your dashboard to access the course or see the curriculums.<br />
    thank you.<br /><br />
    
    regards,<br />
    AI Expert Career`;
    
    setSubject(subjectText);
    setMessage(text);

    
    try {
      const emailRequest = fetch("https://ai-server-sooty.vercel.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toEmail1,
          toEmail2,
          subject,
          message,
        })
      });
        
      
      
      const enrollRequest = fetch(`https://ai-server-sooty.vercel.app/enrollStatus/${a._id}`,{
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({status: "approved"})
      });
      
      
      const [emailResponse,enrollResponse] = await Promise.all([emailRequest,enrollRequest]);

      if (enrollResponse.ok) {
        // Handle success for both requests
        // document.getElementById(a.createAt).close();
        
        toast.success("Emails sent and request approved successfully!");
        setDisabledAcceptButtons((prevDisabled) => [...prevDisabled, a._id]);
      } else {
        
        // Handle error for one or both requests
        toast.error("Failed to send email or approve the request.");
      }
    }catch (error) {
      console.error("Error sending email or approving the request:", error);
      alert("An error occurred while sending the email or approving the request.");
    }
    
      // .then((res) => res.json())
      // .then((data) => {

      //   if (data.modifiedCount > 0) {
      //     toast.info("Request Approved", {
      //       icon: <AiFillCheckCircle className="text-xl text-green-500" />,
      //     });
      //   } else toast.error("Something went wrong");
      // });
  };
  
  // const sendEmail = async (a) => {

  
    
  //     // Define the API request for sending the email
      
  
      
      
  
  //     // Use Promise.all() to send both requests simultaneously
      
  
       
  // };

  
  let searchText = '';
  const handleSearchInputChange = (event) => {
    searchText = event.target.value;
    const filtered = enrolled.filter((item)=>{
      return searchText.toLowerCase() ===''? item : item.name.toLowerCase().includes(searchText);
    });
    setFilteredCon(filtered);
    setText(searchText);    
  };

  
  let filters = 0;
  if(filteredCon.length == 0)
  {
    filters = enrolled;
  }
  else{
    filters = filteredCon;
  }

  // Pagination
  const totalPages = Math.ceil(filters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the sorted and filtered data for pagination
  
  const paginatedEnroll = filters.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  if (isLoading) return <Loader />;
  return (
    <div>
      <h1 className="text-3xl text-center"> Control All Course Enrollments</h1>
      <h2 className="mb-5 text-2xl text-center ">Total: {enrolled.length} Enrollments</h2>
      <div className="flex justify-center mb-5 ">
        <AiOutlineSearch className="relative flex justify-end text-xl left-8 top-3 text-black/50" />
        <input
          type="text"
          placeholder="Search Enrollment By user name"
          className="w-[30%] px-4 py-2 pl-10 border border-black/50 rounded-lg"
          onChange={handleSearchInputChange}
        />{search.length != 0 && filteredCon.length == 0? <span className="relative ml-2 text-red-500"> No data</span>: ""}
      </div>
      <div className="">
        <table className="table w-full overflow-x-auto text-center shadow-xl table-zebra">
          {/* head */}
          <thead className="text-xl text-center text-white bg-primary">
            <tr>
              <th>#</th>
              <th className="text-center">Course</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Coupon</th>
              <th className="text-center">Pay Method</th>
              <th className="text-center">TID</th>
              <th className="text-center">Sender</th>
              <th className="text-center">Status</th>
              <th className="text-center">Approval</th>
            </tr>
          </thead>
          <tbody>
            
            {paginatedEnroll?.map((c, index) => (
              <tr key={c._id}>
                <th>{index + 1}</th>
                <td>{c.courseTitle}</td>
                <td className="text-center">{c.name}</td>
                <td className="text-center">{c.email}</td>
                <td className="text-center">{c.amount ? c.amount.toFixed(0) : "Free"}</td>
                <td className="text-center">{c.coupon ? c.coupon : "Free"}</td>
                <td className="text-center">{c.paymethod}</td>
                <td className="text-center">{c.tId ? c.tId : "Free"}</td>
                <td className="text-center">{c.sender ? c.sender : "Free"}</td>
                <td className="text-center">{disabledAcceptButtons.includes(c._id) ? "approved" : c.status}</td>
                <td className="text-center">
                  <button
                    disabled={disabledAcceptButtons.includes(c._id) || c.status === "approved"}
                    onClick={() =>{
                      handleApprove(c);
                      
                      
                    } }
                    className="mx-1 text-white normal-case btn btn-success btn-xs"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
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

export default ControlEnrollments;
