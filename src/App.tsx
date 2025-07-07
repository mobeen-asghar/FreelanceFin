import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicApp from './components/PublicApp';
import Login from './components/auth/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Income from './components/Income';
import Expenses from './components/Expenses';
import AIInsights from './components/AIInsights';
import Settings from './components/Settings';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      
      {/* Public pages */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <PublicApp />} />
      <Route path="/features" element={user ? <Navigate to="/dashboard" replace /> : <PublicApp />} />
      <Route path="/pricing" element={user ? <Navigate to="/dashboard" replace /> : <PublicApp />} />
      <Route path="/case-studies" element={user ? <Navigate to="/dashboard" replace /> : <PublicApp />} />
      <Route path="/about" element={user ? <Navigate to="/dashboard" replace /> : <PublicApp />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <Dashboard />
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/income" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <Income />
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/expenses" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <Expenses />
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/ai-insights" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <AIInsights />
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <Settings />
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/taxes" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center py-20 text-gray-600">Tax management coming soon...</div>
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/analytics" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center py-20 text-gray-600">Analytics dashboard coming soon...</div>
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/invoices" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center py-20 text-gray-600">Invoice management coming soon...</div>
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
      
      <Route path="/payments" element={
        <ProtectedRoute>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="flex">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuToggle={handleMenuToggle} />
              <main className="flex-1 p-6 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center py-20 text-gray-600">Payment tracking coming soon...</div>
                </div>
              </main>
            </div>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;