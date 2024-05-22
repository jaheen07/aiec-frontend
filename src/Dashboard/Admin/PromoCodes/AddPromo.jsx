import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
// import { AuthContext } from "../../../Context/AuthProvider";
import useCourses from "../../../hooks/UseCourses";

const AddPromo = () => {
  const [promos, setPromos] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [courses] = useCourses();

  
  const onSubmit = async (data) => {
    try {
      // Send Promo Codes Data to API
      const apiResponse = await fetch(
        "https://ai-server-sooty.vercel.app/promo",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Promo Code insertion failed");
      }

      const responseData = await apiResponse.json();

      if (responseData.insertedId) {
        Swal.fire("Success!", "Promo Code added successfully", "success");
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("https://ai-server-sooty.vercel.app/promo")
      .then((response) => response.json())
      .then((data) => setPromos(data));
  }, [promos]);
  const handleDelete = (promo) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your Promo Code will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-server-sooty.vercel.app/promo/${promo._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your promo has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="w-11/12 h-full p-2 mx-auto md:w-full lg:p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">Add Promo Codes</h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 rounded-md bg-slate-100 md:p-5"
        >
          <div className="flex items-center justify-center gap-5 mx-auto">
            <div className="w-full form-control">
              <label className="label">
                <span className="w-full font-semibold label-text ">
                  Promo Code
                </span>
              </label>
              <input
                required
                type="text"
                name="promo"
                {...register("promo")}
                placeholder="Enter Promo Code"
                className="input input-bordered w-[100px] md:w-full text-black/70"
              />
            </div>
            <div className="w-full form-control">
              <label className="label">
                <span className="font-semibold label-text">Discount (%)</span>
              </label>
              <input
                required
                type="text"
                name="discount"
                {...register("discount")}
                placeholder="Enter % of Discount"
                className="input input-bordered w-[100px] md:w-full text-black/70"
              />
            </div>

            <div className="w-full form-control">
              <label className="label">
                <span className="font-semibold label-text">Course Name</span>
              </label>
              <select
                required
                type="text"
                name="course_name"
                {...register("course_name")}
                placeholder="Enter % of Discount"
                className="input input-bordered w-[100px] md:w-full text-black/70"
              >
                <option value="">Select a Category</option>
                <option value="All">All Courses</option>
                
                    {courses?.map((course) => (
                    (course.mainCategory != "Free"?<option key={course._id} value={course.title}>
                        {course.title}
                      </option> : "")
                    ))}
              </select>
            </div>


            <div className="w-full form-control">
              <label className="label">
                <span className="font-semibold label-text">Want to show on ribbon?</span>
              </label>
              <select
                required
                type="text"
                name="ribbon"
                {...register("show_on_rib")}
                
                className="input input-bordered w-[100px] md:w-full text-black/70"
              >
                <option value="">Select a choice</option>
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            <div>
              <input className="mt-6 btn-add" type="submit" value="Add" />
            </div>
          </div>
        </form>
      </div>

      <div className="max-w-[414px] md:max-w-[768px] lg:max-w-full overflow-x-auto mx-auto">
        <table className="table w-full rounded-md shadow-xl table-zebra">
          {/* head */}
          <thead className="text-white bg-primary">
            <tr>
              <th>#</th>
              <th>Promo Code</th>
              <th>Discounts</th>
              <th>Course Name</th>
              <th>Show on Ribbon</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((promo, index) => (
              <tr key={promo._id}>
                <th>{index + 1}</th>

                <td>{promo.promo}</td>
                <td>{promo.discount}</td>
                <td>{promo.course_name}</td>
                <td className="text-lg text-center">
                  {promo.show_on_rib}
                </td>
                
                <td>
                  <button
                    onClick={() => handleDelete(promo)}
                    className="btn-add"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPromo;
