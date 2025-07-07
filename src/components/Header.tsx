import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User, Bell, Settings, LogOut, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex items-center ml-4 md:ml-0">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">FreelanceFin</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={handleSettingsClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Settings className="h-5 w-5 text-gray-700" />
            </button>
            <button 
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="h-5 w-5 text-gray-700" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-900">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;