import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => signOut(auth)}>Sign Out</button>
  );
};

export default SignOut;
