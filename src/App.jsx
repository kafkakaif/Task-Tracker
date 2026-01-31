import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Router from './components/Router';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
