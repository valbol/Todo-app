import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignupComponent from '../../components/signup/signupComponent';
import { checkValidity, updateObject } from '../../shared/utillity';

const SignupContainer = props => {
  const [state, setState] = useState({
    firstName: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    phoneNumber: {
      value: '',
      validation: {
        required: true,
        isPhone: true,
      },
      valid: false,
      touched: false,
    },
    username: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 15,
      },
      valid: false,
      touched: false,
    },
    country: {
      value: '',
      validation: {
        required: true,
        isNumeric: false,
      },
      valid: false,
      touched: false,
    },
    email: {
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
    confirmPassword: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = event => {
    console.log('[handle Change]', event.target.id, state[event.target.id]);
    const updatedState = updateObject(state, {
      ...state,
      [event.target.id]: updateObject(state[event.target.id], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          state[event.target.id].validation
        ),
        touched: true,
      }),
    });
    setState(updatedState);
    if (!updatedState[event.target.id].valid) {
      console.log('NOT VALID');
      setErrors({
        ...errors,
        [event.target.id]: event.target.name + ' not valid',
      });
      console.log(errors);
    } else {
      setErrors({
        ...errors,
        [event.target.id]: '',
      });
    }
    console.log('[updatedState]', updatedState);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const newUserData = {
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      phoneNumber: state.phoneNumber.value,
      username: state.username.value,
      email: state.email.value,
      country: state.country.value,
      password: state.password.value,
      confirmPassword: state.confirmPassword.value,
    };
    // setState(...state, { loading: true });
    setLoading(true);
    try {
      const response = await axios.post('/signup', newUserData);

      localStorage.setItem('AuthToken', `${response.data.token}`);
      //   setState(...state, { loading: false });
      setLoading(false);
      props.history.push('/');
    } catch (error) {
      //   setState(...state, {
      //     errors: error.response.data,
      //     loading: false,
      //   });
      setLoading(false);
      setErrors(errors.concat(error.response));
      console.log(error.response.data);
      // console.log(errors);
    }
  };
  return (
    <SignupComponent
      state={state}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      //   onError={null}
    ></SignupComponent>
  );
};

export default SignupContainer;
