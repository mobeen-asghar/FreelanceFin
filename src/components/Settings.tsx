import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Trash2, Save, Eye, EyeOff, Download, Upload, Smartphone, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'data' | 'preferences'>('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: true,
    taxReminders: true,
    marketingEmails: false,
    securityAlerts: true
  });
  const [preferences, setPreferences] = useState({
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'America/New_York',
    language: 'English',
    theme: 'light'
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSaveProfile = async () => {
    setSaveStatus('saving');
    try {
      // Update user profile in localStorage
      if (user) {
        const updatedUser = { ...user, name: formData.name, email: formData.email };
        localStorage.setItem('freelancefin_user', JSON.stringify(updatedUser));
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('freelancefin_users') || '[]');
        const updatedUsers = users.map((u: any) => 
          u.id === user.id ? { ...u, name: formData.name, email: formData.email } : u
        );
        localStorage.setItem('freelancefin_users', JSON.stringify(updatedUsers));
        
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    setSaveStatus('saving');
    try {
      // In a real app, this would validate current password and update it
      setSaveStatus('saved');
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleDeleteAccount = () => {
    if (user) {
      // Remove user data
      localStorage.removeItem(`freelancefin_${user.id}_transactions`);
      
      // Remove user from users array
      const users = JSON.parse(localStorage.getItem('freelancefin_users') || '[]');
      const updatedUsers = users.filter((u: any) => u.id !== user.id);
      localStorage.setItem('freelancefin_users', JSON.stringify(updatedUsers));
      
      logout();
    }
  };

  const exportData = () => {
    if (user) {
      const userData = {
        profile: user,
        transactions: JSON.parse(localStorage.getItem(`freelancefin_${user.id}_transactions`) || '[]'),
        preferences,
        notifications
      };
      
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `freelancefin-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'data', label: 'Data & Privacy', icon: Download }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-2 border border-gray-200/50">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                <p className="text-gray-600">Update your personal information and profile details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={handleSaveProfile}
                disabled={saveStatus === 'saving'}
                className="bg-gray-900 text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 hover:scale-105"
              >
                <Save className="h-4 w-4" />
                <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}</span>
              </button>
              {saveStatus === 'saved' && (
                <span className="text-green-600 text-sm font-medium">Changes saved successfully!</span>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-600 text-sm font-medium">Error saving changes. Please try again.</span>
              )}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
                <p className="text-gray-600">Manage your password and security preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                className="bg-gray-900 text-white px-8 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              >
                <Lock className="h-4 w-4" />
                <span>Update Password</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Notification Preferences</h3>
                <p className="text-gray-600">Choose how you want to be notified about important updates</p>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50 transition-all duration-200 border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {key === 'emailAlerts' && <Mail className="h-5 w-5 text-gray-600" />}
                      {key === 'pushNotifications' && <Smartphone className="h-5 w-5 text-gray-600" />}
                      {key === 'weeklyReports' && <Bell className="h-5 w-5 text-gray-600" />}
                      {key === 'taxReminders' && <Bell className="h-5 w-5 text-gray-600" />}
                      {key === 'marketingEmails' && <Mail className="h-5 w-5 text-gray-600" />}
                      {key === 'securityAlerts' && <Shield className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {key === 'emailAlerts' && 'Email Alerts'}
                        {key === 'pushNotifications' && 'Push Notifications'}
                        {key === 'weeklyReports' && 'Weekly Reports'}
                        {key === 'taxReminders' && 'Tax Reminders'}
                        {key === 'marketingEmails' && 'Marketing Emails'}
                        {key === 'securityAlerts' && 'Security Alerts'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === 'emailAlerts' && 'Receive important updates via email'}
                        {key === 'pushNotifications' && 'Get real-time notifications on your device'}
                        {key === 'weeklyReports' && 'Weekly financial summary reports'}
                        {key === 'taxReminders' && 'Reminders for tax deadlines and payments'}
                        {key === 'marketingEmails' && 'Product updates and promotional content'}
                        {key === 'securityAlerts' && 'Important security and account alerts'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`w-14 h-7 rounded-full transition-all duration-200 ${
                      value ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                      value ? 'translate-x-7' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Application Preferences</h3>
                <p className="text-gray-600">Customize your application experience</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={preferences.currency}
                  onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                <select
                  value={preferences.dateFormat}
                  onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Español</option>
                  <option value="French">Français</option>
                  <option value="German">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                <Download className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Data & Privacy</h3>
                <p className="text-gray-600">Manage your data and privacy settings</p>
              </div>
            </div>

            {/* Data Export */}
            <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Export Your Data</h4>
              <p className="text-green-700 text-sm mb-4">
                Download a copy of all your financial data, including transactions, preferences, and account information.
              </p>
              <button
                onClick={exportData}
                className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-green-700 transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>

            {/* Data Import */}
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Import Data</h4>
              <p className="text-blue-700 text-sm mb-4">
                Import financial data from other applications or restore from a previous export.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-blue-700 transition-all duration-200">
                <Upload className="h-4 w-4" />
                <span>Import Data</span>
              </button>
            </div>

            {/* Danger Zone */}
            <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Danger Zone</h4>
              <p className="text-red-700 text-sm mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-gray-600">
                This action cannot be undone. This will permanently delete your account and all associated data.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition-all duration-200 font-medium"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;