import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronDown, BarChart2, PieChart, TrendingUp, MapPin, Download, Filter } from 'lucide-react';

// Import Charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const timeRanges = [
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'quarter', label: 'Last 3 Months' },
  { value: 'year', label: 'Last 12 Months' },
];

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('month');
  
  // Sample data for charts
  
  // Complaints by status
  const statusData = {
    labels: ['Resolved', 'In Progress', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [65, 24, 10, 1],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // Green for Resolved
          'rgba(59, 130, 246, 0.8)',  // Blue for In Progress
          'rgba(251, 191, 36, 0.8)',  // Yellow for Pending
          'rgba(239, 68, 68, 0.8)',   // Red for Rejected
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Complaints by department
  const departmentData = {
    labels: ['Water', 'Electricity', 'Roads', 'Sanitation', 'Health', 'Others'],
    datasets: [
      {
        label: 'Complaints',
        data: [28, 22, 18, 15, 10, 7],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Complaints trend over time
  const trendLabels = timeRange === 'week' 
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : timeRange === 'month'
    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    : timeRange === 'quarter'
    ? ['Month 1', 'Month 2', 'Month 3']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const trendData = {
    labels: trendLabels,
    datasets: [
      {
        label: 'Received',
        data: Array.from({ length: trendLabels.length }, () => Math.floor(Math.random() * 50) + 20),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Resolved',
        data: Array.from({ length: trendLabels.length }, () => Math.floor(Math.random() * 40) + 10),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Resolution time by department
  const resolutionData = {
    labels: ['Water', 'Electricity', 'Roads', 'Sanitation', 'Health', 'Others'],
    datasets: [
      {
        label: 'Average Days to Resolve',
        data: [5, 3, 8, 4, 2, 6],
        backgroundColor: 'rgba(251, 191, 36, 0.6)',
        borderColor: 'rgba(251, 191, 36, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7eb' : '#374151',
        }
      },
      title: {
        display: false,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7eb' : '#374151',
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7eb' : '#374151',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7eb' : '#374151',
        },
        grid: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7eb' : '#374151',
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7eb' : '#374151',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#e5e7eb' : '#374151',
        },
        grid: {
          color: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('admin.analytics')}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Comprehensive data visualization and insights
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none form-input pr-10 pl-9"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          
          <button className="btn btn-secondary flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Complaints</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">1,254</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +12% from last period
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <BarChart2 size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Resolution Rate</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">85%</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +3% from last period
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <PieChart size={24} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Resolution Time</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">4.2 <span className="text-lg">days</span></h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                -0.5 days from last period
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Citizen Satisfaction</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">78%</h3>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +5% from last period
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Filter size={24} className="text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Complaints Trend</h3>
          <div className="h-80">
            <Line data={trendData} options={lineOptions} />
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Complaints by Department</h3>
          <div className="h-80">
            <Bar data={departmentData} options={barOptions} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Complaints by Status</h3>
          <div className="h-72 flex items-center justify-center">
            <div className="w-64">
              <Pie data={statusData} options={pieOptions} />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Average Resolution Time by Department</h3>
          <div className="h-72">
            <Bar data={resolutionData} options={barOptions} />
          </div>
        </div>
      </div>
      
      {/* Complaint Heatmap */}
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Complaint Heatmap</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center">
            View Full Screen 
          </button>
        </div>
        
        <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <p className="text-gray-600 dark:text-gray-400">Interactive heatmap would be displayed here</p>
          </div>
        </div>
      </div>
      
      {/* Insights Section */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Key Insights</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <TrendingUp size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Increasing Efficiency</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Resolution time has improved by 12% compared to the previous period, showing improved departmental efficiency.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <MapPin size={20} className="text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Geographical Trends</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                The highest concentration of complaints is observed in the North District, particularly related to water supply issues.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <BarChart2 size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Critical Areas</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Road maintenance complaints have seen a 23% increase, suggesting a need for increased attention in this department.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 flex-shrink-0">
              <PieChart size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Improvement Areas</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                The Electricity Department has shown the most improvement with a 15% increase in resolution rate and decreased average resolution time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;