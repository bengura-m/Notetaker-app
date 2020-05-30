const express = require('express');
const bodyParser = require('body-parser');
const todos = require('./todos.js');

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.get('/notes', function (req, res) {
    var notes = todos.readTodo();
    res.render('notes', {
        note: notes
    });
});

app.get('/api/notes', function (req, res) {
    var notes = todos.readTodo();
    res.send(notes);
});

app.post('/api/notes', function (req, res) {
    todos.addTodo(req.body.title);
    res.redirect('/notes');
});

app.post('/api/notes/:id', function (req, res) {
    todos.deleteTodo(req.params.id);
    res.redirect('/notes');
});

app.get('*', function(req, res){
    res.render('index');
});

app.listen(5000, function() {
    console.log("Note Taker App server is running at port 5000...")
});