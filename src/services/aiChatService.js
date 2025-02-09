import { GoogleGenerativeAI } from "@google/generative-ai";
import {GEMINI_API_KEY} from "../config/config"

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
// const chatSession = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }).startChat();


// export const askAI = async (prompt) => {
//     try {
//         if(!prompt) return "";

//         const result = await model.generateContent(prompt);
//         console.log("result", result.response.text());
//         return result.response.text();
//     } catch (error) {
//         console.log("Error chat with AI", error);
//     }
// }

export const chatWithAI = async (prompt) => {
    try {
        if(!prompt) return "";
        // const result = await chatSession.sendMessage(prompt);
        // return result.response.text();
        const result = await model.generateContentStream(prompt);
        return result.stream;
    } catch (error) {
        console.log("Error chat with AI", error);
    }
}

