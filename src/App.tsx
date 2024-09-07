import "./App.css"

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"

firebase.initializeApp({
  // Your firebase config
})

const auth = firebase.auth()
const firestore = firebase.firestore()

const App = () => {
  return (
    <div>App</div>
  )
}

export default App