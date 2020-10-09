import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  withStyles,
  Container,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import styles from '../../shared/styles';

const LoginComponent = props => {
  console.log('[component - props]');

  const errors = props.errors;
  const loading = props.loading;
  const open = props.open;

  const Alert = props => {
    console.log('[In alert]', props);
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  // const handleClick = () => {
  //   setOpen(true);
  // };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={props.classes.paper}>
        <Avatar className={props.classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={props.classes.form} noValidate>
          <TextField
            required={true}
            variant='outlined'
            margin='normal'
            fullWidth
            value={props.state.email.value}
            id='email'
            label='Email Address'
            type='email'
            name='email'
            autoComplete='email'
            autoFocus
            helperText={errors.email}
            error={props.state.email.touched && !props.state.email.valid}
            onChange={props.onChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='Password'
            label='Password'
            type='password'
            id='password'
            autoFocus
            value={props.state.password.value}
            autoComplete='current-password'
            error={props.state.password.touched && !props.state.password.valid}
            helperText={errors.password}
            onChange={props.onChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={props.classes.submit}
            onClick={props.onSubmit}
            disabled={
              loading ||
              !props.state.email.value ||
              !props.state.password.value ||
              (props.state.password.touched && !props.state.password.valid) ||
              (props.state.email.touched && !props.state.email.valid)
            }
          >
            Sign In
            {loading && (
              <CircularProgress size={30} className={props.classes.progress} />
            )}
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={props.onAlertClose}
          >
            <Alert onClose={props.onAlertClose} severity='error'>
              {errors.http}
            </Alert>
          </Snackbar>
          <Grid container>
            <Grid item>
              <Link href='signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withStyles(styles)(LoginComponent);
