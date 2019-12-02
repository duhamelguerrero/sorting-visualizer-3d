import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmountCubes, sortCubes } from "../actions/cubes.actions";

import HeaderAlgorithmSelector from "./HeaderAlgorithmSelector";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputContainer: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  selectInput: {
    padding: theme.spacing(1, 1, 1, 1),
    color: theme.palette.common.white,
    width: 150
  },
  button: {
    marginLeft: "auto"
  }
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const amount = useSelector(state => state.cubes.amount);

  const onSortCubes = useCallback(() => {
    dispatch(sortCubes());
  }, []);

  const onChangeAmount = useCallback(e => {
    let value = parseInt(e.target.value);

    if (value < 1 || !value) {
      value = 1;
    } else if (value > 100) {
      value = 100;
    }

    dispatch(setAmountCubes(value));
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Sorting 3D Visualizer
          </Typography>

          <HeaderAlgorithmSelector />

          <div className={classes.inputContainer}>
            <InputBase
              placeholder="20"
              type="number"
              value={amount}
              onChange={onChangeAmount}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <Button
            color="inherit"
            onClick={onSortCubes}
            className={classes.button}
          >
            Sort
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
