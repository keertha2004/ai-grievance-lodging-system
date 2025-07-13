import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4 py-16">
      <AlertTriangle size={64} className="text-warning-500 mb-6" />
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Link
          to="/"
          className="btn btn-primary"
        >
          Go to Homepage
        </Link>
        <Link
          to="/track-complaint"
          className="btn btn-secondary"
        >
          Track a Complaint
        </Link>
      </div>
    </div>
  );
};

export default NotFound;