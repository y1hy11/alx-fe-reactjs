import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList.jsx';

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

    test('displays correct initial todo stats', () => {
        render(<TodoList />);
        
        // Check if stats are displayed correctly (1 completed out of 4 total)
        expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
        expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 3/)).toBeInTheDocument();
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
        
        // Verify stats are updated
        expect(screen.getByText(/Total: 5/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 4/)).toBeInTheDocument();
    });

    test('toggles todo completion status', () => {
        render(<TodoList />);
        
        const todoItem = screen.getByText('Learn React');
        
        // Click to toggle completion
        fireEvent.click(todoItem);
        
        // Check if the todo has completed style (line-through)
        expect(todoItem).toHaveStyle('text-decoration: line-through');
        
        // Verify stats updated (2 completed now)
        expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 2/)).toBeInTheDocument();
        
        // Click again to toggle back
        fireEvent.click(todoItem);
        
        // Check if the todo is not completed
        expect(todoItem).toHaveStyle('text-decoration: none');
        
        // Verify stats are back to original
        expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 3/)).toBeInTheDocument();
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
        
        // Verify stats are updated
        expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 2/)).toBeInTheDocument();
    });

    test('does not add empty todo', () => {
        render(<TodoList />);
        
        const addButton = screen.getByText('Add Todo');
        
        const initialTodos = screen.getAllByRole('listitem');
        const initialCount = initialTodos.length;
        
        // Try to add empty todo
        fireEvent.click(addButton);
        
        // Verify no new todo was added
        const currentTodos = screen.getAllByRole('listitem');
        expect(currentTodos.length).toBe(initialCount);
    });

    test('trims whitespace from todo text', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const addButton = screen.getByText('Add Todo');
        
        // Add todo with whitespace
        fireEvent.change(input, { target: { value: '  Learn TypeScript  ' } });
        fireEvent.click(addButton);
        
        // Verify the todo appears with trimmed text
        expect(screen.getByText('Learn TypeScript')).toBeInTheDocument();
        expect(screen.queryByText('  Learn TypeScript  ')).not.toBeInTheDocument();
    });

    test('displays no todos message when all todos are deleted', () => {
        render(<TodoList />);
        
        // Delete all todos
        const deleteButtons = screen.getAllByText('✕');
        deleteButtons.forEach(button => {
            fireEvent.click(button);
        });
        
        // Verify no todos message appears
        expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        
        // Verify stats show zero
        expect(screen.getByText(/Total: 0/)).toBeInTheDocument();
        expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
        expect(screen.getByText(/Remaining: 0/)).toBeInTheDocument();
    });

    test('applies correct CSS classes to completed todos', () => {
        render(<TodoList />);
        
        const completedTodo = screen.getByText('Practice JavaScript');
        const incompleteTodo = screen.getByText('Learn React');
        
        // Check initial states
        expect(completedTodo.closest('li')).toHaveClass('todo-item', 'completed');
        expect(incompleteTodo.closest('li')).toHaveClass('todo-item');
        expect(incompleteTodo.closest('li')).not.toHaveClass('completed');
    });

    test('add button is disabled when input is empty', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        const addButton = screen.getByText('Add Todo');
        
        // Initially button should be disabled (empty input)
        expect(addButton).toBeDisabled();
        
        // Type something to enable button
        fireEvent.change(input, { target: { value: 'Test todo' } });
        expect(addButton).not.toBeDisabled();
        
        // Clear input to disable button again
        fireEvent.change(input, { target: { value: '' } });
        expect(addButton).toBeDisabled();
    });

    test('handles form submission via Enter key', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a new todo...');
        
        // Type and press Enter
        fireEvent.change(input, { target: { value: 'Todo via Enter' } });
        fireEvent.submit(input.closest('form'));
        
        // Verify the todo was added
        expect(screen.getByText('Todo via Enter')).toBeInTheDocument();
        expect(input.value).toBe('');
    });
});