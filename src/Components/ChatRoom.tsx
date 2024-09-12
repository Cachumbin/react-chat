import React, { useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  DocumentData,
  Query,
  FirestoreDataConverter,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "./firebaseConfig";
import ChatMessage from "./ChatMessage";

interface MessageProps {
  text: string;
  createdAt: any;
  uid: string;
  photoURL: string;
  displayName: string;
  fileURL?: string;
}

const messageConverter: FirestoreDataConverter<MessageProps> = {
  toFirestore(message: MessageProps): DocumentData {
    return {
      text: message.text,
      createdAt: message.createdAt,
      uid: message.uid,
      photoURL: message.photoURL,
      displayName: message.displayName,
      fileURL: message.fileURL || null,
    };
  },
  fromFirestore(snapshot): MessageProps {
    const data = snapshot.data();
    return {
      text: data.text,
      createdAt: data.createdAt,
      uid: data.uid,
      photoURL: data.photoURL,
      displayName: data.displayName,
      fileURL: data.fileURL || null,
    };
  },
};

const ChatRoom: React.FC = () => {
  const messagesRef = collection(firestore, "messages").withConverter(
    messageConverter
  );
  const query1: Query<MessageProps> = query(
    messagesRef,
    orderBy("createdAt"),
    limit(25)
  );

  const [messages, loading, error] = useCollectionData<MessageProps>(query1);
  const [formValue, setFormValue] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser!;

    let fileURL = null;
    if (file) {
      const storage = getStorage();
      const fileRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(fileRef, file);
      fileURL = await getDownloadURL(fileRef);
    }

    const safePhotoURL = photoURL || "";

    const safeDisplayName = displayName || undefined;

    const messageData: Partial<MessageProps> = {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL: safePhotoURL,
      displayName: safeDisplayName,
    };

    if (fileURL) {
      messageData.fileURL = fileURL;
    }

    await addDoc(messagesRef, messageData);

    setFormValue("");
    setFile(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <button type="submit" disabled={!formValue && !file}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
