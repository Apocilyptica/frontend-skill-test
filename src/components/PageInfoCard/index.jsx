import React, { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Hooks
import usePathName from "../../Hooks/usePathName";

// Material-ui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Material-ui icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    borderLeft: "5px solid",
    borderColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5],
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  header: {
    height: "100px",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    marginBottom: 120,
    paddingTop: 50,
    boxShadow: theme.shadows[5],
  },
  arrow: {
    display: "flex",
    alignItems: "center",
    margin: "0 5px",
    transform: "scale(0.8)",
  },
  navigation: {
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
  },
}));

const mapState = ({ currentPage }) => ({
  title: currentPage.title,
  description: currentPage.description,
});

const PageInfoCard = React.memo((props) => {
  const location = useLocation();
  const { uuid } = useParams();
  const classes = useStyles();
  const { title, description } = useSelector(mapState);
  const pathName = useMemo(() => location.pathname, [location]);
  const URLs = usePathName(pathName);

  const arrow = (
    <span className={classes.arrow}>
      <ArrowForwardIosIcon />
    </span>
  );

  return (
    <Grid container item xs={12} className={classes.header} justifyContent="center">
      <Card className={classes.root}>
        <CardContent>
          <CardActions>
            {URLs &&
              URLs.map((path, index) => {
                if (path === "/") {
                  return (
                    <Link key={index} to={path}>
                      <Typography variant="subtitle1" component="span" color="textPrimary" className={classes.navigation}>
                        HOME{arrow}
                      </Typography>
                    </Link>
                  );
                } else if (uuid && index === URLs.length - 1) {
                  return (
                    <Link key={index} to={path}>
                      <Typography variant="subtitle1" component="span" color="textPrimary" className={classes.navigation}>
                        {title}
                      </Typography>
                    </Link>
                  );
                } else if (uuid && index === URLs.length - 2) return null;
                return (
                  <Link key={index} to={path}>
                    <Typography variant="subtitle1" component="span" color="textPrimary" className={classes.navigation}>
                      {path.replace(/\\|\//g, "")}
                      {arrow}
                    </Typography>
                  </Link>
                );
              })}
          </CardActions>
          <Typography variant="h5" component="h2" color="textSecondary" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
});

export default PageInfoCard;
