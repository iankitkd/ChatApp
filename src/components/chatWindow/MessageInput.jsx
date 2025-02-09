import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { IoMdSend } from "react-icons/io";

import { createNewChat, sendMessage } from '../../services/chatService';

const MessageInput = ({chatId, setChatId, handleSendMessageAI}) => {
    const [newMessage, setNewMessage] = useState("");
    const [sendMessageLoading, setSendMessageLoading] = useState(false);

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

            // use currentChatId return by createChat not chatId of state
            await sendMessage(currentChatId, user.uid, newMessage); 
        } catch (error) {
            console.log("Error sending messages", error);
        }
    }

    const handleSendMessage = async () => {
        if(!newMessage) {
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
        if(textareaRef) textareaRef.current.style.height = "40px";
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
    <div className='w-full h-fit flex gap-2 justify-between items-center px-2 py-3 border-border/50 border-l-1'>
        <textarea 
        ref={textareaRef}
        id='message'
        placeholder='Type a message'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onInput={adjustHeight}
        rows={1}
        className='w-full min-h-[40px] max-h-[75px] outline-0 resize-none overflow-y-auto px-5 py-2 rounded-xl bg-background-card'
        />

        <button className='hover:cursor-pointer hover:scale-110 hover:translate-x-0.5 text-2xl px-3 py-3 lg:px-2 lg:py-2 rounded-full bg-background-fill' 
        onClick={handleSendMessage} 
        disabled={sendMessageLoading}
        >
            <IoMdSend className={"text-button"} />
        </button>
    </div>
  )
}

export default MessageInput
