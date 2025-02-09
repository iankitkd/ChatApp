import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ReceiverDetails from './ReceiverDetails'
import MessageDisplay from './MessageDisplay'
import MessageInput from './MessageInput'

import { listenToMessagesAI, sendMessageAI } from '../../services/chatService'
import { chatWithAI } from '../../services/aiChatService';
import { setSelectedSection } from '../../slices/selectionSlice'

const selectedUser = {
    uid: "ai",
    name: "Ask AI",
}

const AIChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) return;

        const unsubscribe = listenToMessagesAI(user.uid, setMessages);
        return () => unsubscribe && unsubscribe();
    }, [user.uid])

    const handleSendMessageAI = async (newMessage) => {
      try {
          if(!newMessage) return;
          setLoading(true);

          await sendMessageAI(user.uid, user.uid, newMessage);
          setMessages(prev => [...prev, newMessage]);
          
          const response = await chatWithAI(newMessage);
          
          let fullMessage = "";
          setMessages(prev => [...prev, { senderId: "ai", messageText: fullMessage }]);
          
          for await (const chunk of response) {
            fullMessage += chunk.text();
            setMessages((prev) => [
              ...prev.slice(0, -1),
              { senderId: "ai", messageText: fullMessage }
            ]);
          }

          // for await (const chunk of response) {
          //   for (const char of chunk.text()) {
          //     fullMessage += char;
          //     setMessages(prev => [
          //       ...prev.slice(0, -1),
          //       { senderId: "ai", messageText: fullMessage }
          //     ]);
          //     await new Promise(res => setTimeout(res, 10));
          //   }
          // }

          await sendMessageAI(user.uid, "ai", fullMessage);
          
          setLoading(false);
      } catch (error) {
          console.log("Error sending messages to ai", error);
      }
    }

    const closeChatWindow = () => {
      dispatch(setSelectedSection("CHATS"));
    }


  return (
    <div className='w-screen lg:w-full flex flex-col'>
      <ReceiverDetails selectedUser={selectedUser} closeChatWindow={closeChatWindow} />

      <MessageDisplay messages={messages} loading={loading} />

      <MessageInput handleSendMessageAI={handleSendMessageAI} />
    </div>
  )
}

export default AIChatWindow
