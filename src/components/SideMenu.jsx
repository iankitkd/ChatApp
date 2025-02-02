import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings, IoMdChatbubbles } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import {ConfirmationModal} from './index';
import { logoutService } from '../services/authService';

const SideMenu = ({currentSection, setCurrentSection}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.auth)
    
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className='w-120px h-screen hidden md:flex flex-col justify-between px-2 py-3 border-r-1 border-border'>
      <div className='flex flex-col items-center gap-3 text-xl'>
        <div className='group relative flex items-center'>
            <button className='hover:cursor-pointer' onClick={() => setCurrentSection("CHATS")}> <IoMdChatbubbles /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Chats</p>
        </div>
      </div>

      <div className='flex flex-col items-center gap-3 text-xl'>
        <div className='group relative flex items-center'>
            <button className='hover:cursor-pointer' onClick={() => setCurrentSection("SETTINGS")}> <IoMdSettings /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Settings</p>
        </div>
        <div className='group relative flex items-center'>
            <button className='hover:cursor-pointer' onClick={() => setCurrentSection("PROFILE")}> <FaUserCircle /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Profile</p>
        </div>
        <div className='group relative flex items-center'>
            <button className='hover:cursor-pointer' onClick={() => {setIsLogoutModalOpen(true)}}> <MdLogout /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Logout</p>
        </div>
      </div>

      {
        isLogoutModalOpen && (
            <ConfirmationModal 
            text1={"Log out Confirmation"}
            text2={"Are You sure you want to log out?"}
            btn1Text={"No"}
            btn1Handler={() => setIsLogoutModalOpen(false)}
            btn2Text={"Yes"}
            btn2Handler={() => dispatch(logoutService(navigate))}
            disabled={loading}
            />
        )
      }
    </div>
  )
}

export default SideMenu
