import { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
  // Initialize state with demonstration todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Practice JavaScript', completed: true },
    { id: 4, text: 'Master CSS', completed: false }
  ]);

  // Method to add a new todo
  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(), // Simple ID generation
        text: text.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Method to toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Method to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      {/* Add Todo Form Component */}
      <AddTodoForm onAddTodo={addTodo} />
      
      {/* Todo List Display */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="no-todos">No todos yet. Add one above!</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`} data-testid="todo-item">
                <span 
                  className="todo-text"
                  data-testid="todo-text"
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    opacity: todo.completed ? 0.6 : 1
                  }}
                >
                  {todo.text}
                </span>
                <button 
                  className="delete-btn"
                  data-testid="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete todo"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Todo Statistics */}
      <div className="todo-stats">
        <p>
          Total: {todos.length} | 
          Completed: {todos.filter(todo => todo.completed).length} | 
          Remaining: {todos.filter(todo => !todo.completed).length}
        </p>
      </div>
    </div>
  );
};

export default TodoList;
