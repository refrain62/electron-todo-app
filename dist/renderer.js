"use strict";
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const saveTodosButton = document.getElementById('save-todos');
addTodoButton.addEventListener('click', () => {
    const todoText = newTodoInput.value.trim();
    if (todoText) {
        const li = document.createElement('li');
        li.textContent = todoText;
        todoList.appendChild(li);
        newTodoInput.value = '';
    }
});
saveTodosButton.addEventListener('click', () => {
    const todos = [];
    todoList.querySelectorAll('li').forEach(li => {
        todos.push({ text: li.textContent });
    });
    const blob = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.json';
    a.click();
    URL.revokeObjectURL(url);
});
