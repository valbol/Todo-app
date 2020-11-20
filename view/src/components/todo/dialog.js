import React from 'react';

import { todoStyles } from '../../shared/styles';

import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, IconButton } from '@material-ui/core';

const DialogTitle = withStyles(todoStyles)(props => {
  const { children, classes, onClose, ...other } = props;
  console.log('[DialogTitle]', props);
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default DialogTitle;
