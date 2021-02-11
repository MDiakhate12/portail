import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core'
import MultipleCheckSelect from './MultipleCheckSelect'


// Destructuring props
const FirstStep = ({
    handleNext,
    handleChange,
    values: {
        projectName,
        applicationType,
        dependencies,
        SLA,
        environment,
        connectedApplications,
        techRequirements,
        costEstimation,
    },
}) => {
    // Check if all values are not empty or if there are some error
    // const isValid =
    //   projectName.length > 0 &&
    //   !formErrors.projectName &&
    //   applicationType.length > 0 &&
    //   !formErrors.applicationType &&
    //   dependencies.length > 0 &&
    //   !formErrors.dependencies &&
    //   gender.length > 0

    return (
        <Fragment>
            <Grid container spacing={2} noValidate>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Project Name"
                        name="projectName"
                        placeholder="Your project name"
                        margin="normal"
                        value={projectName || ''}
                        onChange={handleChange}
                        // error={!!formErrors.projectName}
                        // helperText={formErrors.projectName}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>SLA</InputLabel>
                        <Select
                            value={SLA || ''}
                            onChange={handleChange}
                            name="SLA"
                        >
                            <MenuItem value={"2"}>Max 2 Hours Downtime</MenuItem>
                            <MenuItem value={"4"}>Max 4 Hours Downtime</MenuItem>
                            <MenuItem value={"8"}>Max 8 Hours Downtime</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Application Type</InputLabel>
                        <Select
                            value={applicationType || ''}
                            onChange={handleChange}
                            name="applicationType"
                        >
                            <MenuItem value={"dev"}>Development</MenuItem>
                            <MenuItem value={"big data"}>Big Data</MenuItem>
                            <MenuItem value={"machine learning"}>Machine Learning</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Application Architecture</InputLabel>
                        <Select
                            value={applicationType || ''}
                            onChange={handleChange}
                            name="applicationType"
                        >
                            <MenuItem value={"micro"}>Microservice</MenuItem>
                            <MenuItem value={"mono"}>Monolithic</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Environment</InputLabel>
                        <Select
                            value={environment || ''}
                            onChange={handleChange}
                            name="environment"
                        >
                            <MenuItem value={"prod"}>Production</MenuItem>
                            <MenuItem value={"dev"}>Development</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <MultipleCheckSelect
                        inputValue={dependencies || ''}
                        handleChange={handleChange}
                        inputName="dependencies"
                        inputTitle="Dependencies"
                    />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="connectedApplications"
                        name="connectedApplications"
                        placeholder="Agacy, Nessico"
                        type="dependencies"
                        value={connectedApplications || ''}
                        onChange={handleChange}
                        margin="normal"
                        // error={!!formErrors.dependencies}
                        // helperText={formErrors.dependencies}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="techRequirements"
                        name="techRequirements"
                        placeholder="Your techRequirements"
                        type="string"
                        value={techRequirements || ''}
                        onChange={handleChange}
                        margin="normal"
                        // error={!!formErrors.dependencies}
                        // helperText={formErrors.dependencies}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="costEstimation"
                        name="costEstimation"
                        placeholder="12000 M"
                        type="string"
                        value={costEstimation || ''}
                        onChange={handleChange}
                        margin="normal"
                        // error={!!formErrors.dependencies}
                        // helperText={formErrors.dependencies}
                        required
                    />
                </Grid>
            </Grid>
            <div
                style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
            >
                <Button
                    variant="contained"
                    // disabled={!isValid}
                    color="primary"
                    onClick={handleNext}
                >
                    Next
        </Button>
            </div>
        </Fragment>
    )
}

export default FirstStep
