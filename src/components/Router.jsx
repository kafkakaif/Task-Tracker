import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import TasksPage from '../pages/TasksPage';
import AccountPage from '../pages/AccountPage';

export default function Router() {
  const [currentPage, setCurrentPage] = useState('signin');
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading) {
      setCurrentPage(user ? 'tasks' : 'signin');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: '"Work Sans", sans-serif',
        fontSize: '1.2rem',
        color: '#6c757d'
      }}>
        Loading...
      </div>
    );
  }

  const navigate = (page) => setCurrentPage(page);

  switch (currentPage) {
    case 'signin':
      return <SignInPage navigate={navigate} />;
    case 'signup':
      return <SignUpPage navigate={navigate} />;
    case 'tasks':
      return <TasksPage navigate={navigate} />;
    case 'account':
      return <AccountPage navigate={navigate} />;
    default:
      return <SignInPage navigate={navigate} />;
  }
}
