import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm Component', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    // Check if input and button are present
    expect(screen.getByPlaceholderText('Enter a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('calls onAddTodo when form is submitted with valid input', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    // Type and submit
    await user.type(input, 'New todo item');
    await user.click(button);
    
    // Check if callback was called with correct value
    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item');
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
  });

  test('clears input after successful submission', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    // Type and submit
    await user.type(input, 'Test todo');
    await user.click(button);
    
    // Input should be cleared
    expect(input).toHaveValue('');
  });

  test('does not call onAddTodo with empty input', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const button = screen.getByText('Add Todo');
    
    // Try to submit without typing anything
    await user.click(button);
    
    // Callback should not be called
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('does not call onAddTodo with whitespace-only input', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    // Type only whitespace and submit
    await user.type(input, '   ');
    await user.click(button);
    
    // Callback should not be called
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('button is disabled when input is empty', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const button = screen.getByText('Add Todo');
    
    // Button should be disabled initially
    expect(button).toBeDisabled();
  });

  test('button is enabled when input has content', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    // Type something
    await user.type(input, 'Some text');
    
    // Button should be enabled
    expect(button).toBeEnabled();
  });

  test('button is disabled when input only contains whitespace', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    const button = screen.getByText('Add Todo');
    
    // Type only whitespace
    await user.type(input, '   ');
    
    // Button should still be disabled
    expect(button).toBeDisabled();
  });

  test('can submit form by pressing Enter', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    
    // Type and press Enter
    await user.type(input, 'Todo via Enter');
    await user.keyboard('{Enter}');
    
    // Check if callback was called
    expect(mockOnAddTodo).toHaveBeenCalledWith('Todo via Enter');
    expect(input).toHaveValue('');
  });

  test('respects maxLength attribute', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    
    // Check if maxLength is set
    expect(input).toHaveAttribute('maxLength', '100');
  });

  test('updates input value correctly during typing', async () => {
    const user = userEvent.setup();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByPlaceholderText('Enter a new todo...');
    
    // Type gradually and check value updates
    await user.type(input, 'Test');
    expect(input).toHaveValue('Test');
    
    await user.type(input, ' todo');
    expect(input).toHaveValue('Test todo');
  });
});
