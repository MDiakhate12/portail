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
    } = values

    const [error, setError] = useState('')

    const handleSubmit = () => {
        // Do whatever with the values
        // values.dependencies = values.dependencies.split(',')
        values.connectedApplications = values.connectedApplications.split(',')
        values.techRequirements = values.techRequirements.split(',')

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
                    let providers = res.data.Providers.map(provider => ({ value: provider.toLowerCase(), label: provider }))

                    // IF ON PREMISE SCORE GREATER THAN 0.5
                    if (res.data.score >= 0.5) {
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
                <Grid item sm={6}>
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
                <Grid item sm={6}>
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
                <Grid item sm={6}>
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
                <Grid item sm={6}>
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
                <Grid item sm={6}>
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
                            <MenuItem value={'Ubuntu 18.04'}>Ubuntu 18.04</MenuItem>
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
                    onClick={handleSubmit}
                >
                    Next
        </Button>
            </div>
        </>
    )
}

export default SecondStep
