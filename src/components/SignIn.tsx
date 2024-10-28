import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeFirebaseApp } from "./firebaseConfig";

const { auth } = initializeFirebaseApp();

const SignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button
      className="bg-pink-500 text-white m-4 p-2 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 ease-in-out hover:text-black"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
};

export default SignIn;
