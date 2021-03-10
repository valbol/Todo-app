import React, { useState } from 'react';

import Todo from '../../containers/todo/todoContainer';
import Account from '../../containers/account/accountContainer';
import clsx from 'clsx';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotesIcon from '@material-ui/icons/Notes';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

import { useTheme } from '@material-ui/core/styles';
import { homeStyles } from '../../shared/styles';

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

const HomeComponent = props => {
  console.log('[home compoenent]', props);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const itemsList = [
    { text: 'Todo', icon: <NotesIcon />, operation: props.onLoadTodo },
    {
      text: 'Account',
      icon: <AccountBoxIcon />,
      operation: props.onLoadAccount,
    },
    { text: 'Logout', icon: <ExitToAppIcon />, operation: props.onLogout },
  ];

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
        <AppBar
          position='fixed'
          className={clsx(props.classes.appBar, {
            [props.classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(props.classes.menuButton, {
                [props.classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              TODO app
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={clsx(props.classes.drawer, {
            [props.classes.drawerOpen]: open,
            [props.classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [props.classes.drawerOpen]: open,
              [props.classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={props.classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <div className={props.classes.toolbar} />
          <center>
            {open ? (
              <>
                <Avatar
                  src={props.state.profilePicture}
                  className={props.classes.avatar}
                />
                <p>
                  {props.state.firstName} {props.state.lastName}
                </p>
              </>
            ) : (
              <Avatar
                src={props.state.profilePicture}
                className={props.classes.avatar_small}
                style={{}}
              />
            )}
          </center>
          <Divider />
          <List>
            {itemsList.map(item => {
              const { text, icon, operation } = item;
              return (
                <ListItem
                  button
                  key={text}
                  onClick={() => {
                    handleDrawerClose();
                    operation();
                  }}
                >
                  <ListItemIcon>{icon && icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <div>
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
