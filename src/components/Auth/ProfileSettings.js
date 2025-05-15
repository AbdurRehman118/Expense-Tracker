import React, { useState, useRef } from 'react';
import './Auth.css';

const ProfileSettings = ({ user, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(user.profilePhoto || null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          photo: 'Image size should be less than 5MB'
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match';
      }
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to set new password';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      const updatedProfile = {
        name: formData.name,
        profilePhoto: previewImage,
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      };
      
      onUpdateProfile(updatedProfile);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card profile-settings">
        <h2>Profile Settings</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="profile-photo-section">
            <div className="profile-photo-container">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="profile-photo-preview" />
              ) : (
                <div className="profile-photo-placeholder">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <div className="profile-photo-actions">
              <button
                type="button"
                className="photo-upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Change Photo
              </button>
              {previewImage && (
                <button
                  type="button"
                  className="photo-remove-btn"
                  onClick={() => setPreviewImage(null)}
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            {errors.photo && <span className="error-message">{errors.photo}</span>}
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="disabled"
            />
            <span className="helper-text">Email cannot be changed</span>
          </div>

          <div className="password-section">
            <h3>Change Password</h3>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={errors.currentPassword ? 'error' : ''}
              />
              {errors.currentPassword && (
                <span className="error-message">{errors.currentPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={errors.newPassword ? 'error' : ''}
              />
              {errors.newPassword && (
                <span className="error-message">{errors.newPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className={errors.confirmNewPassword ? 'error' : ''}
              />
              {errors.confirmNewPassword && (
                <span className="error-message">{errors.confirmNewPassword}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="auth-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings; 