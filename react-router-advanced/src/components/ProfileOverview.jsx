import { useAuth } from '../context/AuthContext';

const ProfileOverview = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile Overview</h2>
      <p>This is your profile dashboard, {user?.username}!</p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        {/* Quick Stats */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Quick Stats</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Profile Views: 42</li>
            <li>Posts Created: 7</li>
            <li>Comments: 23</li>
            <li>Followers: 156</li>
          </ul>
        </div>

        {/* Recent Actions */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Recent Actions</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Logged in successfully</li>
            <li>Updated profile details</li>
            <li>Viewed blog posts</li>
            <li>Changed settings</li>
          </ul>
        </div>

        {/* Navigation Helper */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '1px solid #bbdefb',
          gridColumn: '1 / -1'
        }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Navigation Help</h3>
          <p style={{ margin: 0 }}>
            Use the tabs above to navigate between different sections of your profile:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
            <li><strong>Profile Details:</strong> View and edit your personal information</li>
            <li><strong>Settings:</strong> Customize your account preferences</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
