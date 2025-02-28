import { db } from "../config/firebase"; 
import { doc, setDoc, getDoc, addDoc, serverTimestamp, collection, query, orderBy, onSnapshot } from "firebase/firestore";

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
        return chatId;
    } catch (error) {
        console.log("Error creating new chat", error);
        return null;
    }
};

export const sendMessage = async (chatId, userId, messageText, mediaUrl, fileName) => {
    try {
        const messagesRef = collection(db, "chats", chatId, "messages");
        await addDoc(messagesRef, {
            senderId: userId,
            messageText: messageText,
            media: mediaUrl || null,
            fileName: fileName || null,
            timestamp: serverTimestamp()
        });

        // const chatRef = doc(db, "chats", chatId);
        // await setDoc(chatRef, {
        //     lastUpdated: serverTimestamp(),
        // }, { merge: true });

        const receiverId = chatId.split("_").find(user => user !== userId);

        const updateUserChatList = async (user1Id, user2Id) => {
            const chatListRef = doc(db, "users", user1Id, "chatList", chatId);
            await setDoc(chatListRef, {
                otherUserId: user2Id,
                lastMessage: messageText,
                lastUpdated: serverTimestamp(),
            }, { merge: true });
        };
        await updateUserChatList(userId, receiverId);
        await updateUserChatList(receiverId, userId);
    } catch (error) {
        console.log("Error sending message", error);
    }
} 

export const listenToMessagesAll = (collectionName, docId, setChatMessages) => {
  try {
    const messagesRef = collection(db, collectionName, docId, "messages");

    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const {timestamp, ...messageData} = doc.data();
        const dateTime = timestamp?.toDate();

        const date = dateTime ? dateTime.toLocaleDateString('en-In', {day: 'numeric', month: 'short', year: 'numeric'}) : "";   
        const time = dateTime ? dateTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true}) : "";

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


export const sendMessageAI = async (userId, senderId, messageText) => {
  try {
    const messagesAIRef = collection(db, "ai_chats", userId, "messages");
    await addDoc(messagesAIRef, {
        senderId: senderId,
        messageText: messageText,
        timestamp: serverTimestamp()
    });
  } catch (error) {
    console.log("Error sending message", error);
  }
}

export const listenToMessages = (chatId, setChatMessages) => {
  try {
    listenToMessagesAll("chats", chatId, setChatMessages);
  } catch (error) {
    console.error("Error fetching messages", error);
    return null;
  }
}
export const listenToMessagesAI = (userId, setChatMessages) => {
  try {
    listenToMessagesAll("ai_chats", userId, setChatMessages);
  } catch (error) {
    console.error("Error fetching messages", error);
    return null;
  }
}