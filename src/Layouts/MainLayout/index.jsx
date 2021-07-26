import React from "react";

// Components
import Header from "../../components/Header";

// Material-ui
import Paper from "@material-ui/core/Paper";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
}));

const MainLayout = (props) => {
  const classes = useStyles();

  return (
    <>
      <Header {...props} />
      <Paper className={classes.root} variant="outlined" square>
        {props.children}
      </Paper>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
