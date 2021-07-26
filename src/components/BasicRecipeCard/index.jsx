import React from "react";

// Material-ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  recipeDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const BasicRecipeCard = ({ imageUrl, title, description, servings, prepTime, cookTime }) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={imageUrl} title={title} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
          <div className={classes.recipeDetails}>
            <Typography variant="subtitle1" color="textSecondary">
              servings: {servings}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              prepTime: {prepTime}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              cookTime: {cookTime}
            </Typography>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default BasicRecipeCard;
