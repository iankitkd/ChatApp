# Chat App

A chat application built with **React, TailwindCSS, Firebase** and **Gemini API**. This app allows users to chat in real-time, send media files and interact with an AI assistant.

## Live Demo
[Project Live Link](https://connectup.vercel.app/)

## Features

### Authentication
- Sign up and log in using Firebase Authentication.
- **Secure authentication** with email and password.
- Redux stores the user session to persist login status.

### Chat System
- View chat list (users you've chatted with before).
- Search for users by username to add new chats.
- **Real-time messaging** powered by Firebase Firestore.
- Send text messages and media (images/videos/documents).
- Responsive and simple chat UI.

### AI Chatbot
- Interact with an AI-powered chatbot built using the Gemini API.

### Theme Customization
- Switch between Light Mode and Dark Mode in settings.

---

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Firebase Authentication, Firestore Database
- **AI Integration**: Gemini API
- **Build Tool**: Vite
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/iankitkd/ChatApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ChatApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

   VITE_GEMINI_API_KEY=your_gemini_api_key

   VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---