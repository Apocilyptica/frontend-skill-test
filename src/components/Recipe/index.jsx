import React, { useState, useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { updateCurrentRecipe } from "../../redux/PageDetails/pageDetails.actions";
import { recipeUpdateStart } from "../../redux/Recipes/recipes.actions";

// Components
import IngredientList from "../IngredientList";
import InstructionsList from "../InstructionsList";

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

const Recipe = ({ recipe, api }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<div></div>);
  const [ingredientsChanged, setIngredientsChanged] = useState(false);
  const [recipeState, setRecipeState] = useState({
    ...recipe,
  });
  const [parentEdit, setparentEdit] = useState(false);
  const [commit, setCommit] = useState(false);

  useEffect(() => {
    dispatch(updateCurrentRecipe(recipeState));
  }, [recipeState]);

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    setparentEdit(true);
    setCommit(true);
  };

  const handleCommit = () => {
    dispatch(recipeUpdateStart(recipeState, `${api}/recipes`));
    setparentEdit(false);
    setCommit(false);
    setIngredientsChanged(false);
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
                    <Button variant="outlined" color="primary" onClick={handleUpdate}>
                      Stage Changes
                    </Button>
                    {commit && (
                      <Button variant="outlined" color="primary" onClick={handleCommit}>
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
                    setIngredientsChanged={setIngredientsChanged}
                    idx={index}
                    recipe={recipe}
                    ingredient={ingredient}
                    setOpen={setOpen}
                    setModalBody={setModalBody}
                    setRecipeState={setRecipeState}
                    parentEdit={parentEdit}
                    setParentEdit={setparentEdit}
                    setCommit={setCommit}
                  />
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper}>
              <Typography className={classes.title} variant="h4" component="h4" color="secondary">
                Instructions
              </Typography>
              <List className={classes.list}>
                <InstructionsList recipe={recipe} />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleModalClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {modalBody}
      </Modal>
    </Grid>
  );
};

export default Recipe;
