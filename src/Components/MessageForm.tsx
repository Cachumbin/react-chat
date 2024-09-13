import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { TbSend2 } from "react-icons/tb";

interface MessageFormProps {
  onSendMessage: (message: string, file: File | null) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
  const [formValue, setFormValue] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValue.trim() === "" && !file) {
      return;
    }
    onSendMessage(formValue, file);
    setFormValue("");
    setFile(null);
  };

  return (
    <div className="flex flex-col">
      {file && (
        <span className="bg-white text-sm text-gray-600 p-2">{file.name}</span>
      )}
      <form className="w-2-xl flex bg-white p-2" onSubmit={handleSubmit}>
        <input
          className="w-[80%] bg-gray-100 m-2 rounded-xl border-2 border-gray-300"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message"
        />
        <label htmlFor="file-upload" className="cursor-pointer my-4">
          <GrAttachment className="text-2xl mx-2 bg-pink-500 w-12 h-12 rounded-md p-2 text-white hover:text-black hover:bg-yellow-300 transition duration-300 ease-in-out" />
        </label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <button type="submit" disabled={!formValue.trim() && !file}>
          <TbSend2 className="text-2xl mx-2 bg-pink-500 w-12 h-12 rounded-md p-2 text-white hover:text-black hover:bg-yellow-300 transition duration-300 ease-in-out" />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
