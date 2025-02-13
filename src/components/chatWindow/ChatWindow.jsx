import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getChatId, listenToMessages } from '../../services/chatService';
import { setSelectedUser } from '../../slices/selectionSlice';

import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import ReceiverDetails from './ReceiverDetails';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {selectedUser} = useSelector(state => state.selection);


    useEffect(() => {
      if (!user?.uid || !selectedUser?.uid) return;
      
      const fetchChatId = async () => {
          setMessages([]);
          setChatId(null);
          const currentChatId = await getChatId(user.uid, selectedUser.uid);
          if (currentChatId) {
            setChatId(currentChatId);
          }
      };
      fetchChatId();
  }, [user?.uid, selectedUser?.uid]);

    useEffect(() => {
        if (!chatId) return;

        const unsubscribe = listenToMessages(chatId, setMessages);
        return () => unsubscribe && unsubscribe();
    }, [chatId])


    const closeChatWindow = () => {
      dispatch(setSelectedUser(null));
    }

    useEffect(() => {
      window.history.pushState({ chatOpen: true }, '');
  
      const handlePopState = (event) => {
        if (event.state && event.state.chatOpen) {
          closeChatWindow();
        }
      };
      window.addEventListener('popstate', handlePopState);
  
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, [closeChatWindow]);


  return (
    <div className='w-screen md:w-2/3 lg:w-3/4 flex flex-col'>
      <ReceiverDetails selectedUser={selectedUser} closeChatWindow={closeChatWindow} />

      <MessageDisplay messages={messages} />

      <MessageInput chatId={chatId} setChatId={setChatId} />
    </div>
  )
}

export default ChatWindow
