import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import emailjs from 'emailjs-com';

function Codeforces() {


  const[loading, setLoading] = useState(true);
  const[loadingpast, setLoadingPast]=useState(true);
  const[contest, setContest] = useState([]);
  const[pastcontest, setPastContest] = useState([]);

  const auth = getAuth();
  console.log(auth)
  const user = auth.currentUser;
  console.log(user)

  // const handleBookmark = async (contestId) => {
  //   if (!user) {
  //     alert("Please log in first to bookmark contests.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("/api/bookmarks", {
  //       userEmail: user.email,
  //       contestId,
  //     });

  //     if (response.status === 200) {
  //       alert("Contest bookmarked!");
  //     }
  //   } catch (error) {
  //     console.error("Error bookmarking the contest", error);
  //     alert("Failed to bookmark contest");
  //   }
  // };


  const sendEmailReminder = (contestName, contestTime) => {
    const user = getAuth().currentUser;
      console.log(user)
    if (!user) {
      alert("Please log in first");
      return;
    }
  
    const templateParams = {
      user_email: user.email,
      contest_name: contestName,
      contest_time: new Date(contest.startTimeSeconds * 1000).toUTCString(),
      subject : "Contest Reminder"
    
    };

  
    emailjs.send(
      service_2buxz9v,
      template_9ttl046,
      templateParams,
      ZTlK0hLVAapr0SAzC,
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert("📩 Email reminder sent!");
    })
    .catch((err) => {
      console.error('FAILED...', err);
    });
  };

  useEffect (()=>{
       const fetchApi = async ()=>{
          try{
            // fetch the API  and convert to json format
            // console.log("CODEFORCES API:", import.meta.env.VITE_CODEFORCES_API);
            const data= await axios.get("https://codeforces.com/api/contest.list")
            // console.log(data);
           
            // filter the upcoming and past contest from data 
            if(data.data.status === 'OK'){
                const upcoming = data.data.result.filter((res) => res.phase==='BEFORE')

              console.log(upcoming);

              const up_coming=upcoming.map((contest) =>({
                id: contest.id,
                name:contest.name,
                time: new Date(contest.startTimeSeconds * 1000).toUTCString(),
                duration: contest.durationSeconds/3600,
              }));

              console.log(up_coming)

              setContest((up_coming).reverse());
            }
          }
          catch(error){
              console.log("unable to fetch the API")
          }
          finally{
                setLoading(false)
          }
   }

   fetchApi();
},[]);

useEffect(()  =>{

      const fetchApi= async() =>{
     try{
          const data= await axios.get("https://codeforces.com/api/contest.list");
          if(data.data.status==='OK'){
            const pastcontest= data.data.result.filter((contest) => contest.phase==='FINISHED')
            const past_contest= pastcontest.map((contest) =>({
              id: contest.id,
              name:contest.name,
              time: new Date(contest.startTimeSeconds * 1000).toUTCString(),
              duration: contest.durationSeconds/3600,
            }) )
            setPastContest(past_contest);
          }

     }
     catch(error){
        console.log("Error in fetChing the API")
     }
     finally{
       setLoadingPast(false)
     }
    
}
fetchApi();
},[])

  return (
    <div className="bg-zinc-900 h-full">
      {/* Navbar */}
      <nav className="dark:bg-zinc-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <img src="/codeforces_icon.jpg" alt="Codeforces Logo" className="h-8 w-8" />
          {/* <h1 className="text-xl font-bold">Codeforces</h1> */}
        </div>
        <ul className="flex text-lg gap-6">
          <li className="hover:text-gray-300 cursor-pointer">Past Contest</li>
          <li className="hover:text-gray-300 cursor-pointer">Leaderboard</li>
          <li className="hover:text-gray-300 cursor-pointer">upComing Contest</li>
        </ul>
      </nav>
      
      {/* Contest Information */}
      <h1 className="text-2xl font-semibold mb-4 text-green-400 m-8 font-bold ">🚀 Upcoming Contests</h1>
      <div className=" flex flex-wrap gap-9 p-6 m-10">
          {loading ? (<h1 className="text-white font-bold text-[52px]">Fetching the data</h1>) : (contest.length===0) ? (<h2> No Upcoming Contest</h2>) : 
            (
              contest.map((contest) =>(
                <div key={contest.id} className="bg-gray-700 w-auto h-auto p-4 hover:-translate-6 gap-9 rounded-lg text-lg text-white shadow-md">
                  <h2 className="font-bold">{contest.name}</h2>
            
                  <p>📅 Start: {contest.time}</p>
                  <p>⏳ Duration: {contest.duration}</p>
                  <a href={`https://codeforces.com/contest/${contest.id}`}
                    target="_blank"
                    
                    className="text-blue-400 underline mt-2 block">
                     View Contest</a>

                     {/* <Link to={`/solutions/${contest.name}`}>
                   <button className="h-auto w-auto bg-red-600 rounded-2xl p-1">View Solutions</button>
                </Link> */}
                     <button className="mt-7  rounded-2xl text-white bg-green-600 w-40 h-auto" onClick={() => sendEmailReminder(contest.name, contest.id)}> BookMark</button>
               </div>

              
               ))
          )}
        
      </div>
        
        <h1 className="text-2xl mb-5  mt-5 font-bold text-red-400 m-8">📜 Past Contests</h1>
        <div className=" flex flex-wrap gap-9 p-6 m-10">
          {loadingpast ? (<h1 className="text-white font-bold text-[52px]">Fetching the data</h1>) : (contest.length===0) ? (<h2> No past Contest</h2>) : 
            (
              pastcontest.slice(0,20).map((contest) =>(
                <div key={contest.id} className="bg-gray-700 hover:-translate-6 w-auto h-auto p-4  gap-9 rounded-lg text-lg text-white shadow-md">
                  <h2 className="font-bold">{contest.name}</h2>
            
                  <p>📅 Start: {contest.time}</p>
                  <p>⏳ Duration: {contest.duration}</p>
                  <a href={`https://codeforces.com/contest/${contest.id}`}
                    target="_blank"
                    
                    className="text-blue-400 underline mt-2 block">
                     View Contest</a>
                     <Link to={`/solutions/${contest.name}`}>
                   <button className="h-auto w-40 bg-red-600 rounded-2xl p-2">View Solutions</button>
                </Link>
                     {/* <button className="mt-7 ml-5 p-2 rounded-2xl text-white bg-green-600 w-40 h-auto" onClick={() => sendEmailReminder(contest.name,contest.time)}> BookMark</button> */}
                     <button className="mt-7 ml-5 p-2 rounded-2xl text-white bg-green-600 w-40 h-auto" onClick={() =>sendEmailReminder(contest.name, contest.id)}> BookMark</button>  
               </div>   
               ))
          )}
        
      </div>
      </div>
    
  );
}

export default Codeforces;
