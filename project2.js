const todoList = document.querySelector('#todo-list');
const newTodoInput = document.querySelector('#new-todo-input');
const addTodoButton = document.querySelector('#add-todo-button');

function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.status === 'complete';
        checkbox.addEventListener('change', () => updateTodoStatus(todo._id, checkbox.checked));
        const title = document.createElement('span');
        title.textContent = todo.title;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(todo._id));
        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function addTodo() {
    const title = newTodoInput.value;
    axios.post('/api/todos', { title })
        .then(res => {
            renderTodos([...todos, res.data]);
            newTodoInput.value = '';
        })
        .catch(err => {
            console.log(err);
        });
}

function updateTodoStatus(id, status) {
    axios.put(`/api/todos/${id}`, { status: status ? 'complete' : 'incomplete' })
        .then(res => {
            const index = todos.findIndex(todo => todo._id === res.data._id);
            todos[index] = res.data;
        })
};