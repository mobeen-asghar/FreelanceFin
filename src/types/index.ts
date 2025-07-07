export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Transaction {
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

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface FinancialData {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  taxLiability: number;
}