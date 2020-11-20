import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { authMiddleWare } from '../../shared/utillity';

import TodoComponent from '../../components/todo/todoComponent';

const TodoContainer = props => {
  console.log('[TodoContainer]', props);
  const [state, setState] = useState({
    todos: [],
    errors: [],
    open: false,
    uiLoading: true,
    buttonType: '',
    title: '',
    body: '',
    viewOpen: false,
    todoId: '',
  });

  //Component did mount
  useEffect(() => {
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('/todos')
      .then(response => {
        console.log('[Got TODOS]', state.todos);
        setState({ ...state, todos: response.data, uiLoading: false });
      })
      .catch(err => {
        console.log('[failed TODOS]', err);
      });
  }, []);

  const handleSubmit = event => {
    authMiddleWare(props.history);
    event.preventDefault();
    const userTodo = {
      title: state.title,
      body: state.body,
    };
    let options = [];
    if (state.buttonType === 'Edit') {
      options = {
        url: `/todo/${state.todoId}`,
        method: 'put',
        data: userTodo,
      };
    } else {
      options = {
        url: '/todo',
        method: 'post',
        data: userTodo,
      };
    }
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common['Authorization'] = authToken;
    axios(options)
      .then(() => {
        setState({ ...state, open: false });
        window.location.reload();
        console.log('success');
      })
      .catch(error => {
        console.log('[handleSubmit]', error);
        setState({ ...state, open: true, errors: error.response.data });
      });
  };
  const deleteTodoHandler = data => {
    //TODO work on authMiddleWare - to check time expired
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common['Authorization'] = authToken;
    let todoId = data.todo.todoId;
    console.log('todoID', todoId);
    axios
      .delete(`/todo/${todoId}`)
      //   .delete(todoId)
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClickOpen = () => {
    setState({
      ...state,
      todoId: '',
      title: '',
      body: '',
      buttonType: '',
      open: true,
    });
  };

  const handleViewOpen = data => {
    setState({
      ...state,
      title: data.todo.title,
      body: data.todo.body,
      viewOpen: true,
    });
  };

  const handleEditClickOpen = data => {
    setState({
      ...state,
      title: data.todo.title,
      body: data.todo.body,
      todoId: data.todo.todoId,
      buttonType: 'Edit',
      open: true,
    });
  };

  const handleViewClose = () => {
    setState({ ...state, viewOpen: false });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  console.log('[TodoContainer]', state);
  return (
    <TodoComponent
      state={state}
      //   state={state}
      handleEditClickOpen={handleEditClickOpen}
      deleteTodoHandler={deleteTodoHandler}
      handleViewOpen={handleViewOpen}
      handleClickOpen={handleClickOpen}
      handleSubmit={handleSubmit}
      handleViewClose={handleViewClose}
      handleClose={handleClose}
      handleChange={handleChange}
    />
  );
};

export default TodoContainer;
