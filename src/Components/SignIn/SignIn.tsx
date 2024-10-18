import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from ".././firebaseConfig";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
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
