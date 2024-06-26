import { useForm, Controller, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import UseUser from "../../hooks/useUser";
import Loader from "../../components/common/loader/Loader";
import { CiSquareRemove } from "react-icons/ci";
import JoditEditor from "jodit-react";

const EditConsultantProfile = () => {
  const [userinfo, isLoading, refetch] = UseUser();
  const [summary, setSummary] = useState("");
  const editor = useRef(null);
  

  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const servicesOptions = [
  "Career Consultancy",
  "Corporate Consultancy",
  "1:1 Mentorship Program",
  "Research (Thesis/Report/Patent)",
  "AI Project (Basic to Advanced)"
  ];
  const timeOptions = [
    "9:00 AM - 10:30 AM",
    "10:30 AM - 12:00 AM",
    "2:00 PM - 3:30 PM",
    "3:30 PM - 5:00 PM",
    "5:00 PM - 6:30 PM",
    "6:30 PM - 8:00 PM",
    "8:00 PM - 9:30 PM",
    "9:30 PM - 11:00 PM"];
  
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      displayName: userinfo?.displayName,
      email: userinfo?.email,
      phone: userinfo?.phone,
      designation: userinfo?.designation,
      description: userinfo?.description,
      recentWorks: userinfo?.recentWorks,
      successes: userinfo?.successes,
      experience: userinfo?.experience,
      qualification: userinfo?.qualification,
      availability: userinfo?.availability,
      selectedDays: userinfo?.selectedDays,
      summary: userinfo?.summary,
      facebook: userinfo?.facebook,
      linkedin: userinfo?.linkedin,
      twitter: userinfo?.twitter,
      github: userinfo?.github,
    },
  });

  const {
    fields: recentWorks,
    append: appendRecentWork,
    remove: removeRecentWork,
  } = useFieldArray({
    control,
    name: "recentWorks",
  });
  const {
    fields: successes,
    append: appendSuccess,
    remove: removeSuccess,
  } = useFieldArray({
    control,
    name: "successes",
  });
  const {
    fields: experience,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });
  const {
    fields: qualification,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualification",
  });





  

  const onSubmit = (data) => {
    
    const {
      displayName,
      phone,
      designation,
      description,
      recentWorks,
      successes,
      experience,
      qualification,
      availability,
      facebook,
      linkedin,
      twitter,
      github,
    } = data;
    
    const selectedDays = daysOfWeek.filter((day) =>
      getValues(`availability.${day}`)
    );
    const workingWith = servicesOptions.filter((service) =>
      getValues(`services.${service}`)
    );
    const prefertime = timeOptions.filter((time) =>
      getValues(`times.${time}`)
    );
    
    
    const profile = {
      displayName,
      email: userinfo.email,
      phone,
      designation,
      description,
      recentWorks,
      successes,
      experience,
      qualification,
      availability,
      selectedDays,
      workingWith : workingWith.length > 0 ? workingWith : userinfo.workingWith,
      prefertime : prefertime.length > 0 ? prefertime : userinfo.prefertime,
      summary,
      facebook,
      linkedin,
      twitter,
      github,
    };
   
    axios
      .patch(
        `https://ai-server-sooty.vercel.app/consultantinfoupdate/?email=${userinfo?.email}`,
        profile
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          // reset(); // Reset the form
          toast.success("Profile updated successfully");
          // refetch();
        } else if (res.data.modifiedCount === 0 || res.data.matchedCount > 1) {
          
          toast.error("Profile is not updated");
        }
      })
      .catch(() => console.log("error"));
  };

  if (!userinfo) return <Loader />;
  return (
    <div>
      <div className="container p-4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 space-y-4 md:grid-cols-2">
            <div className="">
              <label
                htmlFor="displayName"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="displayName"
                    defaultValue={userinfo?.displayName}
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="email"
                    value={userinfo?.email}
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>

            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-800"
              >
                Phone Number
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="phone"
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>
            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                Designation
              </label>
              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                Company Name
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>

            <div className="flex-grow">
              <label className="block mb-2 text-sm font-semibold text-gray-800">
                Career Summary
              </label>

              <JoditEditor
                id="summary"
                ref={editor}
                value={userinfo?.summary}
                tabIndex={1}
                onChange={(s) => setSummary(s)}
              />
            </div>
            <div className="">
  <label className="block text-sm font-semibold text-gray-800">
    Availability
  </label>
  <div className="grid grid-cols-3 space-y-2">
    {daysOfWeek.map((day) => (
      <div key={day} className="flex items-center gap-2 ">
        <Controller
          name={`availability.${day}`}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="checkbox"
                className="checkbox checkbox-xs"
                value={day} 
                checked={field.value === true} 
              />
              <label>{day}</label>
            </>
          )}
        />
      </div>
    ))}
  </div>
</div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                Working With
              </label>
              <div className="space-y-2">
                {servicesOptions.map((service) => (
                  <div key={service} className="flex items-center gap-2">
                    <Controller
                      name={`services.${service}`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="checkbox"
                            className="checkbox checkbox-xs"
                          />
                          <label>{service}</label>
                        </>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="">
        <label className="block text-sm font-semibold text-gray-800">
          Recent Works
        </label>
        {recentWorks?.map((field, index) => (
          <div key={field}>
            <Controller
              name={`recentWorks[${index}].work`}
              control={control}
              defaultValue={field.work}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  placeholder="Work"
                />
              )}
            />
            <Controller
              name={`recentWorks[${index}].link`}
              control={control}
              defaultValue={field.link}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  placeholder="Link"
                />
              )}
            />
            <button
              type="button"
              className="m-2"
              onClick={() => removeRecentWork(index)}
            >
              <CiSquareRemove className="text-2xl" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="m-2 btn-black"
          onClick={() => appendRecentWork({ work: '', link: '' })}
        >
          Add Recent Work
        </button>
      </div>
            
            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                your Preferable Time
              </label>
              <div className="space-y-2">
                {timeOptions.map((time) => (
                  <div key={time} className="flex items-center gap-2">
                    <Controller
                      name={`times.${time}`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="checkbox"
                            className="checkbox checkbox-xs"
                          />
                          <label>{time}</label>
                        </>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                Awards & Achievement
              </label>
              {successes?.map((field, index) => (
                <div key={field.id}>
                  <Controller
                    name={`successes[${index}]`}
                    control={control}
                    defaultValue={field.value}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 border rounded-lg"
                      />
                    )}
                  />
                  <button
                    type="button"
                    className="m-2"
                    onClick={() => removeSuccess(index)}
                  >
                    <CiSquareRemove className="text-2xl" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="m-2 btn-black"
                onClick={() => appendSuccess("")}
              >
                Add Awards & achievement
              </button>
            </div>
            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                Experience
              </label>
              {experience?.map((field, index) => (
                <div key={field.id}>
                  <Controller
                    name={`experience[${index}]`}
                    control={control}
                    defaultValue={field.value}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 border rounded-lg"
                      />
                    )}
                  />
                  <button
                    type="button"
                    className="m-2 "
                    onClick={() => removeExperience(index)}
                  >
                    <CiSquareRemove className="text-2xl" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="m-2 btn-black"
                onClick={() => appendExperience("")}
              >
                Add Experience
              </button>
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-800">
                Educational Qualification
              </label>
              {qualification?.map((field, index) => (
                <div key={field.id}>
                  <Controller
                    name={`qualification[${index}]`}
                    control={control}
                    defaultValue={field.value}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 border rounded-lg"
                      />
                    )}
                  />
                  <button
                    type="button"
                    className="m-2 "
                    onClick={() => removeQualification(index)}
                  >
                    <CiSquareRemove className="text-2xl" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="m-2 btn-black"
                onClick={() => appendQualification("")}
              >
                Add Qualification
              </button>
            </div>
            <div className="">
              <label
                htmlFor="facebook"
                className="block text-sm font-semibold text-gray-800"
              >
                Facebook Profile Link
              </label>
              <Controller
                name="facebook"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    id="facebook"
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>

            <div className="">
              <label
                htmlFor="linkedin"
                className="block text-sm font-semibold text-gray-800"
              >
                LinkedIn Profile Link
              </label>
              <Controller
                name="linkedin"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    id="linkedin"
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>

            <div className="">
              <label
                htmlFor="twitter"
                className="block text-sm font-semibold text-gray-800"
              >
                Twitter Profile Link
              </label>
              <Controller
                name="twitter"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    id="twitter"
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>
            <div className="">
              <label
                htmlFor="github"
                className="block text-sm font-semibold text-gray-800"
              >
                Github Profile Link
              </label>
              <Controller
                name="github"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    id="github"
                    className="block w-full px-4 py-2 mt-2 border rounded-lg"
                  />
                )}
              />
            </div>
          </div>
          <button type="submit" className="my-5 btn-add">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditConsultantProfile;
