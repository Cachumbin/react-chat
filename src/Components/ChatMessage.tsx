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
    fileName?: string;
    fileSize?: number;
  };
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  const { text, uid, photoURL, displayName, fileURL, fileName, fileSize } =
    message;

  const isSentByCurrentUser = uid === auth.currentUser?.uid;

  const messageClass = isSentByCurrentUser
    ? "flex-row-reverse"
    : "justify-start";

  const backgroundColor = isSentByCurrentUser ? "bg-pink-500" : "bg-yellow-300";
  const textColor = isSentByCurrentUser ? "text-white" : "text-gray-800";

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const renderMedia = () => {
    if (!fileURL) return null;

    const fileExtension = fileURL.split(".").pop()?.toLowerCase();
    if (!fileExtension) return null;

    if (["jpeg", "jpg", "gif", "png"].includes(fileExtension)) {
      return <img className="w-auto" src={fileURL} alt="Uploaded file" />;
    } else if (["mp4", "webm", "ogg"].includes(fileExtension)) {
      return (
        <video className="w-auto" controls>
          <source src={fileURL} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (["mp3", "wav", "ogg"].includes(fileExtension)) {
      return (
        <audio className="w-auto" controls>
          <source src={fileURL} type={`audio/${fileExtension}`} />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      return (
        <div>
          <a
            href={fileURL}
            download={fileName}
            className="text-blue-500 underline"
          >
            {fileName}
          </a>
          <p className="text-gray-500">{formatFileSize(fileSize || 0)}</p>
        </div>
      );
    }
  };

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
        {renderMedia()}
      </div>
    </div>
  );
};

export default ChatMessage;
