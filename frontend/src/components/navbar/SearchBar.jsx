import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/userSlice";
function SearchBar() {
   const dispatch = useDispatch();
   const [search, setSearch] = useState("");

   const handleSearchInp = (e) => {
      e.preventDefault();
      dispatch(setSearchQuery(search));
   };

   return (
      <div className="w-full">
         <form onSubmit={handleSearchInp}>
            <label className="flex items-center border rounded-sm px-1  py-1 ">
               {/* Inp */}
               <input
                  onChange={(e) => {
                     setSearch(e.target.value);
                     dispatch(setSearchQuery(e.target.value));
                  }}
                  type="search"
                  placeholder="Search..."
                  className="outline-none  w-20 sm:w-full  "
               />
               {/* Search Btn*/}
               <CiSearch className=" text-xl sm:text-2xl  md:text-3xl  lg:text-4x " />
            </label>
         </form>
      </div>
   );
}

export default SearchBar;
