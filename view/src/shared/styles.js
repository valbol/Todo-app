export const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute',
  },
});

const drawerWidth = 250;
const drawSmall = 1.6;
export const homeStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 2}px)`,
    [theme.breakpoints.up('xs')]: {
      width: `calc(100% - ${drawerWidth * drawSmall + 2}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    [theme.breakpoints.up('xs')]: {
      width: drawerWidth * drawSmall,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    height: 100,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginDown: 20,
  },
  avatar_small: {
    height: 65,
    width: 65,
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    [theme.breakpoints.up('xs')]: {
      height: 45,
      width: 45,
      marginTop: 10,
    },
  },
});

export const accountStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  root: { minWidth: 200 },
  details: {
    display: 'flex',
  },
  locationText: {
    paddingLeft: '15px',
  },

  uploadButton: {
    marginLeft: '8px',
    margin: theme.spacing(2),
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#b3e5fc',
    },
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  uiProgress: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
});

export const todoStyles = theme => ({
  title: {
    marginLeft: theme.spacing(3),
    flex: 1,
  },
  submitButton: {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    position: 'fixed',
    top: 14,
    right: 10,
    marginRight: theme.spacing(10),

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),
      top: 10,
    },
  },
  floatingButton: {
    position: 'fixed',
    margin: 'auto',
    bottom: 5,
    right: 15,
    zIndex: theme.zIndex.drawer + 10,
    [theme.breakpoints.down('md')]: {
      display: 'block',
      position: 'fixed',
      right: 20,
      bottom: 10,
      // marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      position: 'fixed',
      right: 3,
      bottom: 27,
      // marginLeft: theme.spacing(1),
    },
  },
  circleButton: {
    fontSize: 80,
    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
      zIndex: theme.zIndex.drawer + 10,
    },
  },
  form: {
    width: '98%',
    marginLeft: 13,
    marginTop: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '10px',
  },
  root: {
    minWidth: 200,
  },
  todoItem: {
    margin: theme.spacing(7),
    padding: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  uiProgress: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
  dialogeStyle: {
    maxWidth: '50%',
  },
  viewRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
