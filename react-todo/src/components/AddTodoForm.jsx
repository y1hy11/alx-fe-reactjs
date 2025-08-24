import { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() !== '') {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo..."
          className="todo-input"
          maxLength={100}
        />
        <button 
          type="submit" 
          className="add-btn"
          disabled={inputValue.trim() === ''}
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
