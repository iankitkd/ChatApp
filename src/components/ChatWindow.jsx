import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { IoMdSend } from "react-icons/io";
import { FaUser } from 'react-icons/fa';

import { createNewChat, listenToMessages, sendMessage } from '../services/chatService';
import { setChatMessages } from '../slices/chatSlice';

const ChatWindow = () => {
    const [messageInput, setMessageInput] = useState("");
    const [chatId, setChatId] = useState(null);

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {selectedUser, chatMessages} = useSelector(state => state.chat);

    // const setMessages = (messages) => {
    //   console.log("ms", messages)
    //   dispatch(setChatMessages(messages));
    // }

    // useEffect(() => {
    //     console.log(selectedUser, "su")
    //     if (!chatId) return;

    //     const unsubscribe = listenToMessages(chatId, setMessages);
    //     return () => unsubscribe && unsubscribe();
    // }, [selectedUser, chatMessages])

    const createChat = async() => {
      try {
        const response = await createNewChat(user.uid, selectedUser.uid);
        setChatId(response);
        return response;
      } catch (error) {
        console.log("Error at send message", error);
        return;
      }
    }

    const handleSendMessage = async () => {
      let currentChatId = chatId;
      if(!currentChatId) {
        currentChatId = await createChat();
        if(!currentChatId) return;
      }
      await sendMessage(currentChatId, user.uid, messageInput);
      setMessageInput("");
    }

    const textareaRef = useRef(null);
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };


  return (
    <div className='w-full h-full flex flex-col relative'>

      {/* User Detail */}
      <div className='bg-background-card flex items-center p-1 border-border/50 border-l-1'>
        <div className='w-10 h-10 rounded-full mr-3 bg-background-primary'>
          {
            selectedUser.photoURL ? (
              <img
              className="w-full h-full object-cover"
              src={selectedUser.photoURL}
              alt="User Image"
              />
            ) : (
              <FaUser className='w-full h-full p-2' />
            )
          }
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg leading-3 font-semibold">{selectedUser.name}</h3>
          <p className="text-sm text-text-muted">@{selectedUser.username}</p>
        </div>
      </div>

      {/* <div className='flex-grow'></div> */}

      {/* message text area */}
      <div className='absolute bottom-0 w-full h-fit flex gap-2 justify-between px-3 py-2 bg-background-card border-border/50 border-l-1'>
        <textarea 
        ref={textareaRef}
        id='message'
        placeholder='Type a message'
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onInput={adjustHeight}
        rows={1}
        className='w-full min-h-[25px] max-h-[75px] outline-0 resize-none overflow-y-auto'
        />

        <button className='hover:cursor-pointer text-2xl' onClick={handleSendMessage}><IoMdSend /></button>
      </div>
    </div>
  )
}

export default ChatWindow
