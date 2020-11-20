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
  CircularProgress,
  CardContent,
  Typography,
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DialogTitle from '../../components/todo/dialog';
import CloseIcon from '@material-ui/icons/Close';
import withStyles from '@material-ui/core/styles/withStyles';

import { todoStyles } from '../../shared/styles';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const TodoComponent = props => {
  console.log('[todo comp]', props);

  const {
    classes,
    handleClose,
    handleViewClose,
    handleSubmit,
    handleClickOpen,
  } = props;
  // const { viewOpen } = props.state.viewOpen;

  const DialogContent = withStyles(theme => ({
    viewRoot: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const Transition = React.forwardRef((props, ref) => {
    console.log('[Transition]');
    return <Slide direction='up' ref={ref} {...props} />;
  });

  dayjs.extend(relativeTime);
  if (props.state.uiLoading) {
    console.log('[IF-TODO]');
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.state.uiLoading && (
          <CircularProgress size={150} className={classes.uiProgess} />
        )}
      </main>
    );
  } else {
    console.log('[ELSE-TODO]');
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
          <AddCircleIcon
            // Circle Add Button theme
            style={{ fontSize: 50 }}
          />
        </IconButton>
        <Dialog
          fullScreen
          open={props.state.open}
          // onClose={props.handleClose}
          // TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={props.handleClose}
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
                autoFocus
                color='inherit'
                onClick={handleSubmit}
                className={classes.submitButton}
              >
                {props.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.todoItem}>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
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

        <Grid container spacing={2}>
          {props.state.todos.map(todo => (
            <Grid item xs={12} sm={6} key={todo.todoId}>
              <Card className={classes.root} variant='outlined'>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    {todo.title}
                  </Typography>
                  <Typography className={classes.pos} color='textSecondary'>
                    {dayjs(todo.createdAt).fromNow()}
                  </Typography>
                  <Typography variant='body2' component='p'>
                    {`${todo.body.substring(0, 65)}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => props.handleViewOpen({ todo })}
                  >
                    View
                  </Button>
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => props.handleEditClickOpen({ todo })}
                  >
                    Edit
                  </Button>
                  <Button
                    size='small'
                    color='primary'
                    onClick={() => props.deleteTodoHandler({ todo })}
                  >
                    Delete
                  </Button>
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
              readonly
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
