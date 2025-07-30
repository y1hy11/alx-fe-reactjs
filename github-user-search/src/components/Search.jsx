import { useState } from 'react';

const Search = ({ onSearch }) => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim()) {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`https://api.github.com/users/${username.trim()}`);
                const data = await response.json();
                
                if (response.ok) {
                    setUserData(data);
                    onSearch(username.trim());
                } else {
                    setError("Looks like we can't find the user");
                    setUserData(null);
                }
            } catch {
                setError("An error occurred");
                setUserData(null);
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {userData && (
                <div className="user-info">
                    <img src={userData.avatar_url} alt={userData.login} className="avatar" />
                    <h2>{userData.login}</h2>
                </div>
            )}
        </div>
    );
};

export default Search;
