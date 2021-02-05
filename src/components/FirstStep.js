import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
          <TextField
            fullWidth
            label="SLA"
            name="SLA"
            placeholder="2, ot 4 or 8"
            margin="normal"
            value={SLA || ''}
            onChange={handleChange}
            // error={!!formErrors.projectName}
            // helperText={formErrors.projectName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Applicattion type"
            name="applicationType"
            placeholder="dev or big data or Machine learning"
            margin="normal"
            value={applicationType || ''}
            onChange={handleChange}
            // error={!!formErrors.applicationType}
            // helperText={formErrors.applicationType}
            required
          />
          <TextField
            fullWidth
            label="Application Environment"
            name="environment"
            placeholder="dev, prod"
            margin="normal"
            value={environment || ''}
            onChange={handleChange}
            // error={!!formErrors.applicationType}
            // helperText={formErrors.applicationType}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="dependencies"
            name="dependencies"
            placeholder="Your dependencies address"
            type="dependencies"
            value={dependencies || ''}
            onChange={handleChange}
            margin="normal"
            // error={!!formErrors.dependencies}
            // helperText={formErrors.dependencies}
            required
          />
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
