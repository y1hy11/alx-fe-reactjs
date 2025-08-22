import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0', color: '#dc3545' }}>
        404
      </h1>
      <h2 style={{ marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link
          to="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Go Home
        </Link>
        <Link
          to="/blog"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          View Blog
        </Link>
      </div>

      <div style={{ marginTop: '3rem', color: '#666' }}>
        <p>Popular pages:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/about" style={{ color: '#007bff', textDecoration: 'none' }}>About</Link></li>
          <li><Link to="/blog" style={{ color: '#007bff', textDecoration: 'none' }}>Blog</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;
