import React, { useState } from 'react';
import './NewExpense.css';

const NewExpense = ({ onAddExpense, categories }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');
  const [enteredDescription, setEnteredDescription] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
      category: selectedCategory,
      description: enteredDescription,
      id: Math.random().toString()
    };

    onAddExpense(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
    setSelectedCategory(categories[0]?.id || '');
    setEnteredDescription('');
  };

  const cancelHandler = () => {
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
    setSelectedCategory(categories[0]?.id || '');
    setEnteredDescription('');
  };

  return (
    <form onSubmit={submitHandler} className="new-expense">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={enteredTitle}
          onChange={titleChangeHandler}
          placeholder="e.g. Groceries, Rent"
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
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={categoryChangeHandler}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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

      <div className="button-group">
        <button type="button" onClick={cancelHandler}>
          CANCEL
        </button>
        <button type="submit">
          ADD EXPENSE
        </button>
      </div>
    </form>
  );
};

export default NewExpense; 