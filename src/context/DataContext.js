import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getExpenses,
  getIncomes,
  getUserCategories,
  addExpense,
  addIncome,
  updateExpense,
  updateIncome,
  deleteExpense,
  deleteIncome,
  addCategory,
  deleteCategory,
} from '../config/supabase';

const DataContext = createContext({});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setExpenses([]);
      setIncomes([]);
      setCategories([]);
      setLoading(false);
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesData, incomesData, categoriesData] = await Promise.all([
        getExpenses(user.id),
        getIncomes(user.id),
        getUserCategories(user.id),
      ]);

      if (expensesData.error) throw expensesData.error;
      if (incomesData.error) throw incomesData.error;
      if (categoriesData.error) throw categoriesData.error;

      setExpenses(expensesData.data || []);
      setIncomes(incomesData.data || []);
      setCategories(categoriesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const { data, error } = await addExpense(user.id, expenseData);
      if (error) throw error;
      setExpenses([data[0], ...expenses]);
      return data[0];
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const handleAddIncome = async (incomeData) => {
    try {
      const { data, error } = await addIncome(user.id, incomeData);
      if (error) throw error;
      setIncomes([data[0], ...incomes]);
      return data[0];
    } catch (error) {
      console.error('Error adding income:', error);
      throw error;
    }
  };

  const handleUpdateExpense = async (expenseId, updates) => {
    try {
      const { data, error } = await updateExpense(expenseId, updates);
      if (error) throw error;
      setExpenses(expenses.map(exp => exp.id === expenseId ? data[0] : exp));
      return data[0];
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  const handleUpdateIncome = async (incomeId, updates) => {
    try {
      const { data, error } = await updateIncome(incomeId, updates);
      if (error) throw error;
      setIncomes(incomes.map(inc => inc.id === incomeId ? data[0] : inc));
      return data[0];
    } catch (error) {
      console.error('Error updating income:', error);
      throw error;
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const { error } = await deleteExpense(expenseId);
      if (error) throw error;
      setExpenses(expenses.filter(exp => exp.id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };

  const handleDeleteIncome = async (incomeId) => {
    try {
      const { error } = await deleteIncome(incomeId);
      if (error) throw error;
      setIncomes(incomes.filter(inc => inc.id !== incomeId));
    } catch (error) {
      console.error('Error deleting income:', error);
      throw error;
    }
  };

  const handleAddCategory = async (categoryData) => {
    try {
      const { data, error } = await addCategory(user.id, categoryData);
      if (error) throw error;
      setCategories([...categories, data[0]]);
      return data[0];
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const { error } = await deleteCategory(categoryId);
      if (error) throw error;
      setCategories(categories.filter(cat => cat.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  const value = {
    expenses,
    incomes,
    categories,
    loading,
    addExpense: handleAddExpense,
    addIncome: handleAddIncome,
    updateExpense: handleUpdateExpense,
    updateIncome: handleUpdateIncome,
    deleteExpense: handleDeleteExpense,
    deleteIncome: handleDeleteIncome,
    addCategory: handleAddCategory,
    deleteCategory: handleDeleteCategory,
    refreshData: fetchData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext; 