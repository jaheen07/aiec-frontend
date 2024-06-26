/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MyContext } from "../../../Context/Context";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthProvider";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { AiFillCheckCircle } from "react-icons/ai";
import Lottie from "lottie-react";
import google from "../../../assets/social/google.png"
import animationData from "../../../assets/animation/login.json";


const Login = () => {
  const { signIn, signInGoogle, signInFB, setLoading,logOut } =
    useContext(AuthContext);
  const { language } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const gradientColor =
  "linear-gradient(176.98deg, #FFF3F8 -4.94%, #E1F9F0 42.2%, rgba(244, 213, 255, 0.96) 110.23%)";
 





 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";





 const handleForm = (data) => {
  const { email, password } = data;

  signIn(email, password)
    .then((result) => {
      const loggedUser = result.user;


      // Check if the user's email is verified
      if (loggedUser.emailVerified) {
        if (location.state) {
          // Navigate to the specified route if 'from' and its nested properties are not null
          navigate(from,  { state: location.state.from.state });
        } else {
          // Navigate to the default route if 'from' is null
          navigate("/");
        }

        toast.info("Successfully Signed In", {
          icon: <AiFillCheckCircle className="text-xl text-primary" />,
        });
      } else {
        logOut();
        toast.error("Please verify your email before signing in.");
      }
    })
    .catch((error) => {
      console.error("Sign-in error:", error);

      const errorCode = error.code;
      if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Invalid email or password");
      }
    });
};

  












  // const handleForm = (data) => {
  //   const { email, password } = data;

  //   signIn(email, password)
  //     .then((result) => {
  //       console.log(result)
  //       const loggedUser = result.user;
  //       console.log(loggedUser);
  //       navigate(from, { state: location.state.from.state });

  //       toast.info("Successfully Signed In", {
  //         icon: <AiFillCheckCircle className="text-xl text-primary" />,
  //       });
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       if (
  //         errorCode === "auth/user-not-found" ||
  //         errorCode === "auth/wrong-password"
  //       ) {
  //         toast.error("Invalid email or password");
  //       } else {
  //         toast.error("Invalid email or password");
  //       }
  //     });
  // };

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

            toast.info("Successfully Signed In", {
              icon: <AiFillCheckCircle className="text-xl text-primary" />,
            });
            navigate(from, { state: location.state.from.state, });
          });
      })

      .catch(() => {
        setLoading(false);
        // console.log(err.message);
        console.log("error Occured");
      });
  };
  // Handle FB signin
  const handlefbSignIn = () => {
    signInFB()
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
            toast.info("Successfully Signed In", {
              icon: <AiFillCheckCircle className="text-xl text-primary" />,
            });
            navigate(from, { state: location.state.from.state });
          });
      })

      .catch(() => {
        setLoading(false);
        // console.log(err.message);
        console.log("error Occured");
      });
  };

  
 // scrollTo
 useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  return (
    <div>
      <div className="mt-12 md:mt-16" style={{ background: gradientColor }}>
        <div className="w-11/12 py-6 mx-auto md:px-20 ">
          <div className="md:flex justify-evenly ">
            <div className="z-10 p-5 md:pt-20 md:w-1/2 glass">
              <div className="relative">
                <h2 className="text-[27px] font-bold text-center md:mb-[45px]">
                  {language === "bn" ? "লগইন একাউন্ট" : "Login"}
                </h2>
                  {/* <img
                    className="absolute right-0 top-[50%] transform -translate-y-[50%] -z-10"
                    src={loginBG}
                    alt=""
                  /> */}
                <form
                  action=""
                  className=""
                  onSubmit={handleSubmit(handleForm)}
                >
                  <input
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
                 <div className="relative">
                 <input
                    type={showPassword ? "text" : "password"}
                    className="bg-[#fff0] border-b border-[#8E8E8E] w-full mb-[40px] px-2 py-3"
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
                    })}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="absolute text-2xl text-gray-400 transform -translate-y-1/2 cursor-pointer right-3 bottom-9"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="absolute text-2xl text-gray-400 transform -translate-y-1/2 cursor-pointer right-3 bottom-9"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                 </div>
                  <div className="flex justify-between">
                    <div>
                      {errors.password && (
                        <span className="error">Password is required</span>
                      )}
                    </div>
                    <Link
                      to="/forget"
                      className="text-xs text-red hover:underline"
                    >
                  {language === "bn" ? "পাসওয়ার্ড ভূলে গিয়েছেন?" : "Forget Password?"}
                    
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 btn-view"
                  >
                    
                      {language === "bn" ? "লগইন" : "Login"}
                    
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
              <span className="ml-2">Sign in with Google</span>
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
              <span className="ml-2">Sign in with Facebook</span>
            </button>
                </div> */}


            <p
            className= "mt-8 font-normal text-center text-gray-700 text-md"
       
          >
             {language == "bn" ? "কোন এ্যাকাউন্ট নেই?" : "Don't have an account?"}
           
            <Link
              to="/signup"
              // state ={{from : location.state}}
              className="text-lg font-medium text-primary hover:underline hover:text-primary"
              >
              {language == "bn" ? "  সাইন আপ করুন" : "  Sign Up Here"}
            
            </Link>
          </p>
            </div>
           
            <div className="">
            <Lottie
          className="pointer-events-none select-none no-select unselectable md:w-full"
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

export default Login;
