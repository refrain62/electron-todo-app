interface Todo {
  text: string;
}

const todoList: HTMLElement = document.getElementById('todo-list')!;
const newTodoInput: HTMLInputElement = document.getElementById('new-todo') as HTMLInputElement;
const addTodoButton: HTMLButtonElement = document.getElementById('add-todo') as HTMLButtonElement;
const saveTodosButton: HTMLButtonElement = document.getElementById('save-todos') as HTMLButtonElement;

addTodoButton.addEventListener('click', () => {
  const todoText: string = newTodoInput.value.trim();

  if (todoText) {
    const li: HTMLLIElement = document.createElement('li');
    li.textContent = todoText;
    todoList.appendChild(li);
    newTodoInput.value = '';
  }
});

saveTodosButton.addEventListener('click', () => {
  const todos: Todo[] = [];

  todoList.querySelectorAll('li').forEach(li => {
    todos.push({ text: li.textContent! });
  });

  const blob: Blob = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' });
  const url: string = URL.createObjectURL(blob);
  const a: HTMLAnchorElement = document.createElement('a');

  a.href = url;
  a.download = 'todos.json';
  a.click();
  
  URL.revokeObjectURL(url);
});
