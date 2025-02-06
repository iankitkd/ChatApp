import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import { BottomMenu, Chatlist, ChatWindow, ConfirmationModal, Profile, SearchWindow, SideMenu } from '../components/'
import { logoutService } from '../services/authService';

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("CHATS");

  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const {selectedUser} = useSelector(state => state.chat);
  const {loading} = useSelector(state => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='w-full h-screen flex flex-row'>
      <SideMenu currentSection={currentSection} setCurrentSection={setCurrentSection} setIsLogoutModalOpen={setIsLogoutModalOpen} />
      {!selectedUser && <BottomMenu currentSection={currentSection} setCurrentSection={setCurrentSection} />}

      <div className={`${selectedUser && isMobile ? "hidden" : ""} w-screen md:w-1/3 flex flex-col shadow-lg bg-background-card relative`}>
        <div className='flex justify-between px-3 py-1 shadow-xs'>
          <p className='text-xl font-semibold'>{currentSection.charAt(0).toUpperCase() + currentSection.slice(1).toLowerCase()}</p>
          <div className='flex gap-4 text-lg'>
            {currentSection === "CHATS" && <button className='hover:cursor-pointer' onClick={() =>setIsSearchWindowOpen(true)}><FaSearch/></button>}
            <button className='md:hidden' onClick={() => setIsMoreMenuOpen(prev => !prev)}><BsThreeDotsVertical/></button>
          </div>
        </div>
        {
          currentSection === "CHATS" && (<Chatlist />)
        }
        {
          currentSection === "PROFILE" && (<Profile />)
        }
        {
          isSearchWindowOpen && (<SearchWindow closeWindow={() =>setIsSearchWindowOpen(false)} />)
        }
        {
          isMoreMenuOpen && (
            <div className='absolute top-9 right-0 z-20 flex flex-col items-start gap-1 p-2 px-3 w-28 rounded-xl bg-background-primary'>
              <button className='' onClick={() => {setCurrentSection("SETTINGS"); setIsMoreMenuOpen(false);}}> Settings </button>
              <button className='' onClick={() => {setIsLogoutModalOpen(true); setIsMoreMenuOpen(false);}}> Logout </button>
            </div>
        )}
      </div>

      {selectedUser ? (
        <ChatWindow />
      ) : (
        <div className='w-full hidden md:flex justify-center items-center'>
          <p className="text-text-secondary">Select a chat to start messaging</p>
        </div>
      )}

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

export default Dashboard
