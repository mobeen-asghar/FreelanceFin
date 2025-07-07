import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, Clock, Users, ArrowRight, Star, CheckCircle, Github, Twitter, Linkedin } from 'lucide-react';

interface CaseStudiesPageProps {
  onGetStarted: () => void;
}

const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const caseStudies = [
    {
      name: 'Sarah Chen',
      role: 'Freelance UX Designer',
      company: 'Design Studio Pro',
      avatar: 'SC',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      challenge: 'Sarah was struggling to track her project-based income and expenses across multiple clients. Tax season was a nightmare with scattered receipts and incomplete records.',
      solution: 'FreelanceFin\'s AI-powered categorization and project tracking helped Sarah organize her finances by client and project, while automated tax calculations simplified her quarterly filings.',
      results: [
        { metric: 'Time Saved', value: '15 hours/month', icon: Clock },
        { metric: 'Tax Savings', value: '$3,200/year', icon: DollarSign },
        { metric: 'Revenue Growth', value: '40%', icon: TrendingUp },
        { metric: 'Client Satisfaction', value: '98%', icon: Star }
      ],
      quote: "FreelanceFin transformed how I manage my design business. I went from dreading tax season to having everything organized automatically. The AI insights helped me identify my most profitable clients and optimize my pricing strategy.",
      color: 'from-gray-600 to-gray-800'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Independent Software Developer',
      company: 'CodeCraft Solutions',
      avatar: 'MR',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      challenge: 'Marcus had multiple income streams from different platforms and struggled to track expenses for his home office setup. He was missing out on significant tax deductions.',
      solution: 'With FreelanceFin\'s multi-platform integration and expense optimization features, Marcus could track all income sources and maximize his deductions with smart categorization.',
      results: [
        { metric: 'Deductions Found', value: '$8,500', icon: DollarSign },
        { metric: 'Platforms Tracked', value: '12', icon: Users },
        { metric: 'Profit Increase', value: '25%', icon: TrendingUp },
        { metric: 'Setup Time', value: '2 hours', icon: Clock }
      ],
      quote: "As a developer, I appreciate clean, efficient tools. FreelanceFin's API integrations and automated tracking saved me countless hours. The tax optimization alone paid for the subscription 10x over.",
      color: 'from-gray-700 to-gray-900'
    },
    {
      name: 'Emily Watson',
      role: 'Content Creator & Influencer',
      company: 'Creative Content Co.',
      avatar: 'EW',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      challenge: 'Emily had irregular income from sponsorships, affiliate marketing, and content creation. She needed better cash flow management and couldn\'t predict her quarterly taxes.',
      solution: 'FreelanceFin\'s predictive analytics and cash flow forecasting helped Emily plan for irregular income, while automated tax estimates ensured she was always prepared.',
      results: [
        { metric: 'Cash Flow Accuracy', value: '95%', icon: TrendingUp },
        { metric: 'Tax Surprises', value: '0', icon: CheckCircle },
        { metric: 'Income Streams', value: '8', icon: Users },
        { metric: 'Planning Time', value: '30 min/week', icon: Clock }
      ],
      quote: "The unpredictable nature of content creation income used to stress me out. FreelanceFin's forecasting gives me confidence in my financial planning, and I never have tax surprises anymore.",
      color: 'from-gray-500 to-gray-700'
    }
  ];

  const successMetrics = [
    { value: '10,000+', label: 'Freelancers Served' },
    { value: '$50M+', label: 'Revenue Tracked' },
    { value: '35%', label: 'Average Profit Increase' },
    { value: '4.9/5', label: 'Customer Rating' }
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
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
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
                className="text-gray-900 font-medium"
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
              Real Stories,
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Real Results
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how freelancers like you have transformed their financial management 
              and grown their businesses with FreelanceFin.
            </p>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50">
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${study.color} rounded-full flex items-center justify-center text-white font-bold text-xl mr-4`}>
                        {study.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{study.name}</h3>
                        <p className="text-gray-600">{study.role}</p>
                        <p className="text-sm text-gray-500">{study.company}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                        <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                        <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {study.results.map((result, resultIndex) => {
                          const Icon = result.icon;
                          return (
                            <div key={resultIndex} className="text-center p-4 bg-gray-50 rounded-2xl">
                              <Icon className="h-6 w-6 text-gray-700 mx-auto mb-2" />
                              <div className="font-bold text-gray-900">{result.value}</div>
                              <div className="text-sm text-gray-600">{result.metric}</div>
                            </div>
                          );
                        })}
                      </div>

                      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 leading-relaxed">
                        "{study.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <img 
                      src={study.image} 
                      alt={study.name}
                      className="w-full h-96 object-cover rounded-3xl shadow-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Impact */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted Across Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FreelanceFin serves freelancers across diverse industries and specializations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'Design & Creative',
              'Software Development',
              'Content Creation',
              'Marketing & PR',
              'Consulting',
              'Photography',
              'Writing & Editing',
              'Video Production',
              'Web Development',
              'Graphic Design',
              'Social Media',
              'Translation'
            ].map((industry, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <span className="font-medium text-gray-900 text-sm">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to write your
            <br />
            success story?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of freelancers who've transformed their financial management with FreelanceFin.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <span>Start Your Free Trial</span>
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

export default CaseStudiesPage;