import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  BarChart3,
  ArrowRight
} from 'lucide-react';

// Mock data for admin dashboard
const statCards = [
  { 
    title: 'Total Complaints', 
    value: '1,254', 
    change: '+12%', 
    icon: <FileText size={24} className="text-primary-500" />,
    color: 'bg-primary-100 dark:bg-primary-900/30'
  },
  { 
    title: 'Resolved', 
    value: '876', 
    change: '+8%', 
    icon: <CheckCircle size={24} className="text-green-500" />,
    color: 'bg-green-100 dark:bg-green-900/30'
  },
  { 
    title: 'Pending', 
    value: '237', 
    change: '-5%', 
    icon: <Clock size={24} className="text-yellow-500" />,
    color: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  { 
    title: 'Critical', 
    value: '42', 
    change: '+2%', 
    icon: <AlertCircle size={24} className="text-red-500" />,
    color: 'bg-red-100 dark:bg-red-900/30'
  }
];

const recentComplaints = [
  {
    id: 'CMP123456',
    subject: 'Water supply issues in Sector 7',
    department: 'Water Department',
    status: 'pending',
    date: '2023-04-10'
  },
  {
    id: 'CMP123457',
    subject: 'Streetlight not working on Main Road',
    department: 'Electricity Department',
    status: 'in_progress',
    date: '2023-04-09'
  },
  {
    id: 'CMP123458',
    subject: 'Garbage not collected for 3 days',
    department: 'Sanitation Department',
    status: 'resolved',
    date: '2023-04-08'
  },
  {
    id: 'CMP123459',
    subject: 'Pothole causing accidents near school',
    department: 'Roads Department',
    status: 'critical',
    date: '2023-04-07'
  },
  {
    id: 'CMP123460',
    subject: 'Public park maintenance required',
    department: 'Parks Department',
    status: 'in_progress',
    date: '2023-04-06'
  }
];

const DashboardOverview: React.FC = () => {
  const { t } = useTranslation();
  
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
            Resolved
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400">
            Pending
          </span>
        );
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400">
            Critical
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: April 10, 2023
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="card flex items-start p-6 hover:shadow-md transition-shadow"
          >
            <div className={`rounded-lg p-3 mr-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Complaints */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Complaints
            </h2>
            <Link 
              to="/admin/complaints" 
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600 dark:text-primary-400">
                      {complaint.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {complaint.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {complaint.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(complaint.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {complaint.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Quick Actions & Department Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/admin/complaints"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                  <FileText size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Complaints</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Assign, update, resolve</p>
                </div>
              </Link>
              
              <Link
                to="/admin/analytics"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                  <BarChart3 size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">View Analytics</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Reports and trends</p>
                </div>
              </Link>
              
              <Link
                to="/admin/users"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                  <Users size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Manage Users</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View and edit user accounts</p>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Department Stats */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Department Statistics
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Water Department</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">28%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Roads Department</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">22%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '22%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Electricity Department</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">18%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Sanitation Department</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">15%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">Other Departments</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">17%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '17%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;