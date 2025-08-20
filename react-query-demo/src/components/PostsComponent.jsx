import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const PostsComponent = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);

    const fetchPosts = async () => {
        console.log('🔄 Fetching posts from API...');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    };

    const {
        data: posts,
        isLoading,
        error,
        isError,
        refetch,
        isFetching,
        dataUpdatedAt,
        isStale
    } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 30 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const handleRefetch = () => {
        console.log('🔄 Manual refetch triggered');
        refetch();
    };

    const filteredPosts = posts?.filter(post => 
        selectedUserId ? post.userId === selectedUserId : true
    );

    if (isLoading) {
        return (
            <div>
                <div>
                    🔄 Loading posts for the first time...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <div>
                    ❌ Error: {error.message}
                    <button onClick={handleRefetch}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>
                    React Query Demo - Posts
                </h1>
                
                <div>
                    <div>
                        <span>
                            {isStale ? '⚠️ Data is stale' : '✅ Data is fresh'}
                        </span>
                        <span>
                            Last updated: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : 'Never'}
                        </span>
                        {isFetching && (
                            <span>🔄 Fetching...</span>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleRefetch}
                        disabled={isFetching}
                    >
                        {isFetching ? '🔄 Refetching...' : '🔄 Refetch Data'}
                    </button>

                    <select
                        value={selectedUserId || ''}
                        onChange={(e) => setSelectedUserId(e.target.value ? parseInt(e.target.value) : null)}
                    >
                        <option value="">All users</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                User {i + 1}
                            </option>
                        ))}
                    </select>

                    <div>
                        Check browser dev tools Network tab to see caching in action!
                    </div>
                </div>
            </div>

            <div>
                {filteredPosts?.slice(0, 12).map((post) => (
                    <div key={post.id}>
                        <h2>
                            {post.title}
                        </h2>
                        <p>
                            {post.body}
                        </p>
                        <div>
                            <span>Post #{post.id}</span>
                            <span>
                                User {post.userId}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h3>
                    🧪 Testing React Query Features
                </h3>
                <div>
                    <p>• <strong>Caching:</strong> Navigate to another page and come back - data loads instantly from cache!</p>
                    <p>• <strong>Stale Time:</strong> Data stays "fresh" for 30 seconds, then becomes "stale"</p>
                    <p>• <strong>Background Updates:</strong> Click "Refetch Data" to see background updates</p>
                    <p>• <strong>Network Monitoring:</strong> Open dev tools → Network tab to see API call patterns</p>
                </div>
                <div>
                    <p>
                        Showing {Math.min(12, filteredPosts?.length || 0)} of {filteredPosts?.length || 0} posts
                        {selectedUserId && ` (filtered by User ${selectedUserId})`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostsComponent;
