import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import { AIChatWindow, BottomMenu, Chatlist, ChatWindow, ConfirmationModal, Profile, SearchWindow, Settings, SideMenu } from '../components/'
import { logoutService } from '../services/authService';
import useSetVh from '../hooks/useSetVh';
import { setSelectedSection, setSelectedUser } from '../slices/selectionSlice';

const sectionName = {
  "CHATS": "Chats",
  "ASKAI": "Ask AI",
  "PROFILE": "Profile",
  "SETTINGS": "Settings",
}

const Dashboard = () => {

  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const {selectedSection:currentSection, selectedUser} = useSelector(state => state.selection);
  const {loading} = useSelector(state => state.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setCurrentSection = (section) => {
    dispatch(setSelectedSection(section));
  }

  useEffect(() => {
    if(currentSection === "ASKAI") {
      dispatch(setSelectedUser(null));
    }
  }, [currentSection])
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useSetVh();

  return (
    <div className='w-full flex flex-row'
    style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <SideMenu currentSection={currentSection} setCurrentSection={setCurrentSection} setIsLogoutModalOpen={setIsLogoutModalOpen} />
      {!selectedUser && (currentSection !== "ASKAI") && <BottomMenu currentSection={currentSection} setCurrentSection={setCurrentSection} />}

      <div className={`${(selectedUser || currentSection ==="ASKAI") && isMobile ? "hidden" : ""} w-screen md:w-1/3 lg:w-1/4 flex flex-col shadow-lg bg-background-card relative`}>
        <div className='flex justify-between px-3 py-2 shadow-xs'>
          <p className='text-2xl font-semibold'>{sectionName[currentSection]}</p>
          <div className='flex gap-4 text-2xl'>
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
          currentSection === "SETTINGS" && (<Settings />)
        }
        {
          isSearchWindowOpen && (<SearchWindow closeWindow={() =>setIsSearchWindowOpen(false)} />)
        }
        {
          isMoreMenuOpen && (
            <div className='absolute top-10 right-0 z-20 flex flex-col items-start gap-2 p-2 px-3 w-32 rounded-xl bg-background-primary text-xl'>
              <button className='' onClick={() => {setCurrentSection("SETTINGS"); setIsMoreMenuOpen(false);}}> Settings </button>
              <button className='' onClick={() => {setIsLogoutModalOpen(true); setIsMoreMenuOpen(false);}}> Logout </button>
            </div>
        )}
      </div>

      {selectedUser ? (
        <ChatWindow />
      ) : currentSection !== "ASKAI" && (
        <div className='md:w-2/3 lg:w-3/4 hidden md:flex justify-center items-center'>
          <p className="text-text-secondary">Select a chat to start messaging</p>
        </div>
      )}

      { currentSection === "ASKAI" && (
        <AIChatWindow />
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
