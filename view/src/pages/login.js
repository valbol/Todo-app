//Material UI components
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progess: {
    position: 'absolute',
  },
});

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: [],
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleChange = event => {
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
      const res = await axios.post(
        // 'http://localhost:5000/todoapp-ef974/us-central1/api/login',
        // 'https://us-central1-todoapp-ef974.cloudfunctions.net/api/login',
        '/login',
        userData
      );
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
    const classes = this.props.classes;
    console.log('========props===========');
    console.log(this.props);
    const { errors, loading, password } = this.state;
    console.log('errors');
    console.log(errors);
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>{' '}
          <Typography component='h1' variant='h5'>
            Login{' '}
          </Typography>{' '}
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              type='email'
              name='email'
              autoComplete='email'
              autoFocus
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
            />{' '}
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              helperText={'Password should be more than 5 chars'}
              error={password.length < 5 ? true : false}
              onChange={this.handleChange}
            />{' '}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleSubmit}
              disabled={loading || !this.state.email || !this.state.password}
            >
              Sign In{' '}
              {loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}{' '}
            </Button>{' '}
            <Grid container>
              <Grid item>
                <Link href='signup' variant='body2'>
                  {' '}
                  {"Don't have an account? Sign Up"}{' '}
                </Link>{' '}
              </Grid>{' '}
            </Grid>{' '}
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {' '}
                {errors.general}{' '}
              </Typography>
            )}{' '}
          </form>{' '}
        </div>{' '}
      </Container>
    );
  }
}
export default withStyles(styles)(login);
