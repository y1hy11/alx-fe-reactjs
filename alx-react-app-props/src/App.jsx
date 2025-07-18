import "./App.css";
import UserContext  from "./UserContext.js";
import ProfilePage from "./ProfilePage.jsx";

function App() {
  const userData = {
    name: "Alice",
    email: "alice@example.com",
  };
  
  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
