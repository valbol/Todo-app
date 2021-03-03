import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
  Box,
} from '@material-ui/core';

import clsx from 'clsx';

import { accountStyles } from '../../shared/styles';

const AccountComponent = props => {
  console.log('[AccountComponent]', props);
  const {
    classes,
    state,
    onImageChange,
    onProfilePicture,
    onUpdateFormValues,
    onChange,
  } = props;

  if (state.uiLoading) {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {state.uiLoading && (
          <CircularProgress size={100} className={classes.uiProgress} />
        )}
      </main>
    );
  } else {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card className={clsx(classes.root, classes)}>
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
                  disabled={!state.imageLoaded}
                  startIcon={<CloudUploadIcon />}
                  className={classes.uploadButton}
                  onClick={onProfilePicture}
                >
                  Upload Photo
                </Button>
                <input
                  style={{ display: 'none' }}
                  accept='image/*'
                  onChange={onImageChange}
                  id='icon-button-file'
                  type='file'
                />
                <label htmlFor='icon-button-file'>
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                {state.imageError ? (
                  <div className={classes.customError}>
                    Wrong Image Format || Supported Format are PNG and JPG{' '}
                    {state.imageError}
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
          <Divider />
        </Card>
        <Card className={clsx(classes.root, classes)}>
          <form autoComplete='on' noValidate>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
            <Divider />
            <CardActions />
          </form>
        </Card>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginTop='10px'
        >
          <Button
            color='primary'
            variant='contained'
            type='submit'
            onClick={onUpdateFormValues}
            disabled={
              state.buttonLoading ||
              !state.firstName ||
              !state.lastName ||
              !state.country
            }
          >
            Save details
            {state.buttonLoading && (
              <CircularProgress size={100} className={classes.uiProgress} />
            )}
          </Button>
        </Box>
      </main>
    );
  }
};

export default withStyles(accountStyles)(AccountComponent);
