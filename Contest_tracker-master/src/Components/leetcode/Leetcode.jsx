import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import emailjs from 'emailjs-com';

const Leetcode = () => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const sendEmailReminder = (contestName, contestTime) => {
    // console.log(contestName, contestTime)
    const user = getAuth().currentUser;
     //console.log(user)
    if (!user){
      alert("Please log in first");
      return;
    }
  
    const templateParams = {
      user_email: user.email,
      contest_name: contestName,
      // contest_time: new Date(contest.startTimeSeconds * 1000).toUTCString(),
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
    const fetchLeetCodeContests = async () => {
      try {
        const response = await axios.get("/api/leetcode-contests", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Enable CORS
        });
        
        const upcoming = response.data.filter(contest => contest.status === "upcoming");
        const past = response.data.filter(contest => contest.status === "past");

        setUpcomingContests(upcoming);
        setPastContests(past);
      } catch (error) {
        console.error("Error fetching contests:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeContests();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">LeetCode Contests</h1>

      {loading ? (
        <p>Loading contests...</p>
      ) : (
        <>
          {/* Upcoming Contests Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-green-400">🚀 Upcoming Contests</h2>
            {upcomingContests.length === 0 ? (
              <p>No upcoming contests.</p>
            ) : (
              <ul className="space-y-4 mt-4">
                {upcomingContests.map((contest, index) => (
                  <li key={index} className="p-4 bg-gray-700 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold">{contest.name}</h2>
                    <p>📅 Start Time: {new Date(contest.startTime).toLocaleString()}</p>
                    <p>⏳ Duration: {contest.duration} minutes</p>
                    <a href={contest.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      🔗 View Contest
                    </a>
                    <button className=" ml-20 rounded-2xl text-white bg-green-600 w-40 h-auto" > BookMark</button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Past Contests Section */}
          <section>
            <h2 className="text-2xl font-bold text-red-400">📜 Past Contests</h2>
            {pastContests.length === 0 ? (
              <p>No past contests.</p>
            ) : (
              <ul className="space-y-4 mt-4">
                {pastContests.map((contest, index) => (
                  <li key={index} className="p-4 bg-gray-700 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold">{contest.name}</h2>
                    <p>📅 Start Time: {new Date(contest.startTime).toLocaleString()}</p>
                    <p>⏳ Duration: {contest.duration} minutes</p>
                    <a href={contest.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      🔗 View Contest
                    </a>
                    <br></br>
                    <Link to={`/solutions/${contest.name}`} >
                     <button className="m-3 w-40 bg-red-600 p-2 rounded-2xl">View Solutions</button>
                    </Link>
                    <button className=" ml-20 rounded-2xl text-white p-2 bg-green-600 w-40 h-auto"> BookMark</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Leetcode;
