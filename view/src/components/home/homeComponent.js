import React from 'react';

import Todo from '../../containers/todo/todoContainer';
import Account from '../../containers/account/accountContainer';

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

  if (props.state.uiLoading) {
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
              {props.state.firstName} {props.state.lastName}
            </p>
          </center>
          <Divider />
          <List>
            <ListItem button key='Todo' onClick={props.onLoadTodo}>
              <ListItemIcon>
                <NotesIcon />
              </ListItemIcon>
              <ListItemText primary='Todo' />
            </ListItem>

            <ListItem button key='Account' onClick={props.onLoadAccount}>
              <ListItemIcon>
                {' '}
                <AccountBoxIcon />{' '}
              </ListItemIcon>
              <ListItemText primary='Account' />
            </ListItem>

            <ListItem button key='Logout' onClick={props.onLogout}>
              <ListItemIcon>
                {' '}
                <ExitToAppIcon />{' '}
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </Drawer>
        <div>
          {console.log(props)}
          {props.render ? (
            <Account
              state={props.state}
              profilePictureHandler={props.profilePictureHandler}
              handleImageChange={props.handleImageChange}
              handleChange={props.handleChange}
              onDataChange={props.onDataChange}
            />
          ) : (
            <Todo state={props.state} />
          )}
        </div>
      </div>
    );
  }
};

export default withStyles(homeStyles)(HomeComponent);
