import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../store/providers/GlobalProvider";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snack() {
  const classes = useStyles();
  const {
    snackbarState: { open, message, severity },
    closeSnackbar,
  } = useContext(GlobalContext);

 
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
