import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage.jsx";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <WelcomeMessage />
    </>
  );
}

export default App;
