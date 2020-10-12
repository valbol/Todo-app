import React from 'react';

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
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { styles } from '../../shared/styles';

const SignupComponent = props => {
  // console.log(props);

  //TODO fix errors - so it can be used in the txtfields e.g error={errors.firstName ? true : false}
  const errors = props.errors;
  console.log('[props.errors]', props.errors);
  const loading = props.loading;
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={props.classes.paper}>
        <Avatar className={props.classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={props.classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                autoFocus
                id='firstName'
                label='First Name'
                name='First Name'
                value={props.state.firstName.value}
                autoComplete='firstName'
                helperText={errors.firstName}
                error={
                  props.state.firstName.touched && !props.state.firstName.valid
                }
                onChange={props.onChange}
                onBlur={props.onBlur}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='Last Name'
                value={props.state.lastName.value}
                autoComplete='lastName'
                helperText={errors.lastName}
                error={
                  props.state.lastName.touched && !props.state.lastName.valid
                }
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='User Name'
                name='User Name'
                autoComplete='username'
                value={props.state.username.value}
                helperText={errors.username}
                error={errors.username ? true : false}
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='phoneNumber'
                label='Phone Number'
                name='Phone Number'
                autoComplete='phoneNumber'
                value={props.state.phoneNumber.value}
                pattern='[05][0-4]{1}[0-9]{7}'
                helperText={errors.phoneNumber}
                error={
                  props.state.phoneNumber.touched &&
                  !props.state.phoneNumber.valid
                }
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
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
                value={props.state.email.value}
                helperText={errors.email}
                error={
                  //   console.log(
                  //     '[error]',
                  //     props.state.email.valid,
                  //     props.state.email.touched
                  //   )
                  props.state.email.touched && !props.state.email.valid
                }
                // helperText={errors.forEach(k => {
                //   console.log('===in helper', typeof k);

                //   //   console.log(k.data.general);
                //   //   return k.data.general;
                //   return k;
                // })}
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='country'
                label='Country'
                name='Country'
                autoComplete='country'
                value={props.state.country.value}
                helperText={errors.country}
                error={
                  props.state.country.touched && !props.state.country.valid
                }
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='password'
                label='Password'
                name='Password'
                type='password'
                value={props.state.password.value}
                autoComplete='current-password'
                helperText={errors.password}
                error={
                  props.state.password.touched && !props.state.password.valid
                }
                onChange={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='confirmPassword'
                name='Confirmed Password'
                label='Confirm Password'
                type='password'
                value={props.state.confirmPassword.value}
                autoComplete='current-password'
                error={
                  props.state.confirmPassword.touched &&
                  !props.state.confirmPassword.valid
                }
                helperText={errors.confirmPassword}
                onChange={props.onChange}
              />
            </Grid>
          </Grid>
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
              !props.state.firstName.value ||
              !props.state.lastName.value ||
              !props.state.username.value ||
              !props.state.phoneNumber.value
            }
          >
            Sign Up
            {loading && (
              <CircularProgress size={30} className={props.classes.progress} />
            )}
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withStyles(styles)(SignupComponent);
