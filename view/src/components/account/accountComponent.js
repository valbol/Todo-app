import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

import clsx from 'clsx';

import { accountStyles } from '../../shared/styles';

const AccountComponent = props => {
  console.log('[AccountComponent]', props);

  // const state = props.state;
  // const profilePictureHandler = props.profilePictureHandler;
  // const imageChangeHandler = props.imageChangeHandler;
  // const   = props.onChange;
  const {
    classes,
    state,
    profilePictureHandler,
    updateFormValuesHandler,
    imageChangeHandler,
    onChange,
    error,
    render,
    ...rest
  } = props;

  if (state.uiLoading) {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {state.uiLoading && (
          <CircularProgress size={150} className={classes.uiProgess} />
        )}
      </main>
    );
  } else {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card {...rest} className={clsx(classes.root, classes)}>
          <CardContent>
            <div className={classes.details}>
              <div>
                <Typography
                  className={classes.locationText}
                  gutterBottom
                  variant='h4'
                >
                  {state.firstName} {state.lastName}
                </Typography>
                <Button
                  variant='outlined'
                  color='primary'
                  type='submit'
                  size='small'
                  startIcon={<CloudUploadIcon />}
                  className={classes.uploadButton}
                  onClick={profilePictureHandler}
                >
                  Upload Photo
                </Button>
                <input type='file' onChange={imageChangeHandler} />
                {state.imageError ? (
                  <div className={classes.customError}>
                    Wrong Image Format || Supported Format are PNG and JPG
                  </div>
                ) : (
                  false
                )}
              </div>
            </div>
            <div className={classes.progress} />
          </CardContent>
          <Divider />
        </Card>

        <br />
        <Card {...rest} className={clsx(classes.root, classes)}>
          <form autoComplete='off' noValidate>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='First name'
                    margin='dense'
                    name='firstName'
                    variant='outlined'
                    value={state.firstName}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Last name'
                    margin='dense'
                    name='lastName'
                    variant='outlined'
                    value={state.lastName}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Email'
                    margin='dense'
                    name='email'
                    variant='outlined'
                    disabled
                    value={state.email}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Phone Number'
                    margin='dense'
                    name='phone'
                    pattern='[05][0-4]{1}[0-9]{7}'
                    variant='outlined'
                    value={state.phone}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='User Name'
                    margin='dense'
                    name='userHandle'
                    disabled
                    variant='outlined'
                    value={state.username}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Country'
                    margin='dense'
                    name='country'
                    variant='outlined'
                    value={state.country}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions />
          </form>
        </Card>
        <Button
          color='primary'
          variant='contained'
          type='submit'
          className={classes.submitButton}
          onClick={props.updateFormValuesHandler}
          disabled={
            state.buttonLoading ||
            !state.firstName ||
            !state.lastName ||
            !state.country
          }
        >
          Save details
          {state.buttonLoading && (
            <CircularProgress size={30} className={classes.progess} />
          )}
        </Button>
      </main>
    );
  }
};

export default withStyles(accountStyles)(AccountComponent);
