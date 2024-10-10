import React, { useState } from 'react';
import './ProfilePage.css';

const ProfileSettingsPage: React.FC = () => {
  const [userName, setUserName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=3"); // Replace with actual image URL

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleSave = () => {
    // Save profile changes
    alert("Profile saved successfully!");
  };

  return (
    <div className="profile-settings-page">
      <h1>My Account</h1>
      <div className="profile-container">
        {/* Profile Picture */}
        <div className="profile-avatar">
          <img src={avatar} alt="Profile Avatar" className="avatar-image" />
          <label className="upload-button">
            Edit
            <input type="file" onChange={handleAvatarChange} accept="image/*" />
          </label>
        </div>

        {/* User Information */}
        <div className="profile-info">
          <div className="form-group">
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
          </div>

          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
