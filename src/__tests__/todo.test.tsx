import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import ToDo from '@components/ToDo';

global.fetch = jest.fn(() => Promise.resolve({
	json: () => Promise.resolve({ data: { results: [] } }),
})) as jest.Mock;

test('add Todo', () => {
  render(<ToDo />);
  const input = screen.getByRole('textbox', { name: /task/i });
  const addButton = screen.getByRole('button', { name: /add/i });

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Task')).toBeInTheDocument();
});

test('mark Todo as done', () => {
  render(<ToDo />);
  const input = screen.getByRole('textbox', { name: /task/i });
  const addButton = screen.getByRole('button', { name: /add/i });

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  const completeButton = screen.getByRole('button', { name: /complete/i });
  fireEvent.click(completeButton);

  const todoItem = screen.getByText('New Task');
  expect(todoItem).toHaveClass('completed');
});

test('remove Todo', () => {
  render(<ToDo />);
  const input = screen.getByPlaceholderText('Add a new task here...');
  const addButton = screen.getByText('Add');

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  const removeButton = screen.getByText('Remove');
  fireEvent.click(removeButton);
  expect(screen.queryByText('New Task')).not.toBeInTheDocument();
});
