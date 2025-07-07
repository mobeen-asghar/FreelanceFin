# FreelanceFin 💰

**AI-Powered Personal Finance Manager for Freelancers**

A modern, comprehensive financial management platform designed specifically for freelancers and independent professionals. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🤖 AI-Powered Insights
- **Smart Financial Analysis**: Get personalized recommendations based on your financial patterns
- **Predictive Analytics**: Forecast future income and expenses
- **Automated Categorization**: AI automatically categorizes your transactions
- **Tax Optimization**: Intelligent suggestions for maximizing deductions

### 📊 Comprehensive Financial Management
- **Income Tracking**: Monitor payments from multiple clients and projects
- **Expense Management**: Track business expenses with receipt scanning
- **Real-time Analytics**: Interactive dashboards and reports
- **Tax Management**: Automated tax calculations and quarterly estimates

### 💼 Freelancer-Specific Tools
- **Project-based Tracking**: Organize finances by client and project
- **Invoice Management**: Create and track professional invoices
- **Payment Status**: Monitor pending, received, and overdue payments
- **Multi-currency Support**: Handle international clients seamlessly

### 🔒 Security & Privacy
- **Bank-level Encryption**: Your financial data is always secure
- **Local Storage**: Demo version stores data locally for privacy
- **No Third-party Sharing**: Your data stays private

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mobeen-asghar/FreelanceFin.git
   cd FreelanceFin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Account
For testing purposes, use these credentials:
- **Email**: `demo@freelancefin.com`
- **Password**: `demo123`

## 🏗️ Project Structure

```
freelancefin/
├── src/
│   ├── components/           # React components
│   │   ├── auth/            # Authentication components
│   │   ├── public/          # Public pages (landing, features, etc.)
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── Income.tsx       # Income tracking
│   │   ├── Expenses.tsx     # Expense management
│   │   ├── AIInsights.tsx   # AI-powered insights
│   │   └── Settings.tsx     # User settings
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── hooks/               # Custom React hooks
│   │   └── useFinancialData.ts # Financial data management
│   ├── types/               # TypeScript type definitions
│   └── App.tsx              # Main application component
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, customizable icons

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### State Management
- **React Context** - Global state management
- **Local Storage** - Data persistence (demo version)
- **Custom Hooks** - Reusable stateful logic

## 📱 Pages & Features

### Public Pages
- **Landing Page** (`/`) - Hero section with features overview
- **Features** (`/features`) - Detailed feature descriptions
- **Pricing** (`/pricing`) - Subscription plans and pricing
- **Case Studies** (`/case-studies`) - Success stories from users
- **About** (`/about`) - Company information and team

### Protected Dashboard
- **Dashboard** (`/dashboard`) - Financial overview and insights
- **Income** (`/income`) - Track payments and client work
- **Expenses** (`/expenses`) - Manage business expenses
- **AI Insights** (`/ai-insights`) - Personalized financial recommendations
- **Settings** (`/settings`) - Account and preference management

## 🎨 Design System

### Color Palette
- **Primary**: Gray scale (50-900) for professional appearance
- **Accent Colors**: Green (success), Red (expenses), Blue (info), Yellow (warnings)
- **Gradients**: Subtle gray gradients for depth and modern feel

### Typography
- **Font**: System fonts for optimal performance
- **Hierarchy**: Clear heading structure (text-4xl to text-sm)
- **Line Height**: 150% for body text, 120% for headings

### Components
- **Rounded Corners**: Consistent 2xl and 3xl border radius
- **Shadows**: Subtle shadows for depth
- **Hover States**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design approach

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Code Style
- **ESLint**: Enforces code quality and consistency
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (recommended)

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the single responsibility principle
- Use descriptive component and prop names
- Implement proper error boundaries

## 📊 Data Management

### Local Storage Structure
```typescript
// User authentication
freelancefin_users: User[]
freelancefin_user: User

// Financial data (per user)
freelancefin_{userId}_transactions: Transaction[]
```

### Data Types
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  client?: string;
  project?: string;
  date: string;
  status?: 'received' | 'pending' | 'overdue';
  createdAt: string;
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the build files to an S3 bucket

### Environment Variables
For production deployment, consider adding:
```env
VITE_API_URL=your-api-endpoint
VITE_STRIPE_PUBLIC_KEY=your-stripe-key
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add TypeScript types for new features
- Update documentation for significant changes
- Test your changes thoroughly
- Ensure responsive design works on all devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern fintech applications
- **Icons**: [Lucide React](https://lucide.dev/)
- **Images**: [Pexels](https://pexels.com) for demo images
- **Fonts**: System font stack for optimal performance

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: support@freelancefin.com (demo)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Real backend integration
- [ ] Bank account connections
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] Team collaboration
- [ ] API integrations
- [ ] Advanced AI features
- [ ] Multi-language support

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Enhanced AI insights
- **v1.2.0** - Improved mobile experience

---

**Built with ❤️ for the freelance community**

*FreelanceFin - Empowering freelancers with intelligent financial management*