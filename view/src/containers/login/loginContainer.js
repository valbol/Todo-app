import React, { useEffect, useRef, useState } from 'react';
import LoginComponent from '../../components/login/loginComponent';
import axios from 'axios';
import { checkValidity, updateObject } from '../../shared/utillity';

//TODO: use this apiContext
const { Provider, Consumer } = React.createContext();

const LoginContainer = props => {
  const [state, setState] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    http: '',
  });

  //TODO:================================================
  //TODO: replce this component
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({
  //       errors: nextProps.UI.errors,
  //     });
  //   }
  // }

  //TODO:================================================
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  }, [props.errors]);

  const currentErrors = state.errors;
  const handleError = nextProps => {
    // console.log('in [handleError]', nextProps.UI.errors);
    if (currentErrors !== nextProps.UI.errors) {
      // console.log('in [handleError]', nextProps.UI.errors);
      setState({ ...state, errors: state.errors.concat(nextProps.UI.errors) });
    }
  };

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
    setLoading(true);
    const userData = {
      email: state.email.value,
      password: state.password.value,
    };
    console.log(userData);
    try {
      const res = await axios.post('/login', userData);
      localStorage.setItem('AuthToken', `bearer ${res.data.token}`);
      setLoading(false);
      props.history.push('/');
      console.log('login successfully');
    } catch (error) {
      console.log('===In errors --[catch]===');
      console.log(error.response);
      const updatedState = updateObject(state, {
        ...state,
        password: updateObject(state['password'], { value: '' }),
      });
      setState(updatedState);
      setErrors({ ...error, http: error.response.data.general });
      setLoading(false);
      setOpen(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Provider value={state}>
      <LoginComponent
        state={state}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onError={handleError}
        errors={errors}
        loading={loading}
        open={open}
        onAlertClose={handleAlertClose}
        // TODO: check where it is onErrors
      />
    </Provider>
  );
};

export default React.memo(LoginContainer);
