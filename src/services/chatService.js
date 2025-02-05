import { db } from "../config/firebase"; 
import { doc, setDoc, getDoc, addDoc, serverTimestamp, collection, query, orderBy, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

import { updateChatHistory } from "../slices/authSlice";

export const getChatId = async (user1Id, user2Id) => {
  try {
    const chatId = user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
    const chatRef = doc(db, "chats", chatId); 
    const chatSnap = await getDoc(chatRef);
    if(chatSnap.exists()) {
      return chatId;
    }
    return null;
  } catch (error) {
    console.log("Error checking is chat id exist", error);
    return null;
  }
}

export const createNewChat = (user1Id, user2Id) => async (dispatch) => {
    try {
        const chatId = user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
        
        const chatRef = doc(db, "chats", chatId);
        await setDoc(chatRef, {
            participants: [user1Id, user2Id],
            createdAt: serverTimestamp(),
        });

        const user1Ref = doc(db, 'users', user1Id);
        const user2Ref = doc(db, 'users', user2Id);
        await updateDoc(user1Ref, {
          chatHistory: arrayUnion(user2Id)
        });
        await updateDoc(user2Ref, {
          chatHistory: arrayUnion(user1Id)
        });

        dispatch(updateChatHistory(user2Id));
        console.log(user1Ref)
        return chatId;
    } catch (error) {
        console.log("Error creating new chat", error);
        return null;
    }
};

export const sendMessage = async (chatId, userId, messageText) => {
    try {
        const messagesRef = collection(db, "chats", chatId, "messages");
        await addDoc(messagesRef, {
            senderId: userId,
            messageText: messageText,
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.log("Error sending message", error);
    }
} 

export const listenToMessages = (chatId, setChatMessages) => {
  try {
    const messagesRef = collection(db, "chats", chatId, "messages");

    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const {timestamp, ...messageData} = doc.data();
        const dateTime = timestamp?.toDate();

        const date = dateTime ? dateTime.toLocaleDateString('en-In', {day: 'numeric', month: 'short', year: 'numeric'}) : "...";   
        const time = dateTime ? dateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : "...";

        return {
          id: doc.id,
          date,
          time,
          ...messageData
        };
      });
      setChatMessages(messages);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error fetching messages", error);
    return null;
  }
};
