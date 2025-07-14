import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import emailjs from 'emailjs-com';

const CodeChefContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sendEmailReminder = (contestName, contestTime) => {
    const user = getAuth().currentUser;
    //  console.log(user)
    if (!user) {
      alert("Please log in first");
      return;
    }
  
    const templateParams = {
      user_email: user.email,
      contest_name: contestName,
      contest_time: contestTime,
      subject : "Contest Reminder"
    };
  
    emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_PUBLIC_KEY,
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert("📩 Email reminder sent!");
    })
    .catch((err) => {
      console.error('FAILED...', err);
    });
  };


  useEffect(() => {
    const fetchCodeChefContests = async () => {
      try {
        const response = await axios.get("/api/codechef-contests"); // ✅ Using proxy
        console.log("API Response:", response.data); // Debugging
        setContests(response.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
        setError("Failed to load contests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCodeChefContests();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🚀 CodeChef Contests</h1>

      {loading ? (
        <p className="text-center">Loading contests...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : contests.length === 0 ? (
        <p className="text-center">No contests available.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Upcoming Contests */}
          <h2 className="text-2xl text-green-400 font-bold m-6">📅 Upcoming Contests</h2>
          <ul className="space-y-4">
            {contests.filter(contest => contest.status === "upcoming").map((contest, index) => (
              <li key={index} className="p-4 bg-gray-700 rounded-md shadow-md">
                <h2 className="text-xl font-semibold">{contest.name}</h2>
                <p>📅 Start Time: {new Date(contest.startTime).toLocaleString()}</p>
                <p>⏳ Duration: {contest.duration} hours</p>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  🔗 View Contest
                </a>
                
                <button className=" ml-20 rounded-2xl text-white bg-green-600 w-40 h-auto"> BookMark</button>
              </li>
            ))}
          </ul>

          {/* Past Contests */}
          <h2 className="text-2xl text-red-400 font-bold m-6">⏳ Past Contests</h2>
          <ul className="space-y-4">
            {contests.filter(contest => contest.status === "past").map((contest, index) => (
              <li key={index} className="p-4 bg-gray-700 rounded-md shadow-md">
                <h2 className="text-xl font-semibold">{contest.name}</h2>
                <p>📅 Start Time: {new Date(contest.startTime).toLocaleString()}</p>
                <p>⏳ Duration: {contest.duration} minutes</p>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  🔗 View Contest
                </a>
               <br></br>
                <Link to={`/solutions/${contest.name}`}>
                   <button className="m-3 p-2 w-40 h-auto rounded-2xl bg-red-500 "> View Solutions</button>
                </Link>
                <button className=" ml-20 rounded-2xl p-2 text-white bg-green-600 w-40 h-auto"> BookMark</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeChefContests;
