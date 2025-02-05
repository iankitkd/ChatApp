import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {UserTile} from './index';
import { getUsersDetails } from '../services/userService';

const Chatlist = () => {
  const {user} = useSelector(state => state.auth);
  const chatHistory = user.chatHistory;

  const [chatHistoryUsers, setChatHistoryUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async() => {
      if(chatHistory) {
        const response = await getUsersDetails(chatHistory);
        setChatHistoryUsers(response);
      }
    }
    fetchUser();
  }, [chatHistory])
  

  return (
    <div className='w-full h-full flex flex-col'>
      {chatHistoryUsers?.length > 0 ? (
          chatHistoryUsers.map((userData) => (
          <UserTile key={userData.uid} userData={userData} />
        ))
      ) : (
        <div className='text-center py-2'>
          {/* Start new conversion */}
        </div>
      )}
    </div>
  )
}

export default Chatlist
