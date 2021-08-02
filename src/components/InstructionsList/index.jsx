import React from "react";

// Redux
import { useSelector } from "react-redux";

// Utils
import { checkUserIsAdmin } from "../../utils/user";

// Material-ui
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

// Material-ui Icons
import EditIcon from "@material-ui/icons/Edit";

const mapState = ({ style, user }) => ({
  darkMode: style.darkMode,
  currentUser: user.currentUser,
});

const InstructionsList = ({ recipe }) => {
  const { darkMode, currentUser } = useSelector(mapState);
  const adminAuth = checkUserIsAdmin(currentUser);

  return recipe.directions.map((direction, index) => (
    <ListItem key={index}>
      <ListItemAvatar>
        <Avatar>{index + 1}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography type="body1" color={darkMode ? "textSecondary" : "textPrimary"}>
            {direction.instructions}
          </Typography>
        }
        secondary={
          <Typography type="body2" color="primary">
            {direction.optional ? "optional" : null}
          </Typography>
        }
      />
      {adminAuth && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit">
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  ));
};

export default InstructionsList;
