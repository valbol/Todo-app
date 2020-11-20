const { db } = require('../util/admin');

exports.getAllTodos = async (request, response) => {
  let data = await db
    .collection('todos')
    .where('username', '==', request.user.username)
    .orderBy('createdAt', 'desc')
    .get();
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
    return response.status(200).json(todos);
  } catch (err) {
    console.error(err);
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
    username: request.user.username,
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
  };

  let result = await db.collection('todos').add(newTodoItem);
  try {
    const responseTodoItem = newTodoItem;
    responseTodoItem.id = result.id;
    return response.status(200).json(responseTodoItem);
  } catch (err) {
    response.status(500).json({ error: 'Something went wrong' });
    console.error(err);
  }
};

exports.getOneTodo = async (request, response) => {
  const document = db.doc(`/todos/${request.params.todoId}`);
  let todoItem = await document.get();
  let todo = [];

  if (!todoItem.exists) {
    console.log(request.params.todoId);
    return response
      .status(404)
      .json({ error: `Todo item not found - id=${request.params.todoId}` });
  }
  try {
    todo.push({
      todoId: todoItem.id,
      title: todoItem.data().title,
      body: todoItem.data().body,
      createdAt: todoItem.data().createdAt,
    });
    return response.status(200).json(todo);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: err.code });
  }
};

exports.deleteTodo = async (request, response) => {
  const document = db.doc(`/todos/${request.params.todoId}`);
  //   let todoItem = await document.get();
  let todoItem = await document.get();

  if (!todoItem.exists) {
    console.log(request.params.todoId);
    return response
      .status(404)
      .json({ error: `Todo item not found - id=${request.params.todoId}` });
  }
  if (todoItem.data().username !== request.user.username) {
    return response.status(403).json({ error: 'Unauthorized' });
  }
  try {
    let result = await document.delete();
    console.info(`Deleted at ${JSON.stringify(result)}`);
    return response.status(200).json({ message: 'Delete successfull' });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: err.code });
  }
};

exports.editTodo = async (request, response) => {
  console.log('We are here');
  if (request.body.todoId || request.body.createdAt) {
    return response
      .status(403)
      .json({ message: 'Not allowed to edit the field' });
  }
  try {
    const document = db.collection('todos').doc(`${request.params.todoId}`);
    let updatedTodo = await document.update(request.body);
    console.info(`Updated at ${JSON.stringify(updatedTodo)}`);
    return response.status(200).json({
      message: 'Updated successfully',
    });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: err.code });
  }
};
