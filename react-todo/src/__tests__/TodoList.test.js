import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  // Test initial render
  test('renders TodoList component with initial state', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    expect(inputElement).toBeInTheDocument();
    // Check for demo todos if they exist
    const todoList = screen.getByRole('list');
    expect(todoList).toBeInTheDocument();
  });

  // Test adding todos
  test('can add a new todo', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add a new todo
    fireEvent.change(inputElement, { target: { value: 'New test todo' } });
    fireEvent.click(addButton);

    // Verify the new todo is added
    const newTodo = screen.getByText('New test todo');
    expect(newTodo).toBeInTheDocument();
  });

  // Test toggling todos
  test('can toggle todo completion status', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add a todo first
    fireEvent.change(inputElement, { target: { value: 'Todo to toggle' } });
    fireEvent.click(addButton);

    // Find and toggle the todo
    const todoItem = screen.getByText('Todo to toggle');
    fireEvent.click(todoItem);

    // Verify the todo is toggled
    expect(todoItem.closest('li')).toHaveClass('completed');
  });

  // Test deleting todos
  test('can delete a todo', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Add a todo first
    fireEvent.change(inputElement, { target: { value: 'Todo to delete' } });
    fireEvent.click(addButton);

    // Find and click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Verify the todo is deleted
    expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument();
  });
});
