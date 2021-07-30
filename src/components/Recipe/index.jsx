import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import Special from "../Special";

// Material-ui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

// Material-ui Icons
import ListAltIcon from "@material-ui/icons/ListAlt";

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

  detailsDarkMode: {
    color: theme.palette.primary.main,
  },
  detailButton: {
    marginLeft: "20px",
    boxShadow: theme.shadows[5],
  },
}));

const mapState = ({ recipes, style }) => ({
  specials: recipes.specials,
  darkMode: style.darkMode,
});

const Recipe = ({ recipe, api }) => {
  const classes = useStyles();
  const { specials, darkMode } = useSelector(mapState);
  const [open, setOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<div></div>);

  const handleModalOpen = (special) => {
    setOpen(true);
    setModalBody(
      <div>
        <Special details={special} />
      </div>
    );
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const ingredients = () => {
    return recipe.ingredients.map((ingredient) => (
      <ListItem key={ingredient.uuid}>
        <ListItemAvatar>
          <Avatar>
            <ListAltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography
              type="body1"
              color={darkMode ? "textSecondary" : "textPrimary"}
            >{`${ingredient.amount} ${ingredient.measurement} ${ingredient.name}`}</Typography>
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
      </ListItem>
    ));
  };

  const directions = () => {
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
      </ListItem>
    ));
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
              <Typography className={classes.title} variant="h4" component="h4" color="secondary">
                Ingredients
              </Typography>
              <List dense>{ingredients()}</List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper}>
              <Typography className={classes.title} variant="h4" component="h4" color="secondary">
                Instructions
              </Typography>
              <List>{directions()}</List>
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
