import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import BasicRecipeCard from "../BasicRecipeCard";

// Material-ui
import Grid from "@material-ui/core/Grid";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const mapState = ({ recipes }) => ({
  recipes: recipes.recipes,
  specials: recipes.specials,
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    width: "100%",
  },
}));

const Home = ({ api }) => {
  const classes = useStyles();
  const { recipes, specials } = useSelector(mapState);
  const [image, setImage] = useState(recipes.map((item) => item.images.full));
  const [imgApi, setimgApi] = useState(null);

  useEffect(() => {
    const fullImages = recipes.map((item) => item.images.full)[0];
    setImage(fullImages);
    setimgApi(`${api}${fullImages}`);
  }, [image]);

  return (
    <Grid container item xs={12} className={classes.root} spacing={3} alignContent="space-around">
      <Grid container item spacing={3} xs={8} direction="column">
        {recipes &&
          recipes.map((recipe) => (
            <BasicRecipeCard
              key={recipe.uuid}
              title={recipe.title}
              description={recipe.description}
              imageUrl={`${api}${recipe.images.medium}`}
              servings={recipe.servings}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
            />
          ))}
        {recipes &&
          recipes.map((recipe) => (
            <BasicRecipeCard
              key={recipe.uuid}
              title={recipe.title}
              description={recipe.description}
              imageUrl={`${api}${recipe.images.medium}`}
              servings={recipe.servings}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
            />
          ))}
      </Grid>
      <Grid container item xs={4}>
        stuff
      </Grid>
    </Grid>
  );
};

export default Home;
