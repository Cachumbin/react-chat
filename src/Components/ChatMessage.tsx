import React from "react";
import { auth } from "./firebaseConfig";

interface MessageProps {
  message: {
    text: string;
    uid: string;
    photoURL?: string;
    createdAt?: any;
    displayName?: string;
    fileURL?: string;
  };
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  const { text, uid, photoURL, displayName, fileURL } = message;

  // Determine if the message is sent by the current user
  const isSentByCurrentUser = uid === auth.currentUser?.uid;

  // Class for the message alignment
  const messageClass = isSentByCurrentUser
    ? "flex-row-reverse"
    : "justify-start";

  // Conditional classes for sent vs received messages
  const backgroundColor = isSentByCurrentUser ? "bg-pink-500" : "bg-yellow-300";
  const textColor = isSentByCurrentUser ? "text-white" : "text-gray-800";

  return (
    <div className={`message ${messageClass} flex items-end`}>
      {photoURL && (
        <img
          className="w-10 h-10 m-2 my-4 rounded-xl"
          src={photoURL}
          alt="User avatar"
        />
      )}
      <div
        className={`${messageClass} flex flex-col ${backgroundColor} rounded-xl mx-2 my-4 p-2 ${textColor} max-w-xl`}
      >
        <p className="font-bold mb-1">{displayName}</p>
        <p className="w-auto break-words break-all">{text}</p>
        {fileURL && (
          <div>
            <a href={fileURL} target="_blank" rel="noopener noreferrer">
              <img className="w-auto" src={fileURL} alt="Uploaded file" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
