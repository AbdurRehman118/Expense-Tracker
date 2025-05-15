import React from 'react';
import { FaWallet, FaMoneyBillWave, FaBalanceScale } from 'react-icons/fa';
import './Summary.css';

const Summary = ({ totalExpense, totalIncome, onDownload }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100).replace('₹', 'Rs');
  };

  const balance = totalIncome - totalExpense;

  return (
    <div className="summary-container">
      <div className="summary-card expense">
        <div className="summary-icon">
          <FaWallet />
        </div>
        <div className="summary-details">
          <h3>Total Expense</h3>
          <p className="amount">$ {formatAmount(totalExpense)}</p>
        </div>
      </div>
      
      <div className="summary-card income">
        <div className="summary-icon">
          <FaMoneyBillWave />
        </div>
        <div className="summary-details">
          <h3>Total Income</h3>
          <p className="amount">$ {formatAmount(totalIncome)}</p>
        </div>
      </div>
      
      <div className="summary-card balance">
        <div className="summary-icon">
          <FaBalanceScale />
        </div>
        <div className="summary-details">
          <h3>Balance</h3>
          <p className="amount">$ {formatAmount(balance)}</p>
        </div>
      </div>
      
      {onDownload && (
        <button className="download-btn" onClick={onDownload}>
          Download Report
        </button>
      )}
    </div>
  );
};

export default Summary; 