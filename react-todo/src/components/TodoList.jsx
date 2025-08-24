import { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Practice JavaScript', completed: true },
    { id: 4, text: 'Master CSS', completed: false }
  ]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(), 
        text: text.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="no-todos">No todos yet. Add one above!</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span 
                  className="todo-text"
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
