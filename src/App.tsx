import "./App.css"

import firebase from "firebase/app"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import "firebase/firestore"
import "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import dotenv from "dotenv"

dotenv.config()

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
})

const auth = firebase.auth()
const firestore = firebase.firestore()

const SignIn = ({}) => {
  const useSignInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
  }

return (
  <button onClick={useSignInWithGoogle}>Sign in with Google</button>
)
}

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

const ChatRoom = () => {
  const messagesRef = firestore.collection("messages")
  const query = messagesRef.orderBy("createdAt").limit(25)

  const [messages] = useCollectionData(query, { idField: "id" } as any)

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}

const ChatMessage = ({ message }) => {
  const { text, uid } = message

  return (
    <p>{text}</p>
  )
}

const App = () => {

  const [user] = useAuthState(auth)

  return (
    <div>
      <header>

      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  )
}

export default App