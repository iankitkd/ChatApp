import React from 'react'

import { FaRobot, FaUserCircle } from 'react-icons/fa'
import { IoMdChatbubbles } from 'react-icons/io'

const MenuItem = ({Icon, isActive, onMenuClick}) => (
  <button className={`${isActive ? "bg-background-card": ""} w-full h-full flex flex-col justify-center items-center rounded-full`}
    onClick={onMenuClick}
    > 
        <Icon className={isActive ? "text-button": ""} /> 
    </button>
)

const BottomMenu = ({currentSection, setCurrentSection}) => {
  return (
    <div className='md:hidden fixed bottom-0 z-10 w-screen h-[60px] p-2 flex justify-around items-center text-2xl bg-background-primary'>
        <MenuItem 
        Icon={IoMdChatbubbles}
        isActive={currentSection == "CHATS"}
        onMenuClick={() => setCurrentSection("CHATS")}
        />

        <MenuItem 
        Icon={FaRobot}
        isActive={currentSection == "ASKAI"}
        onMenuClick={() => setCurrentSection("ASKAI")}
        />
        
        <MenuItem 
        Icon={FaUserCircle}
        isActive={currentSection == "PROFILE"}
        onMenuClick={() => setCurrentSection("PROFILE")}
        />
    </div>
  )
}

export default BottomMenu
