import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, BarChart3, Users, Settings, FolderOpen, ChevronRight } from 'lucide-react';
import ComplaintsManagement from './ComplaintsManagement';
import DashboardOverview from './DashboardOverview';
import Analytics from './Analytics';

const AdminDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { path: '/admin/complaints', icon: <FileText size={20} />, label: 'Complaints' },
    { path: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/admin/departments', icon: <FolderOpen size={20} />, label: 'Departments' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {t('admin.dashboard')}
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            ${isMobileMenuOpen ? 'fixed inset-0 z-40 bg-gray-900 bg-opacity-50' : 'hidden'} 
            lg:block lg:relative lg:w-64 lg:flex-shrink-0
          `}
        >
          <div
            className={`
              ${isMobileMenuOpen ? 'w-64 fixed top-0 bottom-0 left-0 z-50 transform translate-x-0' : 'transform -translate-x-full'} 
              lg:relative lg:translate-x-0 lg:inset-auto
              bg-white dark:bg-gray-800 h-full flex flex-col overflow-y-auto shadow-lg transition-transform duration-300
            `}
          >
            {/* Dashboard header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                {t('admin.dashboard')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Admin Controls
              </p>
            </div>
            
            {/* Nav items */}
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                        isActive(item.path)
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                      {isActive(item.path) && (
                        <ChevronRight size={16} className="ml-auto" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Admin info */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@example.com
                  </p>
                  {onLogout && (
                    <button
                      className="mt-2 text-xs text-red-500 underline"
                      onClick={() => {
                        localStorage.removeItem('isAdmin');
                        onLogout();
                      }}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Click outside to close on mobile */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
          )}
        </aside>
         {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/complaints" element={<ComplaintsManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={
                <div className="text-center py-16">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    Coming Soon
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    This section is under development.
                  </p>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;