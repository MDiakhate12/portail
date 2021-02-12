import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import MultipleCheckSelect from './MultipleCheckSelect'
import { InputAdornment } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
    values
}) => {

    const classes = useStyles()

    const {
        cpu,
        disk,
        memory,
        numberOfVm,
        osImage,
        osType,
        vmGroupName,
    } = values

    const [error, setError] = useState('')


    const handleSubmit = () => {
        // Do whatever with the values
        // values.dependencies = values.dependencies.split(',')
        // values.connectedApplications = values.connectedApplications.split(',')
        // values.techRequirements = values.techRequirements.split(',')

        console.log("FROM SECOND STEP:", values);

        // GET CLOUD PROVIDERS ORIENTATION LIST 
        axios
            .post('https://faas-cloud-backend.mouhammad.ml/provider-list', values)
            .then((res) => {
                console.log(res.data)
                if (typeof res.data === 'string') {
                    setError(res.data)
                } else {
                    console.log(res.data)
                    let providers = res.data.providers.map(provider => ({ value: provider.toLowerCase(), label: provider }))

                    // IF ON PREMISE SCORE GREATER THAN 0.5
                    if (res.data.score <= 0.5) {
                        providers = [
                            // RECOMMEND ON-PREMISE ON TOP
                            { value: "openstack", label: "OPENSTACK (ON PREMISE)" },
                            ...providers,
                        ]
                    } else {
                        // RECOMMEND PROVIDER-LIST ON TOP
                        providers = [
                            ...providers,
                            { value: "openstack", label: "OPENSTACK (ON PREMISE)" },
                        ]
                    }
                    handleChange({
                        target: {
                            name: "providerList",
                            value: providers
                        }
                    })
                    handleChange({
                        target: {
                            name: "provider",
                            value: providers[0].value
                        }
                    })
                    handleNext()
                }
            })
            .catch((err) => console.log(err))

        // Show last component or success message
    }


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            value={osImage}
                            id="os-image"
                            name="osImage"
                        >
                            <MenuItem value={'debian-10-buster-v20210122'}>Debian GNU/Linux 10 (buster)</MenuItem>
                            <MenuItem value={'debian-9-stretch-v20210122'}>Debian GNU/Linux 9 (stretch)</MenuItem>
                            <MenuItem value={'ubuntu-2004-focal-v20210129'}>Ubuntu 20.04 LTS</MenuItem>
                            <MenuItem value={'ubuntu-1804-bionic-v20210129'}>Ubuntu 18.04 LTS</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>vCPU</InputLabel>
                        <Select
                            value={cpu || ''}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            name="memory"
                            startAdornment={<InputAdornment position="start">GB</InputAdornment>}
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
                        onChange={handleChange}
                        id="disk"
                        name="disk"
                        label="Disque"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">GB</InputAdornment>,
                        }} 
                        inputProps={{
                            step: "10"
                        }}
                        />
                </Grid>
                <Grid item xs={12} sm={4}>
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
