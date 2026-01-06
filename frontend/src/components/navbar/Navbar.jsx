import React from "react";
import { BsChatSquareDotsFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import Logout from "./Logout";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Navbar() {
   const navigate = useNavigate();

   return (
      <div className=" w-full flex items-center justify-between px-1 sm:px-10 border-b border-gray-700 py-2 backdrop-filter backdrop-blur-xl bg-opacity-0 p-4 ">
         {/* CHATIFY Logo*/}
         <div className="flex items-center sm:text-2xl gap-1 font-bold">
            CHATIFY
            <BsChatSquareDotsFill className="mt-1" />
         </div>
         {/* Searchbar */}
         <div>
            <SearchBar />
         </div>

         <div className="flex items-center gap-3">
            {/* Profile Button */}
            <button
               onClick={() => navigate("/profile")}
               className="flex items-center gap-1  font-semibold border border-white/70 text-white backdrop-filter backdrop-blur-xl bg-opacity-0 p-2 rounded-md "
            >
               <FaRegCircleUser className="text-xl sm:text-2xl" />
               {/* Hide text on mobile */}
               <span className="hidden md:block">PROFILE</span>
            </button>
            {/* Logout */}
            <div className="flex items-center">
               <Logout />
            </div>
         </div>
      </div>
   );
}

export default Navbar;
