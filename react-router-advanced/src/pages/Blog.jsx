import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Router",
    excerpt: "Learn the basics of React Router and how to implement routing in your React applications.",
    author: "Jane Smith",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Advanced React Router Patterns",
    excerpt: "Explore advanced patterns like nested routing, protected routes, and dynamic imports.",
    author: "John Doe",
    date: "2024-01-20"
  },
  {
    id: 3,
    title: "State Management with Context API",
    excerpt: "How to use React's Context API for global state management in your applications.",
    author: "Alice Johnson",
    date: "2024-01-25"
  },
  {
    id: 4,
    title: "Building Responsive React Components",
    excerpt: "Best practices for creating responsive and accessible React components.",
    author: "Bob Wilson",
    date: "2024-02-01"
  }
];

const Blog = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Blog Posts</h1>
      <p>Explore our collection of articles about React and web development.</p>
      
      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
        {blogPosts.map(post => (
          <article 
            key={post.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '1.5rem',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h2>
              <Link 
                to={`/blog/${post.id}`}
                style={{
                  color: '#007bff',
                  textDecoration: 'none'
                }}
              >
                {post.title}
              </Link>
            </h2>
            <p style={{ color: '#666', margin: '0.5rem 0' }}>
              By {post.author} • {new Date(post.date).toLocaleDateString()}
            </p>
            <p>{post.excerpt}</p>
            <Link 
              to={`/blog/${post.id}`}
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
