import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
const ShowReviews =() =>
{
    const [feedback, setFeedbacks] = useState();
    
    useEffect(() => {
        fetchData("https://ai-server-sooty.vercel.app/faq",setFeedbacks);
    });


    const handleDelete = (feedback) => {
    Swal.fire({
        title: "Are you sure?",
        text: `Your selected User-FAQ will be deleted!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0891B2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
        fetch(`https://ai-server-sooty.vercel.app/singlefaq/${feedback}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
            if (data.deletedCount > 0) {
                Swal.fire("Deleted!", "Selected User-FAQ has been deleted.", "success");
            }
            });
        }
    });
    };
    
    return (
        <div>
            <h1 className="my-5 text-3xl text-center">All F.A.Qs</h1>
            <div>
                <table className="table w-full overflow-x-auto text-center shadow-xl table-zebra">
                    {/* head */}
                    <thead className="text-xl text-center text-white bg-primary">
                        <tr>
                            <th>SL No.</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Phone</th>
                            <th className="text-center">Problems (in details)</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Actions</th>             
                        </tr>
                    </thead>
                    <tbody>
                        {feedback?.map((s, index) => (
                            <tr key={s._id}>
                            <th className="text-center">{index + 1}</th>
                            <td className="text-center">{s.full_name}</td>
                            <td className="text-center">{s.email}</td>
                            <td className="text-center">{s.phone}</td>
                            <td className="text-center">{s.problem}</td>
                            <td className="text-center">{moment(s.createAt).format("DD/MM/YYYY")}</td>
                            
                            <td className="text-center"><button className="btn-add" onClick={() => handleDelete(s._id)} >Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

};

export default ShowReviews;