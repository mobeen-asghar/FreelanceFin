import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize demo user for testing
const initializeDemoUser = () => {
  const users = JSON.parse(localStorage.getItem('freelancefin_users') || '[]');
  const demoUser = {
    id: 'demo-user-123',
    email: 'demo@freelancefin.com',
    password: 'demo123',
    name: 'Demo User',
    createdAt: new Date().toISOString()
  };
  
  if (!users.find((u: any) => u.email === demoUser.email)) {
    users.push(demoUser);
    localStorage.setItem('freelancefin_users', JSON.stringify(users));
  }
};

initializeDemoUser();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);