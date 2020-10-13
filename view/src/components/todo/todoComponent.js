import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { todoStyles } from '../../shared/styles';

const TodoComponent = props => {
  console.log('[todo comp]');
  return (
    <main className={props.classes.content}>
      <div className={props.classes.toolbar} />
      <Typography paragraph>Hello I am todo</Typography>
    </main>
  );
};

export default withStyles(todoStyles)(TodoComponent);
