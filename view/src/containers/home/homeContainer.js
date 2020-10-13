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

  const loadAccountPage = event => {
    setState({ ...state, render: true });
  };

  const loadTodoPage = event => {
    setState({ ...state, render: false });
  };

  const logoutHandler = event => {
    localStorage.removeItem('AuthToken');
    props.history.push('/login');
  };

  //   const mountedRef = useRef(true);

  //ComponentDidMount
  useEffect(() => {
    async function fetchProduct() {
      console.log('[useEffect]');
      let isSubscribed = true;
      authMiddleWare(props.history);
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common['Authorization'] = authToken;
      try {
        const response = await axios.get('/user');
        console.log(response.data);
        console.log('[isSubscribed]', isSubscribed);
        if (isSubscribed) {
          console.log(response.data);
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
          props.history.push('/login');
        }
        console.log(error.response);
        setState({ ...state, errorMsg: 'Error in retrieving the data' });
      }
      return () => (isSubscribed = false);
    }
    fetchProduct();
  }, []);

  return (
    <HomeComponent
      state={state}
      onLoadAccount={loadAccountPage}
      onLoadTodo={loadTodoPage}
      onLogout={logoutHandler}
    />
  );
};

export default HomeContainer;
