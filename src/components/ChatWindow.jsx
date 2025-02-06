import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { IoMdSend } from "react-icons/io";
import { FaUser } from 'react-icons/fa';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { createNewChat, getChatId, listenToMessages, sendMessage } from '../services/chatService';
import { setSelectedUser } from '../slices/chatSlice';

const ChatWindow = () => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sendMessageLoading, setSendMessageLoading] = useState(false);
    const [chatId, setChatId] = useState(null);

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {selectedUser} = useSelector(state => state.chat);


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

    const messagesEndRef = useRef(null);
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }
    }, [messages]);

    const handleSendMessage = async () => {
      if(!newMessage) {
        return;
      }
      setSendMessageLoading(true);
      let currentChatId = chatId;
      if(!currentChatId) {
        currentChatId = await dispatch(createNewChat(user.uid, selectedUser.uid));
        if(!currentChatId) return;
        setChatId(currentChatId);
      }
      // use currentChatId return by createChat not chatId of state
      await sendMessage(currentChatId, user.uid, newMessage); 
      setNewMessage("");
      setSendMessageLoading(false);
      if(textareaRef) textareaRef.current.style.height = "25px";
    }

    const textareaRef = useRef(null);
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    let previousDate = null;

  return (
    <div className='w-screen lg:w-full h-full flex flex-col relative'>

      {/* User Detail */}
      <div className='bg-background-card flex items-center p-1 border-border/50 border-l-1'>
        <button className='hover:cursor-pointer hover:-translate-x-1 transform transition duration-300 px-3 text-xl' 
        onClick={() => dispatch(setSelectedUser(null))}
        >
          <FaArrowLeftLong />
        </button>
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

      {/* Message display */}
      <div className='flex-grow overflow-y-auto flex flex-col w-full'>
        {messages.map((msg) => {
        
        const displayDate = msg.date !== previousDate ? msg.date : null;
        if(displayDate) previousDate = displayDate;

        return (
        <div key={msg.id} className='w-full flex flex-col'>
          { displayDate && (
            <div className='self-center px-3 py-1 bg-background-fill rounded-full'>{displayDate}</div>
          )}

          <div 
          key={msg.id} 
          className={`max-w-full w-fit px-2 py-1 m-2 rounded-xl break-words whitespace-pre-wrap flex flex-col shadow-lg ${msg.senderId == user.uid ? "self-end bg-background-chat-right text-button-text rounded-tr-none" : "bg-background-chat-left rounded-tl-none"}`}
          >
            <div className=''>
              {msg.messageText}
            </div>
            <span className='self-end text-[9px] leading-0 pt-2 pb-1'>
              {msg.time}
            </span>
          </div>
        </div>
        )})}
        <div ref={messagesEndRef} />
      </div>

      {/* new message text area */}
      <div className='w-full h-fit flex gap-2 justify-between px-3 py-2 bg-background-card border-border/50 border-l-1'>
        <textarea 
        ref={textareaRef}
        id='message'
        placeholder='Type a message'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onInput={adjustHeight}
        rows={1}
        className='w-full min-h-[25px] max-h-[75px] outline-0 resize-none overflow-y-auto'
        />

        <button className='hover:cursor-pointer hover:scale-110 hover:translate-x-0.5 text-2xl' onClick={handleSendMessage} disabled={sendMessageLoading}><IoMdSend /></button>
      </div>
    </div>
  )
}

export default ChatWindow
