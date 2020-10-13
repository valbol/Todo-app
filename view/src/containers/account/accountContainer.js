import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { authMiddleWare } from '../../shared/utillity';
import AccountComponent from '../../components/account/accountComponent';

const AccountContainer = props => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    username: '',
    country: '',
    profilePicture: '',
    uiLoading: true,
    buttonLoading: false,
    imageError: '',
  });

  const handleChange = event => {
    setState(...state, {
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = event => {
    setState(...state, {
      image: event.target.files[0],
    });
  };

  const profilePictureHandler = event => {
    event.preventDefault();
    setState(...state, {
      uiLoading: true,
    });
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    let form_data = new FormData();
    form_data.append('image', state.image);
    form_data.append('content', state.content);
    axios.defaults.headers.common[Authorization] = authToken;
    axios
      .post('/user/image', form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(() => {
        window.location.reload();
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
  useEffect(() => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('/user')
      .then(response => {
        console.log(response.data);
        setState(...state, {
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          country: response.data.userCredentials.country,
          username: response.data.userCredentials.username,
          uiLoading: false,
        });
      })
      .catch(error => {
        if (error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        setState(...state, { errorMsg: 'Error in retrieving the data' });
      });
  });

  const updateFormValues = event => {
    event.preventDefault();
    setState(...state, { buttonLoading: true });
    authMiddleWare(props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const formRequest = {
      firstName: state.firstName,
      lastName: state.lastName,
      country: state.country,
    };
    axios
      .post('/user', formRequest)
      .then(() => {
        setState({ buttonLoading: false });
      })
      .catch(error => {
        if (error.response.status === 403) {
          this.props.history.push('/login');
        }
        console.log(error);
        this.setState({
          buttonLoading: false,
        });
      });
  };

  return (
    <AccountComponent
      state={state}
      onChange={handleChange}
      onImageChange={handleImageChange}
      profilePictureHandler={profilePictureHandler}
      updateFormValues={updateFormValues}
    />
  );
};
export default AccountContainer;
