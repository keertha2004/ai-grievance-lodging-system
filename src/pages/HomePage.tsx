import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FileText, Search, User, BarChart3, ArrowRight, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  // Animated stats for demonstration
  const stats = [
    { label: t('home.stats_complaints'), value: '12,450+', icon: <FileText size={24} className="text-primary-500" /> },
    { label: t('home.stats_departments'), value: '25+', icon: <BarChart3 size={24} className="text-primary-500" /> },
    { label: t('home.stats_satisfaction'), value: '94%', icon: <User size={24} className="text-primary-500" /> }
  ];

  // How it works steps
  const steps = [
    { id: 1, text: t('home.step1'), icon: <User className="w-8 h-8 text-primary-500" /> },
    { id: 2, text: t('home.step2'), icon: <FileText className="w-8 h-8 text-primary-500" /> },
    { id: 3, text: t('home.step3'), icon: <Clock className="w-8 h-8 text-primary-500" /> },
    { id: 4, text: t('home.step4'), icon: <BarChart3 className="w-8 h-8 text-primary-500" /> }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.welcome')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/lodge-complaint"
                className="btn px-8 py-3 bg-white text-primary-800 hover:bg-gray-100 font-semibold rounded-lg shadow-md transition-all duration-200 text-lg flex items-center justify-center"
              >
                <FileText size={20} className="mr-2" />
                {t('home.lodge_button')}
              </Link>
              <Link
                to="/track-complaint"
                className="btn px-8 py-3 bg-primary-700 border border-white/20 text-white hover:bg-primary-600 font-semibold rounded-lg shadow-md transition-all duration-200 text-lg flex items-center justify-center"
              >
                <Search size={20} className="mr-2" />
                {t('home.track_button')}
              </Link>
             
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-gray-50 dark:fill-gray-900">
            <path d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,80C1120,75,1280,85,1360,90.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="card flex flex-col items-center text-center p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.how_it_works')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className="card flex flex-col items-center text-center relative animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 z-10">
                    {step.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    Step {step.id}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{step.text}</p>
                  
                  {/* Arrow connector (for mobile) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden w-8 h-8 my-2 text-gray-400">
                      <ArrowRight size={24} className="mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 md:py-24 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-white/90">
            Join thousands of citizens who have successfully resolved their grievances through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="btn px-8 py-3 bg-white text-primary-800 hover:bg-gray-100 font-semibold rounded-lg shadow-md transition-all duration-200 text-lg"
            >
              Create an Account
            </Link>
            <Link
              to="/lodge-complaint"
              className="btn px-8 py-3 bg-primary-700 border border-white/20 text-white hover:bg-primary-600 font-semibold rounded-lg shadow-md transition-all duration-200 text-lg"
            >
              File a Complaint Now
            </Link>
            <Link to="/admin"
             className="btn px-8 py-3 bg-primary-700 border border-white/20 text-white hover:bg-primary-600 font-semibold rounded-lg shadow-md transition-all duration-200 text-lg"
            >
            Go to Admin Dashboard
           </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;