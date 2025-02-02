import React, { useState } from 'react'
import { Chatlist, SideMenu } from '../components/'

import { BsThreeDotsVertical } from "react-icons/bs";

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("CHATS");

  return (
    <div className='w-full h-screen flex flex-row'>
      <SideMenu currentSection={currentSection} setCurrentSection={setCurrentSection} />

      <div className='w-screen md:max-w-[320px] flex flex-col shadow-lg bg-background-card'>
        <div className='flex justify-between px-3 py-1 shadow-xs'>
          <p className='text-xl font-semibold'>{currentSection.charAt(0).toUpperCase() + currentSection.slice(1).toLowerCase()}</p>
          <button className='md:hidden'><BsThreeDotsVertical/></button>
        </div>
        {
          currentSection === "CHATS" && (<Chatlist />)
        }
      </div>

      {/* <div><ChatWindow /></div> */}
    </div>
  )
}

export default Dashboard
