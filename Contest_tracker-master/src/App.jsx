import { useState } from 'react'

import './App.css'
import Codeforces from './Components/codeforces/Codeforces'
import Leetcode from './Components/leetcode/Leetcode'
import Codechef from './Components/codechef/Codechef'
import HomePage from "./Components/HomePage";
import SignUpForm from './SignUpForm'
import Login from './Login';
import YouTube from './Components/youTube'
import { BrowserRouter, Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>

      <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/codeforces' element={<Codeforces/>} />  
            <Route path='/codechef'  element={<Codechef/>} />
            <Route path='/leetcode' element={<Leetcode/>} />
            <Route path='/signup' element={<SignUpForm/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/solutions/:contestName' element={<YouTube/>} />
         </Routes> 
       </BrowserRouter>
      </>
    
  )
}

export default App
