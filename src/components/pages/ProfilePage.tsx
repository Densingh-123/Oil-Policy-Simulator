// ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    role: user?.role || 'analyst',
  });

  /* little entrance animation */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSave = () => {
    setIsEditing(false);
    /* TODO: call your API here */
  };

  const stats = [
    { label: 'Total Simulations', value: '24', icon: 'fas fa-play-circle', color: 'text-cyan-400' },
    { label: 'Scenarios Tested', value: '18', icon: 'fas fa-cogs', color: 'text-emerald-400' },
    { label: 'Reports Generated', value: '12', icon: 'fas fa-file-pdf', color: 'text-violet-400' },
    { label: 'Days Active', value: '45', icon: 'fas fa-calendar', color: 'text-amber-400' },
  ];

  const recentActivity = [
    { icon: 'fas fa-play', color: 'bg-cyan-100 text-cyan-600', action: 'Ran simulation: 20% Tariff + Supply Disruption', time: '2 hours ago' },
    { icon: 'fas fa-file-pdf', color: 'bg-violet-100 text-violet-600', action: 'Exported report: Policy Impact Analysis', time: '1 day ago' },
    { icon: 'fas fa-chart-line', color: 'bg-emerald-100 text-emerald-600', action: 'Viewed market analytics', time: '2 days ago' },
    { icon: 'fas fa-cogs', color: 'bg-amber-100 text-amber-600', action: 'Updated profile information', time: '3 days ago' },
  ];

  return (
    <>
      <style>{`
        :root {
          --surface: #ffffff;
          --surface-secondary: #f7f9fc;
          --border: #e5e7eb;
          --primary: 199 100% 50%; /* hsl cyan */
          --text-primary: #111827;
          --text-secondary: #6b7280;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --surface: #111827;
            --surface-secondary: #1f2937;
            --border: #374151;
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
          }
        }
        .glass {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        @media (prefers-color-scheme: dark) {
          .glass {
            background: rgba(17, 24, 39, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
        .stagger {
          animation: fadeIn 0.5s ease-out both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br rounded-2xl from-cyan-50 via-purple-50 to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 ">
          {/* Header */}
          <header className="mb-10 stagger" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">
              Your Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage settings & track your simulation journey</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <section className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <div
                className="glass rounded-3xl shadow-xl p-6 stagger"
                style={{ animationDelay: '200ms' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[var(--text-primary)]">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition"
                  >
                    <i className={isEditing ? 'fas fa-times' : 'fas fa-edit'} />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="flex items-center gap-5 mb-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-400 border-2 border-[var(--surface)] grid place-items-center">
                      <i className="fas fa-check text-white text-xs" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{user?.name}</h3>
                    <p className="text-[var(--text-secondary)]">{user?.organization}</p>
                    <p className="text-sm text-[var(--text-secondary)] capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['name', 'email', 'organization', 'role'] as const).map((field, idx) => (
                    <div key={field} style={{ animationDelay: `${idx * 100}ms` }} className="stagger">
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 capitalize">{field}</label>
                      {isEditing ? (
                        field === 'role' ? (
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] focus:ring-2 focus:ring-cyan-400 outline-none"
                          >
                            <option value="analyst">Policy Analyst</option>
                            <option value="researcher">Researcher</option>
                            <option value="policymaker">Policy Maker</option>
                            <option value="student">Student</option>
                          </select>
                        ) : (
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            value={formData[field]}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] focus:ring-2 focus:ring-cyan-400 outline-none"
                          />
                        )
                      ) : (
                        <p className="text-[var(--text-primary)] font-medium">{user?.[field]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-secondary)] transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div
                className="glass rounded-3xl shadow-xl p-6 stagger"
                style={{ animationDelay: '300ms' }}
              >
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Your Activity</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className="relative group p-4 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border)] hover:-translate-y-1 hover:shadow-lg transition"
                    >
                      <div className={`text-3xl mb-2 ${s.color}`}><i className={s.icon} /></div>
                      <div className="text-2xl font-bold text-[var(--text-primary)]">{s.value}</div>
                      <div className="text-sm text-[var(--text-secondary)]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Right sidebar / drawer */}
            <aside
              className="lg:sticky top-10 space-y-6 stagger"
              style={{ animationDelay: '400ms' }}
            >
              {/* Account */}
              <div className="glass rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Account Type</h3>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyan-100 to-purple-100 dark:from-cyan-900/30 dark:to-purple-900/30 border border-cyan-200 dark:border-cyan-700">
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Professional</p>
                    <p className="text-sm text-[var(--text-secondary)]">Full access</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-400 text-white text-xs font-bold">Active</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    ['Export Data', 'fas fa-download', 'text-cyan-500'],
                    ['Notification Settings', 'fas fa-bell', 'text-amber-500'],
                    ['Privacy & Security', 'fas fa-shield-alt', 'text-emerald-500'],
                    ['Sign Out', 'fas fa-sign-out-alt', 'text-red-500'],
                  ].map(([label, icon, color]) => (
                    <button
                      key={label}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] hover:bg-[var(--surface-secondary)] transition"
                    >
                      <i className={`${icon} ${color}`} />
                      <span className="text-[var(--text-primary)]">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass rounded-3xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((act, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${act.color}`}>
                        <i className={act.icon} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{act.action}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;