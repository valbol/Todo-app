const functions = require('firebase-functions');
const app = require('express')();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo,
} = require('./APIs/todos');

const auth = require('./util/auth');
const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails,
} = require('./APIs/users');

//CRUD
app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);

//Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);
// firebase cloud function - https://firebase.google.com/docs/functions/http-events
exports.api = functions.https.onRequest(app);