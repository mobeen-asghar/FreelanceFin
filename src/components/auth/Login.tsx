import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, UserPlus, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (!name.trim()) {
        setError('Name is required');
        return;
      }
      const success = await signup(email, password, name);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email already exists');
      }
    } else {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">FreelanceFin</h1>
          <p className="text-gray-600 mt-2">AI-Powered Personal Finance Manager</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isSignup ? 'Start managing your finances today' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white/50"
                  required
                />
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white/50"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 pr-12 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isSignup ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                  <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-800 text-sm font-medium mb-2">Demo Credentials:</p>
            <p className="text-gray-700 text-xs">Email: demo@freelancefin.com</p>
            <p className="text-gray-700 text-xs">Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;