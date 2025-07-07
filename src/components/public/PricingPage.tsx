import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, ArrowRight, Zap, Crown, Rocket, TrendingUp, Github, Twitter, Linkedin } from 'lucide-react';

interface PricingPageProps {
  onGetStarted: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onGetStarted }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      description: 'Perfect for new freelancers',
      monthlyPrice: 9,
      annualPrice: 7,
      color: 'from-gray-600 to-gray-800',
      features: [
        'Track up to 50 transactions/month',
        'Basic expense categorization',
        'Simple income tracking',
        'Monthly financial reports',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'Limited AI insights',
        'Basic tax calculations'
      ]
    },
    {
      name: 'Professional',
      icon: Crown,
      description: 'Most popular for growing freelancers',
      monthlyPrice: 29,
      annualPrice: 24,
      color: 'from-gray-700 to-gray-900',
      popular: true,
      features: [
        'Unlimited transactions',
        'Advanced AI insights',
        'Automated expense categorization',
        'Tax optimization suggestions',
        'Invoice management',
        'Payment tracking',
        'Custom reports',
        'Priority support',
        'Bank integrations',
        'Receipt scanning'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      description: 'For established freelance businesses',
      monthlyPrice: 59,
      annualPrice: 49,
      color: 'from-gray-800 to-black',
      features: [
        'Everything in Professional',
        'Multi-business management',
        'Team collaboration tools',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
        'API access',
        'Custom workflows',
        'Advanced security features'
      ],
      limitations: []
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! We offer a 14-day free trial with full access to Professional features. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time with no cancellation fees. Your data remains accessible until the end of your billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied within the first 30 days, we\'ll provide a full refund.'
    },
    {
      question: 'Is my financial data secure?',
      answer: 'Yes, we use bank-level encryption and security measures. Your data is encrypted both in transit and at rest, and we never share it with third parties.'
    }
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
                className="text-gray-900 font-medium"
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
              Simple, Transparent
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your freelance business. 
              Start with a free trial and scale as you grow.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-14 h-7 rounded-full transition-colors duration-200 ${
                isAnnual ? 'bg-gray-900' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                isAnnual ? 'translate-x-7' : 'translate-x-0.5'
              }`} />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              
              return (
                <div 
                  key={index} 
                  className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    plan.popular 
                      ? 'border-gray-400 shadow-lg scale-105' 
                      : 'border-gray-200/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed annually (${price * 12}/year)
                      </p>
                    )}
                  </div>

                  <button 
                    onClick={onGetStarted}
                    className={`w-full py-4 rounded-full font-semibold transition-all duration-200 hover:scale-105 mb-8 ${
                      plan.popular
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                    }`}
                  >
                    Start Free Trial
                  </button>

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></div>
                        <span className="text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of freelancers who trust FreelanceFin with their finances.
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

export default PricingPage;