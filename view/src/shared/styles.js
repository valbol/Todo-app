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
const drawSmall = 1.75;
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
  avatar_samll: {
    height: 65,
    width: 65,
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
    margin: 8,
    [theme.breakpoints.up('xs')]: {
      height: 45,
      width: 45,
      display: 'flex',
      alignItems: 'center',
      marginTop: 50,
      margin: 8,
    },
  },
});

export const accountStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  locationText: {
    paddingLeft: '15px',
  },
  buttonProperty: {
    position: 'absolute',
    top: '50%',
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
  progess: {
    position: 'absolute',
  },
  uploadButton: {
    backgroundColor: '#35baf6',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '8px',
      margin: theme.spacing(1),
      backgroundColor: 'white',
    },
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  submitButton: {
    marginTop: '10px',
  },
});

export const todoStyles = theme => ({
  // .., // Existing CSS elements
  title: {
    marginLeft: theme.spacing(3),
    flex: 1,
  },
  submitButton: {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: 14,
    right: 10,
    marginRight: theme.spacing(10),
  },
  floatingButton: {
    bottom: 0,
    right: 15,
    position: 'fixed',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: theme.zIndex.drawer + 10,
      right: 0,
      // backgroundColor: 'black',
      // fontSize: 20,
      // fontSize: 'small',
    },
  },
  circleButton: {
    fontSize: 80,
    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
      // backgroundColor: 'black',
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
    paddingLeft: '20px',
    paddingRight: '20px',
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
  uiProgess: {
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
