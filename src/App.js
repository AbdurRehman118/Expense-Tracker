import React from 'react';
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
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';
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

const Dashboard = () => {
  const {
    expenses,
    incomes,
    categories,
    loading,
    addExpense,
    addIncome,
    updateExpense,
    deleteExpense,
    addCategory,
    deleteCategory,
  } = useData();

  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('expense');

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
        expense.date.split('T')[0],
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container fade-in">
      <CategoryPanel
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        expenses={expenses}
        onAddCategory={addCategory}
        onRemoveCategory={deleteCategory}
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
                onAddExpense={addExpense} 
                categories={categories}
              />
            ) : (
              <Income onAddIncome={addIncome} />
            )}
          </div>
          <div className="filters-section">
            <Expenses 
              items={expenses.filter(expense => 
                selectedCategory === 'all' ? true : expense.category === selectedCategory
              )}
              onEditExpense={updateExpense}
              onDeleteExpense={deleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <PublicRoute>
                        <SignUp />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <ProfileSettings />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
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
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/" />;
};

export default App;
