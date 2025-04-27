// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos(filter = 'all') {
    const filteredTodos = filter === 'all' 
        ? todos 
        : filter === 'active' 
            ? todos.filter(todo => !todo.completed) 
            : todos.filter(todo => todo.completed);

    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        </li>
    `).join('');

    updateTaskCount();
}

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({
            id: Date.now(),
            text,
            completed: false
        });
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos(document.querySelector('.filter-btn.active').dataset.filter);
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos(document.querySelector('.filter-btn.active').dataset.filter);
}

// Clear completed todos
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

// Update task count
function updateTaskCount() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    taskCount.textContent = `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} left`;
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
        const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
        toggleTodo(todoId);
    }
    
    if (e.target.classList.contains('delete-btn') || e.target.classList.contains('fa-trash')) {
        const todoId = parseInt(e.target.closest('.todo-item').dataset.id);
        deleteTodo(todoId);
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        renderTodos(btn.dataset.filter);
    });
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Initial render
renderTodos();