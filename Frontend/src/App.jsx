import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Navabar } from "./comp/Navbar";
import { Footer } from "./comp/Footer";
import { Privateroute } from "./comp/Privateroute";

function App() {
  return (
    <div className="bg-[#ffffff] h-screen ">
      <Navabar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route element={<Privateroute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
