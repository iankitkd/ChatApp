import { db } from "../config/firebase"; 
import { doc, setDoc, getDoc, addDoc, serverTimestamp, collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const createNewChat = async (user1Id, user2Id) => {
    try {
        const chatId = user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
        
        const chatRef = doc(db, "chats", chatId);
        await setDoc(chatRef, {
            participants: [user1Id, user2Id],
            createdAt: serverTimestamp(),
        });
        return chatId;
    } catch (error) {
        console.log("Error creating new chat", error);
        return null;
    }
};

export const sendMessage = async (chatId, userId, messageText) => {
    try {
        const messagesRef = collection(db, "chats", chatId, "messages");
        console.log(messagesRef, "mr")
        console.log(chatId, userId, messageText, "in sm")
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
      const messages = [];
      querySnapshot.forEach((doc) => {
        const {timestamp, ...userData} = doc.data();
        const formattedTimestamp = timestamp.toDate().toLocaleString();
        messages.push({formattedTimestamp, ...userData});
      });

      setChatMessages(messages);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error fetching messages", error);
    return null;
  }
};
