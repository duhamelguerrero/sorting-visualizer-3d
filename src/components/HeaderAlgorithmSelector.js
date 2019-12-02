import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedAlgorithm } from "../actions/sort.actions";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 4),
    width: "100%",
    maxWidth: 140,
    backgroundColor: "inherit"
  },
  button: {
    width: "100%"
  }
}));

export default function SimpleListMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const algorithms = useSelector(state => state.sort.algorithms);
  const algorithmSelected = useSelector(state => state.sort.algorithmSelected);
  const dispatch = useDispatch();

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);

    dispatch(setSelectedAlgorithm(index));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="when device is locked"
        onClick={handleClickListItem}
        color="inherit"
        endIcon={<ArrowDropDownIcon />}
      >
        {algorithms[algorithmSelected]}
      </Button>

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {algorithms.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === algorithmSelected}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
