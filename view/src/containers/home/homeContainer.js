import React, { useEffect, useRef, useState } from 'react';

import HomeComponent from '../../components/home/homeComponent';
import axios from 'axios';
import { authMiddleWare } from '../../shared/utillity';
import todoContext from '../../shared/mycontext';

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
  const dataCahnge = childData => {
    setState({
      ...state,
      firstName: childData.firstName,
      lastName: childData.lastName,
      phoneNumber: childData.phoneNumber,
      country: childData.country,
      uiLoading: false,
    });
  };

  useEffect(() => {
    async function fetchProduct() {
      authMiddleWare(props.history);
      const authToken = localStorage.getItem('AuthToken');
      if (!authToken) {
        return;
      }
      axios.defaults.headers.common['Authorization'] = authToken;
      let isSubscribed = true;
      try {
        const response = await axios.get('/user');
        console.log('[isSubscribed]', response.data);
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
      } catch (err) {
        console.log('[err]', err);
        if (err.response.status === 403) {
          isSubscribed = false;
          props.history.push('/login');
          return;
        }
        console.log(err.response);
        setError('Error in retrieving the data');
      }
      return () => (isSubscribed = false);
    }
    //ComponentDidMount
    fetchProduct();
  }, []);

  const test = [{ name: 'test' }];
  return (
    <>
      <todoContext.Provider value={test}>
        <HomeComponent
          state={state}
          render={render}
          onLoadAccount={loadAccountPage}
          onLoadTodo={loadTodoPage}
          onLogout={logoutHandler}
          onDataChange={dataCahnge}
          error={error}
        />
      </todoContext.Provider>
    </>
  );
};

export default HomeContainer;
