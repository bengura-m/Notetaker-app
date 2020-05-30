const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

var addTodo = (title) => {
    var todos = fetchTodos();
    var todo = {
        id : uuidv1(),
        title
    };
    todos.push(todo);
    saveTodos(todos);
    return todo;
};

var deleteTodo = (id) => {
    var todos = fetchTodos();
    var filteredtodos = todos.filter((todo) => todo.id !== id);
    saveTodos(filteredtodos);
    return todos.length !== filteredtodos.length;
};

var readTodo = () => {
    var todos = fetchTodos();
    return todos;
};

// utility functions
var fetchTodos = () => {
    try {
        var todosString = fs.readFileSync('db.json');
        return JSON.parse(todosString);
    } catch (e) {
        return [];
    }
};

var saveTodos = (todos) => {
    fs.writeFileSync('db.json', JSON.stringify(todos));
};

module.exports = {
    addTodo,
    deleteTodo,
    readTodo
};