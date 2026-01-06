import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { BsGenderAmbiguous } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api.js";
import toast from "react-hot-toast";
import defaultAvatar from "../assets/profile.png";

function Signup() {
   const navigate = useNavigate()
   const [profileImg, setProfileImg] = useState("");
   const [loading, setLoading] = useState(false);

   const [user, setUser] = useState({
      profilePic: "",
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
   });

   const handleProfileImage = (file) => {
      if (!file) return;

      if (profileImg) {
         URL.revokeObjectURL(profileImg);
      }

      setUser((prev) => ({
         ...prev,
         profilePic: file,
      }));

      const imageURL = URL.createObjectURL(file);
      setProfileImg(imageURL);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (loading) return;
      toast.dismiss();

      // CLIENT-SIDE VALIDATION
      if (user.password !== user.confirmPassword) {
         toast.error("Passwords do not match");
         return;
      }

      if (!user.gender) {
         toast.error("Please select gender");
         return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("profilePic", user.profilePic);
      formData.append("fullName", user.fullName);
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("confirmPassword", user.confirmPassword);
      formData.append("gender", user.gender);

      try {
         const res = await axiosInstance.post("/auth/signup", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
         });

         if (res.data.success) {
            toast.success(res.data.message);

            setUser({
               profilePic: "",
               fullName: "",
               username: "",
               password: "",
               confirmPassword: "",
               gender: "",
            });

            if (profileImg) URL.revokeObjectURL(profileImg);
            setProfileImg("");
            navigate("/login")
         }
      } catch (error) {
         console.log("Error in Signup Form", error);
         toast.error(error.response?.data?.message || "Signup failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="h-dvh w-full text-black flex items-center justify-center flex-col overflow-hidden bg-cover bg-center">
         <h2 className="text-2xl sm:text-3xl font-bold text-center pb-6  text-white">
            WELCOME TO CHATIFY
         </h2>

         <div className="flex justify-center items-center w-full">
            <form
               onSubmit={handleSubmit}
               className="text-white border border-white w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-md rounded-2xl shadow-2xl pt-1 px-10"
            >
               {/* PHOTO UPLOAD */}
               <div className="flex flex-col justify-center items-center gap-2 pt-1">
                  <div className="h-20 w-20 border rounded-full overflow-hidden bg-white">
                     <img
                        src={profileImg || defaultAvatar}
                        className="h-20 w-20 object-cover object-center  "
                        alt="profile"
                     />
                  </div>

                  <label
                     className={`px-4 py-1 rounded-lg text-sm cursor-pointer transition ${loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                  >
                     Upload Photo
                     <input
                        type="file"
                        onChange={(e) => handleProfileImage(e.target.files[0])}
                        accept="image/*"
                        className="hidden"
                        disabled={loading}
                     />
                  </label>
               </div>

               {/* FULL NAME */}
               <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                  <CiUser className="text-blue-500 text-xl" />
                  <input
                     type="text"
                     onChange={(e) =>
                        setUser({
                           ...user,
                           fullName: e.target.value,
                        })
                     }
                     placeholder="Full Name"
                     className="w-full outline-none bg-transparent"
                     required
                     disabled={loading}
                  />
               </div>

               {/* USERNAME */}
               <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                  <CiUser className="text-blue-500 text-xl" />
                  <input
                     type="text"
                     onChange={(e) =>
                        setUser({
                           ...user,
                           username: e.target.value,
                        })
                     }
                     placeholder="Username"
                     className="w-full outline-none bg-transparent"
                     required
                     disabled={loading}
                  />
               </div>

               {/* PASSWORD */}
               <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                  <CiLock className="text-blue-500 text-xl" />
                  <input
                     type="password"
                     onChange={(e) =>
                        setUser({
                           ...user,
                           password: e.target.value,
                        })
                     }
                     placeholder="Password"
                     className="outline-none w-full bg-transparent"
                     required
                     disabled={loading}
                  />
               </div>

               {/* CONFIRM PASSWORD */}
               <div className="w-full border-b-2 border-blue-500 py-2 flex items-center mb-1 gap-2">
                  <CiLock className="text-blue-500 text-xl" />
                  <input
                     type="password"
                     onChange={(e) =>
                        setUser({
                           ...user,
                           confirmPassword: e.target.value,
                        })
                     }
                     placeholder="Confirm Password"
                     className="outline-none w-full bg-transparent"
                     required
                     disabled={loading}
                  />
               </div>

               {/* GENDER */}
               <div className="w-full border-b-2 border-blue-500 py-2 flex items-center gap-10 mb-2">
                  <BsGenderAmbiguous className="text-lg text-cyan-400" />

                  <label className="flex items-center text-gray-400 gap-2">
                     MALE
                     <input
                        type="radio"
                        value="male"
                        checked={user.gender === "male"}
                        onChange={(e) =>
                           setUser({
                              ...user,
                              gender: e.target.value,
                           })
                        }
                        name="gender"
                        disabled={loading}
                     />
                  </label>

                  <label className="flex items-center text-gray-400 gap-2">
                     FEMALE
                     <input
                        type="radio"
                        value="female"
                        checked={user.gender === "female"}
                        onChange={(e) =>
                           setUser({
                              ...user,
                              gender: e.target.value,
                           })
                        }
                        name="gender"
                        disabled={loading}
                     />
                  </label>
               </div>

               {/* BUTTON */}
               <div className="flex justify-center pt-5 pb-2">
                  <button
                     disabled={loading}
                     className={`px-2 py-2 rounded-sm w-full text-white transition ${loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-blue-700 hover:bg-blue-800 font-semibold"
                        }`}
                  >
                     {loading ? "Creating account..." : "SIGNUP"}
                  </button>
               </div>

               {/* LOGIN NAV */}
               <div className="text-center text-gray-300 pb-5">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-400 font-semibold">
                     Login
                  </Link>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Signup;
