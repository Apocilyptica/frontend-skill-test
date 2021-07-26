import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordStart, resetUserState } from "../../redux/User/user.actions";

// Material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Material-ui Icons
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ErrorIcon from "@material-ui/icons/Error";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  signin: {
    margin: theme.spacing(3, 0, 1),
  },
  signingoogle: {
    margin: theme.spacing(0, 0, 2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  error: {
    fontSize: 12,
  },
}));

const EmailPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Recovery
        </Typography>

        {!Array.isArray(userErr) && (
          <Grid container justifyContent="center" alignItems="center" spacing={0}>
            <Grid item xs={1}>
              <ErrorIcon color="error" />
            </Grid>
            <Grid item xs={11}>
              <Typography className={classes.error} color="error">
                {userErr}
              </Typography>
            </Grid>
          </Grid>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => handleChange(event)}
            value={email}
          />
          <Button onClick={handleSubmit} fullWidth variant="contained" color="primary" className={classes.signingoogle}>
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default EmailPassword;
