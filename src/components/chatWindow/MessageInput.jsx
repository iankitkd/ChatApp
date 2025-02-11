import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { IoMdSend } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";

import { createNewChat, sendMessage } from '../../services/chatService';
import { uploadToCloudinary } from '../../services/mediaService';
import MediaPreview from './MediaPreview';

const MessageInput = ({chatId, setChatId, handleSendMessageAI}) => {
    const [newMessage, setNewMessage] = useState("");
    const [sendMessageLoading, setSendMessageLoading] = useState(false);
    const [sendMediaLoading, setSendMediaLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {selectedUser} = useSelector(state => state.selection);
    

    const handleSendMessageChat = async () => {
        try {
            let currentChatId = chatId;
            if(!currentChatId) {
                currentChatId = await dispatch(createNewChat(user.uid, selectedUser.uid));
            if(!currentChatId) return;
                setChatId(currentChatId);
            }

            let mediaUrl = null;
            if(file) {
              setSendMediaLoading(true);
              mediaUrl = await uploadToCloudinary(file);
              setSendMediaLoading(false);
            }
            // use currentChatId return by createChat not chatId of state
            await sendMessage(currentChatId, user.uid, newMessage, mediaUrl, file?.name || ""); 
        } catch (error) {
            console.log("Error sending messages", error);
        }
    }

    const handleSendMessage = async () => {
        if(!newMessage && !file) {
            return;
        }
        setSendMessageLoading(true);

        if(handleSendMessageAI) {
            handleSendMessageAI(newMessage);
        } else {
            handleSendMessageChat();
        }
        
        setNewMessage("");
        setSendMessageLoading(false);
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if(textareaRef) textareaRef.current.style.height = "40px";
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);

        if (selectedFile.type.startsWith("image/") || selectedFile.type.startsWith("video/")) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview(null);
        }
    };

    const textareaRef = useRef(null);
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

  return (
    <div className='relative w-full h-fit flex gap-2 justify-between items-center px-2 py-1 border-border/50 border-l-1'>
      <div className='flex w-full items-end rounded-xl bg-background-card'>
        <textarea 
        ref={textareaRef}
        id='message'
        placeholder='Type a message'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onInput={adjustHeight}
        rows={1}
        className='w-full min-h-[40px] max-h-[75px] outline-0 resize-none overflow-y-auto px-5 py-2 rounded-xl bg-background-card text-text-primary'
        />

        {!handleSendMessageAI && 
        <label className="cursor-pointer p-2">
            <MdAttachFile className="text-2xl" />
            <input type="file" className="hidden" onChange={handleFileChange} ref={fileInputRef} />
        </label>
        }
      </div>

        <button className='hover:cursor-pointer hover:scale-110 hover:translate-x-0.5 text-2xl px-3 py-3 lg:px-2 lg:py-2 rounded-full bg-background-fill' 
        onClick={handleSendMessage} 
        disabled={sendMessageLoading}
        >
            <IoMdSend className={"text-button"} />
        </button>


        {sendMediaLoading && (
          <div className='absolute bottom-14 right-2 z-10 px-2 py-1 text-sm rounded-full border-1 border-border bg-background-fill'>
            Sending...
          </div>
        )}

        {file && (
          <MediaPreview 
          file={file}
          preview={preview}
          setFile={setFile}
          setPreview={setPreview}
          fileInputRef={fileInputRef}
          />
        )}
    </div>
  )
}

export default MessageInput
