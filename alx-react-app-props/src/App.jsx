import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage.jsx";
import Header from "./components/Header.jsx";
import UserProfile from "./components/UserProfile.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const userData = {
    name: "Alice",
    email: "alice@example.com",
    age: "25",
    bio: "Loves hiking and photography",
  };
  return (
    <>
      <Header />
      <MainContent />
      <UserProfile name={userData.name} email={userData.email} age={userData.age} bio={userData.bio} />
      <WelcomeMessage />
      <Footer />
    </>
  );
}

export default App;
