import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import { defaultRecipesStart, defaultSpecialsStart, apiLoaded } from "./redux/Recipes/recipes.actions";

// Components
import ScrollTop from "./components/ScrollTop";
import Snackbar from "./components/Snackbar";

//  hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// Layouts
import MainLayout from "./Layouts/MainLayout";

// pages
import HomePage from "./Pages/HomePage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Recovery from "./Pages/Recovery";

// Material-ui
import Paper from "@material-ui/core/Paper";
import ToolBar from "@material-ui/core/ToolBar";

// Styles
import "./default.scss";

// Material-ui Styles
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: "100%",
    border: "none",
  },
  scrollTop: {
    height: 0,
  },
}));

const mapState = ({ style, recipes }) => ({
  darkMode: style.darkMode,
  recipes: recipes.recipes,
  localHost: recipes.defaultLocalHost,
});

const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode, recipes, localHost } = useSelector(mapState);
  const [snackbarSettings, setSnackbarSettings] = useState({ severity: "warning", message: `API Not Loaded @ http://localhost:${localHost}` });
  const [api] = useState("http://localhost:");

  const Theme = createTheme({
    palette: {
      primary: {
        light: "#ff8a50",
        main: "#ff5722",
        dark: "#c41c00",
      },
      secondary: {
        light: "#76d275",
        main: "#43a047",
        dark: "#00701a",
      },
      type: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "Lexend",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  useEffect(() => {
    if (recipes.length > 0) {
      dispatch(apiLoaded(true));
      setSnackbarSettings({ severity: "success", message: "API Loaded Successfully" });
    } else {
      dispatch(apiLoaded(false));
    }
    // ignore dispatch dependency warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  useEffect(() => {
    dispatch(checkUserSession());
    dispatch(defaultRecipesStart(api + `${localHost}/recipes`));
    dispatch(defaultSpecialsStart(api + `${localHost}/specials`));
    // ignore dispatch dependency warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localHost]);

  return (
    <ThemeProvider theme={Theme}>
      <div className={classes.scrollTop} id="back-to-top-anchor" />
      <Paper square className={classes.root} elevation={0} variant="outlined">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <HomePage api={`${api}${localHost}`} />
              </MainLayout>
            )}
          />
          <Route
            path="/registration"
            render={() => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
          <Route
            path="/recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
        </Switch>
        <ScrollTop {...props} />
      </Paper>
      {/* Material-ui's snackbar is causing this Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node */}
      <Snackbar {...snackbarSettings} />
    </ThemeProvider>
  );
};

export default App;
