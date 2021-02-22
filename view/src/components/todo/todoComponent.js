import React from 'react';

import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  TextField,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DialogTitle from '../../components/todo/dialog';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { todoStyles } from '../../shared/styles';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Icon from '@material-ui/core/Icon';

const TodoComponent = props => {
  console.log('[todo comp]', props);

  const {
    classes,
    handleClose,
    handleViewClose,
    handleSubmit,
    handleClickOpen,
    handleViewOpen,
    handleEditClickOpen,
    deleteTodoHandler,
  } = props;

  const DialogContent = withStyles(theme => ({
    viewRoot: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const buttonsList = [
    {
      name: 'View',
      icon: <VisibilityIcon />,
      color: 'primary',
      func: handleViewOpen,
    },
    {
      name: 'Edit',
      icon: <EditIcon />,
      color: 'primary',
      func: handleEditClickOpen,
    },
    {
      name: 'Delete',
      icon: <DeleteIcon />,
      color: 'secondary',
      func: deleteTodoHandler,
    },
  ];
  dayjs.extend(relativeTime);
  if (props.state.uiLoading) {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.state.uiLoading && (
          <CircularProgress size={150} className={classes.uiProgess} />
        )}
      </main>
    );
  } else {
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <IconButton
          // Add Todo button
          className={classes.floatingButton}
          color='primary'
          aria-label='Add Todo'
          onClick={handleClickOpen}
        >
          <AddCircleIcon className={classes.circleButton} />
        </IconButton>
        <Dialog fullScreen open={props.state.open}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                {props.state.buttonType === 'Edit'
                  ? 'Edit Todo'
                  : 'Create a new Todo'}
              </Typography>
              <Button
                variant='outlined'
                edge='start'
                autoFocus
                color='inherit'
                onClick={handleSubmit}
                fontWeight='fontWeightBold'
                className={classes.submitButton}
              >
                {props.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.todoItem}>
            <form className={classes.form} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='todoTitle'
                    label='Todo Title'
                    name='title'
                    autoComplete='todoTitle'
                    helperText={props.state.errors}
                    value={props.state.title}
                    error={props.state.errors.length !== 0 ? true : false}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='todoDetails'
                    label='Todo Details'
                    name='body'
                    autoComplete='todoDetails'
                    multiline
                    rows={25}
                    rowsMax={25}
                    helperText={props.state.errors}
                    error={props.state.errors.length !== 0 ? true : false}
                    onChange={props.handleChange}
                    value={props.state.body}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </Dialog>
        <Grid
          className={classes.gridContainer}
          container
          spacing={3}
          justify='flex-end'
          alignItems='center'
          justify-content='space-around'
        >
          {props.state.todos.map(todo => (
            <Grid item xs={12} md={6} key={todo.todoId}>
              <Card
                className={classes.root}
                // raised
                variant='outlined'
              >
                <CardContent
                  title={todo.title}
                  subheader={dayjs(todo.createdAt).fromNow()}
                ></CardContent>
                <CardContent>
                  <Typography variant='h6' component='p'>
                    {`${todo.body.substring(0, 65)}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  {buttonsList.map(item => {
                    const { name, icon, color, func } = item;
                    return (
                      <Button
                        key={name}
                        size='small'
                        color={color}
                        variant='outlined'
                        startIcon={icon}
                        onClick={() => func({ todo })}
                      >
                        {name}
                      </Button>
                    );
                  })}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          onClose={handleViewClose}
          aria-labelledby='customized-dialog-title'
          open={props.state.viewOpen}
          fullWidth
          classes={{ paperFullWidth: classes.dialogeStyle }}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleViewClose}>
            {props.state.title}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              fullWidth
              id='todoDetails'
              name='body'
              multiline
              readOnly
              rows={1}
              rowsMax={25}
              value={props.state.body}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </DialogContent>
        </Dialog>
      </main>
    );
  }
};

export default withStyles(todoStyles)(TodoComponent);
