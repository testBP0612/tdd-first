import { useState } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
}

const ToDo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        text: inputValue,
        completed: false,
      }]);
      setInputValue('');
    }
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleCompleteTask = (index: number) => {
    const newTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ))
    setTasks(newTasks);
  };

  return (
    <div>
      <label htmlFor="new-task">Task</label>
      <input
        id="new-task"
        placeholder="Add a new task here..."
        onChange={handleInputChange}
        value={inputValue}
      />
      <button role="button" onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {task.text}
            <button onClick={() => handleRemoveTask(index)}>Remove</button>
            <button onClick={() => handleCompleteTask(index)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
