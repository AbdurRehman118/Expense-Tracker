import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const postgresUrl = process.env.REACT_APP_POSTGRES_URL;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  throw new Error('Missing Supabase environment variables');
}

// Enhanced error handling for Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: { 'x-my-custom-header': 'expense-tracker-app' },
  }
});

// Enhanced PostgreSQL configuration
export const postgresConfig = postgresUrl ? {
  connectionString: postgresUrl,
  ssl: {
    rejectUnauthorized: false
  }
} : null;

// Enhanced error handling for auth functions
export const signUp = async (email, password, name) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error.message);
    return { data: null, error };
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error.message);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error.message);
    return { error };
  }
};

// Enhanced error handling for profile functions
export const updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update profile error:', error.message);
    return { data: null, error };
  }
};

export const getProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get profile error:', error.message);
    return { data: null, error };
  }
};

export const createProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ 
        user_id: userId,
        ...profileData
      }])
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Create profile error:', error.message);
    return { data: null, error };
  }
};

// Enhanced error handling for expense functions
export const addExpense = async (userId, expense) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ ...expense, user_id: userId }]);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Add expense error:', error.message);
    return { data: null, error };
  }
};

export const getExpenses = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get expenses error:', error.message);
    return { data: null, error };
  }
};

// Expense functions
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

// Add new utility function for checking database connection
export const checkDatabaseConnection = async () => {
  try {
    const { error } = await supabase
      .from('profiles')
      .select('count', { count: 'exact' });
    
    if (error) throw error;
    return { isConnected: true, error: null };
  } catch (error) {
    console.error('Database connection error:', error.message);
    return { isConnected: false, error };
  }
}; 