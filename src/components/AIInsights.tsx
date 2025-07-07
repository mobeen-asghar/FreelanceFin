import React, { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Target, Lightbulb, BarChart3, PieChart, Calendar, DollarSign } from 'lucide-react';
import { useFinancialData } from '../hooks/useFinancialData';

const AIInsights: React.FC = () => {
  const { transactions, totalIncome, totalExpenses, netProfit, taxLiability } = useFinancialData();
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const generateInsights = () => {
    const insights = [];
    
    // Income insights
    if (totalIncome > 0) {
      const incomeGrowth = Math.random() * 20 - 10; // Simulate growth percentage
      insights.push({
        id: 'income-growth',
        type: incomeGrowth > 0 ? 'success' : 'warning',
        icon: incomeGrowth > 0 ? CheckCircle : AlertCircle,
        title: incomeGrowth > 0 ? 'Income Growth Detected' : 'Income Decline Alert',
        description: `Your income has ${incomeGrowth > 0 ? 'increased' : 'decreased'} by ${Math.abs(incomeGrowth).toFixed(1)}% compared to previous period.`,
        action: 'View income details',
        actionPath: '/income',
        color: incomeGrowth > 0 ? 'from-green-400 to-green-600' : 'from-yellow-400 to-yellow-600',
        bgColor: incomeGrowth > 0 ? 'bg-green-50' : 'bg-yellow-50',
        textColor: incomeGrowth > 0 ? 'text-green-800' : 'text-yellow-800',
        priority: 'high',
        details: {
          currentIncome: totalIncome,
          projectedIncome: totalIncome * (1 + incomeGrowth / 100),
          recommendations: [
            'Diversify your income streams',
            'Increase rates for high-value clients',
            'Focus on recurring revenue opportunities'
          ]
        }
      });
    }

    // Tax insights
    if (taxLiability > 0) {
      insights.push({
        id: 'tax-planning',
        type: 'warning',
        icon: AlertCircle,
        title: 'Tax Planning Reminder',
        description: `Based on your current income, set aside $${taxLiability.toLocaleString()} for taxes.`,
        action: 'Schedule tax payment',
        actionPath: '/taxes',
        color: 'from-yellow-400 to-yellow-600',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-800',
        priority: 'high',
        details: {
          quarterlyEstimate: Math.round(taxLiability / 4),
          nextDueDate: '2024-04-15',
          deductionOpportunities: [
            'Home office expenses',
            'Professional development',
            'Business equipment'
          ]
        }
      });
    }

    // Expense insights
    if (totalExpenses > 0) {
      const expenseRatio = (totalExpenses / totalIncome) * 100;
      insights.push({
        id: 'expense-ratio',
        type: expenseRatio < 30 ? 'success' : 'warning',
        icon: expenseRatio < 30 ? CheckCircle : AlertCircle,
        title: expenseRatio < 30 ? 'Great Expense Management' : 'High Expense Ratio',
        description: `Your expenses are ${expenseRatio.toFixed(1)}% of your income. ${expenseRatio < 30 ? 'Keep up the good work!' : 'Consider reducing expenses.'}`,
        action: 'View expense breakdown',
        actionPath: '/expenses',
        color: expenseRatio < 30 ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600',
        bgColor: expenseRatio < 30 ? 'bg-green-50' : 'bg-red-50',
        textColor: expenseRatio < 30 ? 'text-green-800' : 'text-red-800',
        priority: expenseRatio > 50 ? 'high' : 'medium',
        details: {
          currentRatio: expenseRatio,
          targetRatio: 30,
          potentialSavings: totalExpenses * 0.1,
          topCategories: ['Software', 'Transportation', 'Food']
        }
      });
    }

    // Profit insights
    if (netProfit > 0) {
      insights.push({
        id: 'profit-analysis',
        type: 'goal',
        icon: Target,
        title: 'Profitable Operations',
        description: `Your net profit is $${netProfit.toLocaleString()}. Consider investing in business growth.`,
        action: 'View investment options',
        actionPath: '/analytics',
        color: 'from-gray-600 to-gray-800',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-800',
        priority: 'medium',
        details: {
          profitMargin: ((netProfit / totalIncome) * 100).toFixed(1),
          reinvestmentSuggestion: netProfit * 0.2,
          growthOpportunities: [
            'Marketing campaigns',
            'Skill development',
            'Equipment upgrades'
          ]
        }
      });
    }

    // Cash flow insights
    const recentTransactions = transactions
      .filter(t => new Date(t.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (recentTransactions.length > 0) {
      insights.push({
        id: 'cash-flow',
        type: 'info',
        icon: BarChart3,
        title: 'Cash Flow Analysis',
        description: `You've had ${recentTransactions.length} transactions in the last 30 days. Your cash flow is ${netProfit > 0 ? 'positive' : 'negative'}.`,
        action: 'View cash flow details',
        actionPath: '/analytics',
        color: 'from-blue-400 to-blue-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800',
        priority: 'low',
        details: {
          monthlyTransactions: recentTransactions.length,
          averageTransaction: recentTransactions.reduce((sum, t) => sum + t.amount, 0) / recentTransactions.length,
          trendDirection: netProfit > 0 ? 'upward' : 'downward'
        }
      });
    }

    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  };

  const insights = generateInsights();

  const recommendations = [
    {
      id: 'tax-deductions',
      title: 'Optimize Tax Deductions',
      description: 'Track home office expenses and business meals for potential savings.',
      priority: 'High',
      savings: '$450/year',
      category: 'Tax',
      icon: DollarSign,
      color: 'from-green-500 to-green-700',
      actionItems: [
        'Set up home office expense tracking',
        'Document business meal receipts',
        'Track professional development costs'
      ]
    },
    {
      id: 'income-diversification',
      title: 'Diversify Income Streams',
      description: 'Consider adding passive income through digital products.',
      priority: 'Medium',
      savings: '$2,000/year',
      category: 'Growth',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-700',
      actionItems: [
        'Create digital courses',
        'Develop SaaS products',
        'Build affiliate partnerships'
      ]
    },
    {
      id: 'automated-savings',
      title: 'Automate Savings',
      description: 'Set up automatic transfers to save 20% of each payment.',
      priority: 'High',
      savings: '$3,600/year',
      category: 'Savings',
      icon: Target,
      color: 'from-purple-500 to-purple-700',
      actionItems: [
        'Open high-yield savings account',
        'Set up automatic transfers',
        'Create emergency fund'
      ]
    },
    {
      id: 'subscription-audit',
      title: 'Review Subscriptions',
      description: 'Cancel unused software subscriptions to save money.',
      priority: 'Low',
      savings: '$180/year',
      category: 'Expenses',
      icon: AlertCircle,
      color: 'from-red-500 to-red-700',
      actionItems: [
        'Audit all subscriptions',
        'Cancel unused services',
        'Negotiate better rates'
      ]
    }
  ];

  const predictions = [
    { 
      metric: 'Monthly Income', 
      current: `$${totalIncome.toLocaleString()}`, 
      predicted: `$${(totalIncome * 1.15).toLocaleString()}`, 
      change: '+15.0%',
      confidence: 85
    },
    { 
      metric: 'Monthly Expenses', 
      current: `$${totalExpenses.toLocaleString()}`, 
      predicted: `$${(totalExpenses * 0.95).toLocaleString()}`, 
      change: '-5.0%',
      confidence: 78
    },
    { 
      metric: 'Tax Liability', 
      current: `$${taxLiability.toLocaleString()}`, 
      predicted: `$${(taxLiability * 1.1).toLocaleString()}`, 
      change: '+10.0%',
      confidence: 92
    },
    { 
      metric: 'Net Savings', 
      current: `$${netProfit.toLocaleString()}`, 
      predicted: `$${(netProfit * 1.25).toLocaleString()}`, 
      change: '+25.0%',
      confidence: 73
    }
  ];

  const financialHealthScore = Math.min(10, Math.max(1, 
    (netProfit > 0 ? 3 : 0) + 
    (totalIncome > totalExpenses ? 3 : 0) + 
    (transactions.length > 5 ? 2 : 1) + 
    (totalExpenses / Math.max(totalIncome, 1) < 0.7 ? 2 : 1)
  ));

  const handleInsightClick = (insight: any) => {
    setSelectedInsight(selectedInsight === insight.id ? null : insight.id);
  };

  const handleActionClick = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">AI Financial Insights</h2>
            <p className="text-gray-600">Personalized recommendations based on your financial data</p>
          </div>
        </div>
        
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

      {/* Financial Health Score */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Financial Health Score</h3>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{financialHealthScore}/10</div>
            <div className="text-sm text-gray-600">
              {financialHealthScore >= 8 ? 'Excellent' :
               financialHealthScore >= 6 ? 'Good' :
               financialHealthScore >= 4 ? 'Fair' : 'Needs Improvement'}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-gray-600 to-gray-900 h-4 rounded-full transition-all duration-700"
            style={{ width: `${(financialHealthScore / 10) * 100}%` }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">Income Stability</div>
            <div className="text-sm text-gray-600">
              {totalIncome > 0 ? 'Stable' : 'Needs tracking'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">Expense Control</div>
            <div className="text-sm text-gray-600">
              {(totalExpenses / Math.max(totalIncome, 1)) < 0.7 ? 'Good' : 'Needs improvement'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">Profit Margin</div>
            <div className="text-sm text-gray-600">
              {netProfit > 0 ? 'Profitable' : 'Break even'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      {insights.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">Key Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              const isExpanded = selectedInsight === insight.id;
              return (
                <div 
                  key={index} 
                  className={`${insight.bgColor} rounded-3xl p-6 border border-gray-200/50 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    isExpanded ? 'ring-2 ring-gray-300' : ''
                  }`}
                  onClick={() => handleInsightClick(insight)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${insight.textColor}`}>{insight.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {insight.priority}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{insight.description}</p>
                      
                      {isExpanded && insight.details && (
                        <div className="mt-4 p-4 bg-white/50 rounded-2xl">
                          <h5 className="font-medium text-gray-900 mb-2">Details</h5>
                          {insight.details.recommendations && (
                            <ul className="text-sm text-gray-700 space-y-1">
                              {insight.details.recommendations.map((rec: string, i: number) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(insight.actionPath);
                        }}
                        className={`text-sm ${insight.textColor} hover:underline font-medium mt-2`}
                      >
                        {insight.action} →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200/50 text-center">
          <Brain className="h-16 w-16 text-gray-500 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Tracking for AI Insights</h3>
          <p className="text-gray-700 mb-6">Add some income and expense records to get personalized financial insights.</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => handleActionClick('/income')}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200"
            >
              Add Income
            </button>
            <button 
              onClick={() => handleActionClick('/expenses')}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              Add Expense
            </button>
          </div>
        </div>
      )}

      {/* Predictions */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6">AI Predictions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {predictions.map((prediction, index) => (
            <div key={index} className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-200">
              <p className="text-sm text-gray-600 mb-2">{prediction.metric}</p>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xl font-bold text-gray-900">{prediction.predicted}</p>
                  <p className="text-xs text-gray-500">from {prediction.current}</p>
                </div>
                <span className={`text-sm font-medium ${
                  prediction.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {prediction.change}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-600 h-2 rounded-full"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{prediction.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personalized Recommendations</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <div key={index} className="p-6 rounded-2xl hover:bg-gray-50 transition-all duration-200 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${rec.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {rec.priority}
                        </span>
                        <p className="text-sm font-semibold text-green-600 mt-1">{rec.savings}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                    <div className="space-y-1">
                      {rec.actionItems.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-gray-600">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Analysis Summary */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200/50">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">AI Analysis Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Financial Health Assessment</h4>
              <p className="text-gray-700 text-sm">
                Your financial health score is {financialHealthScore}/10 - 
                {financialHealthScore >= 8 ? ' Excellent financial management!' :
                 financialHealthScore >= 6 ? ' Good financial health with room for improvement.' :
                 financialHealthScore >= 4 ? ' Fair financial status, focus on increasing income and reducing expenses.' :
                 ' Consider improving your financial tracking and management.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Strengths</h4>
              <p className="text-gray-700 text-sm">
                {netProfit > 0 ? 'Profitable operations, ' : ''}
                {totalIncome > totalExpenses ? 'positive cash flow, ' : ''}
                {transactions.length > 10 ? 'consistent tracking habits.' : 'building tracking habits.'}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Areas for Improvement</h4>
              <p className="text-gray-700 text-sm">
                {totalExpenses / Math.max(totalIncome, 1) > 0.7 ? 'Expense management, ' : ''}
                {taxLiability > totalIncome * 0.3 ? 'tax planning, ' : ''}
                diversifying income streams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
              <p className="text-gray-700 text-sm">
                Focus on the high-priority recommendations to potentially save $4,050 annually and improve your financial position.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;