import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Receipt, ArrowUpRight, ArrowDownRight, Plus, Eye, Calendar, Target } from 'lucide-react';
import { useFinancialData } from '../hooks/useFinancialData';

const Dashboard: React.FC = () => {
  const { transactions, totalIncome, totalExpenses, netProfit, taxLiability } = useFinancialData();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const stats = [
    {
      title: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      change: '+12.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      change: '-8.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      title: 'Net Profit',
      value: `$${netProfit.toLocaleString()}`,
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    },
    {
      title: 'Tax Liability',
      value: `$${taxLiability.toLocaleString()}`,
      change: '+2.1%',
      trend: 'up',
      icon: Receipt,
      color: 'from-gray-700 to-gray-900',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    },
  ];

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const monthlyData = [
    { month: 'Jan', income: 4500, expenses: 2800 },
    { month: 'Feb', income: 5200, expenses: 3100 },
    { month: 'Mar', income: 4800, expenses: 2900 },
    { month: 'Apr', income: 6100, expenses: 3400 },
    { month: 'May', income: 5800, expenses: 3200 },
    { month: 'Jun', income: 6500, expenses: 3600 },
  ];

  const quickActions = [
    { label: 'Add Income', icon: Plus, color: 'from-green-500 to-green-700', path: '/income' },
    { label: 'Add Expense', icon: Plus, color: 'from-red-500 to-red-700', path: '/expenses' },
    { label: 'View Reports', icon: Eye, color: 'from-blue-500 to-blue-700', path: '/analytics' },
    { label: 'Tax Planning', icon: Calendar, color: 'from-purple-500 to-purple-700', path: '/taxes' },
  ];

  const goals = [
    { title: 'Monthly Revenue Target', current: totalIncome, target: 8000, color: 'from-green-500 to-green-700' },
    { title: 'Expense Reduction Goal', current: totalExpenses, target: 3000, color: 'from-red-500 to-red-700' },
    { title: 'Savings Goal', current: netProfit, target: 5000, color: 'from-blue-500 to-blue-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => window.location.href = action.path}
                className={`bg-gradient-to-r ${action.color} text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
          <div className="flex bg-gray-100 rounded-full p-1">
            {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  timeframe === period
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  <span className="ml-1">{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trend Chart */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                        style={{ width: `${(data.income / 7000) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-500"
                        style={{ width: `${(data.expenses / 4000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">${data.income.toLocaleString()}</div>
                  <div className="text-sm font-medium text-red-600">${data.expenses.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Financial Goals</h3>
            <Target className="h-5 w-5 text-gray-600" />
          </div>
          <div className="space-y-6">
            {goals.map((goal, index) => {
              const progress = Math.min((goal.current / goal.target) * 100, 100);
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{goal.title}</span>
                    <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>${goal.target.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mr-3">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          AI Financial Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Income Growth</h4>
                <p className="text-sm text-gray-600">
                  {totalIncome > 0 
                    ? `Your income has increased this ${timeframe}. Consider setting aside $${taxLiability.toLocaleString()} for taxes.`
                    : 'Start tracking your income to get personalized insights.'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Expense Optimization</h4>
                <p className="text-sm text-gray-600">
                  {totalExpenses > 0 
                    ? 'Track your expenses regularly to identify potential savings opportunities.'
                    : 'Begin logging your business expenses to optimize your tax deductions.'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-200/50">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Profit Analysis</h4>
                <p className="text-sm text-gray-600">
                  {netProfit > 0 
                    ? `Your current net profit is $${netProfit.toLocaleString()}. Great financial management!`
                    : 'Focus on increasing income and managing expenses to improve profitability.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button 
            onClick={() => window.location.href = '/income'}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
          >
            View All →
          </button>
        </div>
        {recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 group">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? 
                      <ArrowUpRight className="h-5 w-5 text-green-600" /> : 
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.client || transaction.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                      {transaction.status && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'received' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  <p className="font-semibold text-lg">
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{transaction.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h4>
            <p className="text-gray-600 mb-6">Start by adding your first income or expense to see your financial overview.</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => window.location.href = '/income'}
                className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200"
              >
                Add Income
              </button>
              <button 
                onClick={() => window.location.href = '/expenses'}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                Add Expense
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;