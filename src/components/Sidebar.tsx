import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  PieChart, 
  Brain, 
  FileText,
  CreditCard,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isMobileMenuOpen, 
  onMenuToggle 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'income', label: 'Income', icon: TrendingUp, path: '/income' },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown, path: '/expenses' },
    { id: 'taxes', label: 'Taxes', icon: Receipt, path: '/taxes' },
    { id: 'analytics', label: 'Analytics', icon: PieChart, path: '/analytics' },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, path: '/ai-insights' },
    { id: 'invoices', label: 'Invoices', icon: FileText, path: '/invoices' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payments' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onMenuToggle();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onMenuToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative md:translate-x-0 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        w-64 h-full bg-white/95 backdrop-blur-xl border-r border-gray-200/50 z-50
        md:z-0
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 md:hidden">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">FreelanceFin</h1>
            </div>
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gray-900 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;