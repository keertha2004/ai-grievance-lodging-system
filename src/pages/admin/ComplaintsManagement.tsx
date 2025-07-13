import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// Sample complaint data
const initialComplaints: Complaint[] = [
  {
    id: 'CMP123456',
    subject: 'Water supply issues in Sector 7',
    description: 'The water supply has been irregular for the past week in Sector 7. Often there is no water during the morning hours.',
    department: 'Water Department',
    status: 'pending',
    priority: 'medium',
    date: '2023-04-10',
    citizen: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    location: 'Sector 7, Block A'
  },
  {
    id: 'CMP123457',
    subject: 'Streetlight not working on Main Road',
    description: 'The streetlight at the corner of Main Road and Park Street has not been working for the past 3 days. This is causing safety concerns for pedestrians at night.',
    department: 'Electricity Department',
    status: 'in_progress',
    priority: 'medium',
    date: '2023-04-09',
    citizen: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '9876543211',
    location: 'Main Road, Park Street Junction'
  },
  {
    id: 'CMP123458',
    subject: 'Garbage not collected for 3 days',
    description: 'The garbage from our neighborhood has not been collected for the past 3 days. This is causing a foul smell and hygiene issues in the area.',
    department: 'Sanitation Department',
    status: 'resolved',
    priority: 'high',
    date: '2023-04-08',
    citizen: 'Robert Johnson',
    email: 'robert.j@example.com',
    phone: '9876543212',
    location: 'Green Park Colony'
  },
  {
    id: 'CMP123459',
    subject: 'Pothole causing accidents near school',
    description: 'There is a large pothole near the entrance of City Public School that has already caused several minor accidents. This is a major safety concern for children and parents.',
    department: 'Roads Department',
    status: 'in_progress',
    priority: 'critical',
    date: '2023-04-07',
    citizen: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '9876543213',
    location: 'City Public School Entrance'
  },
  {
    id: 'CMP123460',
    subject: 'Public park maintenance required',
    description: 'The Central Park needs maintenance. The grass is overgrown, benches are damaged, and the playground equipment needs repairs.',
    department: 'Parks Department',
    status: 'pending',
    priority: 'low',
    date: '2023-04-06',
    citizen: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '9876543214',
    location: 'Central Park, West Entrance'
  },
  {
    id: 'CMP123461',
    subject: 'Traffic signal malfunction',
    description: 'The traffic signal at the intersection of Market Street and Commercial Avenue is not working properly. It stays green for too long in one direction causing major traffic jams.',
    department: 'Traffic Department',
    status: 'in_progress',
    priority: 'high',
    date: '2023-04-05',
    citizen: 'David Wilson',
    email: 'david.w@example.com',
    phone: '9876543215',
    location: 'Market St. & Commercial Ave. Intersection'
  },
  {
    id: 'CMP123462',
    subject: 'Stray dog menace in residential area',
    description: 'There are several aggressive stray dogs in our residential area that are harassing pedestrians and creating issues for children playing outside.',
    department: 'Animal Control',
    status: 'pending',
    priority: 'medium',
    date: '2023-04-04',
    citizen: 'Lisa Taylor',
    email: 'lisa.t@example.com',
    phone: '9876543216',
    location: 'Sunshine Residential Colony'
  },
  {
    id: 'CMP123463',
    subject: 'Broken water pipeline causing water logging',
    description: 'A broken water pipeline near the community center is causing severe water logging. Water is being wasted and the area is becoming difficult to navigate.',
    department: 'Water Department',
    status: 'in_progress',
    priority: 'critical',
    date: '2023-04-03',
    citizen: 'Kevin Anderson',
    email: 'kevin.a@example.com',
    phone: '9876543217',
    location: 'Community Center, Riverside Colony'
  },
  {
    id: 'CMP123464',
    subject: 'Electrical power fluctuations',
    description: 'Our neighborhood has been experiencing frequent power fluctuations for the past week. This is damaging electronic appliances and causing inconvenience.',
    department: 'Electricity Department',
    status: 'pending',
    priority: 'high',
    date: '2023-04-02',
    citizen: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '9876543218',
    location: 'Meadow Lane, North District'
  },
  {
    id: 'CMP123465',
    subject: 'Illegal construction blocking sidewalk',
    description: 'An illegal construction is taking place on the sidewalk of Oak Street, completely blocking pedestrian movement and forcing people to walk on the road.',
    department: 'Building Control',
    status: 'in_progress',
    priority: 'medium',
    date: '2023-04-01',
    citizen: 'Thomas Miller',
    email: 'thomas.m@example.com',
    phone: '9876543219',
    location: 'Oak Street, Shop No. 45'
  }
];

// Type definitions
interface Complaint {
  id: string;
  subject: string;
  description: string;
  department: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  citizen: string;
  email: string;
  phone: string;
  location: string;
}

interface FilterState {
  search: string;
  status: string;
  department: string;
  priority: string;
  sortBy: 'date' | 'priority' | 'status';
  sortOrder: 'asc' | 'desc';
}

const ComplaintsManagement: React.FC = () => {
  const { t } = useTranslation();
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    department: '',
    priority: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Set sort by field
  const setSortBy = (field: 'date' | 'priority' | 'status') => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field ? (prev.sortOrder === 'asc' ? 'desc' : 'asc') : 'desc'
    }));
  };
  
  // Apply filters and sorting to complaints
  const filteredComplaints = complaints
    .filter(complaint => {
      // Apply search filter
      if (filters.search && !complaint.subject.toLowerCase().includes(filters.search.toLowerCase()) && 
          !complaint.id.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (filters.status && complaint.status !== filters.status) {
        return false;
      }
      
      // Apply department filter
      if (filters.department && complaint.department !== filters.department) {
        return false;
      }
      
      // Apply priority filter
      if (filters.priority && complaint.priority !== filters.priority) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      
      if (filters.sortBy === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
        return filters.sortOrder === 'asc' 
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      
      if (filters.sortBy === 'status') {
        const statusOrder = { pending: 1, in_progress: 2, resolved: 3, rejected: 4 };
        return filters.sortOrder === 'asc' 
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }
      
      return 0;
    });
  
  // Get unique departments for filter dropdown
  const departments = [...new Set(complaints.map(c => c.department))];
  
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
            <CheckCircle size={12} className="mr-1" />
            Resolved
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
            <Clock size={12} className="mr-1" />
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400">
            <Clock size={12} className="mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400">
            <AlertCircle size={12} className="mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };
  
  // Function to get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400">
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-400">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
            Low
          </span>
        );
      default:
        return null;
    }
  };
  
  // Update complaint status
  const updateComplaintStatus = (id: string, newStatus: 'pending' | 'in_progress' | 'resolved' | 'rejected') => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    ));
    
    if (selectedComplaint?.id === id) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('admin.complaints')}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className="btn btn-secondary flex items-center"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          <button
            className="btn btn-secondary flex items-center"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Search and filter controls */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className="form-input pl-10"
                placeholder="Search complaints by ID or subject..."
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
        
        {/* Expanded filter panel */}
        {isFilterPanelOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="department" className="form-label">Department</label>
                <select
                  id="department"
                  name="department"
                  value={filters.department}
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sortBy" className="form-label">Sort By</label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'status')}
                  className="form-input"
                >
                  <option value="date">Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sortOrder" className="form-label">Sort Order</label>
                <button
                  onClick={toggleSortOrder}
                  className="form-input w-full flex items-center justify-between"
                >
                  <span>{filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                  {filters.sortOrder === 'asc' ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setFilters({
                    search: '',
                    status: '',
                    department: '',
                    priority: '',
                    sortBy: 'date',
                    sortOrder: 'desc'
                  });
                }}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mr-4"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                className="btn btn-primary btn-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Complaints list and detail view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints list */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ID & Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => setSortBy('status')}>
                      Status
                      {filters.sortBy === 'status' && (
                        filters.sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => setSortBy('priority')}>
                      Priority
                      {filters.sortBy === 'priority' && (
                        filters.sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => setSortBy('date')}>
                      Date
                      {filters.sortBy === 'date' && (
                        filters.sortOrder === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <tr 
                      key={complaint.id} 
                      className={`hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer ${
                        selectedComplaint?.id === complaint.id ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                      }`}
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            {complaint.id}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white truncate max-w-xs">
                            {complaint.subject}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {complaint.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(complaint.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getPriorityBadge(complaint.priority)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {complaint.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            title="Edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Open edit modal (not implemented)
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            title="View Details"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedComplaint(complaint);
                            }}
                          >
                            <ExternalLink size={16} />
                          </button>
                          <div className="relative">
                            <button 
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              title="More Options"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Open dropdown (not implemented)
                              }}
                            >
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      <FileText size={32} className="mx-auto mb-2 text-gray-400" />
                      <p>No complaints matching your filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination (simplified) */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{filteredComplaints.length}</span> of <span className="font-medium">{complaints.length}</span> complaints
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
        
        {/* Complaint detail view */}
        <div className="lg:col-span-1">
          {selectedComplaint ? (
            <div className="card sticky top-4 overflow-auto max-h-[calc(100vh-8rem)]">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Complaint Details
                </h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setSelectedComplaint(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">ID</div>
                  <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {selectedComplaint.id}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Subject</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedComplaint.subject}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Description</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedComplaint.description}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                    <div className="text-sm">{getStatusBadge(selectedComplaint.status)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Priority</div>
                    <div className="text-sm">{getPriorityBadge(selectedComplaint.priority)}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Department</div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {selectedComplaint.department}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Date</div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {selectedComplaint.date}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Citizen</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {selectedComplaint.citizen}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {selectedComplaint.email}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {selectedComplaint.phone}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {selectedComplaint.location}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Update Status
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateComplaintStatus(selectedComplaint.id, 'pending')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        selectedComplaint.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400 border-2 border-yellow-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateComplaintStatus(selectedComplaint.id, 'in_progress')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        selectedComplaint.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400 border-2 border-blue-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateComplaintStatus(selectedComplaint.id, 'resolved')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        selectedComplaint.status === 'resolved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border-2 border-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20'
                      }`}
                    >
                      Resolved
                    </button>
                    <button
                      onClick={() => updateComplaintStatus(selectedComplaint.id, 'rejected')}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        selectedComplaint.status === 'rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 border-2 border-red-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                      }`}
                    >
                      Rejected
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-secondary flex-1 flex items-center justify-center">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </button>
                  <button className="btn btn-primary flex-1 flex items-center justify-center">
                    <Download size={16} className="mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12 flex flex-col items-center justify-center h-full">
              <FileText size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Complaint Selected
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Select a complaint from the list to view its details and take action
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsManagement;