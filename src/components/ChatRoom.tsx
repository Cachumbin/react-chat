import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  DocumentData,
  Query,
  FirestoreDataConverter,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeFirebaseApp } from "./firebaseConfig";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
import { useRef, useEffect } from "react";

const { auth, firestore } = initializeFirebaseApp();

interface MessageProps {
  text: string;
  createdAt: any;
  uid: string;
  photoURL: string;
  displayName: string;
  fileURL?: string;
  fileName?: string;
  fileSize?: number;
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
      fileName: message.fileName || null,
      fileSize: message.fileSize || null,
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
      fileName: data.fileName || null,
      fileSize: data.fileSize || null,
    };
  },
};

const ChatRoom: React.FC = () => {
  const dummy = useRef<HTMLDivElement>(null);
  const messagesRef = collection(firestore, "messages").withConverter(
    messageConverter
  );
  const query1: Query<MessageProps> = query(messagesRef, orderBy("createdAt"));

  const [messages, loading, error] = useCollectionData<MessageProps>(query1);

  const sendMessage = async (
    message: string,
    file: File | null,
    fileName: string | null,
    fileSize: number | null
  ) => {
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
      text: message,
      createdAt: serverTimestamp(),
      uid,
      photoURL: safePhotoURL,
      displayName: safeDisplayName,
      fileURL: fileURL || undefined,
      fileName: fileName || undefined,
      fileSize: fileSize || undefined,
    };

    await addDoc(messagesRef, messageData);
  };

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-[800px] overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 h-[800px]">
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        <div ref={dummy}></div>
      </div>

      <MessageForm onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
