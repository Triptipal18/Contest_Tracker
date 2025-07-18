import React, { useState } from "react";
import Codeforces from "./codeforces/Codeforces";
import Leetcode from "./leetcode/Leetcode";
import Codechef from "./codechef/Codechef.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showcodeforces, setshowcodeforces] = useState(false);

  return (
    <div className={darkMode ? "bg-black text-white min-h-screen p-6" : "bg-white text-black min-h-screen p-6"}>
      <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
        <span className="bg-blue-500 p-2 rounded">Contest Tracker</span> 
        </h1>
        <nav className="flex gap-6 items-center">
          <a href="#" className="hover:underline">CONTEST TRACKER</a>
          <a href="#" className="hover:underline">PAST CONTESTS</a>
          <a href="#" className="hover:underline">UPDATE CONTEST</a>
          <a href="#" className="hover:underline">BOOKMARKS</a>
          <Link to="/signup" className="hover:underline" >Sign Up</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 px-4 py-2 rounded text-white"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          
        </nav>
      </header>

      <main className="text-center mt-16">
        <h2 className="text-4xl font-bold">
          Never miss a <span className="text-purple-500">contest</span> again
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Track competitive programming contests across multiple platforms in
          one place. Stay updated with upcoming contests from Codeforces,
          LeetCode, CodeChef, and more.
        </p>

        <div className="flex gap-4 mt-6 justify-center">

       <Link to="/codeforces"  className="bg-gray-800 px-4 py-2 rounded flex items-center gap-2 text-white">
            Codeforces
          </Link>
          
          <Link to="/leetcode" className="bg-gray-800 px-4 py-2 rounded flex items-center gap-2 text-white">
            LeetCode
          </Link>

          <Link to="/codechef" className="bg-gray-800 px-4 py-2 rounded flex items-center gap-2 text-white">
            CodeChef
          </Link>

        </div>

        < button className="mt-6 bg-purple-600 px-6 py-3 rounded text-white font-semibold">
          Explore Contests →
        </button>
      </main>
    </div>
  );
};

export default HomePage;