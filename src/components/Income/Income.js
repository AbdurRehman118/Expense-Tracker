import React, { useState } from 'react';
import './Income.css';

const Income = ({ onAddIncome }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const recurringChangeHandler = (event) => {
    setIsRecurring(event.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const incomeData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
      description: enteredDescription,
      isRecurring: isRecurring,
      id: Math.random().toString()
    };

    onAddIncome(incomeData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredDescription('');
    setIsRecurring(false);
  };

  const cancelHandler = () => {
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
    setEnteredDescription('');
    setIsRecurring(false);
  };

  return (
    <form onSubmit={submitHandler} className="income-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={enteredTitle}
          onChange={titleChangeHandler}
          placeholder="e.g. Salary, Freelance Work"
          required
        />
      </div>

      <div>
        <label>Amount (PKR)</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={enteredAmount}
          onChange={amountChangeHandler}
          required
        />
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={enteredDate}
          onChange={dateChangeHandler}
          placeholder="mm/dd/yyyy"
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={enteredDescription}
          onChange={descriptionChangeHandler}
          placeholder="Add a description (optional)"
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="recurring"
          checked={isRecurring}
          onChange={recurringChangeHandler}
        />
        <label htmlFor="recurring">Recurring Income</label>
      </div>

      <div className="button-group">
        <button type="button" onClick={cancelHandler}>
          CANCEL
        </button>
        <button type="submit">
          ADD INCOME
        </button>
      </div>
    </form>
  );
};

export default Income; 