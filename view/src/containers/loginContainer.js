import React, { useState } from 'react';
import LoginComponent from '../components/loginComponent';
import axios from 'axios';

//TODO: use this apiContext
const { Provider, Consumer } = React.createContext();

const LoginContainer = props => {
  const [state, setState] = useState({
    email: '',
    password: '',
    errors: [],
    loading: false,
  });

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  // const [loading, setLoading] = useState(false);

  // handleChange = event => {
  //   console.log('In onChange');
  //   switch (event.target.name) {
  //     case email:
  //       setEmail(event.target.value);
  //       break;
  //     case password:
  //       setPassword(event.target.value);
  //       break;
  //     case errors:
  //       setErrors(event.target.value);
  //       break;
  //     case loading:
  //       setLoading(event.target.value);
  //   }
  // };
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

  // static getDerivedStateFromProps(nextProps, prevState){

  // }
  const currentErrors = state.errors;
  const handleError = nextProps => {
    console.log('in [handleError]');
    if (currentErrors !== nextProps.UI.errors) {
      setState({ ...state, errors: state.errors.concat(nextProps.UI.errors) });
    }
  };

  const handleChange = event => {
    console.log('In [onChange]');
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setState({ ...state, loading: true });
    const userData = {
      email: state.email,
      password: state.password,
    };
    console.log(userData);
    try {
      const res = await axios.post('/login', userData);
      localStorage.setItem('AuthToken', `bearer ${res.data.token}`);
      setState({ ...state, loading: false });
      props.history.push('/');
      console.log('login successfully');
    } catch (error) {
      console.log('===In errors --[catch]===');
      console.log(error.response);
      setState({
        email: '',
        password: '',
        // errors: state.errors.concat(error),
        errors: [],
        // // errors: state.errors.push(error),
        loading: false,
      });
      // handleChange();
    }
  };
  console.log('===============');
  console.log(state);
  console.log('===============');
  return (
    <Provider value={state}>
      <h1>{props.title}</h1>
      <LoginComponent
        userInfo={state}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={handleError}
        // TODO: check where it is onErrors
      />
    </Provider>
  );
};

export default LoginContainer;
