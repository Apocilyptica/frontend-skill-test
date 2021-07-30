import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import RecipeCard from "../RecipeCard";

// Material-ui
import Grid from "@material-ui/core/Grid";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const mapState = ({ recipes, api }) => ({
  recipes: recipes.recipes,
});

const Recipes = (props) => {
  const classes = useStyles();
  const { recipes } = useSelector(mapState);

  return (
    <Grid container spacing={5} className={classes.root}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignContent="center" spacing={5}>
          {recipes &&
            recipes.map((recipe, index) => {
              return (
                <Grid key={index} item>
                  <RecipeCard recipe={recipe} {...props} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Recipes;
