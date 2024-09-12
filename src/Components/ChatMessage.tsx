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

  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass} flex items-end`}>
      {photoURL && (
        <img
          className="w-10 h-10 m-2 my-4 rounded-xl"
          src={photoURL}
          alt="User avatar"
        />
      )}
      <div className="flex flex-col bg-pink-500 rounded-xl mx-2 my-4 p-2 text-white">
        <p className="font-bold mb-1">{displayName}</p>
        <p className="">{text}</p>
        {fileURL && (
          <div>
            <a href={fileURL} target="_blank" rel="noopener noreferrer">
              <img
                src={fileURL}
                alt="Uploaded file"
                style={{ maxWidth: "500px" }}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
