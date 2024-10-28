import { signOut } from "firebase/auth";
import { initializeFirebaseApp } from "./firebaseConfig";

const { auth } =
  process.env.NODE_ENV !== "test" ? initializeFirebaseApp() : { auth: null };

const SignOut = () => {
  return (
    auth?.currentUser && (
      <button
        className="bg-pink-500 text-white mx-3 p-2 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 ease-in-out hover:text-black"
        onClick={() => signOut(auth)}
      >
        Sign Out
      </button>
    )
  );
};

export default SignOut;
