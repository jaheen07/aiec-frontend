import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddConReview = () => {
  const [image, setImage] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const { name, email, designation, feedback } = data;
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Upload_token
    }`;
    try {
      const coverForm = new FormData();
      coverForm.append("image", image);

      // Upload Cover Image
      const coverResponse = await fetch(imageUploadUrl, {
        method: "POST",
        body: coverForm,
      });

      if (!coverResponse.ok) {
        throw new Error("Cover image upload failed");
      }

      const coverImageResponse = await coverResponse.json();
      const cover_image_url = coverImageResponse.data.display_url;

      // Prepare Feedback Data
      const feedbackData = {
        name,
        email,
        designation,
        feedback,
        imageURL: cover_image_url,
      };

      // Send Feedback Data to API
      const apiResponse = await fetch(
        "https://ai-server-sooty.vercel.app/review",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Feedback insertion failed");
      }

      const responseData = await apiResponse.json();

      if (responseData.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Feedback added successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        // Reset the input fields to empty values
        reset();
        setImage(null);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Feedback is not uploaded successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <h1 className="p-2 mb-4 text-2xl font-bold text-center text-white rounded-lg bg-primary">
        Add Consultant Review
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Consultant Mail:
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            className="px-3 py-2 border border-gray-300 w-80 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-1">
            Reviewer Name:
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            className="px-3 py-2 border border-gray-300 w-80 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="designation" className="block mb-1">
            Designation:
          </label>
          <input
            {...register("designation", { required: true })}
            type="text"
            id="designation"
            className="px-3 py-2 border border-gray-300 w-80 rounded-xl"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageURL"
            className="block mb-2 font-medium text-gray-700"
          >
            Cover Image
          </label>
          <input
            type="file"
            id="image"
            className="text-black w-80 input file-input file-input-bordered "
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block mb-1">
            Feedback:
          </label>
          <textarea
            {...register("feedback", { required: true })}
            id="feedback"
            className="px-3 py-2 border border-gray-300 w-80 rounded-xl"
          ></textarea>
        </div>
        <button type="submit" className="btn-view">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddConReview;
