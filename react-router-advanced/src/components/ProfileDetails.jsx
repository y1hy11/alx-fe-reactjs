import { useAuth } from '../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Details</h2>
      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        gridTemplateColumns: 'auto 1fr',
        maxWidth: '400px'
      }}>
        <strong>Username:</strong>
        <span>{user?.username}</span>
        
        <strong>User ID:</strong>
        <span>{user?.id}</span>
        
        <strong>Account Type:</strong>
        <span>Standard User</span>
        
        <strong>Member Since:</strong>
        <span>{new Date().toLocaleDateString()}</span>
        
        <strong>Last Login:</strong>
        <span>{new Date().toLocaleString()}</span>
        
        <strong>Status:</strong>
        <span style={{ color: 'green' }}>Active</span>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Recent Activity</h3>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li>Logged in today</li>
          <li>Updated profile settings</li>
          <li>Viewed blog posts</li>
          <li>Navigated through protected routes</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetails;
