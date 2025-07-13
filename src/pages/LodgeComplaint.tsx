import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Check, Upload, Mic } from 'lucide-react';

interface ComplaintFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  description: string;
  location: string;
  isAnonymous: boolean;
  files: File[];
}

interface Complaint extends ComplaintFormData {
  id: string;
  createdAt: string;
}

const departmentOptions = [
  { value: '', label: 'Select Department (Optional)' },
  { value: 'water', label: 'Water Department' },
  { value: 'electricity', label: 'Electricity Department' },
  { value: 'roads', label: 'Roads & Infrastructure' },
  { value: 'sanitation', label: 'Sanitation & Waste Management' },
  { value: 'health', label: 'Health Services' },
  { value: 'education', label: 'Education Department' },
  { value: 'police', label: 'Police Department' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'housing', label: 'Housing & Urban Development' },
  { value: 'other', label: 'Other' }
];

const LodgeComplaint: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  
  const initialFormData: ComplaintFormData = {
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: '',
    subject: '',
    description: '',
    location: '',
    isAnonymous: false,
    files: []
  };
  
  const [formData, setFormData] = useState<ComplaintFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ComplaintFormData | "form", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ComplaintFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle checkbox change for anonymous submission
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...fileList]
      }));
    }
  };
  
  // Remove a file from the list
  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };
  
  // Start voice recognition for description
  const startVoiceRecognition = () => {
    if (!recognitionSupported) return;
    
    // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US'; // Set language
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
      setIsRecording(true);
    };
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setFormData(prev => ({
        ...prev,
        description: transcript
      }));
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
    setTimeout(() => {
      recognition.stop();
    }, 10000); // Stop after 10 seconds
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Partial<Record<keyof ComplaintFormData, string>> = {};
    let isValid = true;
    
    // Skip name and email validation if anonymous
    if (!formData.isAnonymous) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }
    }
    
    // Phone validation (optional but validate format if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number should be 10 digits';
      isValid = false;
    }
    
    // Required fields
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Generate a random complaint ID (in a real app this would come from the backend)
  const generateComplaintId = () => {
    const prefix = 'CMP';
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    return `${prefix}${randomNum}`;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // In a real app, this would be an API call to submit the complaint
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random complaint ID
      const newComplaintId = generateComplaintId();
      setComplaintId(newComplaintId);
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form after successful submission
      setFormData(initialFormData);
      
      // Save complaint to local storage (for demonstration)
      handleComplaintSubmit({
        ...formData,
        id: newComplaintId,
        createdAt: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setErrors({
        ...errors,
        // @ts-ignore
        form: t('lodge.error')
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Save complaint to local storage (for demonstration)
  const handleComplaintSubmit = (complaint: Complaint) => {
    localStorage.setItem(`complaint_${complaint.id}`, JSON.stringify(complaint));
  };
  
  // Reset the form and success state
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSuccess(false);
    setComplaintId('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('lodge.title')}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {t('lodge.subtitle')}
        </p>
      </div>
      
      {isSuccess ? (
        <div className="card text-center py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="mt-4 text-2xl font-medium text-gray-900 dark:text-white">
            {t('lodge.success')}
          </h2>
          <p className="mt-2 text-xl font-bold text-primary-600 dark:text-primary-400">{complaintId}</p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Please save this ID for tracking the status of your complaint.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
            <button
              onClick={handleReset}
              className="btn btn-primary"
            >
              Submit Another Complaint
            </button>
            <a
              href={`/track-complaint?id=${complaintId}`}
              className="btn btn-secondary"
            >
              Track This Complaint
            </a>
          </div>
        </div>
      ) : (
        <div className="card">
          {errors.form && (
            <div className="mb-6 bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 p-4 rounded-md">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous submission toggle */}
            <div className="flex items-center justify-end">
              <label className="flex items-center cursor-pointer">
                <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('lodge.form.anonymous')}
                </span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors duration-200 ${formData.isAnonymous ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform duration-200 ${formData.isAnonymous ? 'transform translate-x-4' : ''}`}></div>
                </div>
              </label>
            </div>
            
            {/* Personal Information */}
            <div className={formData.isAnonymous ? 'opacity-50 pointer-events-none' : ''}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="form-label">
                    {t('lodge.form.name')} {!formData.isAnonymous && <span className="text-error-500">*</span>}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`form-input ${errors.name ? 'border-error-500' : ''}`}
                    required={!formData.isAnonymous}
                    disabled={formData.isAnonymous}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label">
                    {t('lodge.form.email')} {!formData.isAnonymous && <span className="text-error-500">*</span>}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className={`form-input ${errors.email ? 'border-error-500' : ''}`}
                    required={!formData.isAnonymous}
                    disabled={formData.isAnonymous}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="form-label">
                    {t('lodge.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className={`form-input ${errors.phone ? 'border-error-500' : ''}`}
                    disabled={formData.isAnonymous}
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
              </div>
            </div>
            
            {/* Complaint Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Complaint Details</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="department" className="form-label">
                    {t('lodge.form.department')}
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-input"
                  >
                    {departmentOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    If you're unsure which department to select, our AI will automatically classify your complaint.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="subject" className="form-label">
                    {t('lodge.form.subject')} <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief title of your complaint"
                    className={`form-input ${errors.subject ? 'border-error-500' : ''}`}
                    required
                  />
                  {errors.subject && <p className="form-error">{errors.subject}</p>}
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="description" className="form-label">
                      {t('lodge.form.description')} <span className="text-error-500">*</span>
                    </label>
                    {recognitionSupported && (
                      <button
                        type="button"
                        onClick={startVoiceRecognition}
                        disabled={isRecording}
                        className={`flex items-center text-sm px-2 py-1 rounded-md ${
                          isRecording
                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Mic size={16} className="mr-1" />
                        {isRecording ? 'Recording...' : 'Voice Input'}
                      </button>
                    )}
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide detailed information about your complaint"
                    className={`form-input ${errors.description ? 'border-error-500' : ''}`}
                    required
                  ></textarea>
                  {errors.description && <p className="form-error">{errors.description}</p>}
                </div>
                
                <div>
                  <label htmlFor="location" className="form-label">
                    {t('lodge.form.location')} <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Address or area where the issue is located"
                    className={`form-input ${errors.location ? 'border-error-500' : ''}`}
                    required
                  />
                  {errors.location && <p className="form-error">{errors.location}</p>}
                </div>
                
                <div>
                  <label className="form-label">
                    {t('lodge.form.attachments')}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            multiple
                            accept="image/*, application/pdf, video/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Images, PDFs, or videos up to 10MB each
                      </p>
                    </div>
                  </div>
                  
                  {/* File list */}
                  {formData.files.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {formData.files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              {file.type.startsWith('image/') ? (
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={file.name} 
                                  className="h-10 w-10 object-cover rounded"
                                />
                              ) : (
                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-gray-500 dark:text-gray-300">
                                  {file.name.split('.').pop()?.toUpperCase().substring(0, 3) || '?'}
                                </div>
                              )}
                            </div>
                            <div className="ml-3 truncate">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="ml-2 flex-shrink-0 text-gray-500 dark:text-gray-400 hover:text-error-600 dark:hover:text-error-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
              >
                {t('lodge.form.reset')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  t('lodge.form.submit')
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LodgeComplaint;