import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import { Settings, LogOut } from 'lucide-react';

export default function AccountPage({ navigate }) {
  const { user, signOut } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  const handleSignOut = () => {
    signOut();
    navigate('signin');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      fontFamily: '"Crimson Pro", "Georgia", serif'
    }}>
      <Navigation navigate={navigate} currentPage="account" />

      <div style={{
        maxWidth: '800px',
        margin: '3rem auto',
        padding: '0 2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.05)',
          animation: 'slideIn 0.6s ease-out'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '2rem',
            borderBottom: '2px solid #f8f9fa'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: '700'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#212529',
                margin: 0,
                marginBottom: '0.25rem'
              }}>
                {user?.name}
              </h1>
              <p style={{
                color: '#6c757d',
                margin: 0,
                fontSize: '1.1rem',
                fontFamily: '"Work Sans", sans-serif'
              }}>
                {user?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: '#212529',
              fontFamily: '"Work Sans", sans-serif'
            }}>
              Profile Settings
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#495057',
                fontFamily: '"Work Sans", sans-serif'
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontFamily: '"Work Sans", sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#495057'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: '500',
                color: '#495057',
                fontFamily: '"Work Sans", sans-serif'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontFamily: '"Work Sans", sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#495057'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '2px solid #f8f9fa'
            }}>
              <button
                type="submit"
                className="btn-hover"
                style={{
                  padding: '0.875rem 2rem',
                  background: '#212529',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: '"Work Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Settings size={18} />
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="btn-hover"
                style={{
                  padding: '0.875rem 2rem',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: '"Work Sans", sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
