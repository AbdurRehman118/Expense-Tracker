import React from 'react';
import './ExpenseFilter.css';

const ExpenseFilter = ({ selectedYear, selectedMonth, onFilterChange }) => {
  const months = [
    { value: 'all', label: 'All Months' },
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];

  const handleYearChange = (event) => {
    onFilterChange(event.target.value, selectedMonth);
  };

  const handleMonthChange = (event) => {
    onFilterChange(selectedYear, event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__controls'>
        <div className='expenses-filter__control'>
          <label>Filter by year</label>
          <select value={selectedYear} onChange={handleYearChange}>
            <option value='all'>All Years</option>
            <option value='2025'>2025</option>
            <option value='2024'>2024</option>
            <option value='2023'>2023</option>
            <option value='2022'>2022</option>
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
          </select>
        </div>
        <div className='expenses-filter__control'>
          <label>Filter by month</label>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {months.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter; 