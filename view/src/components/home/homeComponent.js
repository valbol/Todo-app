import React from 'react';

import Todo from '../../components/todo/todoComponent';
import Account from '../../components/account/accountComponent';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotesIcon from '@material-ui/icons/Notes';
import {
  Avatar,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  CircularProgress,
} from '@material-ui/core/';
import { homeStyles } from '../../shared/styles';

const HomeComponent = props => {
  //   const { classes: props.classes } = props.props;
  console.log('[home compoenent]', props);

  if (props.state.uiLoading === true) {
    console.log('In if');
    return (
      <div className={props.classes.root}>
        {props.state.uiLoading && (
          <CircularProgress size={50} className={props.classes.uiProgess} />
        )}
      </div>
    );
  } else {
    return (
      <div className={props.classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={props.classes.appBar}>
          <Toolbar>
            <Typography variant='h6' noWrap>
              TodoApp
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={props.classes.drawer}
          variant='permanent'
          classes={{
            paper: props.classes.drawerPaper,
          }}
        >
          <div className={props.classes.toolbar} />
          <Divider />
          <center>
            <Avatar
              src={props.state.profilePicture}
              className={props.classes.avatar}
            />
            <p>
              {' '}
              {props.state.firstName} {props.state.lastName}
            </p>
          </center>
          <Divider />
          <List>
            <ListItem button key='Todo' onClick={props.loadTodoPage}>
              <ListItemIcon>
                {' '}
                <NotesIcon />{' '}
              </ListItemIcon>
              <ListItemText primary='Todo' />
            </ListItem>

            <ListItem button key='Account' onClick={props.loadAccountPage}>
              <ListItemIcon>
                {' '}
                <AccountBoxIcon />{' '}
              </ListItemIcon>
              <ListItemText primary='Account' />
            </ListItem>

            <ListItem button key='Logout' onClick={props.logoutHandler}>
              <ListItemIcon>
                {' '}
                <ExitToAppIcon />{' '}
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Drawer>
        {/* TODO: return line bellow */}
        <div>{props.state.render ? <Account /> : <Todo />}</div>
      </div>
    );
  }
};

export default withStyles(homeStyles)(HomeComponent);
