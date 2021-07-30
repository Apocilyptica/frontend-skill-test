import React from "react";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Material-ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Material-ui icons
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "300px",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "500px",
    },
  },
  rootDarkMode: {
    display: "flex",
    height: "300px",
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.grey[700],
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      height: "500px",
    },
  },
  details: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 500,
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
    },
  },
  recipeDetails: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  recipeDetail: {
    display: "flex",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  link: {
    padding: "10px",
  },
  linkDetails: {
    display: "flex",
    alignItems: "center",
  },
}));

const mapState = ({ style }) => ({
  darkMode: style.darkMode,
});

const BasicRecipeCard = ({ uuid, imageUrl, title, description, servings, prepTime, cookTime }) => {
  const classes = useStyles();
  const { darkMode } = useSelector(mapState);

  return (
    <Grid item>
      <Card className={!darkMode ? classes.root : classes.rootDarkMode}>
        <CardMedia className={classes.cover} image={imageUrl} title={title} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h4" variant="h4">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
            <Typography variant="h6" color="textSecondary" className={classes.link}>
              <Link to={`/recipes/${title.toLowerCase().replace(/\s/g, "_")}/${uuid}`}>
                <div className={classes.linkDetails}>
                  READ MORE
                  <ArrowForwardIcon />
                </div>
              </Link>
            </Typography>
          </CardContent>
          <div className={classes.recipeDetails}>
            <div className={classes.recipeDetail}>
              <Typography variant="subtitle1" color="textSecondary" style={{ paddingRight: "5px" }}>
                servings:
              </Typography>
              <Typography variant="h6" color="textPrimary">
                {servings}
              </Typography>
            </div>
            <div className={classes.recipeDetail}>
              <Typography variant="subtitle1" color="textSecondary" style={{ paddingRight: "5px" }}>
                prepTime:
              </Typography>
              <Typography variant="h6" color="textPrimary">
                {prepTime}
              </Typography>
            </div>
            <div className={classes.recipeDetail}>
              <Typography variant="subtitle1" color="textSecondary" style={{ paddingRight: "5px" }}>
                cookTime:
              </Typography>
              <Typography variant="h6" color="textPrimary">
                {cookTime}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default BasicRecipeCard;
