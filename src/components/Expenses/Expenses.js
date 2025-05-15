import React, { useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseFilter from './ExpenseFilter';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

const Expenses = ({ items, onEditExpense, onDeleteExpense }) => {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  const filterChangeHandler = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const filteredExpenses = items.filter((expense) => {
    const expenseYear = expense.date.getFullYear().toString();
    const expenseMonth = expense.date.getMonth().toString();
    
    const yearMatch = selectedYear === 'all' || expenseYear === selectedYear;
    const monthMatch = selectedMonth === 'all' || expenseMonth === selectedMonth;
    
    return yearMatch && monthMatch;
  });

  return (
    <div className="expenses">
      <ExpenseFilter
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onFilterChange={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpenseList 
        items={filteredExpenses}
        onEditExpense={onEditExpense}
        onDeleteExpense={onDeleteExpense}
      />
    </div>
  );
};

export default Expenses; 