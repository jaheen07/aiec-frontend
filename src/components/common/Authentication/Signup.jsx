
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { MyContext } from "../../../Context/Context";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useForm } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import google from "../../../assets/social/google.png"

import Lottie from "lottie-react";
import animationData from "../../../assets/animation/reg.json";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Signup = () => {
  const {
    createUser,
    signInGoogle,
    signInFB,
    profileUpdate,
    setLoading,
    logOut,
    auth,
  } = useContext(AuthContext);
  const { language } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [reshowPassword, setreShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);




  // scrollTo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gradientColor =
  "linear-gradient(176.98deg, #FFF3F8 -4.94%, #E1F9F0 42.2%, rgba(244, 213, 255, 0.96) 110.23%)";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const from = "/";



const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://ai-expertcareer.netlify.app/login',
  // This must be true.
  handleCodeInApp: true,
  // dynamicLinkDomain: 'example.page.link'
};

// const handleForm = (data) => {
//   const { email, name, password } = data;
//   console.log(data.repassword)
//   if (data.password !== data.repassword) {
//     setPasswordMatchError(true);
//   } else {
//     setPasswordMatchError(false);

//     if (!passwordMatchError) {
      
//       sendSignInLinkToEmail(auth, email, actionCodeSettings)
//       .then(() => {
//         // The link was successfully sent. Inform the user.
//         // Save the email locally so you don't need to ask the user for it again
//         // if they open the link on the same device.
//         window.localStorage.setItem('emailForSignIn', email);
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ...
//       });
     
  
// }
// }}








const handleForm = (data) => {
  const { email, name, password } = data;

  if (data.password !== data.repassword) {
    setPasswordMatchError(true);
  } else {
    setPasswordMatchError(false);

    if (!passwordMatchError) {
      createUser(email, password)
        .then((result) => {
          const loggedUser = result.user;

          sendEmailVerification(loggedUser);
          logOut();
          reset();
          navigate("/login");
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please check your mail and verify to proceed",
            showConfirmButton: true,
            // timer: 1500
          });
          profileUpdate({ displayName: name }).then(() => {
            const saveUser = {
              displayName: data.name,
              email: data.email,
              phone: data.phone,
              role: "user",
            };                                                           
            fetch("https://ai-server-sooty.vercel.app/users", {   
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {

                if (data.insertedId) {
                  // navigate("/login");
                  reset();
                  
                }
              });
          });
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            toast.error("Email is already in use. Please use a different email.");
          } else {
            toast.error("An error occurred. Please try again later.");
          }
        });
    }
  }
};



  // Handle google signin
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const loggedInUser = result.user;

        const saveUser = {
          displayName: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "user",
        };
        fetch("https://ai-server-sooty.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {

            toast("Successfully Signed In", {
              icon: <AiFillCheckCircle className="text-xl text-primary" />,
            });
            navigate("/");
          });
      })

      .catch(() => {
        setLoading(false);
        // console.log(err.message);
        console.log("error occured");
      });
  };
  // Handle FB signin
  const handlefbSignIn = () => {
    signInFB()
      .then((result) => {
        const loggedInUser = result;
        const saveUser = {
          displayName: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          role: "user",
        };
        fetch("https://ai-server-sooty.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            toast.info("Successfully Signed In", {
              icon: <AiFillCheckCircle className="text-xl text-primary" />,
            });
            navigate("/");
          });
      })

      .catch(() => {
        setLoading(false);
        // console.log(err.message);
        console.log("error occured");
      });
  };

  return (
    <div>
      <div className="mt-12 md:mt-16" style={{ background: gradientColor }}>
        <div className="w-11/12 py-6 mx-auto md:px-20 ">
          <div className="md:flex justify-evenly">
            <div className="p-5  lg:px-[70px] lg:col-span-5 z-10 glass">
              <div className="relative">
                <h2 className="text-[27px] font-bold text-center">
                  {language === "bn"
                    ? "নতুন একাউন্ট ফর্ম"
                    : "Create an Account"}
                </h2>
                {/* <img
                  className="absolute right-0 top-[50%] transform  -translate-y-[50%]  -z-10"
                  src={loginBG}
                  alt="loginBG"
                /> */}
                <form
                  action=""
                  className=""
                  onSubmit={handleSubmit(handleForm)}
                >
                   <input
                  required
                    type="text"
                    className="bg-[#fff0] border-b border-[#8E8E8E] w-full mb-[35px] px-2 py-3"
                    name="name"
                    placeholder={
                      language === "bn" ? "আপনার নাম" : "Enter your name"
                    }
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  <input
                  required
                    type="email"
                    className="bg-[#fff0] border-b border-[#8E8E8E] w-full mb-[35px] px-2 py-3"
                    name="email"
                    placeholder={
                      language === "bn" ? "আপনার ইমেইল" : "Enter your email"
                    }
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                 
                 <input
  type="tel"
  required
  className="bg-[#fff0] border-b border-[#8E8E8E] w-full mb-[35px] px-2 py-3"
  name="phone"
  placeholder={
    language === "bn"
      ? "আপনার মোবাইল নম্বর"
      : "Enter your phone number 01xx"
  }
  {...register("phone", {
    required: "Phone number is required",
    pattern: {
      value: /^01\d{9}$/,
      message: "Please enter a valid phone number",
    },
  })}
/>



                <div className="relative">
                <input
                  required
                    type={showPassword ? "text" : "password"}
                    className="bg-[#fff0] border-b border-[#8E8E8E] w-full mb-7 px-2 py-3"
                    name="password"
                    placeholder={
                      language === "bn" ? "পাসওয়ার্ড" : "Enter your password"
                    }
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                        message:
                          "Password must contain an uppercase letter, a lowercase letter, a number, and a special character",
                      },
                    })}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="absolute text-2xl text-gray-400 transform -translate-y-1/2 cursor-pointer right-3 bottom-7"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="absolute text-2xl text-gray-400 transform -translate-y-1/2 cursor-pointer right-3 bottom-7"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                 



                  {/* Retype pass */}
                <div className="relative">
                <input
        type={reshowPassword ? "text" : "password"}
        className="bg-[#fff0] border-b border-[#8E8E8E] w-full mb-7 px-2 py-3"
        name="repassword"
        placeholder={
          language === "bn" ? "পাসওয়ার্ড নিশ্চিত করুন" : "Confirm your password"
        }
        {...register("repassword", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
      />
                  {reshowPassword ? (
                    <FaEyeSlash
                      className="absolute text-2xl text-gray-400 transform -translate-y-1/2 cursor-pointer right-3 bottom-7"
                      onClick={() => setreShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="absolute text-2xl text-gray-400 transform -translate-y-1/2 cursor-pointer right-3 bottom-7"
                      onClick={() => setreShowPassword(true)}
                    />
                  )}

                </div>
            
                  
{ errors.phone ?   <p className="text-sm text-red-500">{errors.phone.message}</p> :
  errors.password ?<> {errors.password  && (
    <span className="text-sm text-red-500">{errors.password.message}</span>
    )}</> :  <>{passwordMatchError && (
      <span className="text-sm text-red-500">Passwords do not match</span>
      )}</>
}


                  
                    

                    
                   
                     


                  <button
                    type="submit"
                    className="w-full mt-2 btn-view"
                  >
                      {language === "bn" ? "সাবমিট" : "Sign Up "}
                   
                  </button>
                </form>


               
              </div>
             {/* join with google button  */}
             <div className="mx-auto mt-10 text-center bg-white rounded-lg">
                <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center w-full p-2 border rounded-md border-red"
            >
              <img className="w-8 h-8" src={google} alt="" />
              <span className="ml-2">Sign up with Google</span>
            </button>
                </div>
                {/* join with facebook button  */}
                {/* <div className="mx-auto mt-5 text-center bg-white rounded-lg">
                <button
              onClick={handlefbSignIn}
              type="button"
              className="flex items-center justify-center w-full p-2 border rounded-md border-red"
            >
              <img className="ml-5 h-9 w-9" src={facebook} alt="" />
              <span className="ml-2">Sign up with Facebook</span>
            </button>
                </div> */}


            <p
            className= "mt-8 font-normal text-center text-gray-700 text-md"
       
          >
             {language == "bn" ? "এ্যাকাউন্ট তৈরী আছে? " : "Already have an account? "}
            
            <Link
              to="/login"
              className="text-lg font-medium text-primary hover:underline hover:text-primary"
            >
               {language == "bn" ? " সাইন ইন করুন" : " Sign In Here"}
             
            </Link>
          </p>
            </div>
            <div className="">

            <Lottie
          className="w-full pointer-events-none select-none no-select unselectable"
          animationData={animationData}
          loop={true}
          />
          </div>





            
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
