import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);
  const closeMobileMenu = () => setIsMenuOpen(false);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-4 lg:px-8 py-3 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        {/* Logo and Title */}
        <Link 
          to="/" 
          className="flex items-center text-primary-600 dark:text-primary-400 font-bold text-xl"
          onClick={closeMobileMenu}
        >
          <span className="mr-2">🏛️</span>
          {t('app.name')}
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors duration-200 
              ${isActive('/') 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/lodge-complaint" 
            className={`text-sm font-medium transition-colors duration-200 
              ${isActive('/lodge-complaint') 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
          >
            {t('nav.lodge')}
          </Link>
          <Link 
            to="/track-complaint" 
            className={`text-sm font-medium transition-colors duration-200 
              ${isActive('/track-complaint') 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
              }`}
          >
            {t('nav.track')}
          </Link>
          
          {isAuthenticated && isAdmin && (
            <Link 
              to="/admin" 
              className={`text-sm font-medium transition-colors duration-200 
                ${location.pathname.startsWith('/admin') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
            >
              {t('nav.dashboard')}
            </Link>
          )}
        </div>

        {/* Desktop Right Side - Auth & Preferences */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleLangMenu}
              className="flex items-center space-x-1 p-2 rounded-md text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === lang.code
                        ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
            >
              {t('nav.logout')}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-sm font-medium"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="w-full md:hidden mt-4">
            <div className="flex flex-col space-y-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium 
                  ${isActive('/') 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                onClick={closeMobileMenu}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/lodge-complaint" 
                className={`px-3 py-2 rounded-md text-sm font-medium 
                  ${isActive('/lodge-complaint') 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                onClick={closeMobileMenu}
              >
                {t('nav.lodge')}
              </Link>
              <Link 
                to="/track-complaint" 
                className={`px-3 py-2 rounded-md text-sm font-medium 
                  ${isActive('/track-complaint') 
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                onClick={closeMobileMenu}
              >
                {t('nav.track')}
              </Link>
              {isAuthenticated && isAdmin && (
                <Link 
                  to="/admin" 
                  className={`px-3 py-2 rounded-md text-sm font-medium 
                    ${location.pathname.startsWith('/admin') 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  onClick={closeMobileMenu}
                >
                  {t('nav.dashboard')}
                </Link>
              )}
            </div>
            
            <div className="pt-4 pb-2">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {t('app.name')}
                </div>
                
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-2 py-1 text-xs rounded-md ${
                        language === lang.code
                          ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {t('nav.logout')}
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md text-sm font-medium text-center transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md text-sm font-medium text-center transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;