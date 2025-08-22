import { useParams, Link, Navigate } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Router",
    excerpt: "Learn the basics of React Router and how to implement routing in your React applications.",
    content: `
      React Router is the standard routing library for React applications. It enables you to create single-page applications with navigation without page refreshes.

      ## Installation
      \`\`\`bash
      npm install react-router-dom
      \`\`\`

      ## Basic Setup
      To get started with React Router, you need to wrap your application with a Router component and define your routes.

      ## Key Concepts
      - **Route**: Defines a path and the component to render
      - **Link**: Creates navigation links
      - **Navigate**: Programmatic navigation
      - **useParams**: Access URL parameters

      React Router makes it easy to build complex navigation structures while maintaining a great user experience.
    `,
    author: "Jane Smith",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Advanced React Router Patterns",
    excerpt: "Explore advanced patterns like nested routing, protected routes, and dynamic imports.",
    content: `
      Once you've mastered the basics of React Router, you can explore more advanced patterns that will help you build sophisticated applications.

      ## Nested Routing
      Nested routes allow you to create complex UI structures where components can have their own sub-routes.

      ## Protected Routes
      Protect certain parts of your application by checking authentication status before rendering components.

      ## Dynamic Imports
      Use code splitting with React.lazy() and dynamic imports to improve your application's performance.

      ## Route Guards
      Implement route guards to control access to different parts of your application based on user permissions.

      These patterns help you build scalable and maintainable React applications.
    `,
    author: "John Doe",
    date: "2024-01-20"
  },
  {
    id: 3,
    title: "State Management with Context API",
    excerpt: "How to use React's Context API for global state management in your applications.",
    content: `
      The Context API is React's built-in solution for sharing state across multiple components without prop drilling.

      ## When to Use Context
      - Global application state
      - User authentication
      - Theme management
      - Language/localization

      ## Creating a Context
      Use createContext() to create a new context, then provide it with a Provider component.

      ## Best Practices
      - Keep contexts focused and specific
      - Use multiple contexts for different concerns
      - Optimize re-renders with useMemo and useCallback

      The Context API is a powerful tool for managing state in React applications without external libraries.
    `,
    author: "Alice Johnson",
    date: "2024-01-25"
  },
  {
    id: 4,
    title: "Building Responsive React Components",
    excerpt: "Best practices for creating responsive and accessible React components.",
    content: `
      Building responsive React components requires careful consideration of design, accessibility, and performance.

      ## Responsive Design Principles
      - Mobile-first approach
      - Flexible layouts with CSS Grid and Flexbox
      - Responsive images and media

      ## Accessibility
      - Semantic HTML elements
      - ARIA attributes
      - Keyboard navigation
      - Screen reader support

      ## Performance Optimization
      - Code splitting
      - Lazy loading
      - Memoization
      - Virtual scrolling for large lists

      Creating inclusive and performant components ensures a great experience for all users.
    `,
    author: "Bob Wilson",
    date: "2024-02-01"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const postId = parseInt(id);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link 
        to="/blog"
        style={{
          color: '#007bff',
          textDecoration: 'none',
          marginBottom: '1rem',
          display: 'inline-block'
        }}
      >
        ← Back to Blog
      </Link>
      
      <article>
        <h1 style={{ marginBottom: '1rem' }}>{post.title}</h1>
        
        <div style={{ 
          color: '#666', 
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e0e0e0'
        }}>
          By {post.author} • {new Date(post.date).toLocaleDateString()}
        </div>
        
        <div style={{ 
          lineHeight: '1.6',
          whiteSpace: 'pre-line'
        }}>
          {post.content}
        </div>
      </article>

      <div style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e0e0e0'
      }}>
        <h3>More Posts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {blogPosts
            .filter(p => p.id !== postId)
            .slice(0, 3)
            .map(relatedPost => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  padding: '0.5rem 0'
                }}
              >
                {relatedPost.title}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
