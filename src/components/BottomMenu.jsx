import React from 'react'

import { FaUserCircle } from 'react-icons/fa'
import { IoMdChatbubbles } from 'react-icons/io'

const BottomMenu = ({currentSection, setCurrentSection}) => {
  return (
    <div className='md:hidden fixed bottom-0 z-10 w-screen h-[60px] p-2 flex justify-around items-center text-2xl bg-background-primary'>
        <button className={`${currentSection == "CHATS"? "bg-background-card": ""} w-full h-full flex justify-center items-center rounded-full`}
        onClick={() => setCurrentSection("CHATS")}
        > 
            <IoMdChatbubbles className={`${currentSection == "CHATS"? "text-button": ""} `} /> 
        </button>

        <button className={`${currentSection == "PROFILE"? "bg-background-card": ""} w-full h-full flex justify-center items-center rounded-full`}
        onClick={() => setCurrentSection("PROFILE")}
        > 
            <FaUserCircle className={`${currentSection == "PROFILE"? "text-button": ""} `} /> 
        </button>
    </div>
  )
}

export default BottomMenu
