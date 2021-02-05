import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
    marginLeft: theme.spacing(2),
  },
}))

// Destructuring props
const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { cpu, disk, memory, numberOfVm, osImage, osType },
}) => {
  // Check if all values are not empty or if there are some error
  // const isValid =
  //   city.length > 0 &&
  //   !formErrors.city &&
  //   date.length > 0 &&
  //   phone.length > 0 &&
  //   !formErrors.phone

  const classes = useStyles()

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            onChange={handleChange}
            value={numberOfVm || ''}
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
            value={cpu || ''}
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
            value={memory || ''}
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
            value={disk || ''}
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
              value={osType || ''}
              onChange={handleChange}
              id="os-type"
              name="osType"
            >
              <MenuItem value={'Debian'}>Linux</MenuItem>
              <MenuItem value={'Windows'}>Windows</MenuItem>
              <MenuItem value={'Mac'}>MAc OS</MenuItem>
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
              value={osImage}
              id="os-image"
              name="osImage"
            >
              <MenuItem value={'Ubuntu 20.04'}>Ubuntu budgie 18.04</MenuItem>
              <MenuItem value={'Windows'}>Windows 10</MenuItem>
              <MenuItem value={'Mac'}>MAc OS 9.1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div
        style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          // disabled={!isValid}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default SecondStep
