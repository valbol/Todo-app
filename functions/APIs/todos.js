const { db } = require('../util/admin');

exports.getAllTodos = async (request, response) => {
  let data = await db.collection('todos').orderBy('createdAt', 'desc').get();
  let todos = [];
  try {
    data.forEach(doc => {
      todos.push({
        todoId: doc.id,
        title: doc.data().title,
        body: doc.data().body,
        createdAt: doc.data().createdAt,
      });
    });
    return response.json(todos);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: err.code });
  }
};

exports.postOneTodo = async (request, response) => {
  if (request.body.body.trim() === '') {
    return response.status(400).json({ body: 'Body ust not be empty' });
  }

  if (request.body.title.trim() === '') {
    return response.status(400).json({ title: 'Title must not be empty' });
  }

  const newTodoItem = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
  };

  let result = await db.collection('todos').add(newTodoItem);
  try {
    const responseTodoItem = newTodoItem;
    responseTodoItem.id = result.id;
    return response.json(responseTodoItem);
  } catch (err) {
    response.status(500).json({ error: 'Something went wrong' });
    console.log(err);
  }
};

exports.deleteTodo = async (request, response) => {
  const document = db.doc(`/todos/${request.params.todoId}`);
  let todoItem = await document.get();

  if (!todoItem.exists) {
    console.log(request.params.todoId);
    return response
      .status(404)
      .json({ error: `Todo item not found - id=${request.params.todoId}` });
  }
  try {
    let result = await document.delete();
    response.json({ message: 'Delete successfull' });
    return result;
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: err.code });
  }
};

exports.editTodo = async (request, response) => {
  if (request.body.todoId || request.body.createdAt) {
    return response
      .status(403)
      .json({ message: 'Not allowed to edit the field' });
  }
  try {
    const document = db.collection('todos').doc(`${request.params.todoId}`);
    let updatedTodo = await document.update(request.body);
    response.json({ message: 'Updated successfully' });
    return updatedTodo;
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: err.code });
  }
};
