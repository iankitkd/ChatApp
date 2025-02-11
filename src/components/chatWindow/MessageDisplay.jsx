import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

import ReactMarkdown from "react-markdown";
import { FiFileText } from 'react-icons/fi';
import { IoMdDownload } from "react-icons/io";

const MessageDisplay = ({messages, loading}) => {
    const {user} = useSelector(state => state.auth);

    const messagesEndRef = useRef(null);
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }
    }, [messages]);


    let previousDate = null;

    const getFileType = (url) => {
      const extension = url.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
      if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
      if (['pdf'].includes(extension)) return 'pdf';
      if (['doc', 'docx'].includes(extension)) return 'doc';
      if (['ppt', 'pptx'].includes(extension)) return 'ppt';
      return 'other';
    };

    const mediaDisplay = (media, fileName) => {
      if(!media) return null;

      const fileType = getFileType(fileName);

      if(fileType === "image") { 
        return (<img src={media} alt="Media" style={{ width: 200 }} />
      )}
      if(fileType === "video") {
        return (
          <video controls style={{ width: 200 }}>
            <source src={media} />
            Your browser does not support the video tag.
          </video>
      )}

      return (
        <div className='flex items-center gap-1'>
          <FiFileText className="text-xl" />
          <span className="text-sm">{fileName}</span>
          <a href={media} download target="_blank" rel="noopener noreferrer">
            <IoMdDownload className='text-text-primary/70' />
          </a>
        </div>
      )
    }

  return (
    <div className='flex-grow overflow-y-auto flex flex-col w-full relative'>

      {messages.map((msg, index) => {
        const displayDate = msg.date !== previousDate ? msg.date : null;
        if(displayDate) previousDate = displayDate;

        return (
          <div key={msg.id || index} className='w-full flex flex-col px-2'>
            { displayDate && (
                <div className='self-center px-3 py-1 bg-background-fill rounded-full'>{displayDate}</div>
            )}

            <div className={`max-w-full w-fit px-2 py-1 my-2 rounded-xl break-words whitespace-pre-wrap flex flex-col shadow-lg 
                ${msg.senderId == user.uid ? "self-end bg-background-chat-right text-button-text rounded-tr-none" : "bg-background-chat-left rounded-tl-none"}`}
            >
                {msg.media && mediaDisplay(msg.media, msg.fileName)}
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
