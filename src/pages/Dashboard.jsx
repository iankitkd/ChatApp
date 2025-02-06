import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Chatlist, ChatWindow, SearchWindow, SideMenu } from '../components/'

import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("CHATS");

  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);

  const {selectedUser} = useSelector(state => state.chat);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='w-full h-screen flex flex-row'>
      <SideMenu currentSection={currentSection} setCurrentSection={setCurrentSection} />

      <div className={`${selectedUser && isMobile ? "hidden" : ""} w-screen md:w-1/3 flex flex-col shadow-lg bg-background-card relative`}>
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

      {selectedUser ? (
        <ChatWindow />
      ) : (
        <div className='w-full hidden md:flex justify-center items-center'>
          <p className="text-text-secondary">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
