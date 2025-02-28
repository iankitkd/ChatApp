import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {UserTile} from '../index';
import { getUsersDetails, listenToChatList } from '../../services/userService';

const Chatlist = () => {
  const {user} = useSelector(state => state.auth);

  const [userChatHistory, setUserChatHistory] = useState([]);

  const updateChatList = async (chatHistory) => {
    if(!chatHistory || chatHistory.length == 0) {
      return;
    }
    const userList = chatHistory.map(chatId => chatId.otherUserId);
    const response = await getUsersDetails(userList);
    setUserChatHistory(response);
    localStorage.setItem("chatList", JSON.stringify(response));
  }

  useEffect(() => {
    if(!user) return;

    const cachedChatList = localStorage.getItem("chatList");
    if (cachedChatList?.length > 0) {
      setUserChatHistory(JSON.parse(cachedChatList));
    }

    const unsubscribe = listenToChatList(user.uid, updateChatList);
    return () => unsubscribe && unsubscribe();
  }, [user.uid])
  

  return (
    <div className='w-full h-full flex flex-col overflow-y-auto'>
      {userChatHistory?.length > 0 ? (
          userChatHistory.map((userData) => (
          <UserTile key={userData.uid} userData={userData} />
        ))
      ) : (
        <div className='text-center py-2 text-text-muted'>
          Search user and start new conversion
        </div>
      )}
    </div>
  )
}

export default Chatlist
