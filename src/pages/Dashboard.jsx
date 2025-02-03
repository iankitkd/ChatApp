import React, { useState } from 'react'
import { Chatlist, SearchWindow, SideMenu } from '../components/'

import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("CHATS");

  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);

  return (
    <div className='w-full h-screen flex flex-row'>
      <SideMenu currentSection={currentSection} setCurrentSection={setCurrentSection} />

      <div className='w-screen md:max-w-[320px] flex flex-col shadow-lg bg-background-card relative'>
        <div className='flex justify-between px-3 py-1 shadow-xs'>
          <p className='text-xl font-semibold'>{currentSection.charAt(0).toUpperCase() + currentSection.slice(1).toLowerCase()}</p>
          <div className='flex gap-4 text-lg'>
            {currentSection === "CHATS" && <button className='hover:cursor-pointer' onClick={() =>setIsSearchWindowOpen(true)}><FaSearch/></button>}
            <button className='md:hidden'><BsThreeDotsVertical/></button>
          </div>
        </div>
        {
          currentSection === "CHATS" && (<Chatlist />)
        }
        {
          isSearchWindowOpen && (<SearchWindow closeWindow={() =>setIsSearchWindowOpen(false)} />)
        }
      </div>

      {/* <div><ChatWindow /></div> */}
    </div>
  )
}

export default Dashboard
