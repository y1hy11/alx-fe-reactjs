const About = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>About This Application</h1>
      <p>
        This React application showcases advanced React Router features including:
      </p>
      <h2>Features Implemented:</h2>
      <ul>
        <li>
          <strong>Basic Routing:</strong> Navigation between different pages
        </li>
        <li>
          <strong>Nested Routing:</strong> Sub-routes within the Profile section
        </li>
        <li>
          <strong>Dynamic Routing:</strong> URLs with parameters for blog posts and user profiles
        </li>
        <li>
          <strong>Protected Routes:</strong> Authentication-required pages
        </li>
        <li>
          <strong>Authentication Context:</strong> Global state management for user authentication
        </li>
      </ul>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React 19</li>
        <li>React Router DOM v7</li>
        <li>Context API for state management</li>
        <li>Vite for development</li>
      </ul>
    </div>
  );
};

export default About;
