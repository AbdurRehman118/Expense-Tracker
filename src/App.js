import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewExpense from './components/NewExpense/NewExpense';
import Income from './components/Income/Income';
import Summary from './components/Summary/Summary';
import Expenses from './components/Expenses/Expenses';
import CategoryPanel from './components/Expenses/CategoryPanel';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ProfileSettings from './components/Auth/ProfileSettings';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { DEFAULT_CATEGORIES } from './constants/categories';
import './styles/theme.css';
import './App.css';

// Placeholder components for new routes
const About = () => (
  <div className="page-container fade-in">
    <h1>About ExpenseTracker</h1>
    <p>A modern expense tracking solution to help you manage your finances effectively.</p>
  </div>
);

const Contact = () => (
  <div className="page-container fade-in">
    <h1>Contact Us</h1>
    <p>Get in touch with us for any questions or support.</p>
  </div>
);

const Privacy = () => (
  <div className="page-container fade-in">
    <h1>Privacy Policy</h1>
    <p>Your privacy is important to us. Learn how we protect your data.</p>
  </div>
);

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Car Insurance',
    amount: 29467,
    date: new Date(2024, 2, 28),
    category: 'transportation'
  },
  {
    id: 'e2',
    title: 'New TV',
    amount: 79949,
    date: new Date(2024, 1, 12),
    category: 'home'
  },
  {
    id: 'e3',
    title: 'Groceries',
    amount: 12999,
    date: new Date(2024, 2, 15),
    category: 'food'
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 45000,
    date: new Date(2023, 5, 12),
    category: 'work'
  },
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('expense'); // 'expense' or 'income'

  const addExpenseHandler = (expense) => {
    const expenseWithIntAmount = {
      ...expense,
      amount: Math.round(expense.amount * 100)
    };
    setExpenses((prevExpenses) => [expenseWithIntAmount, ...prevExpenses]);
  };

  const addIncomeHandler = (income) => {
    const incomeWithIntAmount = {
      ...income,
      amount: Math.round(income.amount * 100)
    };
    setIncomes((prevIncomes) => [incomeWithIntAmount, ...prevIncomes]);
  };

  const handleEditExpense = (id, updatedExpense) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === id ? { ...updatedExpense, amount: Math.round(updatedExpense.amount * 100) } : expense
      )
    );
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  const calculateTotalExpense = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateTotalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  const handleDownloadCSV = () => {
    // Implementation for CSV download
    const csvContent = [
      ['Date', 'Title', 'Category', 'Amount', 'Description'].join(','),
      ...expenses.map(expense => [
        expense.date.toISOString().split('T')[0],
        expense.title,
        expense.category,
        (expense.amount / 100).toFixed(2),
        expense.description || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'expenses.csv';
    link.click();
  };

  const handleLogin = (credentials) => {
    if (credentials.email === 'john.doe@example.com') {
      setUser({
        name: 'John Doe',
        email: credentials.email,
        profilePhoto: null
      });
      setExpenses(DUMMY_EXPENSES);
      setCategories(DEFAULT_CATEGORIES);
    } else {
      setUser({
        name: credentials.email.split('@')[0],
        email: credentials.email,
        profilePhoto: null
      });
      setExpenses([]);
      setCategories(DEFAULT_CATEGORIES);
    }
  };

  const handleSignUp = (userData) => {
    setUser({
      name: userData.name,
      email: userData.email,
      profilePhoto: null
    });
    setExpenses([]);
    setCategories(DEFAULT_CATEGORIES);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUser(prevUser => ({
      ...prevUser,
      name: updatedProfile.name,
      profilePhoto: updatedProfile.profilePhoto
    }));
  };

  const handleAddCategory = (newCategory) => {
    setCategories(prev => [...prev, newCategory]);
  };

  const handleRemoveCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    // If the removed category was selected, reset to 'all'
    if (selectedCategory === categoryId) {
      setSelectedCategory('all');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setExpenses([]);
    setSelectedCategory('all');
    setCategories([]);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar user={user} onLogout={handleLogout} />
          <main className="main-content">
            <Routes>
              <Route
                path="/login"
                element={
                  !user ? (
                    <Login onLogin={handleLogin} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  !user ? (
                    <SignUp onSignUp={handleSignUp} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  user ? (
                    <ProfileSettings user={user} onUpdateProfile={handleUpdateProfile} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/"
                element={
                  user ? (
                    <div className="dashboard-container fade-in">
                      <CategoryPanel
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                        expenses={expenses}
                        onAddCategory={handleAddCategory}
                        onRemoveCategory={handleRemoveCategory}
                      />
                      <div className="dashboard-content">
                        <Summary 
                          totalExpense={calculateTotalExpense()}
                          totalIncome={calculateTotalIncome()}
                          onDownload={handleDownloadCSV}
                        />
                        <div className="content-section">
                          <div className="form-section">
                            <div className="form-tabs">
                              <button 
                                className={`form-tab ${activeTab === 'expense' ? 'active' : ''}`}
                                onClick={() => setActiveTab('expense')}
                                data-tab="expense"
                              >
                                Add Expense
                              </button>
                              <button 
                                className={`form-tab ${activeTab === 'income' ? 'active' : ''}`}
                                onClick={() => setActiveTab('income')}
                                data-tab="income"
                              >
                                Add Income
                              </button>
                            </div>
                            {activeTab === 'expense' ? (
                              <NewExpense 
                                onAddExpense={addExpenseHandler} 
                                categories={categories}
                              />
                            ) : (
                              <Income onAddIncome={addIncomeHandler} />
                            )}
                          </div>
                          <div className="filters-section">
                            <Expenses 
                              items={expenses}
                              onEditExpense={handleEditExpense}
                              onDeleteExpense={handleDeleteExpense}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
