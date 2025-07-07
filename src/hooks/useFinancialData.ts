import { useState, useEffect } from 'react';
import { Transaction, FinancialData } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useFinancialData = () => {
  const { user } = useAuth();
  const [data, setData] = useState<FinancialData>({
    transactions: [],
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    taxLiability: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const getStorageKey = (key: string) => `freelancefin_${user?.id}_${key}`;

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const transactions = JSON.parse(localStorage.getItem(getStorageKey('transactions')) || '[]');
      
      // Validate and clean transaction data
      const validTransactions = transactions.filter((t: any) => 
        t && typeof t === 'object' && t.id && t.type && typeof t.amount === 'number'
      );

      const totalIncome = validTransactions
        .filter((t: Transaction) => t.type === 'income')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
      
      const totalExpenses = validTransactions
        .filter((t: Transaction) => t.type === 'expense')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
      
      const netProfit = totalIncome - totalExpenses;
      const taxLiability = Math.max(0, netProfit * 0.25); // 25% tax rate

      setData({
        transactions: validTransactions,
        totalIncome,
        totalExpenses,
        netProfit,
        taxLiability
      });
    } catch (error) {
      console.error('Error loading financial data:', error);
      // Reset to default state on error
      setData({
        transactions: [],
        totalIncome: 0,
        totalExpenses: 0,
        netProfit: 0,
        taxLiability: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (!user) return;
    
    try {
      const newTransaction: Transaction = {
        ...transaction,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        // Ensure required fields have defaults
        description: transaction.description || 'Untitled Transaction',
        category: transaction.category || 'Other',
        date: transaction.date || new Date().toISOString().split('T')[0]
      };

      const transactions = [...data.transactions, newTransaction];
      localStorage.setItem(getStorageKey('transactions'), JSON.stringify(transactions));
      loadData();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    if (!user) return;
    
    try {
      const transactions = data.transactions.map(t => 
        t.id === id ? { ...t, ...updates } : t
      );
      localStorage.setItem(getStorageKey('transactions'), JSON.stringify(transactions));
      loadData();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const deleteTransaction = (id: string) => {
    if (!user) return;
    
    try {
      const transactions = data.transactions.filter(t => t.id !== id);
      localStorage.setItem(getStorageKey('transactions'), JSON.stringify(transactions));
      loadData();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const bulkImportTransactions = (transactions: Omit<Transaction, 'id' | 'createdAt'>[]) => {
    if (!user) return;
    
    try {
      const newTransactions = transactions.map(t => ({
        ...t,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        description: t.description || 'Imported Transaction',
        category: t.category || 'Other',
        date: t.date || new Date().toISOString().split('T')[0]
      }));

      const allTransactions = [...data.transactions, ...newTransactions];
      localStorage.setItem(getStorageKey('transactions'), JSON.stringify(allTransactions));
      loadData();
    } catch (error) {
      console.error('Error importing transactions:', error);
    }
  };

  const clearAllData = () => {
    if (!user) return;
    
    try {
      localStorage.removeItem(getStorageKey('transactions'));
      loadData();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return {
    ...data,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    bulkImportTransactions,
    clearAllData,
    refreshData: loadData
  };
};