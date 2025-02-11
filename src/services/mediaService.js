import axios from "axios";
import { CLOUD_NAME, UPLOAD_PRESET } from "../config/config"

// import { storage } from "../config/firebase";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// export const uploadFile = async (file) => {
//     if (!file) throw new Error("No file provided");
//     try {
//         const storageRef = ref(storage, `chat-media/${file.name}`);
//         const snapshot = await uploadBytesResumable(storageRef, file);
//         const mediaUrl = await getDownloadURL(snapshot.ref);
//       return mediaUrl;
//     } catch (error) {
//         throw new Error(`Upload failed: ${error.message}`);
//     }
// };

export const uploadToCloudinary = async (file) => {
try {
    var mediaType = "raw";
    if(file.type.startsWith("image/")) {
        mediaType = "image"
    }
    if(file.type.startsWith("video/")) {
        mediaType = "video"
    }
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${mediaType}/upload`,
      formData
    );
    console.log("res", response.data);
    return response.data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};