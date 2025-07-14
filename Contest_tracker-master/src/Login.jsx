import React,{ useState }from 'react'
import {Link} from "react-router-dom";
import {auth} from  './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
           await signInWithEmailAndPassword(auth,email,password)
           console.log("Login successfully")
        }
        catch(err){
           console.log(err)
        }
    }
  return (
    <div className="flex items-center justify-center h-screen bg-royalblue">
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-center text-xl font-bold mb-4">Login</h2>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Dont't Have Account ?<Link to="/signup" className="text-blue-700 font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;