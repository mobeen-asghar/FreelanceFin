import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, TrendingDown, Coffee, Car, Home, Laptop, Camera, Download, Upload, Receipt } from 'lucide-react';
import { useFinancialData } from '../hooks/useFinancialData';

const Expenses: React.FC = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null as File | null
  });

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const filteredTransactions = expenseTransactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || t.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const categories = ['Software', 'Transportation', 'Food', 'Office', 'Marketing', 'Equipment', 'Travel', 'Utilities', 'Other'];
  
  const categoryStats = categories.map(category => ({
    name: category,
    amount: expenseTransactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0),
    count: expenseTransactions.filter(t => t.category === category).length,
    color: getCategoryColor(category)
  })).filter(cat => cat.amount > 0);

  function getCategoryColor(category: string) {
    const colors: { [key: string]: string } = {
      'Software': 'from-blue-400 to-blue-600',
      'Transportation': 'from-green-400 to-green-600',
      'Food': 'from-yellow-400 to-yellow-600',
      'Office': 'from-purple-400 to-purple-600',
      'Marketing': 'from-pink-400 to-pink-600',
      'Equipment': 'from-indigo-400 to-indigo-600',
      'Travel': 'from-cyan-400 to-cyan-600',
      'Utilities': 'from-orange-400 to-orange-600',
      'Other': 'from-gray-400 to-gray-600'
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  }

  function getCategoryIcon(category: string) {
    const icons: { [key: string]: any } = {
      'Software': Laptop,
      'Transportation': Car,
      'Food': Coffee,
      'Office': Home,
      'Marketing': TrendingDown,
      'Equipment': Camera,
      'Travel': Car,
      'Utilities': Home,
      'Other': TrendingDown
    };
    return icons[category] || TrendingDown;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTransaction) {
      updateTransaction(editingTransaction, {
        description: formData.description,
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date
      });
      setEditingTransaction(null);
    } else {
      addTransaction({
        type: 'expense',
        description: formData.description,
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date
      });
    }
    
    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      description: '',
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      receipt: null
    });
  };

  const handleEdit = (transaction: any) => {
    setFormData({
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount.toString(),
      date: transaction.date,
      receipt: null
    });
    setEditingTransaction(transaction.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      deleteTransaction(id);
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Description', 'Category', 'Amount'],
      ...filteredTransactions.map(t => [
        t.date,
        t.description,
        t.category,
        t.amount.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, receipt: file });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracking</h2>
          <p className="text-gray-600">Monitor and categorize your business expenses</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={exportData}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={() => {
              setShowAddForm(true);
              setEditingTransaction(null);
              resetForm();
            }}
            className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-red-600 font-medium">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">${totalExpenses.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Expenses</p>
        </div>
        
        {categoryStats.slice(0, 3).map((category, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center`}>
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-gray-600 font-medium">{category.name}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">${category.amount.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">{category.count} transactions</p>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      {categoryStats.length > 0 && (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryStats.map((category, index) => {
              const Icon = getCategoryIcon(category.name);
              const percentage = ((category.amount / totalExpenses) * 100).toFixed(1);
              return (
                <div key={index} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all duration-200 group">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">{category.name}</span>
                      <p className="text-sm text-gray-600">{category.count} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${category.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white/50"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-6 py-4 border border-gray-200 rounded-2xl focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white/50"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button className="px-6 py-4 border border-gray-200 rounded-2xl flex items-center space-x-2 hover:bg-gray-50 transition-all duration-200">
              <Filter className="h-5 w-5 text-gray-600" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Expense List */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <div key={item.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50 transition-all duration-200 group border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${getCategoryColor(item.category)} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{item.description}</h4>
                      <p className="text-gray-600 font-medium">{item.category}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-bold text-red-600 text-xl">-${item.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Business Expense</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingDown className="h-10 w-10 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">No expenses found</h4>
            <p className="text-gray-600 mb-8">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Add your first expense to get started.'
              }
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <button 
                onClick={() => {
                  setShowAddForm(true);
                  setEditingTransaction(null);
                  resetForm();
                }}
                className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              >
                Add Your First Expense
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Expense Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingTransaction ? 'Edit Expense' : 'Add New Expense'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expense Description</label>
                <input
                  type="text"
                  placeholder="Enter expense description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-gray-400 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleReceiptUpload}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <Receipt className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.receipt ? formData.receipt.name : 'Click to upload receipt'}
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTransaction(null);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-gray-900 text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-200 font-medium hover:scale-105"
                >
                  {editingTransaction ? 'Update' : 'Add'} Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;