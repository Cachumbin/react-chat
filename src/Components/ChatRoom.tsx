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
import { auth, firestore } from "./firebaseConfig";
import ChatMessage from "./ChatMessage";
import MessageForm from "./MessageForm";
import { useRef, useEffect } from "react";

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
  const dummy = useRef<HTMLDivElement>(null);
  const messagesRef = collection(firestore, "messages").withConverter(
    messageConverter
  );
  const query1: Query<MessageProps> = query(messagesRef, orderBy("createdAt"));

  const [messages, loading, error] = useCollectionData<MessageProps>(query1);

  const sendMessage = async (message: string, file: File | null) => {
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
    };

    if (fileURL) {
      messageData.fileURL = fileURL;
    }

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
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 max-h-[calc(100vh-15rem)] overflow-y-auto">
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        <div ref={dummy}></div>
      </div>

      <MessageForm onSendMessage={sendMessage} />
      <div className="h-96 bg-white"></div>
    </div>
  );
};

export default ChatRoom;
