import React from "react";

// Redux
import { useSelector } from "react-redux";

// Material-ui
import Avatar from "@material-ui/core/Avatar";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  avatarDarkMode: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const mapState = ({ style }) => ({
  darkMode: style.darkMode,
});

const UserAvatar = ({ currentUser, styles }) => {
  const classes = useStyles();
  const { darkMode } = useSelector(mapState);

  return (
    <Avatar alt={currentUser.displayName} src={currentUser.avatar} className={!darkMode ? classes.avatar : classes.avatarDarkMode} style={styles}>
      {!currentUser.avatar ? currentUser.displayName[0] : null}
    </Avatar>
  );
};

export default UserAvatar;
