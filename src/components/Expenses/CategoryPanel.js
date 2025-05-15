import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_CATEGORIES } from '../../constants/categories';
import './CategoryPanel.css';

const CategoryPanel = ({ 
  selectedCategory,
  onCategorySelect,
  expenses,
  onAddCategory,
  onRemoveCategory
}) => {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const calculateCategoryTotal = (categoryId) => {
    return expenses
      .filter(expense => expense.category === categoryId)
      .reduce((sum, expense) => sum + expense.amount, 0)
      .toFixed(2);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = {
        id: newCategory.toLowerCase().replace(/\s+/g, '-'),
        name: newCategory.trim(),
        icon: faEllipsisH
      };
      setCategories(prev => [...prev, newCategoryObj]);
      onAddCategory(newCategoryObj);
      setNewCategory('');
      setIsAdding(false);
    }
  };

  const handleRemoveCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    onRemoveCategory(categoryId);
  };

  return (
    <div className="category-panel">
      <h2>Categories</h2>
      <div className="categories-list">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="category-info">
              <div className="category-icon">
                <FontAwesomeIcon icon={category.icon} />
              </div>
              <div className="category-details">
                <span className="category-name">{category.name}</span>
                <span className="category-amount">PKR {calculateCategoryTotal(category.id)}</span>
              </div>
            </div>
            <button
              className="remove-category"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveCategory(category.id);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="add-category-form">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            autoFocus
          />
          <div className="add-category-actions">
            <button onClick={handleAddCategory}>Add</button>
            <button onClick={() => setIsAdding(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-category-button" onClick={() => setIsAdding(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add Category
        </button>
      )}
    </div>
  );
};

export default CategoryPanel; 