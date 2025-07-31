import { useState } from 'react';
import { getUserDetails } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);

    const fetchUserData = async (username) => {
        try {
            const data = await getUserDetails(username);
            setUserData(data);
        } catch {
            setError("Looks like we cant find the user");
            setUserData(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim()) {
            setLoading(true);
            setError('');
            setUserData(null);
            
            await fetchUserData(username.trim());
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-3 mb-6 justify-center">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="px-4 py-2 border border-gray-300 rounded-lg min-w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                    type="submit" 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                    Search
                </button>
            </form>

            {loading && <div className="text-center text-gray-600">Loading...</div>}
            {error && <div className="text-red-500 text-center font-semibold">{error}</div>}
            {userData && (
                <div className="bg-white rounded-lg shadow-md p-6 mt-6 flex gap-6">
                    <img 
                        src={userData.avatar_url} 
                        alt={userData.login} 
                        className="w-24 h-24 rounded-full"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-1">{userData.name || userData.login}</h2>
                        <p className="text-gray-600 mb-3">@{userData.login}</p>
                        {userData.bio && <p className="text-gray-700 mb-4">{userData.bio}</p>}
                        <div className="flex gap-6 mb-4 text-sm">
                            <span className="text-gray-600">
                                <span className="font-semibold text-gray-800">{userData.followers}</span> Followers
                            </span>
                            <span className="text-gray-600">
                                <span className="font-semibold text-gray-800">{userData.following}</span> Following
                            </span>
                            <span className="text-gray-600">
                                <span className="font-semibold text-gray-800">{userData.public_repos}</span> Repos
                            </span>
                        </div>
                        <a 
                            href={userData.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View Profile
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
