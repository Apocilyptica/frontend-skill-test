import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";
import { setDarkMode } from "../../redux/Styles/styles.actions";

// Material-ui
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";

// Material-ui Icons
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Component
import SocialLinks from "../SocilaLinks";
import UserAvatar from "../UserAvatar";

// Links
import { socialLinksData } from "../../utils/socialLinks";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from "../DropdownMenu";

const mapState = ({ user, style }) => ({
  currentUser: user.currentUser,
  darkMode: style.darkMode,
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
  },
  rootDarkMode: {
    backgroundColor: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
  },
  titleDarkMode: {
    flexGrow: 1,
    color: theme.palette.primary.main,
  },
  userName: {
    fontWeight: 600,
  },
  setStatus: {
    fontSize: 10,
  },
  setStatusButton: {
    margin: theme.spacing(1, 2),
  },
  signInButton: {
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
  signInButtonText: {
    fontSize: 15,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(0, 1, 0, 0),
  },
}));

const TopNav = (props) => {
  const classes = useStyles(props);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser, darkMode } = useSelector(mapState);

  const handleSignOut = () => {
    currentUser ? dispatch(signOutUserStart()) : history.push("/login");
  };

  const handleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <Collapse in={props.collapse}>
      <Toolbar className={!darkMode ? classes.root : classes.rootDarkMode}>
        {props.cellPhoneButton}
        {socialLinksData.map((link, index) => {
          return (
            <IconButton key={index} edge="start" aria-label={link.label}>
              <SocialLinks href={link.URL} target="_blank" icon={link.iconUI} color={link.color} />
            </IconButton>
          );
        })}
        <Hidden only={["sm", "xs"]}>
          <Typography className={!darkMode ? classes.title : classes.titleDarkMode} variant="h6">
            Welcome to Recipe World!
          </Typography>
        </Hidden>
        <Hidden only={["lg", "md", "xl"]}>
          <Typography className={!darkMode ? classes.title : classes.titleDarkMode} variant="h6">
            Recipe World
          </Typography>
        </Hidden>
        <div>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Switch checked={darkMode} onChange={handleDarkMode} name="darkMode" color="primary" />
            <Hidden only={["xs", "sm"]}>{currentUser && <Grid item>Hello, {currentUser.displayName}</Grid>}</Hidden>
            {!currentUser && (
              <Grid item>
                <Button className={classes.signInButton} variant="outlined" color="secondary" onClick={handleSignOut}>
                  <Typography className={classes.signInButtonText}>Sign In</Typography>
                  <FontAwesomeIcon icon={faSignInAlt} />
                </Button>
              </Grid>
            )}
            {currentUser && (
              <Grid item>
                <DropdownMenu button={<UserAvatar currentUser={currentUser} />}>
                  <Typography variant="subtitle1">Signed in as</Typography>
                  <Typography className={classes.userName} variant="subtitle1">
                    {currentUser.displayName}
                  </Typography>
                  <Divider />
                  <Button className={classes.setStatusButton} variant="outlined" color="secondary">
                    <Typography className={classes.setStatus} align="center">
                      Set status
                    </Typography>
                  </Button>
                  <Divider />
                  <MenuItem>
                    <NavLink to={`/userprofile/${currentUser.displayName.replace(/\s/g, "")}`}>
                      <Typography variant="subtitle1">Your Profile</Typography>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to={`/useraccount/${currentUser.displayName.replace(/\s/g, "")}`}>
                      <Typography variant="subtitle1">Your Account</Typography>
                    </NavLink>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <Typography variant="subtitle1">Sign out</Typography>
                  </MenuItem>
                </DropdownMenu>
              </Grid>
            )}
          </Grid>
        </div>
      </Toolbar>
    </Collapse>
  );
};

TopNav.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(TopNav);
