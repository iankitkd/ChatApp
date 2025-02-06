import React from 'react'

import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings, IoMdChatbubbles } from "react-icons/io";
import { MdLogout } from "react-icons/md";


const SideMenu = ({currentSection, setCurrentSection, setIsLogoutModalOpen}) => {

  return (
    <div className='w-120px h-screen hidden md:flex flex-col justify-between'>
      <div className='flex flex-col items-center gap-3 text-xl'>
        <div className={`group relative flex items-center px-2 py-2 z-10 ${currentSection == "CHATS"? "bg-background-card": ""}`}>
            <button className='hover:cursor-pointer' onClick={() => setCurrentSection("CHATS")}> <IoMdChatbubbles className={`${currentSection == "CHATS"? "text-button": ""} `} /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Chats</p>
        </div>
      </div>

      <div className='flex flex-col items-center text-xl'>
        <div className={`group relative flex items-center px-2 py-2 z-10 ${currentSection == "SETTINGS"? "bg-background-card": ""}`}>
            <button className='hover:cursor-pointer' onClick={() => setCurrentSection("SETTINGS")}> <IoMdSettings className={`${currentSection == "SETTINGS"? "text-button": ""} `} /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Settings</p>
        </div>
        <div className={`group relative flex items-center px-2 py-2 z-10 ${currentSection == "PROFILE"? "bg-background-card": ""}`}>
            <button className='hover:cursor-pointer' onClick={() => setCurrentSection("PROFILE")}> <FaUserCircle className={`${currentSection == "PROFILE"? "text-button": ""} `} /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Profile</p>
        </div>
        <div className={`group relative flex items-center px-2 py-1`}>
            <button className='hover:cursor-pointer' onClick={() => {setIsLogoutModalOpen(true)}}> <MdLogout /> </button>
            <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>Logout</p>
        </div>
      </div>

    </div>
  )
}

export default SideMenu
