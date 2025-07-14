import React,{ useState }from 'react'
import {Link} from "react-router-dom";
import {auth} from  './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
           await createUserWithEmailAndPassword(auth,email,password)
           const user = auth.currentUser;
           console.log(user)
           console.log("Account Created")
        }
        catch(err){
           console.log(err)
        }
    }
  return (
    <div className="flex items-center justify-center h-screen bg-royalblue">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-center text-xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}> 
          <label className="block mb-2 text-sm font-medium">Email:</label>
          <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />

          <label className="block mb-2 text-sm font-medium">Password:</label>
          <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already Registered? <Link to="/login" className="text-blue-700 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpForm;
