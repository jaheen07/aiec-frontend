import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import UseUsers from "../../../hooks/useUsers";
import Loader from "../../../components/common/loader/Loader";
import { MdDelete } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import UseUser from "../../../hooks/useUser";
import { BsInfoSquareFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

const ManageUser = () => {
  const [users, loading, refetch] = UseUsers();
  const [userinfo] = UseUser();
  const [search, setText] = useState('');
  const [filtereduser, setFiltereduser] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  //make admin
  const handleMakeAdmin = (user) => {
    fetch(`https://ai-server-sooty.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //make consultant
  const handleMakeConsultant = (user) => {
    fetch(`https://ai-server-sooty.vercel.app/users/consultant/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} is an consultant Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => console.log("error"));
  };
  //make user
  const handleMakeUser = (user) => {
    fetch(`https://ai-server-sooty.vercel.app/users/user/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} is an user Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => console.log("error"));
  };
  //Delete an user
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-server-sooty.vercel.app/users/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "User has been removed.", "success");
            }
          });
      }
    });
  };


  let searchText = '';
  const handleSearchInputChange = (event) => {
    searchText = event.target.value;
    const filtered = users.filter((item)=>{
      return searchText.toLowerCase() ===''? item : item.displayName.toLowerCase().includes(searchText);
    });
    setFiltereduser(filtered);
    setText(searchText);
  };

  let filters = 0;
  if(filtereduser.length == 0)
  {
    filters = users;
  }
  else{
    filters = filtereduser;
  }


  // Pagination
  const totalPages = Math.ceil(filters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the sorted and filtered data for pagination
  const paginatedUsers = filters.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };





  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  if (loading) return <Loader />;
  return (
    <div>
      <h3 className="my-2 text-3xl text-center">Total Users: {users.length - 1}</h3>
      <div className="flex justify-center mb-5 ">
        <AiOutlineSearch className="relative flex justify-end text-xl left-8 top-3 text-black/50" />
        <input
          type="text"
          placeholder="@username"
          className="w-[30%] px-4 py-2 pl-10 border border-black/50 rounded-lg"
          onChange={handleSearchInputChange}
        />{search.length != 0 && filtereduser.length == 0? <span className="relative ml-2 text-red-500"> No data</span>: ""}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full text-center shadow-xl table-zebra">
          {/* head */}
          <thead className="text-white bg-primary">
            <tr>
              <th>#</th>
              <th className="text-center">Photo</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
              <th className="text-center">Details</th>
              <th className="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers?.filter(user => user.role !== "super admin" && userinfo.email !== user.email)?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    className="object-cover w-16 h-16 rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                </td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "consultant"
                    ? "Consultant"
                    : user.role === "super admin"
                    ? "Super Admin"
                    : "User"}
                </td>
                <td>
                  <button
                    className="btn-black "
                    onClick={() => handleMakeAdmin(user)}
                    disabled={
                    userinfo.role === "admin" || user.role === "admin" || user.role === "super admin"
                    }
                  >
                    {" "}
                    Admin
                  </button>

                  <button
                    className="m-2 btn-black"
                    onClick={() => handleMakeConsultant(user)}
                    disabled={
                      user.role === "consultant" || user.role === "super admin"
                    }
                  >
                    consultant
                  </button>
                  <button
                    className="btn-black"
                    onClick={() => handleMakeUser(user)}
                    disabled={
                      user.role === "user" || user.role === "super admin"
                    }
                  >
                    User
                  </button>
                </td>
                <td className="text-center text-primary">
                  <button
                    className="btn-black"
                    onClick={()=>document.getElementById(`${user._id}`).showModal()}
                   
                  >
                    <BsInfoSquareFill />
                  </button>
                </td>
                <td className="text-xl text-center text-primary">
                  <button
                    className="btn-black"
                    onClick={() => handleDelete(user)}
                    disabled={
                      user.role === "admin" || user.role === "super admin"
                    }
                  >
                    <AiFillDelete />
                  </button>
                </td>

                
<dialog id={user._id} className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
    </form>
<h1 className="mb-10 text-2xl font-bold ">User Details</h1>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Name:</span> {user?.displayName}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Address:</span> {user?.address}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Phone:</span> {user?.phone}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Occupation:</span> {user?.occupation}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Position:</span> {user?.position}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Field:</span> {user?.field}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Job:</span> {user?.job}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Description:</span> {user?.description}</p>
<p className="text-left"><span className="py-5 pr-1 font-semibold">Social:</span> {user?.social}</p>
   
  </div>
</dialog>





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

export default ManageUser;
