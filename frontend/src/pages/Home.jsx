import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
   const isChatOpen = useMatch("/home/chat/:id");
   const authUser = useSelector((state) => state.user.authUser)

   return (
      <div className="h-dvh flex flex-col overflow-hidden bg-transparent">
         {/*Navbar */}
         <Navbar />

         <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside
               className={`
            ${isChatOpen ? "hidden md:block" : "block"}
            w-full md:w-18 lg:w-[250px]
            border-r border-white/20
          `}
            >
               <Sidebar />
            </aside>

            {/* Message Container */}
            <div
               className={`
                  flex-1 flex items-center justify-center
                  ${isChatOpen ? "flex" : "hidden md:flex"}
               `}
            >
               {isChatOpen ? (
                  <Outlet />
               ) : (
                  <div className="flex flex-col items-center justify-center text-gray-200">
                     <h2 className="font-semibold text-xl">
                        Hello {authUser?.fullName}
                     </h2>
                     <p className="text-lg text-center mt-1">
                        Let’s start a conversation
                     </p>
                  </div>
               )}
            </div>

         </div>
      </div>
   );
}

export default Home;
