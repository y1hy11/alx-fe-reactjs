import { useState } from 'react';
import { getUserDetails } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim()) {
            setLoading(true);
            setError('');
            setUserData(null);
            
            try {
                const data = await getUserDetails(username.trim());
                setUserData(data);
            } catch {
                setError("Looks like we cant find the user");
                setUserData(null);
            } finally {
                setLoading(false);
            }
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
            {error && <div className="error">{error}</div>}
            {userData && (
                <div className="user-card">
                    <img src={userData.avatar_url} alt={userData.login} className="user-avatar" />
                    <div className="user-info">
                        <h2>{userData.name || userData.login}</h2>
                        <p className="username">@{userData.login}</p>
                        {userData.bio && <p className="bio">{userData.bio}</p>}
                        <div className="user-stats">
                            <span>Followers: {userData.followers}</span>
                            <span>Following: {userData.following}</span>
                            <span>Repos: {userData.public_repos}</span>
                        </div>
                        <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
                            View Profile
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
