import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList.jsx';

describe('TodoList Component', () => {
    test('renders correctly with initial todos', () => {
        render(<TodoList />);
        
        // Check if the component renders
        expect(screen.getByText('Todo List')).toBeInTheDocument();
        
        // Check if initial demo todos are rendered
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
        expect(screen.getByText('Practice JavaScript')).toBeInTheDocument();
        expect(screen.getByText('Master CSS')).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const addButton = screen.getByText('Add Todo');
        
        // Add a new todo
        fireEvent.change(input, { target: { value: 'New Test Todo' } });
        fireEvent.click(addButton);
        
        // Verify the new todo appears
        expect(screen.getByText('New Test Todo')).toBeInTheDocument();
        
        // Verify input is cleared
        expect(input.value).toBe('');
    });

    test('toggles todo completion status', () => {
        render(<TodoList />);
        
        const todoItem = screen.getByText('Learn React');
        
        // Click to toggle completion
        fireEvent.click(todoItem);
        
        // Check if the todo has completed style (line-through)
        expect(todoItem).toHaveStyle('text-decoration: line-through');
        
        // Click again to toggle back
        fireEvent.click(todoItem);
        
        // Check if the todo is not completed
        expect(todoItem).toHaveStyle('text-decoration: none');
    });

    test('deletes a todo', () => {
        render(<TodoList />);
        
        // Find delete button for the first todo
        const deleteButtons = screen.getAllByText('✕');
        const todoToDelete = screen.getByText('Learn React');
        
        // Delete the todo
        fireEvent.click(deleteButtons[0]);
        
        // Verify the todo is removed
        expect(todoToDelete).not.toBeInTheDocument();
    });

    test('does not add empty todo', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const addButton = screen.getByText('Add Todo');
        
        const initialTodos = screen.getAllByRole('listitem');
        const initialCount = initialTodos.length;
        
        // Try to add empty todo
        fireEvent.click(addButton);
        
        // Verify no new todo was added
        const currentTodos = screen.getAllByRole('listitem');
        expect(currentTodos.length).toBe(initialCount);
    });

    test('does not add todo with only whitespace', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const addButton = screen.getByText('Add Todo');
        
        const initialTodos = screen.getAllByRole('listitem');
        const initialCount = initialTodos.length;
        
        // Try to add whitespace-only todo
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(addButton);
        
        // Verify no new todo was added
        const currentTodos = screen.getAllByRole('listitem');
        expect(currentTodos.length).toBe(initialCount);
    });

    test('displays correct todo statistics', () => {
        render(<TodoList />);
        
        // Check initial stats (4 total, 1 completed, 3 remaining)
        expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
        expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 3/)).toBeInTheDocument();
    });

    test('updates statistics when todo is toggled', () => {
        render(<TodoList />);
        
        const todoItem = screen.getByText('Learn React');
        
        // Toggle todo to completed
        fireEvent.click(todoItem);
        
        // Check updated stats (4 total, 2 completed, 2 remaining)
        expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
        expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 2/)).toBeInTheDocument();
    });

    test('updates statistics when todo is deleted', () => {
        render(<TodoList />);
        
        const deleteButtons = screen.getAllByText('✕');
        
        // Delete first todo
        fireEvent.click(deleteButtons[0]);
        
        // Check updated stats (3 total, 1 completed, 2 remaining)
        expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
        expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 2/)).toBeInTheDocument();
    });

    test('updates statistics when new todo is added', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const addButton = screen.getByText('Add Todo');
        
        // Add a new todo
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);
        
        // Check updated stats (5 total, 1 completed, 4 remaining)
        expect(screen.getByText(/Total: 5/)).toBeInTheDocument();
        expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 4/)).toBeInTheDocument();
    });

    test('displays "No todos yet" message when all todos are deleted', () => {
        render(<TodoList />);
        
        const deleteButtons = screen.getAllByText('✕');
        
        // Delete all todos
        deleteButtons.forEach(button => {
            fireEvent.click(button);
        });
        
        // Check if "No todos yet" message is displayed
        expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    });

    test('add button is disabled when input is empty', () => {
        render(<TodoList />);
        
        const addButton = screen.getByText('Add Todo');
        
        // Button should be disabled initially
        expect(addButton).toBeDisabled();
    });

    test('add button is enabled when input has text', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const addButton = screen.getByText('Add Todo');
        
        // Add text to input
        fireEvent.change(input, { target: { value: 'Test todo' } });
        
        // Button should be enabled
        expect(addButton).toBeEnabled();
    });

    test('form submission adds todo', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const form = input.closest('form');
        
        // Submit form with Enter key
        fireEvent.change(input, { target: { value: 'Form Submit Todo' } });
        fireEvent.submit(form);
        
        // Verify the new todo appears
        expect(screen.getByText('Form Submit Todo')).toBeInTheDocument();
    });

    test('completed todos have correct styling', () => {
        render(<TodoList />);
        
        // Find the completed todo (Practice JavaScript)
        const completedTodo = screen.getByText('Practice JavaScript');
        
        // Check if it has the correct completed styling
        expect(completedTodo).toHaveStyle('text-decoration: line-through');
        expect(completedTodo).toHaveStyle('opacity: 0.6');
    });

    test('non-completed todos have correct styling', () => {
        render(<TodoList />);
        
        // Find a non-completed todo
        const incompleteTodo = screen.getByText('Learn React');
        
        // Check if it has the correct incomplete styling
        expect(incompleteTodo).toHaveStyle('text-decoration: none');
        expect(incompleteTodo).toHaveStyle('opacity: 1');
    });
});