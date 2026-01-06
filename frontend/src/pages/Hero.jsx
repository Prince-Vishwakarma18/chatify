import React from "react";
import hero from "../assets/Chatrafiki.svg";
import { useNavigate } from "react-router-dom";

function Hero() {
   const navigate = useNavigate();

   return (
      <div className="flex flex-col-reverse md:flex-row w-full h-dvh text-white">
         {/* TEXT SECTION */}
         <div className="w-full flex flex-col justify-center px-6 py-10 font-serif">
            {/* Heading */}
            <div className="text-center md:text-left text-3xl sm:text-4xl md:text-4xl font-bold leading-tight ">
               <h1>Chatify : Real-Time</h1>
               <h1>Connection, Effortless</h1>
               <h1>Conversations</h1>
            </div>

            {/* Hidden on mobiles*/}
            <div className="py-3 text-center md:text-left text-sm sm:text-base md:text-lg hidden md:block">
               <p>
                  A modern real-time chat application built on the MERN stack,
                  <br />
                  delivering secure, instant, and responsive conversations.
               </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-5 mt-3 justify-center md:justify-start">
               <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline btn-primary"
               >
                  LOGIN
               </button>

               <button
                  onClick={() => navigate("/signup")}
                  className="btn btn-outline btn-primary"
               >
                  SIGNUP
               </button>
            </div>
         </div>

         {/* IMG  */}
         <div className="w-full flex justify-center  md:items-center">
            <img
               src={hero}
               alt="hero"
               className="  w-[85%]  sm:w-[70%]  md:w-full  max-h-[75vh] object-contain mask-radial-from-neutral-content"
            />
         </div>
      </div>
   );
}

export default Hero;
