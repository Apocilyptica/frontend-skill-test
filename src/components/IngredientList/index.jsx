import React, { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import Special from "../Special";

// Utils
import { checkUserIsAdmin } from "../../utils/user";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

// Material-ui Icons
import ListAltIcon from "@material-ui/icons/ListAlt";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Styles
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  detailButton: {
    marginLeft: "20px",
    boxShadow: theme.shadows[5],
  },
  textField: {
    width: "25ch",
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

const IngredientList = ({ idx, recipe, ingredient, setOpen, setModalBody, setChanged, setRecipeState, parentEdit, setParentEdit, setCommit }) => {
  const classes = useStyles();
  const { specials, darkMode, currentUser, currentRecipe } = useSelector(mapState);
  const adminAuth = checkUserIsAdmin(currentUser);
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState({
    amount: ingredient.amount,
    measurement: ingredient.measurement,
    name: ingredient.name,
  });
  const [originalValues] = useState({
    amount: recipe.ingredients[idx].amount,
    measurement: recipe.ingredients[idx].measurement,
    name: recipe.ingredients[idx].name,
  });

  useEffect(() => {
    if (parentEdit === true) setEdit(false);
  }, [parentEdit]);

  useEffect(() => {
    if (originalValues.amount !== values.amount || originalValues.measurement !== values.measurement || originalValues.name !== values.name)
      setChanged(true);
  }, [values]);

  useEffect(() => {
    if (currentRecipe.hasOwnProperty("ingredients")) {
      setRecipeState((current) => {
        currentRecipe.ingredients[idx] = { ...ingredient, ...values };
        return {
          ...current,
          ingredients: [...currentRecipe.ingredients],
        };
      });
    }
  }, [edit]);

  const handleModalOpen = (special) => {
    setOpen(true);
    setModalBody(
      <div>
        <Special details={special} />
      </div>
    );
  };

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
    if (!isNaN(value)) value = parseInt(value);
    setValues({ ...values, [key]: value });
  };

  return (
    <ListItem key={idx}>
      <ListItemAvatar>
        <Avatar>
          <ListAltIcon />
        </Avatar>
      </ListItemAvatar>
      <Grid container className={classes.details}>
        {edit ? (
          Object.keys(values).map((key, index) => {
            const rows = Math.ceil(values[key].length / 15);

            return (
              <FormControl key={index} className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-ingredient-detail">{key}</InputLabel>
                <Input
                  id="standard-adornment-ingredient-detail"
                  label="somthing"
                  type={key === "amount" ? "number" : "text"}
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
            disableTypography
            primary={
              <Typography
                type="body1"
                color={darkMode ? "textSecondary" : "textPrimary"}
              >{`${values.amount} ${values.measurement} ${values.name}`}</Typography>
            }
            secondary={specials.map((special) => {
              if (special.ingredientId === ingredient.uuid)
                return (
                  <Typography key={special.uuid} type="body2" color="primary">
                    {special.text}
                    <Button
                      value={special.uuid}
                      className={classes.detailButton}
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleModalOpen(special)}
                    >
                      {special.title}
                    </Button>
                  </Typography>
                );
              return null;
            })}
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

export default IngredientList;
