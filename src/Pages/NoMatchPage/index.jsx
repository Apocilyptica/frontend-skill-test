import React from "react";
import { Link, useLocation } from "react-router-dom";

// Material-ui
import Typography from "@material-ui/core/typography";
import Grid from "@material-ui/core/grid";
import Button from "@material-ui/core/button";

// Hooks
import useSetPageDetials from "../../Hooks/useSetPageDetails";

const NoMatchPage = (props) => {
  useSetPageDetials(props);
  const location = useLocation();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h1">We couldn't find that page</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2">At requested URL {location.pathname}</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined">
              <Typography variant="h5">
                <Link to="/">Return to hompepage</Link>
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoMatchPage;
