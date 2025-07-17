import "./App.css";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  const userData = {
    name: "Alice",
    email: "alice@example.com",
    age: "25",
    bio: "Loves hiking and photography",
  };
  
  return (
    <>
      <UserProfile userData={userData} />
    </>
  );
}

export default App;
