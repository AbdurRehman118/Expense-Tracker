import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUp = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Profile functions
export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  return { data, error };
};

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

// Expense functions
export const addExpense = async (userId, expense) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([{ ...expense, user_id: userId }]);
  return { data, error };
};

export const getExpenses = async (userId) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  return { data, error };
};

export const updateExpense = async (expenseId, updates) => {
  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', expenseId);
  return { data, error };
};

export const deleteExpense = async (expenseId) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId);
  return { error };
};

// Income functions
export const addIncome = async (userId, income) => {
  const { data, error } = await supabase
    .from('incomes')
    .insert([{ ...income, user_id: userId }]);
  return { data, error };
};

export const getIncomes = async (userId) => {
  const { data, error } = await supabase
    .from('incomes')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  return { data, error };
};

export const updateIncome = async (incomeId, updates) => {
  const { data, error } = await supabase
    .from('incomes')
    .update(updates)
    .eq('id', incomeId);
  return { data, error };
};

export const deleteIncome = async (incomeId) => {
  const { error } = await supabase
    .from('incomes')
    .delete()
    .eq('id', incomeId);
  return { error };
};

// Category functions
export const getUserCategories = async (userId) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('name');
  return { data, error };
};

export const addCategory = async (userId, category) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ ...category, user_id: userId }]);
  return { data, error };
};

export const deleteCategory = async (categoryId) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);
  return { error };
}; 