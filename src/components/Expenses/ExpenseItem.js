import React, { useState } from 'react';
import ExpenseDate from './ExpenseDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ExpenseItem.css';

const ExpenseItem = ({ id, title, amount, date, category, description, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAmount, setEditedAmount] = useState(amount);
  const [editedDescription, setEditedDescription] = useState(description || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedAmount(amount);
    setEditedDescription(description || '');
  };

  const handleSave = () => {
    onEdit(id, {
      title: editedTitle,
      amount: +editedAmount,
      description: editedDescription,
      date,
      category
    });
    setIsEditing(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div className={`expense-item ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <div className="expense-item__details">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="expense-item__edit-input"
                />
                <input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="expense-item__edit-input"
                  min="0.01"
                  step="0.01"
                />
              </>
            ) : (
              <>
                <h2>{title}</h2>
                <span className="expense-item__category">{category}</span>
              </>
            )}
          </div>
          <div className="expense-item__price">PKR {amount.toLocaleString('en-PK')}</div>
        </div>
        <div className="expense-item__actions">
          {isEditing ? (
            <>
              <button onClick={(e) => { e.stopPropagation(); handleSave(); }} className="expense-item__button save">
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleCancel(); }} className="expense-item__button cancel">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </>
          ) : (
            <>
              <button onClick={(e) => { e.stopPropagation(); handleEdit(); }} className="expense-item__button edit">
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(id); }} className="expense-item__button delete">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="expense-item__expanded-content">
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="expense-item__edit-description"
              placeholder="Add a description..."
              rows="3"
            />
          ) : (
            <p className="expense-item__description-text">
              {description || 'No description provided.'}
            </p>
          )}
        </div>
      )}
    </li>
  );
};

export default ExpenseItem; 