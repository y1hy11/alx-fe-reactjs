import './App.css';
import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-transparent text-black py-8 px-4 text-center">
        <h1 className="text-4xl font-bold mb-2">GitHub User Search</h1>
        <p className="text-xl opacity-90">Search for GitHub users and explore their profiles</p>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Search />
      </main>
    </div>
  );
}

export default App;