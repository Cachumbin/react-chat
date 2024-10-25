import { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { TbSend2 } from "react-icons/tb";

interface MessageFormProps {
  onSendMessage: (
    message: string,
    file: File | null,
    fileName: string | null,
    fileSize: number | null
  ) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
  const [formValue, setFormValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValue.trim() === "" && !file) {
      return;
    }
    onSendMessage(formValue, file, fileName, fileSize);
    setFormValue("");
    setFile(null);
    setFileName(null);
    setFileSize(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : null);
    setFileSize(selectedFile ? selectedFile.size : null);
  };

  return (
    <div className="flex flex-col">
      {file && (
        <span className="bg-white text-sm text-gray-600 p-2">{file.name}</span>
      )}
      <form className="flex flex-row bg-white p-2" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="cursor-pointer sm:my-4">
          <GrAttachment className="text-2xl bg-pink-500 w-8 h-8 rounded-md p-1 text-white hover:text-black hover:bg-yellow-300 transition duration-300 ease-in-out sm:w-12 sm:h-12 sm:mx-2 sm:p-2" />
        </label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleFileChange}
          aria-label="attachment"
        />
        <input
          className="flex-grow px-4 bg-gray-100 mx-1 rounded-xl border-2 border-gray-300 h-8 sm:h-12 sm:mx-4 sm:my-4"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message"
        />
        <button
          type="submit"
          disabled={!formValue.trim() && !file}
          className=""
          aria-label="button-submit"
        >
          <TbSend2 className="text-2xl bg-pink-500 w-8 h-8 rounded-md p-1 text-white hover:text-black hover:bg-yellow-300 transition duration-300 ease-in-out sm:w-12 sm:h-12 sm:mx-2 sm:p-2" />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
