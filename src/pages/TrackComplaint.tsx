import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Define the complaint status types
type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

// Mock complaint data (in a real app, this would come from an API)
interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: ComplaintStatus;
  department: string;
  submittedDate: string;
  updatedDate: string;
  expectedResolution: string;
  updates: {
    date: string;
    status: string;
    message: string;
  }[];
}

const TrackComplaint: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idFromUrl = searchParams.get('id') || '';
  
  const [complaintId, setComplaintId] = useState(idFromUrl);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Function to get the status badge based on complaint status
  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            <Clock size={14} className="mr-1" />
            {t('track.status.pending')}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            <Loader2 size={14} className="mr-1 animate-spin" />
            {t('track.status.in_progress')}
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <CheckCircle size={14} className="mr-1" />
            {t('track.status.resolved')}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            <AlertCircle size={14} className="mr-1" />
            {t('track.status.rejected')}
          </span>
        );
    }
  };
  
  // Mock API call to fetch complaint data
  const fetchComplaint = async (id: string) => {
    setIsLoading(true);
    setError('');
    try {
      // Try to fetch from localStorage first
      const stored = localStorage.getItem(`complaint_${id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Adapt to your TrackComplaint interface if needed
        setComplaint({
          id: parsed.id,
          subject: parsed.subject,
          description: parsed.description,
          status: parsed.status || 'pending',
          department: parsed.department,
          submittedDate: parsed.createdAt ? parsed.createdAt.split('T')[0] : '',
          updatedDate: parsed.updatedDate || (parsed.createdAt ? parsed.createdAt.split('T')[0] : ''),

          expectedResolution: parsed.expectedResolution || '',
          updates: parsed.updates || [
            {
              date: parsed.createdAt ? parsed.createdAt.split('T')[0] : '',
              status: parsed.status || 'pending',
              message: 'Complaint submitted.'
            }
          ]
        });
        setIsLoading(false);
        return;
      }
      // If not found, show error
      setError(t('track.no_results'));
      setComplaint(null);
    } catch (err) {
      setError('Error fetching complaint details. Please try again.');
      setComplaint(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (complaintId.trim()) {
      fetchComplaint(complaintId);
    }
  };
  
  // Auto-fetch on load if ID is in URL
  React.useEffect(() => {
    if (idFromUrl) {
      fetchComplaint(idFromUrl);
    }
  }, [idFromUrl]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('track.title')}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {t('track.subtitle')}
        </p>
      </div>
      
      {/* Search form */}
      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="complaint-id" className="sr-only">
              Complaint ID
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="complaint-id"
                className="form-input pl-10"
                placeholder={t('track.input_placeholder')}
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary md:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 size={18} className="animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              t('track.button')
            )}
          </button>
        </form>
      </div>
      
      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <Loader2 size={48} className="animate-spin text-primary-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Fetching complaint details...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{error}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please check the complaint ID and try again.
          </p>
        </div>
      ) : complaint ? (
        <div className="space-y-8">
          {/* Complaint Summary */}
          <div className="card">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{complaint.subject}</h2>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">{t('track.details.id')}: {complaint.id}</span>
                  {getStatusBadge(complaint.status)}
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => window.print()}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                >
                  Print / Download
                </button>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {complaint.description}
              </p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('track.details.department')}
                </h3>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {complaint.department}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('track.details.submitted')}
                </h3>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {complaint.submittedDate}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('track.details.updated')}
                </h3>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {complaint.updatedDate}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('track.details.expected')}
                </h3>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {complaint.status === 'resolved' ? 'Resolved' : complaint.expectedResolution}
                </p>
              </div>
            </div>
          </div>
          
          {/* Status Timeline */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complaint Progress</h3>
            
            <div className="flow-root">
              <ul className="-mb-8">
                {complaint.updates.map((update, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== complaint.updates.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                            update.status === 'resolved' 
                              ? 'bg-green-500' 
                              : update.status === 'in_progress' 
                                ? 'bg-blue-500'
                                : 'bg-gray-400'
                          }`}>
                            {update.status === 'resolved' ? (
                              <CheckCircle size={16} className="text-white" />
                            ) : update.status === 'in_progress' ? (
                              <Loader2 size={16} className="text-white" />
                            ) : (
                              <Clock size={16} className="text-white" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200">{update.message}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                            {update.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Feedback section for resolved complaints */}
            {complaint.status === 'resolved' && (
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                  How satisfied are you with the resolution?
                </h4>
                <div className="flex space-x-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 dark:bg-gray-700 dark:hover:bg-primary-900/50 dark:text-gray-300 dark:hover:text-primary-400 transition-colors duration-150"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <textarea
                    rows={3}
                    placeholder="Share your feedback on the resolution (optional)"
                    className="form-input"
                  ></textarea>
                </div>
                <div className="mt-3 text-right">
                  <button className="btn btn-primary">
                    Submit Feedback
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card text-center py-12 bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Enter your complaint ID to track its status
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            You can find your complaint ID in the confirmation email or message you received after submitting your complaint.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;