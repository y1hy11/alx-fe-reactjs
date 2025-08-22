const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to React Router Advanced Demo</h1>
      <p>This application demonstrates:</p>
      <ul>
        <li>Basic routing with React Router</li>
        <li>Nested routing in Profile component</li>
        <li>Dynamic routing for blog posts and user profiles</li>
        <li>Protected routes requiring authentication</li>
      </ul>
      <p>
        Navigate through the application using the navigation bar above to explore 
        different routing features.
      </p>
    </div>
  );
};

export default Home;
