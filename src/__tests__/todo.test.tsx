import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ToDo from '@components/ToDo';

test('add Todo', () => {
	render(<ToDo />);
	const input = screen.getByRole('textbox', { name: /task/i });
	const addButton = screen.getByText('Add');

	fireEvent.change(input, { target: { value: 'New Task' } });
	fireEvent.click(addButton);

	expect(screen.getByText('New Task')).toBeInTheDocument();
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
})