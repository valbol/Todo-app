const functions = require('firebase-functions');

const app = require('express')();

let cors = require('cors');

const auth = require('./util/auth');

const {
  getAllTodos,
  getOneTodo,
  postOneTodo,
  deleteTodo,
  editTodo,
} = require('./APIs/todos');

const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUserDetail,
  updateUserDetails,
} = require('./APIs/users');

app.use(cors());
//CRUD - TODOs
app.get('/todos', auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo);
app.post('/todo', auth, postOneTodo);
app.delete('/todo/:todoId', auth, deleteTodo);
app.put('/todo/:todoId', auth, editTodo);

//Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);
// firebase cloud function - https://firebase.google.com/docs/functions/http-events
exports.api = functions.https.onRequest(app);
