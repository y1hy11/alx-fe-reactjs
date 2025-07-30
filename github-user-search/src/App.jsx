import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import UserCard from './components/UserCard';
import { getUserDetails } from './services/githubAPI';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    setLoading(true);
    setError('');
    setUser(null);

    try {
      const userData = await getUserDetails(username);
      setUser(userData);
    } catch (error) {
      setError(`User not found: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles</p>
      </header>
      <main>
        <Search onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <UserCard user={user} />
      </main>
    </div>
  );
}

export default App;