import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'

function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path ="signup" element ={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="update-password/:token" element={<UpdatePassword />} />
      <Route path="verify-email" element={<VerifyEmail />} />

    </Routes>
    </div>
  )
}

export default App
