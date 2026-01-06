import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Hero from "./pages/Hero";
import bg from "./assets/bg.jpg";
import MessageCntr from "./components/chats/MessageCntr"

function App() {
   return (
      <div
         style={{
            backgroundImage: `url(${bg})`,
            minHeight: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
      >
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Hero />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/home" element={<Home />}>
                  <Route path="chat/:id" element={<MessageCntr />} />
               </Route>
               <Route path="/profile" element={<Profile />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
