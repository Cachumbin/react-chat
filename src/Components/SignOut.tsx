import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const SignOut = () => {
  return (
    auth.currentUser && (
      <button
        className="bg-pink-500 text-white m-4 p-2 rounded-lg"
        onClick={() => signOut(auth)}
      >
        Sign Out
      </button>
    )
  );
};

export default SignOut;
