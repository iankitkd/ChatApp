import { db } from "../config/firebase"; 
import { doc, setDoc, getDoc, serverTimestamp, query, where, getDocs, collection, orderBy, onSnapshot } from "firebase/firestore";

export const createUser = async (userId, email, name, username, photoURL) => {
    try {  
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
            uid: userId,
            email: email,
            name: name || "",
            username: username.toLowerCase(),
            photoURL: photoURL || "",
            createdAt: serverTimestamp()
        });
        
        const usernameRef = doc(db, "usernames", username.toLowerCase());
        await setDoc(usernameRef, {
            uid: userId
        });
    } catch (error) {
        console.log("Error at create User", error);
    }
};

export const getUser = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if(!userSnap.exists()) {
            return null;
        }
        return userSnap.data();
    } catch (error) {
        console.log("Error getting user", error);
        return null;
    }
}

export const checkUsernameAvailable = async (username) => {
    try {
        const usernameRef = doc(db, "usernames", username.toLowerCase());
        const usernameSnap = await getDoc(usernameRef);
        
        return !usernameSnap.exists(); 
    } catch (error) {
        console.log("Error at check username available", error);
        return false;
    }
};

export const findUserByUsername = async (username) => {
    try {
        const usernameRef = doc(db, "usernames", username.toLowerCase());
        const usernameSnap = await getDoc(usernameRef);
        if (!usernameSnap.exists()) {
            return null;
        }
        
        const userId = usernameSnap.data().uid;
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if(!userSnap.exists()) {
            return null;
        }

        const userData = userSnap.data();
        return userData;
    } catch (error) {
        console.log("Error at find user by username", error);
        return null;
    }
};

export const findUsersByUsername = async (username) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", ">=", username.toLowerCase()), where("username", "<", username.toLowerCase() + "\uf8ff"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return [];
        }

        const users = querySnapshot.docs.map(doc => {
            const {createdAt, ...userData} = doc.data();
            return userData;
        });

        return users;
    } catch (error) {
        console.error("Error finding users by username:", error);
        return [];
    }
};

export const getUsersDetails = async (userList) => {
    try {
        const users =  await Promise.all(userList.map(async (userId) => {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);
            const {createdAt, ...userData} = userSnap.data();
            return userData;
        }))
        return users;
    } catch (error) {
        console.log("Error getting user details", error);
        return [];
    }
}

export const listenToChatList = (userId, updateChatList) => {
    try {
        const chatListRef = collection(db, "users", userId, "chatList");
        const q = query(chatListRef, orderBy("lastUpdated", "desc"));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedChatList = querySnapshot.docs.map((doc) => ({
              chatId: doc.id,
              ...doc.data(),
            }));
            updateChatList(updatedChatList);
        });
        return unsubscribe;
    } catch (error) {
        console.log("Error listening to chat list updates", error);
        return null;
    }
};
