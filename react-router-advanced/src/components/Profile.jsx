import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Profile</h1>
      <p>Welcome to your profile, {user?.username}!</p>
      
      {/* Navigation for nested routes */}
      <nav style={{
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px',
        margin: '2rem 0'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/profile"
            style={{
              padding: '0.5rem 1rem',
              textDecoration: 'none',
              borderRadius: '4px',
              backgroundColor: isActive('/profile') ? '#007bff' : 'transparent',
              color: isActive('/profile') ? 'white' : '#007bff'
            }}
          >
            Profile Overview
          </Link>
          <Link
            to="/profile/details"
            style={{
              padding: '0.5rem 1rem',
              textDecoration: 'none',
              borderRadius: '4px',
              backgroundColor: isActive('/profile/details') ? '#007bff' : 'transparent',
              color: isActive('/profile/details') ? 'white' : '#007bff'
            }}
          >
            Profile Details
          </Link>
          <Link
            to="/profile/settings"
            style={{
              padding: '0.5rem 1rem',
              textDecoration: 'none',
              borderRadius: '4px',
              backgroundColor: isActive('/profile/settings') ? '#007bff' : 'transparent',
              color: isActive('/profile/settings') ? 'white' : '#007bff'
            }}
          >
            Settings
          </Link>
        </div>
      </nav>

      {/* This is where nested route components will be rendered */}
      <div style={{
        minHeight: '300px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        backgroundColor: '#fff'
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
