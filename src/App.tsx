import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Components/firebaseConfig";
import ChatRoom from "./Components/ChatRoom";
import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex justify-center h-[850px] overflow-hidden">
      <div className="mx-8 max-w-2xl flex flex-col h-full overflow-hidden">
        <header className="bg-gradient-to-r from-pink-500 to-yellow-500 flex justify-between">
          <img src="/public/Recurso 1.png" alt="" className="w-20 h-20 p-2" />
          <p className="m-6 text-2xl font-bold text-white">CachunChat</p>
          <SignOut />
        </header>
        <section className="bg-gradient-to-br from-pink-100 h-[800px] to-yellow-100 flex flex-col flex-grow overflow-hidden">
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </div>
    </div>
  );
};

export default App;
