import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Star, TrendingUp, Shield, Zap, Brain, Users, Award, Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized financial recommendations powered by advanced AI algorithms.'
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Track your income, expenses, and profitability with intelligent reporting.'
    },
    {
      icon: Shield,
      title: 'Tax Optimization',
      description: 'Automatically calculate tax liabilities and maximize your deductions.'
    },
    {
      icon: Zap,
      title: 'Real-time Tracking',
      description: 'Monitor your financial health with live updates and instant notifications.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Designer',
      avatar: 'SC',
      rating: 5,
      text: 'FreelanceFin transformed how I manage my finances. The AI insights helped me increase my profit by 40%.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Independent Developer',
      avatar: 'MR',
      rating: 5,
      text: 'The tax optimization features alone saved me thousands. This is a game-changer for freelancers.'
    },
    {
      name: 'Emily Watson',
      role: 'Content Creator',
      avatar: 'EW',
      rating: 5,
      text: 'Finally, a finance tool that understands freelancers. The interface is beautiful and intuitive.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '$2.5M+', label: 'Managed Revenue' },
    { value: '98%', label: 'User Satisfaction' },
    { value: '24/7', label: 'AI Support' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              AI-Powered Finance
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                for Freelancers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your freelance business with intelligent financial management. 
              Track income, optimize taxes, and grow your profits with AI-driven insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={onGetStarted}
                className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200 hover:scale-105 flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl opacity-20 animate-pulse delay-2000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                manage your finances
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed specifically for freelancers and independent professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by freelancers
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                worldwide
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your
            <br />
            freelance finances?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of freelancers who've already optimized their financial management.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            Start Your Free Trial
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

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">FreelanceFin Demo</h3>
              <button 
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;