import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, TrendingUp, Shield, Zap, FileText, CreditCard, PieChart, Users, CheckCircle, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

interface FeaturesPageProps {
  onGetStarted: () => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Financial Insights',
      description: 'Get personalized recommendations and predictions based on your financial patterns.',
      features: [
        'Smart expense categorization',
        'Predictive cash flow analysis',
        'Automated tax optimization suggestions',
        'Personalized financial health scoring'
      ],
      color: 'from-gray-700 to-gray-900'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics & Reporting',
      description: 'Comprehensive dashboards and reports to track your business performance.',
      features: [
        'Real-time profit & loss tracking',
        'Interactive charts and graphs',
        'Custom report generation',
        'Performance benchmarking'
      ],
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: Shield,
      title: 'Tax Management & Compliance',
      description: 'Automated tax calculations and compliance tools for freelancers.',
      features: [
        'Quarterly tax estimations',
        'Deduction tracking and optimization',
        'Tax deadline reminders',
        'Export-ready tax documents'
      ],
      color: 'from-gray-500 to-gray-700'
    },
    {
      icon: FileText,
      title: 'Invoice & Payment Tracking',
      description: 'Streamlined invoicing and payment management for your clients.',
      features: [
        'Professional invoice templates',
        'Payment status tracking',
        'Automated payment reminders',
        'Client payment history'
      ],
      color: 'from-gray-700 to-gray-900'
    },
    {
      icon: CreditCard,
      title: 'Expense Management',
      description: 'Smart expense tracking with automatic categorization and receipt scanning.',
      features: [
        'Receipt photo capture',
        'Automatic expense categorization',
        'Mileage tracking',
        'Vendor management'
      ],
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: PieChart,
      title: 'Financial Planning Tools',
      description: 'Plan for the future with budgeting and goal-setting features.',
      features: [
        'Budget creation and monitoring',
        'Financial goal tracking',
        'Savings recommendations',
        'Investment planning insights'
      ],
      color: 'from-gray-500 to-gray-700'
    }
  ];

  const additionalFeatures = [
    'Multi-currency support',
    'Bank account integration',
    'Mobile app synchronization',
    'Data export capabilities',
    'Secure cloud backup',
    'Team collaboration tools',
    'API access for developers',
    '24/7 customer support'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">FreelanceFin</h1>
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavigation('/features')}
                className="text-gray-900 font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavigation('/pricing')}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('/case-studies')}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Case Studies
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                About
              </button>
            </div>

            <button 
              onClick={onGetStarted}
              className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Modern Freelancers
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to manage your freelance business finances, 
              from AI-powered insights to automated tax management.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              And so much more
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Additional features to make your freelance financial management seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 border border-gray-200/50">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Seamless Integrations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with your favorite tools and services for a unified workflow.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {['Bank of America', 'Chase', 'PayPal', 'Stripe', 'QuickBooks', 'Xero'].map((integration, index) => (
                <div 
                  key={index} 
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 flex items-center justify-center hover:shadow-lg transition-all duration-300"
                >
                  <span className="font-semibold text-gray-700 text-sm">{integration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to experience
            <br />
            these powerful features?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your free trial today and see how FreelanceFin can transform your business.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">FreelanceFin</h3>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                AI-powered financial management for freelancers and independent professionals. 
                Transform your business with intelligent insights and automated bookkeeping.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <Twitter className="h-5 w-5 text-gray-600" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <Github className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('/features')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Features</button></li>
                <li><button onClick={() => handleNavigation('/pricing')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Pricing</button></li>
                <li><button onClick={() => handleNavigation('/case-studies')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Case Studies</button></li>
                <li><button onClick={onGetStarted} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Get Started</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation('/about')} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">About Us</button></li>
                <li><button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Careers</button></li>
                <li><button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact</button></li>
                <li><button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">Support</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 FreelanceFin. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">Privacy Policy</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">Terms of Service</button>
              <button className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;