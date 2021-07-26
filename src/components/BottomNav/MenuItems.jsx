import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// Material-ui
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";

// Material-ui Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fullHeight: {
    height: 50,
    backgroundColor: theme.palette.background.paper,

    "&:hover": {
      transition: ".2s ease-in-out",
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "& > *": {
      margin: theme.spacing(2),
    },
  },
  paperRoot: {
    flexGrow: 1,
    flexWrap: "wrap",
    overflow: "hidden",
  },

  menuItems: {
    color: theme.palette.secondary.main,

    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  menuItem: {
    fontWeight: 600,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    height: 75 + theme.spacing(2),
    padding: theme.spacing(4),
    fontWeight: 600,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
}));

const MenuItems = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Link to={props.URL}>
        <Button className={classes.fullHeight} ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup="true">
          <Typography className={classes.navLink} color="primary" variant="h6">
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>{props.title}</Grid> <Grid item>{props.menuItems.length !== 0 && <ExpandMoreIcon />}</Grid>
            </Grid>
          </Typography>
        </Button>
      </Link>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Collapse
            in={open}
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
            {...(open ? { timeout: 1000 } : {})}
          >
            <Paper className={classes.paperRoot} elevation={10}>
              {props.menuItems.length !== 0 &&
                props.menuItems.map((item, index) => {
                  return (
                    <Link key={index} to={item.URL}>
                      <MenuItem className={classes.menuItems} onClick={handleClose}>
                        <Typography className={classes.menuItem} variant="h6">
                          {item.menuItem}
                        </Typography>
                      </MenuItem>
                    </Link>
                  );
                })}
            </Paper>
          </Collapse>
        )}
      </Popper>
    </div>
  );
};

export default MenuItems;
