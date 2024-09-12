import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Components/firebaseConfig";
import ChatRoom from "./Components/ChatRoom";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="w-[600px] flex flex-col">
      <header className="bg-gradient-to-r from-pink-500 to-yellow-500 flex justify-between">
        <p className="m-6 text-2xl font-bold text-white">CachunChat</p>
        <SignOut />
      </header>
      <section className="bg-gradient-to-br from-pink-100 to-yellow-100">
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
};

export default App;
