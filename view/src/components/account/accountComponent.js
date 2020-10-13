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

  const state = props.state;
  const profilePictureHandler = props.profilePictureHandler;
  const handleImageChange = props.handleImageChange;
  const handleChange = props.handleChange;
  const { classes, ...rest } = props;
  if (state.uiLoading === true) {
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
                  onClick={props.profilePictureHandler}
                >
                  Upload Photo
                </Button>
                <input type='file' onChange={props.handleImageChange} />

                {state.imageError ? (
                  <div className={classes.customError}>
                    {' '}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Email'
                    margin='dense'
                    name='email'
                    variant='outlined'
                    disabled={true}
                    value={state.email}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='Phone Number'
                    margin='dense'
                    name='phone'
                    type='number'
                    variant='outlined'
                    disabled={true}
                    value={state.phoneNumber}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label='User Name'
                    margin='dense'
                    name='userHandle'
                    disabled={true}
                    variant='outlined'
                    value={state.username}
                    onChange={props.handleChange}
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
                    onChange={props.handleChange}
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
          onClick={props.updateFormValues}
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
