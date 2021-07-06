import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import SettingsIcon from '@material-ui/icons/Settings';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { useHistory } from 'react-router';









import {Route} from 'react-router-dom';
import CreatePoll from '../createpoll/createpoll';
import Home from '../home/home';
import Stats from '../stats/stats';
import { Link, useParams} from 'react-router-dom';
import './dashbase.scss';
import Settings from '../settings/settings';
import Edit from '../edit/edit';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
    width: `calc(100% - ${drawerWidth}px)`,
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
}));

export default function Dashbase() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleDrawerOpen = () => {
    document.getElementById('drawer').style.display = "block";
    setOpen(true);
  };

  const handleDrawerClose = () => {
    document.getElementById('drawer').style.display = "none";
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap >
            Easy Polls
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer id="drawer"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key="home" onClick={()=>{history.push("/dashboard/polls/home")}}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="create"  onClick={()=>{history.push("/dashboard/polls/create")}}>
              <ListItemIcon><NoteAddIcon/></ListItemIcon>
              <ListItemText primary="Create" />
            </ListItem>
            <ListItem button key="stats" onClick={()=>{history.push("/dashboard/polls/stats")}}>
              <ListItemIcon><InsertChartIcon/></ListItemIcon>
              <ListItemText primary="Stats" />
            </ListItem>
            <ListItem button key="edit"  onClick={()=>{history.push("/dashboard/polls/edit")}}>
              <ListItemIcon><CreateIcon/></ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button key="settings"  onClick={()=>{history.push("/dashboard/polls/settings")}}>
              <ListItemIcon><SettingsIcon/></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button key="logout"  onClick={()=>{history.push("/dashboard/polls/logout")}}>
              <ListItemIcon><MeetingRoomIcon/></ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Route path="/dashboard/polls/home">
                    <Home/>
              </Route>
              <Route path="/dashboard/polls/create">
                    <CreatePoll/>
              </Route>
              <Route path="/dashboard/polls/stats">
                    <Stats/>
              </Route>
              <Route path="/dashboard/polls/settings">
                <Settings/>
              </Route>
              <Route path="/dashboard/polls/edit">
                <Edit/>
              </Route>
      </main>
    </div>
  );
}
