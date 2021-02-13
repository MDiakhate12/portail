import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { InputAdornment } from '@material-ui/core'
import { handleChange } from '../store/actions/actions'
import { AppContext } from '../App'

const SecondStep = ({ handleNext, handleBack }) => {
  const { state, dispatch } = useContext(AppContext)
  const { cpu, disk, memory, numberOfVm, osImage, osType, vmGroupName } = state

  const handleSubmit = () => {
    console.log('FROM SECOND STEP:', state)

    // GET CLOUD PROVIDERS ORIENTATION LIST
    axios
      .post('https://faas-cloud-backend.mouhammad.ml/provider-list', state)
      .then((res) => {
        console.log(res.data)
        let providers = res.data.providers.map((provider) => ({
          value: provider.toLowerCase(),
          label: provider,
        }))

        // IF ON PREMISE SCORE GREATER THAN 0.5
        if (res.data.score <= 0.5) {
          providers = [
            // RECOMMEND ON-PREMISE ON TOP
            { value: 'openstack', label: 'OPENSTACK (ON PREMISE)' },
            ...providers,
          ]
        } else {
          // RECOMMEND PROVIDER-LIST ON TOP
          providers = [
            ...providers,
            { value: 'openstack', label: 'OPENSTACK (ON PREMISE)' },
          ]
        }
        dispatch(
          handleChange({
            target: {
              name: 'providerList',
              value: providers,
            },
          }),
        )
        dispatch(
          handleChange({
            target: {
              name: 'provider',
              value: providers[0].value,
            },
          }),
        )
        handleNext()
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={(e) => dispatch(handleChange(e))}
            value={vmGroupName || ''}
            required
            id="vmGroupName"
            name="vmGroupName"
            label="VM Group Name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>

        <Grid item sm={4}>
          <FormControl fullWidth>
            <InputLabel id="os-type">Os Type</InputLabel>
            <Select
              required
              labelId="os-type"
              value={osType || ''}
              onChange={(e) => dispatch(handleChange(e))}
              id="os-type"
              name="osType"
            >
              <MenuItem value={'Debian'}>Debian</MenuItem>
              <MenuItem value={'Ubuntu'}>Ubuntu</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <FormControl fullWidth>
            <InputLabel id="os-image">Os Image</InputLabel>
            <Select
              required
              labelId="os-image"
              onChange={(e) => dispatch(handleChange(e))}
              value={osImage}
              id="os-image"
              name="osImage"
            >
              <MenuItem value={'debian-10-buster-v20210122'}>
                Debian GNU/Linux 10 (buster)
              </MenuItem>
              <MenuItem value={'debian-9-stretch-v20210122'}>
                Debian GNU/Linux 9 (stretch)
              </MenuItem>
              <MenuItem value={'ubuntu-2004-focal-v20210129'}>
                Ubuntu 20.04 LTS
              </MenuItem>
              <MenuItem value={'ubuntu-1804-bionic-v20210129'}>
                Ubuntu 18.04 LTS
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>vCPU</InputLabel>
            <Select
              value={cpu || ''}
              onChange={(e) => dispatch(handleChange(e))}
              name="cpu"
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Memory</InputLabel>
            <Select
              value={memory || ''}
              onChange={(e) => dispatch(handleChange(e))}
              name="memory"
              startAdornment={
                <InputAdornment position="start">GB</InputAdornment>
              }
            >
              <MenuItem value={2 * 1024}>2</MenuItem>
              <MenuItem value={4 * 1024}>4</MenuItem>
              <MenuItem value={8 * 1024}>8</MenuItem>
              <MenuItem value={8 * 1024}>16</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <TextField
            required
            type="number"
            value={disk || ''}
            onChange={(e) => dispatch(handleChange(e))}
            id="disk"
            name="disk"
            label="Disque"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">GB</InputAdornment>
              ),
            }}
            inputProps={{
              step: '10',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="number"
            onChange={(e) => dispatch(handleChange(e))}
            value={numberOfVm || ''}
            required
            id="vmNumber"
            name="numberOfVm"
            label="Nombre de VM"
            fullWidth
            autoComplete="family-name"
          />
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
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default SecondStep
