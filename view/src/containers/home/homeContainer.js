import React, { useEffect, useRef, useState } from 'react';

import HomeComponent from '../../components/home/homeComponent';
import axios from 'axios';
import { authMiddleWare } from '../../shared/utillity';

const HomeContainer = props => {
  console.log('[HomeContainer]');
  const [state, setState] = useState({
    render: false,
    firstName: '',
    lastName: '',
    profilePicture: '',
    uiLoading: true,
    imageLoading: false,
  });
  const [error, setError] = useState('');
  const [render, setRender] = useState(false);

  const loadAccountPage = () => {
    setRender(true);
  };

  const loadTodoPage = () => {
    setRender(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem('AuthToken');
    props.history.push('/login');
  };

  //   const mountedRef = useRef(true);
  async function fetchProduct() {
    console.log('[useEffect]');

    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    if (!authToken) {
      // isSubscribed = false;
      return;
    }
    axios.defaults.headers.common['Authorization'] = authToken;
    let isSubscribed = true;
    try {
      const response = await axios.get('/user');
      console.log(response.data);
      console.log('[isSubscribed]', isSubscribed);
      if (isSubscribed) {
        setState({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          country: response.data.userCredentials.country,
          username: response.data.userCredentials.username,
          uiLoading: false,
          profilePicture: response.data.userCredentials.imageUrl,
        });
      }
    } catch (error) {
      if (error.response.status === 403) {
        isSubscribed = false;
        props.history.push('/login');
      }
      console.log(error.response);
      setError('Error in retrieving the data');
    }
    return () => (isSubscribed = false);
  }
  //ComponentDidMount
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <HomeComponent
      state={state}
      render={render}
      onLoadAccount={loadAccountPage}
      onLoadTodo={loadTodoPage}
      onLogout={logoutHandler}
      error={error}
    />
  );
};

export default HomeContainer;
