import React from 'react'

import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings, IoMdChatbubbles } from "react-icons/io";
import { MdLogout } from "react-icons/md";

const MenuItem = ({Icon, label, isActive, onMenuClick}) => (
  <div className={`group relative flex items-center px-2 py-2 z-10 ${isActive? "bg-background-card": ""}`}>
      <button className='hover:cursor-pointer' onClick={onMenuClick}> 
        <Icon className={isActive ? "text-button": ""} /> 
      </button>
      <p className='hidden group-hover:block absolute left-full z-10 py-1 px-3 text-sm bg-background-fill rounded-full'>
        {label}
      </p>
  </div>
);

const SideMenu = ({currentSection, setCurrentSection, setIsLogoutModalOpen}) => {

  return (
    <div className='hidden md:flex flex-col justify-between'>
      <div className='flex flex-col items-center gap-3 text-xl'>
        <MenuItem 
          Icon={IoMdChatbubbles}
          label={"Chats"}
          isActive={currentSection === "CHATS"}
          onMenuClick={() => setCurrentSection("CHATS")}
        />
      </div>

      <div className='flex flex-col items-center text-xl'>
        <MenuItem 
          Icon={IoMdSettings}
          label={"Settings"}
          isActive={currentSection === "SETTINGS"}
          onMenuClick={() => setCurrentSection("SETTINGS")}
        />
        <MenuItem 
          Icon={FaUserCircle}
          label={"Profile"}
          isActive={currentSection === "PROFILE"}
          onMenuClick={() => setCurrentSection("PROFILE")}
        />
        <MenuItem 
          Icon={MdLogout}
          label={"Logout"}
          isActive={false}
          onMenuClick={() => setIsLogoutModalOpen(true)}
        />
      </div>

    </div>
  )
}

export default SideMenu
