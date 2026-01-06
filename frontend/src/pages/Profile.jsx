import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Logout from "../components/navbar/Logout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../store/userSlice";

function Profile() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [profileImg, setProfileImg] = useState(null);
   const [preview, setPreview] = useState(null);
   const { authUser } = useSelector((state) => state.user);
   const [loading, setLoading] = useState(false);

   const handleUpload = (e) => {
      const file = e.target.files[0];
      setProfileImg(file);
      setPreview(URL.createObjectURL(file));
   };
   const handleUpdateProfile = async () => {
      if (loading) return;
      if (!profileImg) {
         toast.dismiss();
         toast.error("Please select an image first!");
         return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("profilePic", profileImg);

      try {
         const res = await axiosInstance.put("/auth/update-profile", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
         });

         // console.log("Updated data ", res.data);
         dispatch(setAuthUser(res.data.user));
         toast.dismiss();
         toast.success("Profile Updated Successfully!");
      } catch (error) {
         console.log("Error in profile updation", error);
         toast.dismiss();
         toast.error(error.response?.data?.message || "Update failed");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-full h-dvh flex items-center justify-center bg-cover bg-center">
         <div className="flex flex-col items-center w-96 bg-black/20 border shadow-lg px-2 py-2 rounded-xl">
            {/* Back btn */}
            <div className="flex items-center justify-between w-full mb-6">
               <IoArrowBack
                  onClick={() => navigate("/home")}
                  className="text-2xl text-gray-200 cursor-pointer"
               />
               <h1 className="text-xl font-semibold text-blue-400 pl-5 sm:pl-18">
                  Edit Profile
               </h1>
               <Logout />
            </div>

            {/* Profile img */}
            <div className="relative h-28 w-28 rounded-full border-2  overflow-hidden shadow-md">
               <img
                  src={preview || authUser.profilePic}
                  alt="profile"
                  className="object-cover h-full w-full"
               />

               <input
                  onChange={handleUpload}
                  type="file"
                  id="profileUpload"
                  className="hidden"
               />

               <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg bg-black/60 text-white p-2 rounded-xl cursor-pointer"
               >
                  <FaCamera />
               </label>
            </div>
            <div className="w-full flex flex-col gap-5 mt-6">
               {/* Full Name */}
               <div className="relative border border-white  p-3 rounded-lg">
                  <span className="absolute border rounded-sm  -top-3 left-3 bg-white text-sm px-1 text-black">
                     Full Name
                  </span>
                  <p className="text-white text-lg font-medium">
                     {authUser.fullName}
                  </p>
               </div>

               {/* Username */}
               <div className="relative border-2 border-gray-400 p-3 rounded-lg">
                  <span className="absolute rounded-sm -top-3 left-3 bg-white text-sm px-1 text-black">
                     Username
                  </span>
                  <p className="text-white text-lg font-medium">
                     {authUser.username}
                  </p>
               </div>
            </div>

            {/* Save btn */}
            <button
               onClick={handleUpdateProfile}
               disabled={loading}
               className="w-full mt-6 py-2 mb-2 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
            >
               {loading ? "Updating..." : "SAVE CHANGES"}
            </button>
         </div>
      </div>
   );
}

export default Profile;
