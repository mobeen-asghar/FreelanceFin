import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Target, Award, Heart, Linkedin, Twitter, Github, ArrowRight, TrendingUp } from 'lucide-react';

interface AboutPageProps {
  onGetStarted: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former freelance consultant who experienced the pain of financial management firsthand. 10+ years in fintech.',
      avatar: 'AC',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sarah Kim',
      role: 'CTO & Co-Founder',
      bio: 'AI/ML expert with experience at Google and Tesla. Passionate about making complex technology accessible.',
      avatar: 'SK',
      social: { linkedin: '#', github: '#' }
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Product',
      bio: 'Former freelance designer turned product leader. Obsessed with creating intuitive user experiences.',
      avatar: 'MJ',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Customer Success',
      bio: 'Dedicated to helping freelancers succeed. Former small business advisor with 8+ years experience.',
      avatar: 'ER',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Freelancer-First',
      description: 'Every decision we make is guided by what\'s best for the freelance community. We understand your unique challenges because we\'ve been there.',
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: Target,
      title: 'Simplicity',
      description: 'Financial management shouldn\'t be complicated. We believe in making powerful tools that are intuitive and easy to use.',
      color: 'from-gray-500 to-gray-700'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We\'re committed to building the best financial management platform for freelancers, with attention to every detail.',
      color: 'from-gray-700 to-gray-900'
    },
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'We believe every freelancer deserves the tools and insights to build a thriving, sustainable business.',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  const milestones = [
    {
      year: '2021',
      title: 'The Beginning',
      description: 'Founded by two freelancers frustrated with existing financial tools.'
    },
    {
      year: '2022',
      title: 'First 1,000 Users',
      description: 'Reached our first milestone with overwhelmingly positive feedback.'
    },
    {
      year: '2023',
      title: 'AI Integration',
      description: 'Launched our AI-powered insights engine, revolutionizing freelance finance.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to serve freelancers in 50+ countries worldwide.'
    },
    {
      year: '2025',
      title: 'The Future',
      description: 'Continuing to innovate and empower the global freelance economy.'
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
                className="text-gray-900 font-medium"
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
              Built by Freelancers,
              <br />
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                for Freelancers
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We understand the unique challenges of freelance life because we've lived them. 
              Our mission is to empower every freelancer with the financial tools they need to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 border border-gray-200/50">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To democratize financial management for the global freelance economy. We believe every 
                independent professional deserves access to sophisticated financial tools that were 
                previously only available to large corporations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p className="mb-6">
                FreelanceFin was born out of frustration. As freelancers ourselves, we spent countless 
                hours every month trying to make sense of our finances. Spreadsheets, multiple apps, 
                shoebox receipts – sound familiar?
              </p>
              <p className="mb-6">
                We realized that while there were plenty of financial tools for traditional businesses, 
                nothing was built specifically for the unique needs of freelancers. Irregular income, 
                project-based work, multiple clients, complex tax situations – these challenges required 
                a different approach.
              </p>
              <p className="mb-6">
                So we decided to build the solution we wished existed. A platform that understands 
                freelance life, powered by AI to provide insights that actually matter, and designed 
                with the simplicity that busy freelancers need.
              </p>
              <p>
                Today, FreelanceFin serves thousands of freelancers worldwide, helping them save time, 
                optimize their finances, and focus on what they do best – their craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our mission to empower freelancers</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind FreelanceFin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      <Linkedin className="h-4 w-4" />
                    </button>
                  )}
                  {member.social.twitter && (
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      <Twitter className="h-4 w-4" />
                    </button>
                  )}
                  {member.social.github && (
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      <Github className="h-4 w-4" />
                    </button>
                  )}
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
            Join our mission to
            <br />
            empower freelancers
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of the community that's revolutionizing freelance financial management.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <span>Start Your Journey</span>
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

export default AboutPage;