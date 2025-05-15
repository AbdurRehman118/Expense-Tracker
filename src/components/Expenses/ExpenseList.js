import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = (props) => {
  if (props.items.length === 0) {
    return (
      <h2 className="expenses-list__fallback">
        No expenses found yet!<br />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Start tracking your expenses by clicking the "Add New Expense" button above.
        </span>
      </h2>
    );
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          category={expense.category}
        />
      ))}
    </ul>
  );
};

export default ExpenseList; 