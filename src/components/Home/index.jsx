import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import BasicRecipeCard from "../BasicRecipeCard";
import EventCard from "../EventCard";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const mapState = ({ recipes }) => ({
  recipes: recipes.recipes,
  specials: recipes.specials,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
}));

const Home = ({ api }) => {
  const classes = useStyles();
  const { recipes, specials } = useSelector(mapState);
  const [image, setImage] = useState(recipes.map((item) => item.images.full));

  useEffect(() => {
    const fullImages = recipes.map((item) => item.images.full)[0];
    setImage(fullImages);
  }, [image, recipes]);

  return (
    <Grid container className={classes.root} spacing={5}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignContent="center" spacing={5}>
          <Grid item>
            <Grid container direction="column" justifyContent="center" alignContent="center" spacing={5}>
              <Grid item>
                <Typography variant="h3" color="textSecondary">
                  Recently Added
                </Typography>
              </Grid>
              {recipes &&
                recipes.map((recipe) => (
                  <BasicRecipeCard
                    key={recipe.uuid}
                    uuid={recipe.uuid}
                    title={recipe.title}
                    description={recipe.description}
                    imageUrl={`${api}${recipe.images.medium}`}
                    servings={recipe.servings}
                    prepTime={recipe.prepTime}
                    cookTime={recipe.cookTime}
                  />
                ))}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" justifyContent="center" alignContent="center" alignItems="center" spacing={5}>
              <Grid item>
                <Typography variant="h3" color="textSecondary">
                  Events Comming Soon
                </Typography>
              </Grid>
              <Grid item>
                {specials.map((special) => {
                  if (special.type === "event") {
                    return <EventCard key={special.uuid} event={special} />;
                  }
                  return null;
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
