import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar';

function Dashboard() {
    const {loading: authloading} = useSelector((state) => state.auth);
    const {loading: profileloading} = useSelector((state) => state.profile);

    if (profileloading || authloading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className='realtive flex min-h-[calc(100vh-3.5rem)]'>

        <Sidebar />

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet />
            </div>
        </div>
        
    </div>
  )
}

export default Dashboard