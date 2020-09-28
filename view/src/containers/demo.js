import React, { Component } from 'react';
import LoginComponent from '../components/loginComponent';
import axios from 'axios';

//TODO: use this apiContext
const { Provider, Consumer } = React.createContext();

class loginContainer extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  };

  //TODO: replce this component
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({
  //       errors: nextProps.UI.errors,
  //     });
  //   }
  // }

  handleError = nextProps => {
    console.log('in [handleError]');
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  };

  handleChange = event => {
    console.log('In onChange');
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userData);
    try {
      const res = await axios.post('/login', userData);
      localStorage.setItem('AuthToken', `bearer ${res.data.token}`);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
      this.setState({
        errors: error.response,
        loading: false,
      });
    }
  };

  render() {
    return (
      <Provider value={this.state}>
        <h1>{this.props.title}</h1>
        <LoginComponent
          userInfo={this.state}
          changed={this.handleChange}
          submited={this.handleSubmit}
          errors={this.handleError}
        />
      </Provider>
    );
  }
}

export default loginContainer;
