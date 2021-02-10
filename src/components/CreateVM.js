import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2)
  }

}));

export default function CreateVM() {
  const classes = useStyles();
  const [state, setState] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();
  // setState({...state, osType : ''})

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const onSubmit = (evt) => {
    console.log("FROM CREATE:", state);
    // axios.post("https://faas-cloud-backend.mouhammad.ml/", state)
    // .then(res => {
    //   console.log(typeof res.data);
    //   if(typeof res.data === 'string' ) {
    //     setError(res.data)
    //   }else {
    //     history.push("/list-vm");
    //   }
    // })
    // .catch(err => console.log(err))
    // console.log("object");
  }


  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
      VM creation Form
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="vmName"
          name="name"
          label="Nom VM"
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          onChange={handleChange}
          required
          id="vmNumber"
          name="numberOfVm"
          label="Nombre de VM"
          fullWidth
          autoComplete="family-name"
        />
      </Grid>
        <Grid item sm={4}>
          <TextField
            required
            type="number"
            onChange={handleChange}
            id="cpu"
            name="cpu"
            label="Nombre de CPU"
            fullWidth
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            type="number"
            onChange={handleChange}
            required
            id="ram"
            name="memory"
            label="Ram"
            fullWidth
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            required
            type="number"
            onChange={handleChange}
            id="disk"
            name="disk"
            label="Disque"
            fullWidth
          />
        </Grid>
        <Grid item sm={5}>
          <FormControl className={classes.formControl}>
            <InputLabel id="os-type">Os Type</InputLabel>
            <Select
              required
              labelId="os-type"
              onChange={handleChange}
              id="os-type"
              value={state.osType}
              name="osType"
            >
              <MenuItem value={"Debian"}>Linux</MenuItem>
              <MenuItem value={"Windows"}>Windows</MenuItem>
              <MenuItem value={"Mac"}>MAc OS</MenuItem>
            </Select> 
          </FormControl>
        </Grid>
        <Grid item sm={5}>
        <FormControl className={classes.formControl}>
          <InputLabel id="os-image">Os Image</InputLabel>
            <Select
              required
              labelId="os-image"
              onChange={handleChange}
              value={state.osImage}
              id="os-image"
              name="osImage"
            >
              <MenuItem value={"Ubuntu 20.04"}>Ubuntu budgie 18.04</MenuItem>
              <MenuItem value={"Windows"}>Windows 10</MenuItem>
              <MenuItem value={"Mac"}>MAc OS 9.1</MenuItem>
            </Select> 
        </FormControl>
      </Grid>
    </Grid>
      
    <Button onClick={onSubmit} className={classes.button} variant="contained" color="primary">
      Creer
    </Button>
    <Button className={classes.button} variant="contained" color="secondary">
      Annuler
    </Button>

    {error && (
      <Alert severity="error" onClick={() => setError(null)}>
        {error}
      </Alert>
    )}
  </React.Fragment>
  )
}
