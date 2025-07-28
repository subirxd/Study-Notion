import React from 'react'
import { useState } from 'react'

import {dashboardLinks} from "../../../data/dashboard-links"
import { logout } from '../../../Services/operations/authAPI'
import SidebarLink from './SidebarLink'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../Common/ConfirmationModal'

function Sidebar() {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModel] = useState(null);

    if(profileLoading || authLoading) {
        return (
            <div className='spinner'></div>
        )
    }

  return (
    <div>
        <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">

        <div className="flex flex-col">
        {
            dashboardLinks.map((link, index) => {
                if(link?.type && user?.accountType !== link?.type) return null

                return (
                    <SidebarLink
                    link = {link}
                    iconName={link.icon}
                    key={link.id}
                     />
                )
            })
        }
        </div>

        {/* horizontal line */}
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

        {/* setting && logout */}
            <div className='flex flex-col'>
                <SidebarLink
                link={{name:"Settings", path: "dashboard/settings"}}
                iconName={"VscSettingsGear"}
                 />

                 <button
                 onClick={() => {
                    setConfirmationModel({
                    text1: "Are You Sure?",
                    text2: "You will be logged out.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler : () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModel(null),
                    })
                 }}
                 className="px-8 py-2 text-sm font-medium text-richblack-300"
                 >

                 <div className='flex items-center gap-x-2'>
                    <VscSignOut 
                        className='text-lg'
                    />
                    <span>Logout</span>
                 </div>

                 </button>
            </div>
        </div>
        {
            confirmationModal && (
                <ConfirmationModal
                modalData={confirmationModal}
                 />
            )
        }
    </div>
  )
}

export default Sidebar