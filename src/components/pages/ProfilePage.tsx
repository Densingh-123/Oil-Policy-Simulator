import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    role: user?.role || 'analyst'
  });

  const handleSave = () => {
    // In a real app, you would update the user profile via API
    setIsEditing(false);
    // Update user context with new data
  };

  const stats = [
    { label: 'Total Simulations', value: '24', icon: 'fas fa-play-circle', color: 'text-blue-500' },
    { label: 'Scenarios Tested', value: '18', icon: 'fas fa-cogs', color: 'text-green-500' },
    { label: 'Reports Generated', value: '12', icon: 'fas fa-file-pdf', color: 'text-purple-500' },
    { label: 'Days Active', value: '45', icon: 'fas fa-calendar', color: 'text-orange-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Profile</h1>
        <p className="text-gray-600">
          Manage your account settings and view your simulation activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                {isEditing ? (
                  <>
                    <i className="fas fa-times mr-2"></i>
                    Cancel
                  </>
                ) : (
                  <>
                    <i className="fas fa-edit mr-2"></i>
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
                  <p className="text-gray-600">{user?.organization}</p>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{user?.organization}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="analyst">Policy Analyst</option>
                      <option value="researcher">Researcher</option>
                      <option value="policymaker">Policy Maker</option>
                      <option value="student">Student</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 capitalize">{user?.role}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Activity Stats */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className={`text-2xl mb-2 ${stat.color}`}>
                    <i className={stat.icon}></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Type */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Type</h3>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <div>
                <p className="font-semibold text-gray-800">Professional</p>
                <p className="text-sm text-gray-600">Full access</p>
              </div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Active
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-200 flex items-center">
                <i className="fas fa-download text-blue-500 mr-3"></i>
                Export Data
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-200 flex items-center">
                <i className="fas fa-bell text-orange-500 mr-3"></i>
                Notification Settings
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-200 flex items-center">
                <i className="fas fa-shield-alt text-green-500 mr-3"></i>
                Privacy & Security
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-200 flex items-center text-red-600">
                <i className="fas fa-sign-out-alt mr-3"></i>
                Sign Out
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color} mt-1`}>
                    <i className={activity.icon}></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const recentActivity = [
  {
    icon: 'fas fa-play',
    color: 'bg-blue-100 text-blue-600',
    action: 'Ran simulation: 20% Tariff + Supply Disruption',
    time: '2 hours ago'
  },
  {
    icon: 'fas fa-file-pdf',
    color: 'bg-purple-100 text-purple-600',
    action: 'Exported report: Policy Impact Analysis',
    time: '1 day ago'
  },
  {
    icon: 'fas fa-chart-line',
    color: 'bg-green-100 text-green-600',
    action: 'Viewed market analytics',
    time: '2 days ago'
  },
  {
    icon: 'fas fa-cogs',
    color: 'bg-orange-100 text-orange-600',
    action: 'Updated profile information',
    time: '3 days ago'
  }
];

export default ProfilePage;