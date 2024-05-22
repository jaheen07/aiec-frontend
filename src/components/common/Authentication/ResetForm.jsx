import { useForm } from "react-hook-form";

import { useContext } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthProvider";
import { useLocation } from "react-router-dom";


const ResetForm = () => {
  const { auth, sendPasswordResetEmail } = useContext(AuthContext);
  const { handleSubmit, register } = useForm();
  const location = useLocation();
  const email = location.state;


  const handleReset = (data) => {
    const email = data.email;

    sendPasswordResetEmail(auth, email)
      .then((res) => res.json())
      .then((data) => {

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sent Password Reset mail",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Check Your Mail ",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="mt-16 md:mt-32 h-[60vh] flex flex-col items-center justify-center w-full">
    
      <h1 className="my-5 text-xl text-center ">Reset Your Password</h1>
      <div className="flex items-center justify-center">
        <form
          className="p-4 bg-gray-100 rounded-md shadow-md w-96"
          onSubmit={handleSubmit(handleReset)}
        >
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Enter Your Email
            </label>
            <input
            value={email}
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="block w-full px-4 py-2 mt-2 bg-white border rounded-md text-blue focus:border-blue focus:ring-green focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn-add">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetForm;
