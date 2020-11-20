import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { authMiddleWare } from '../../shared/utillity';
import AccountComponent from '../../components/account/accountComponent';
import { withRouter } from 'react-router';

const AccountContainer = props => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    country: '',
    profilePicture: '',
    uiLoading: true,
    buttonLoading: false,
    imageError: '',
    image: '',
  });
  const [error, setError] = useState('');

  const handleChange = event => {
    console.log(event.target);
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleImageChange = event => {
    setState({ ...state, image: event.target.files[0] });
    console.log(
      'handleImageChange===event.target.files[0] ',
      typeof event.target.files[0]
    );
  };

  const profilePictureHandler = event => {
    // console.log('event.target.files[0] ', event.target.files[0]);

    event.preventDefault();
    setState({ ...state, uiLoading: true });
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    let form_data = new FormData();
    form_data.append('image', state.image);
    form_data.append('content', state.content);
    axios.defaults.headers.common['Authorization'] = authToken;
    axios
      .post('/user/image', form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(() => {
        window.location.reload();
        console.log('success');
      })
      .catch(error => {
        if (error.response.status === 403) {
          props.history.push('/login');
        }
        console.log(error);
        setState({
          uiLoading: false,
          imageError: 'Error in posting the data',
        });
      });
  };

  //   const mountedRef = useRef(true);
  async function fetchUserData() {
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
          ...state,
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phone: response.data.userCredentials.phoneNumber,
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
    fetchUserData();
  }, []);

  const updateFormValues = event => {
    event.preventDefault();
    setState({ ...state, buttonLoading: true });
    authMiddleWare(props.history);
    console.log('props.history', props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const formRequest = {
      firstName: state.firstName,
      lastName: state.lastName,
      country: state.country,
      phoneNumber: state.phone,
    };
    axios
      .post('/user', formRequest)
      .then(() => {
        setState({ ...state, buttonLoading: false });
      })
      .catch(error => {
        if (error.response.status === 403) {
          props.history.push('/login');
        }
        console.log(error);
        setState({ ...state, buttonLoading: false });
      });
  };

  return (
    <AccountComponent
      state={state}
      onChange={handleChange}
      imageChangeHandler={handleImageChange}
      profilePictureHandler={profilePictureHandler}
      updateFormValuesHandler={updateFormValues}
    />
  );
};
export default withRouter(AccountContainer);
