import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

import ReactMarkdown from "react-markdown";

const MessageDisplay = ({messages, loading}) => {
    const {user} = useSelector(state => state.auth);

    const messagesEndRef = useRef(null);
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }
    }, [messages]);


    let previousDate = null;

  return (
    <div className='flex-grow overflow-y-auto flex flex-col w-full relative'>

      {messages.map((msg, index) => {
        const displayDate = msg.date !== previousDate ? msg.date : null;
        if(displayDate) previousDate = displayDate;

        return (
          <div key={msg.id || index} className='w-full flex flex-col'>
            { displayDate && (
                <div className='self-center px-3 py-1 bg-background-fill rounded-full'>{displayDate}</div>
            )}

            <div className={`max-w-full w-fit px-2 py-1 m-2 rounded-xl break-words whitespace-pre-wrap flex flex-col shadow-lg 
                ${msg.senderId == user.uid ? "self-end bg-background-chat-right text-button-text rounded-tr-none" : "bg-background-chat-left rounded-tl-none"}`}
            >
                <div className=''>
                    <ReactMarkdown>{msg.messageText}</ReactMarkdown>
                </div>
                <span className='self-end text-[9px] leading-0 pt-2 pb-1'>
                    {msg.time}
                </span>
            </div>
          </div>
        )})}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageDisplay
