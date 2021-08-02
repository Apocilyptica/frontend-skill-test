import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentRecipe } from "../../redux/PageDetails/pageDetails.actions";
import { recipeUpdateStart, apiChanged } from "../../redux/Recipes/recipes.actions";

// Components
import IngredientList from "../IngredientList";
import InstructionsList from "../InstructionsList";
import Snackbar from "../Snackbar";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/button";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  image: {
    width: "75%",
    paddingTop: "75%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "75%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
  },
  title: {
    textTransform: "uppercase",
  },
  list: {
    width: "100%",
  },
}));

const mapState = ({ recipes }) => ({
  apiHasChanged: recipes.apiChanged,
});

const Recipe = ({ recipe, api }) => {
  // i have recipe here in log
  const dispatch = useDispatch();
  const classes = useStyles();
  const { apiHasChanged } = useSelector(mapState);
  const [open, setOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<div></div>);
  const [ingredientsChanged, setIngredientsChanged] = useState(false);
  const [directionsChanged, setDirectionsChanged] = useState(false);
  const [recipeState, setRecipeState] = useState({
    ...recipe,
  });
  const [parentIngredientEdit, setParentIngredientEdit] = useState(false);
  const [parentDirectionEdit, setParentDirectionEdit] = useState(false);
  const [commitIngredients, setCommitIngredients] = useState(false);
  const [commitDirections, setCommitDirections] = useState(false);
  const [snackbarSettings] = useState({ severity: "success", message: "API Successfully Changed" });

  useEffect(() => {
    dispatch(updateCurrentRecipe(recipeState));
  }, []);

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleUpdateIngredients = () => {
    dispatch(apiChanged(false));
    setParentIngredientEdit(true);
    setCommitIngredients(true);
  };

  const handleUpdateInstructions = () => {
    dispatch(apiChanged(false));
    setParentDirectionEdit(true);
    setCommitDirections(true);
  };

  const handleCommitIngredients = () => {
    dispatch(recipeUpdateStart(recipeState, `${api}/recipes`));
    setParentIngredientEdit(false);
    setCommitIngredients(false);
    setIngredientsChanged(false);
  };

  const handleCommitInstructions = () => {
    dispatch(recipeUpdateStart(recipeState, `${api}/recipes`));
    setParentDirectionEdit(false);
    setCommitDirections(false);
    setDirectionsChanged(false);
  };

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5} align="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper
              className={classes.image}
              style={{
                backgroundImage: `url(${api}${recipe.images.full})`,
                backgroundPostition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Typography>{`Recipe Created: ${recipe.postDate}--Last Updated: ${recipe.editDate}`}</Typography>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper}>
              {ingredientsChanged && (
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5" component="h5" color="error">
                      * Ingredients have changed
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" onClick={handleUpdateIngredients}>
                      Stage Changes
                    </Button>
                    {commitIngredients && (
                      <Button variant="outlined" color="primary" onClick={handleCommitIngredients}>
                        Commit Changes
                      </Button>
                    )}
                  </Grid>
                </Grid>
              )}

              <Typography className={classes.title} variant="h4" component="h4" color="secondary">
                Ingredients
              </Typography>
              <List dense className={classes.list}>
                {recipe.ingredients.map((ingredient, index) => (
                  <IngredientList
                    key={index}
                    setChanged={setIngredientsChanged}
                    idx={index}
                    recipe={recipe}
                    ingredient={ingredient}
                    setOpen={setOpen}
                    setModalBody={setModalBody}
                    setRecipeState={setRecipeState}
                    parentEdit={parentIngredientEdit}
                    setParentEdit={setParentIngredientEdit}
                    setCommit={setCommitIngredients}
                  />
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper}>
              {directionsChanged && (
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5" component="h5" color="error">
                      * Instructions have changed
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" onClick={handleUpdateInstructions}>
                      Stage Changes
                    </Button>
                    {commitDirections && (
                      <Button variant="outlined" color="primary" onClick={handleCommitInstructions}>
                        Commit Changes
                      </Button>
                    )}
                  </Grid>
                </Grid>
              )}

              <Typography className={classes.title} variant="h4" component="h4" color="secondary">
                Instructions
              </Typography>
              <List className={classes.list}>
                {recipe.directions.map((direction, index) => (
                  <InstructionsList
                    key={index}
                    setChanged={setDirectionsChanged}
                    idx={index}
                    recipe={recipe}
                    direction={direction}
                    setRecipeState={setRecipeState}
                    parentEdit={parentDirectionEdit}
                    setParentEdit={setParentDirectionEdit}
                    setCommit={setCommitDirections}
                  />
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleModalClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {modalBody}
      </Modal>
      {apiHasChanged && <Snackbar {...snackbarSettings} />}
    </Grid>
  );
};

export default Recipe;
