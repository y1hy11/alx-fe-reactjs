import "./App.css";
import { UserContext } from "./context/UserContext.js";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  const userData = {
    name: "Alice",
    email: "alice@example.com",
    age: "25",
    bio: "Loves hiking and photography",
  };
  
  return (
    <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;
