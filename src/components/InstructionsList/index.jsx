import React, { useState, useEffect } from "react";

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
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

// Material-ui Icons
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";

// Material-ui styles
import { makeStyles } from "@material-ui/core/styles";

// Styles
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  detailButton: {
    marginLeft: "20px",
    boxShadow: theme.shadows[5],
  },
  textField: {
    width: "30ch",
  },
  margin: {
    margin: theme.spacing(1),
  },
  details: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

const mapState = ({ recipes, style, user, currentPage }) => ({
  specials: recipes.specials,
  darkMode: style.darkMode,
  currentUser: user.currentUser,
  currentRecipe: currentPage.recipe,
});

const InstructionsList = ({ idx, recipe, direction, setChanged, setRecipeState, parentEdit, setParentEdit, setCommit }) => {
  const classes = useStyles();
  const { darkMode, currentUser, currentRecipe } = useSelector(mapState);
  const adminAuth = checkUserIsAdmin(currentUser);
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState({
    instructions: direction.instructions,
    optional: direction.optional,
  });
  const [originalValues] = useState({
    instructions: recipe.directions[idx].instructions,
    optional: recipe.directions[idx].optional,
  });

  useEffect(() => {
    if (parentEdit === true) setEdit(false);
  }, [parentEdit]);

  useEffect(() => {
    if (originalValues.instructions !== values.instructions || originalValues.optional !== values.optional) setChanged(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (currentRecipe.hasOwnProperty("directions")) {
      setRecipeState((current) => {
        currentRecipe.directions[idx] = { ...direction, ...values };
        return {
          ...current,
          directions: [...currentRecipe.directions],
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  const handleEdit = () => {
    setEdit(!edit);
    setParentEdit(edit);
    setCommit(false);
  };

  const handleUpdate = () => {
    console.log("update attempt");
  };

  const handleChange = (key) => (event) => {
    let value = event.target.value;
    if (value === "false") value = false;
    if (value === "true") value = true;
    setValues({ ...values, [key]: value });
  };

  return (
    <ListItem key={idx}>
      <ListItemAvatar>
        <Avatar>{idx + 1}</Avatar>
      </ListItemAvatar>
      <Grid container className={classes.details}>
        {edit ? (
          Object.keys(values).map((key, index) => {
            const rows = Math.ceil(values[key].length / 15);

            return (
              <FormControl key={index} className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-direction-detail">{key}</InputLabel>
                <Input
                  id="standard-adornment-direction-detail"
                  label="somthing"
                  type="text"
                  value={values[key]}
                  onChange={handleChange(key)}
                  multiline
                  rowsMin={rows}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleUpdate}>
                        <DoneIcon color="secondary" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            );
          })
        ) : (
          <ListItemText
            primary={
              <Typography type="body1" color={darkMode ? "textSecondary" : "textPrimary"}>
                {values.instructions}
              </Typography>
            }
            secondary={
              <Typography type="body2" color="primary">
                {values.optional ? "optional" : null}
              </Typography>
            }
          />
        )}
      </Grid>
      {adminAuth && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
            {edit ? <DoneAllIcon /> : <EditIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default InstructionsList;
