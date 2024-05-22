import { useEffect, useState,useRef } from "react";
import { useForm, Controller,useFieldArray } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

const AddCourseBanner = () => {
  const { control, handleSubmit, reset, register } = useForm();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const editor = useRef(null);
  const [description, setDescription] = useState("");
  const [eventtype, settype] = useState("");


  const handleTypeChange = (e) => {
    settype(e.target.value);
  };

  const {
    fields: faqFields,
    append: faqAppend,
    remove: faqRemove,
  } = useFieldArray({
    control,
    name: "faqItems",
  });
  useEffect(() => {
    fetch(" https://ai-server-sooty.vercel.app/banners")
      .then((response) => response.json())
      .then((data) => setBanners(data));
    setIsLoading(false);
  }, [banners]);
  const handleDelete = (blog) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your selected Blog will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-server-sooty.vercel.app/singlebanners/${blog._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Blog has been deleted.", "success");
            }
          });
      }
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { title, date,faqItems } = data;

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

      // Prepare banner Data
      const bannerData = {
        title,
        date,
        eventtype,
        banner: cover_image_url,
        description,
        faqItems,
      };

      // Send Banner Data to API
      const apiResponse = await fetch(
        "https://ai-server-sooty.vercel.app/banners",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bannerData),
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Banner insertion failed");
      }

      const responseData = await apiResponse.json();

      if (responseData.insertedId) {
        reset();
        toast.success("Added the banner successfully");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, try again");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="p-4 my-5 text-2xl font-bold text-center text-white rounded-md bg-primary">
        Add Event Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 mx-auto">
        <div className="flex justify-around w-full">
          <div className="mb-4 ">
            <label
              htmlFor="Event Title"
              className="block text-sm font-bold text-gray-700"
            >
              Event Title:
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
              )}
            />
          </div>

          <div className="mb-4 ">
            <label
              htmlFor="date"
              className="block text-sm font-bold text-gray-700"
            >
              Event Subtitle:
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
              )}
            />
          </div>
            <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-bold text-gray-700">
              Event Type:
            </label>
            <select
              id="category"
              required
              className="px-3 py-2 border border-gray-300 rounded w-60 focus:outline-none focus:border-orange"
              value={eventtype}
              onChange={handleTypeChange}
            >
              <option value="">Select</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              
            </select>
          </div>
          <div className="mb-4 ">
            <label
              htmlFor="banner"
              className="block text-sm font-bold text-gray-700"
            >
              Show Case Banner:
            </label>
            <input
              type="file"
              id="banner"
              className="w-full max-w-xs file-input file-input-bordered file-input-sm"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div> 
        </div>

        <div className="mb-4 w-60">
            <label
              htmlFor="time"
              className="block text-sm font-bold text-gray-700"
            >
              Event Time:
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                />
              )}
            />
          </div>

        <div className="w-11/12 mb-6">
          <label
            htmlFor="description"
            className="block mb-2 font-bold text-gray-700"
          >
            Event Description
          </label>

          <JoditEditor
            id="description"
            ref={editor}
            value={description}
            tabIndex={1} // tabIndex of textarea
            onChange={(newDescription) => setDescription(newDescription)}
          />
        </div>

        <div className="my-10">
            <h2 className="mb-4 text-2xl font-bold">
              Frequently Asked Questions:
            </h2>

            {faqFields.map((faq, index) => (
              <div key={faq.id} className="flex items-center gap-10 mb-4">
                <input
                  type="text"
                  placeholder="Question"
                  {...register(`faqItems.${index}.question`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                />
                <input
                  type="text"
                  placeholder="Answer"
                  {...register(`faqItems.${index}.answer`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl "
                />
                <button
                  type="button"
                  onClick={() => faqRemove(index)}
                  className="mt-2 btn-black"
                >
                  <FiDelete />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => faqAppend({ question: "", answer: "" })}
              className="btn-black"
            >
              <MdAdd /> Add FAQ
            </button>
          </div>

        <div className="w-32 mx-auto">
          <button type="submit" className="btn-black">
            {isLoading ? (
              <p className="flex items-center gap-2 ">
                Uploading{" "}
                <span className="loading loading-spinner text-error"></span>
              </p>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      {/* Manage Banners */}

      <div className="my-10">
        <table className="table w-full overflow-x-auto text-center shadow-xl table-zebra">
          {/* head */}
          <thead className="text-xl text-center text-white bg-primary">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th className="text-center">Picture</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banners, index) => (
              <tr key={banners._id}>
                <th>{index + 1}</th>
                <td className="max-w-xs">{banners.title}</td>
                <td>
                  <img
                    className="w-32 mx-auto rounded-md"
                    src={banners.banner}
                    alt=""
                  />
                </td>

                <td className="text-center">
                  <button
                    onClick={() => handleDelete(banners)}
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

export default AddCourseBanner;
