import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Download, Upload } from 'lucide-react';
import { useFinancialData } from '../hooks/useFinancialData';

const Income: React.FC = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'received' | 'pending' | 'overdue'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    client: '',
    project: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'received' as 'received' | 'pending' | 'overdue',
    description: '',
    category: 'Freelance'
  });

  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const filteredTransactions = incomeTransactions.filter(t => {
    const matchesSearch = t.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.project?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const pendingIncome = incomeTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);
  const receivedIncome = incomeTransactions
    .filter(t => t.status === 'received')
    .reduce((sum, t) => sum + t.amount, 0);
  const overdueIncome = incomeTransactions
    .filter(t => t.status === 'overdue')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTransaction) {
      updateTransaction(editingTransaction, {
        client: formData.client,
        project: formData.project,
        description: formData.description || `${formData.project} - ${formData.client}`,
        amount: parseFloat(formData.amount),
        date: formData.date,
        status: formData.status,
        category: formData.category
      });
      setEditingTransaction(null);
    } else {
      addTransaction({
        type: 'income',
        client: formData.client,
        project: formData.project,
        description: formData.description || `${formData.project} - ${formData.client}`,
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date,
        status: formData.status
      });
    }
    
    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      client: '',
      project: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      status: 'received',
      description: '',
      category: 'Freelance'
    });
  };

  const handleEdit = (transaction: any) => {
    setFormData({
      client: transaction.client || '',
      project: transaction.project || '',
      amount: transaction.amount.toString(),
      date: transaction.date,
      status: transaction.status || 'received',
      description: transaction.description || '',
      category: transaction.category || 'Freelance'
    });
    setEditingTransaction(transaction.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this income record?')) {
      deleteTransaction(id);
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Client', 'Project', 'Amount', 'Status', 'Category'],
      ...filteredTransactions.map(t => [
        t.date,
        t.client || '',
        t.project || '',
        t.amount.toString(),
        t.status || '',
        t.category
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `income-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return CheckCircle;
      case 'pending': return Clock;
      case 'overdue': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Income Tracking</h2>
          <p className="text-gray-600">Manage your freelance income and payments</p>
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
            <span>Add Income</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-green-600 font-medium">Total</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">${totalIncome.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Total Income</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-green-600 font-medium">Received</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">${receivedIncome.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Received Payments</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-yellow-600 font-medium">Pending</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">${pendingIncome.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Awaiting Payment</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm text-red-600 font-medium">Overdue</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">${overdueIncome.toLocaleString()}</h3>
          <p className="text-gray-600 text-sm">Overdue Payments</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search income records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white/50"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-6 py-4 border border-gray-200 rounded-2xl focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white/50"
            >
              <option value="all">All Status</option>
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <button className="px-6 py-4 border border-gray-200 rounded-2xl flex items-center space-x-2 hover:bg-gray-50 transition-all duration-200">
              <Filter className="h-5 w-5 text-gray-600" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Income List */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((item) => {
              const StatusIcon = getStatusIcon(item.status || 'received');
              return (
                <div key={item.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50 transition-all duration-200 group border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <DollarSign className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{item.client}</h4>
                      <p className="text-gray-600 font-medium">{item.project}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <p className="text-sm text-gray-500">{item.date}</p>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(item.status || 'received')}`}>
                          {item.status || 'received'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-xl">${item.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
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
              <DollarSign className="h-10 w-10 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">No income records found</h4>
            <p className="text-gray-600 mb-8">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Add your first income record to get started.'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button 
                onClick={() => {
                  setShowAddForm(true);
                  setEditingTransaction(null);
                  resetForm();
                }}
                className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              >
                Add Your First Income
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Income Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {editingTransaction ? 'Edit Income' : 'Add New Income'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <input
                  type="text"
                  placeholder="Additional description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                  >
                    <option value="received">Received</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200"
                  >
                    <option value="Freelance">Freelance</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Product Sales">Product Sales</option>
                    <option value="Royalties">Royalties</option>
                    <option value="Other">Other</option>
                  </select>
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
                  {editingTransaction ? 'Update' : 'Add'} Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Income;