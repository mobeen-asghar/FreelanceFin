import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LandingPage from './public/LandingPage';
import FeaturesPage from './public/FeaturesPage';
import PricingPage from './public/PricingPage';
import CaseStudiesPage from './public/CaseStudiesPage';
import AboutPage from './public/AboutPage';

const PublicApp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    navigate('/login');
  };

  // Determine which component to render based on the current path
  const renderCurrentPage = () => {
    switch (location.pathname) {
      case '/features':
        return <FeaturesPage onGetStarted={handleGetStarted} />;
      case '/pricing':
        return <PricingPage onGetStarted={handleGetStarted} />;
      case '/case-studies':
        return <CaseStudiesPage onGetStarted={handleGetStarted} />;
      case '/about':
        return <AboutPage onGetStarted={handleGetStarted} />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return renderCurrentPage();
};

export default PublicApp;