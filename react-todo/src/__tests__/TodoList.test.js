import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  describe('Initial Render Tests', () => {
    test('renders TodoList component correctly', () => {
      render(<TodoList />);
      
      // Check if the main heading is present
      expect(screen.getByText('Todo List')).toBeInTheDocument();
      
      // Check if the add todo form is present
      expect(screen.getByPlaceholderText('Enter a new todo...')).toBeInTheDocument();
      expect(screen.getByText('Add Todo')).toBeInTheDocument();
    });

    test('renders initial demo todos', () => {
      render(<TodoList />);
      
      // Check if initial todos are rendered
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
      expect(screen.getByText('Practice JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Master CSS')).toBeInTheDocument();
    });

    test('displays correct todo statistics', () => {
      render(<TodoList />);
      
      // Check initial statistics (4 total, 1 completed, 3 remaining)
      expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
      expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
      expect(screen.getByText(/Remaining: 3/)).toBeInTheDocument();
    });

    test('displays completed todo with line-through style', () => {
      render(<TodoList />);
      
      const completedTodo = screen.getByText('Practice JavaScript');
      expect(completedTodo).toHaveStyle('text-decoration: line-through');
      expect(completedTodo).toHaveStyle('opacity: 0.6');
    });
  });

  describe('Adding Todos Tests', () => {
    test('can add a new todo', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const input = screen.getByPlaceholderText('Enter a new todo...');
      const addButton = screen.getByText('Add Todo');
      
      // Type a new todo
      await user.type(input, 'New Test Todo');
      await user.click(addButton);
      
      // Check if the new todo appears
      expect(screen.getByText('New Test Todo')).toBeInTheDocument();
      
      // Check if input is cleared after adding
      expect(input).toHaveValue('');
      
      // Check if statistics are updated
      expect(screen.getByText(/Total: 5/)).toBeInTheDocument();
      expect(screen.getByText(/Remaining: 4/)).toBeInTheDocument();
    });

    test('can add todo by pressing Enter', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const input = screen.getByPlaceholderText('Enter a new todo...');
      
      // Type and press Enter
      await user.type(input, 'Todo via Enter');
      await user.keyboard('{Enter}');
      
      // Check if the new todo appears
      expect(screen.getByText('Todo via Enter')).toBeInTheDocument();
    });

    test('does not add empty todos', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const addButton = screen.getByText('Add Todo');
      const initialTodoCount = screen.getAllByTestId('todo-item').length;
      
      // Try to add empty todo
      await user.click(addButton);
      
      // Count should remain the same
      const finalTodoCount = screen.getAllByTestId('todo-item').length;
      expect(finalTodoCount).toBe(initialTodoCount);
    });

    test('does not add todos with only whitespace', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const input = screen.getByPlaceholderText('Enter a new todo...');
      const addButton = screen.getByText('Add Todo');
      const initialTodoCount = screen.getAllByTestId('todo-item').length;
      
      // Try to add whitespace-only todo
      await user.type(input, '   ');
      await user.click(addButton);
      
      // Count should remain the same
      const finalTodoCount = screen.getAllByTestId('todo-item').length;
      expect(finalTodoCount).toBe(initialTodoCount);
    });

    test('trims whitespace from todo text', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const input = screen.getByPlaceholderText('Enter a new todo...');
      const addButton = screen.getByText('Add Todo');
      
      // Add todo with leading/trailing whitespace
      await user.type(input, '  Trimmed Todo  ');
      await user.click(addButton);
      
      // Check if todo appears with trimmed text
      expect(screen.getByText('Trimmed Todo')).toBeInTheDocument();
    });

    test('add button is disabled when input is empty', () => {
      render(<TodoList />);
      
      const addButton = screen.getByText('Add Todo');
      
      // Button should be disabled initially (empty input)
      expect(addButton).toBeDisabled();
    });
  });

  describe('Toggling Todos Tests', () => {
    test('can toggle todo completion status', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Find an incomplete todo
      const learnReactTodo = screen.getByText('Learn React');
      
      // Initially should not have line-through
      expect(learnReactTodo).toHaveStyle('text-decoration: none');
      expect(learnReactTodo).toHaveStyle('opacity: 1');
      
      // Click to complete it
      await user.click(learnReactTodo);
      
      // Should now have line-through style
      expect(learnReactTodo).toHaveStyle('text-decoration: line-through');
      expect(learnReactTodo).toHaveStyle('opacity: 0.6');
      
      // Statistics should update
      expect(screen.getByText(/Completed: 2/)).toBeInTheDocument();
      expect(screen.getByText(/Remaining: 2/)).toBeInTheDocument();
    });

    test('can toggle completed todo back to incomplete', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Find the already completed todo
      const practiceJSTodo = screen.getByText('Practice JavaScript');
      
      // Initially should have line-through
      expect(practiceJSTodo).toHaveStyle('text-decoration: line-through');
      
      // Click to uncomplete it
      await user.click(practiceJSTodo);
      
      // Should no longer have line-through style
      expect(practiceJSTodo).toHaveStyle('text-decoration: none');
      expect(practiceJSTodo).toHaveStyle('opacity: 1');
      
      // Statistics should update
      expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
      expect(screen.getByText(/Remaining: 4/)).toBeInTheDocument();
    });

    test('todo item has correct CSS classes when completed', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const todoItem = screen.getByText('Learn React').closest('.todo-item');
      
      // Initially should not have completed class
      expect(todoItem).not.toHaveClass('completed');
      
      // Click to complete
      await user.click(screen.getByText('Learn React'));
      
      // Should now have completed class
      expect(todoItem).toHaveClass('completed');
    });
  });

  describe('Deleting Todos Tests', () => {
    test('can delete a todo', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Get initial count
      const initialTodos = screen.getAllByTestId('todo-item');
      const initialCount = initialTodos.length;
      
      // Find and click delete button for first todo
      const deleteButtons = screen.getAllByTestId('delete-button');
      await user.click(deleteButtons[0]);
      
      // Check that todo count decreased
      const remainingTodos = screen.getAllByTestId('todo-item');
      expect(remainingTodos).toHaveLength(initialCount - 1);
      
      // Check that statistics updated
      expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    });

    test('can delete specific todo', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Find "Learn React" todo and its delete button
      const learnReactTodo = screen.getByText('Learn React');
      const todoItem = learnReactTodo.closest('.todo-item');
      const deleteButton = todoItem.querySelector('.delete-btn');
      
      // Delete the specific todo
      await user.click(deleteButton);
      
      // Check that "Learn React" is no longer in the document
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
      
      // Check that other todos are still there
      expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
      expect(screen.getByText('Practice JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Master CSS')).toBeInTheDocument();
    });

    test('deleting completed todo updates statistics correctly', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Find "Practice JavaScript" (completed todo) and delete it
      const practiceJSTodo = screen.getByText('Practice JavaScript');
      const todoItem = practiceJSTodo.closest('.todo-item');
      const deleteButton = todoItem.querySelector('.delete-btn');
      
      await user.click(deleteButton);
      
      // Statistics should show 0 completed (since we deleted the only completed one)
      expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
      expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
      expect(screen.getByText(/Remaining: 3/)).toBeInTheDocument();
    });

    test('shows "no todos" message when all todos are deleted', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Delete all todos
      const deleteButtons = screen.getAllByTestId('delete-button');
      for (const button of deleteButtons) {
        await user.click(button);
      }
      
      // Should show no todos message
      expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
      
      // Statistics should show all zeros
      expect(screen.getByText(/Total: 0/)).toBeInTheDocument();
      expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
      expect(screen.getByText(/Remaining: 0/)).toBeInTheDocument();
    });

    test('delete button has correct title attribute', () => {
      render(<TodoList />);
      
      const deleteButtons = screen.getAllByTestId('delete-button');
      deleteButtons.forEach(button => {
        expect(button).toHaveAttribute('title', 'Delete todo');
      });
    });
  });

  describe('Integration Tests', () => {
    test('full workflow: add, toggle, and delete todo', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      // Add a new todo
      const input = screen.getByPlaceholderText('Enter a new todo...');
      await user.type(input, 'Integration Test Todo');
      await user.keyboard('{Enter}');
      
      // Verify it was added
      const newTodo = screen.getByText('Integration Test Todo');
      expect(newTodo).toBeInTheDocument();
      expect(newTodo).toHaveStyle('text-decoration: none');
      
      // Toggle it to completed
      await user.click(newTodo);
      expect(newTodo).toHaveStyle('text-decoration: line-through');
      
      // Delete it
      const todoItem = newTodo.closest('.todo-item');
      const deleteButton = todoItem.querySelector('.delete-btn');
      await user.click(deleteButton);
      
      // Verify it was deleted
      expect(screen.queryByText('Integration Test Todo')).not.toBeInTheDocument();
    });

    test('multiple rapid additions work correctly', async () => {
      const user = userEvent.setup();
      render(<TodoList />);
      
      const input = screen.getByPlaceholderText('Enter a new todo...');
      const todosToAdd = ['Todo 1', 'Todo 2', 'Todo 3'];
      
      // Add multiple todos rapidly
      for (const todoText of todosToAdd) {
        await user.type(input, todoText);
        await user.keyboard('{Enter}');
      }
      
      // Verify all were added
      todosToAdd.forEach(todoText => {
        expect(screen.getByText(todoText)).toBeInTheDocument();
      });
      
      // Check final count (4 initial + 3 added = 7)
      expect(screen.getByText(/Total: 7/)).toBeInTheDocument();
    });
  });
});
