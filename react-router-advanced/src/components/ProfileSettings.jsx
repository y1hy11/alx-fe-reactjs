import { useState } from 'react';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    theme: 'light',
    language: 'en',
    privacy: 'public'
  });

  const [saved, setSaved] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // Simulate saving settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <p>Customize your account preferences and privacy settings.</p>

      {saved && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #c3e6cb'
        }}>
          Settings saved successfully!
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Notifications */}
        <div>
          <h3>Notifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              Email Notifications
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
              Push Notifications
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h3>Appearance</h3>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '200px' }}>
            Theme:
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </label>
        </div>

        {/* Language */}
        <div>
          <h3>Language</h3>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '200px' }}>
            Language:
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </label>
        </div>

        {/* Privacy */}
        <div>
          <h3>Privacy</h3>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '200px' }}>
            Profile Visibility:
            <select
              value={settings.privacy}
              onChange={(e) => handleSettingChange('privacy', e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSave}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
