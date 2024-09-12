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
    <div className={`message ${messageClass}`}>
      {photoURL && <img src={photoURL} alt="User avatar" />}
      <p>{displayName}</p>
      <p>{text}</p>
      {fileURL && (
        <div>
          <a href={fileURL} target="_blank" rel="noopener noreferrer">
            <img
              src={fileURL}
              alt="Uploaded file"
              style={{ maxWidth: "200px" }}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
