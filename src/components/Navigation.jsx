import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navigation({ navigate, currentPage }) {
  const { user } = useContext(AuthContext);

  return (
    <nav style={{
      background: 'white',
      borderBottom: '2px solid #e9ecef',
      padding: '1.25rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      animation: 'slideIn 0.4s ease-out'
    }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: '700',
        margin: 0,
        color: '#212529',
        fontFamily: '"Crimson Pro", "Georgia", serif'
      }}>
        Task Tracker
      </h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {currentPage === 'tasks' && (
          <span style={{
            color: '#6c757d',
            fontSize: '0.95rem',
            fontFamily: '"Work Sans", sans-serif'
          }}>
            Welcome, {user?.name}
          </span>
        )}
        <button
          onClick={() => navigate('tasks')}
          className="btn-hover"
          style={{
            padding: '0.625rem 1.25rem',
            background: currentPage === 'tasks' ? '#212529' : 'transparent',
            color: currentPage === 'tasks' ? 'white' : '#6c757d',
            border: currentPage === 'tasks' ? 'none' : '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: '"Work Sans", sans-serif'
          }}
        >
          My Tasks
        </button>
        <button
          onClick={() => navigate('account')}
          className="btn-hover"
          style={{
            padding: '0.625rem 1.25rem',
            background: currentPage === 'account' ? '#212529' : 'transparent',
            color: currentPage === 'account' ? 'white' : '#6c757d',
            border: currentPage === 'account' ? 'none' : '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: '"Work Sans", sans-serif'
          }}
        >
          Account
        </button>
      </div>
    </nav>
  );
}
