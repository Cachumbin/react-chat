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

  const messageAlignment = isSentByCurrentUser
    ? "flex-row-reverse"
    : "flex-row";
  const backgroundColor = isSentByCurrentUser ? "bg-pink-500" : "bg-yellow-300";
  const textColor = isSentByCurrentUser ? "text-white" : "text-gray-800";

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileExtension = (url: string): string | null => {
    try {
      const pathname = new URL(url).pathname;
      const ext = pathname.split(".").pop();
      return ext ? ext.toLowerCase() : null;
    } catch (error) {
      const cleanedURL = url.split(/[?#]/)[0];
      const ext = cleanedURL.split(".").pop();
      return ext ? ext.toLowerCase() : null;
    }
  };

  const renderMedia = () => {
    if (!fileURL) return null;

    const fileExtension = getFileExtension(fileURL);
    if (!fileExtension) return null;

    const imageExtensions = ["jpeg", "jpg", "gif", "png", "svg"];
    const videoExtensions = ["mp4", "webm", "ogg"];
    const audioExtensions = ["mp3", "wav", "ogg"];

    if (audioExtensions.includes(fileExtension)) {
      return (
        <audio className="w-full mt-2" controls>
          <source src={fileURL} type={`audio/${fileExtension}`} />
          Your browser does not support the audio element.
        </audio>
      );
    } else if (videoExtensions.includes(fileExtension)) {
      return (
        <video className="w-full mt-2" controls>
          <source src={fileURL} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (imageExtensions.includes(fileExtension)) {
      return (
        <img
          className="w-full mt-2 rounded-md"
          src={fileURL}
          alt="Uploaded file"
        />
      );
    } else {
      return (
        <div className="mt-2">
          <a
            href={fileURL}
            download={fileName}
            className="text-blue-500 underline"
          >
            {fileName || "Download File"}
          </a>
          {fileSize !== undefined && (
            <p className="text-gray-500 text-sm">{formatFileSize(fileSize)}</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className={`flex ${messageAlignment} items-end mb-4`}>
      {photoURL && (
        <img
          className="w-10 h-10 m-2 rounded-full"
          src={photoURL}
          alt="User avatar"
        />
      )}
      <div
        className={`${backgroundColor} ${textColor} rounded-xl mx-2 my-2 p-3 max-w-xl break-words`}
      >
        {displayName && <p className="font-bold mb-1">{displayName}</p>}
        {text && <p className="mb-2">{text}</p>}
        {renderMedia()}
      </div>
    </div>
  );
};

export default ChatMessage;
