import React, { Fragment, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

// Destructure props
const Confirm = ({ handleNext, handleBack, values }) => {
  const {
    projectName,
    applicationType,
    dependencies,
    SLA,
    environment,
    dataSize,
    connectedApplications,
    techRequirements,
    costEstimation,
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
    values.dependencies = values.dependencies.split(',')
    values.connectedApplications = values.connectedApplications.split(',')
    values.techRequirements = values.techRequirements.split(',')

    console.log(values)

    axios
      .post('https://faas-cloud-backend.mouhammad.ml/', values)
      .then((res) => {
        console.log(res.data)
        if (typeof res.data === 'string') {
          setError(res.data)
        } else {
          handleNext()
        }
      })
      .catch((err) => console.log(err))

    // Show last compinent or success message
  }

  return (
    <Fragment>
      <List disablePadding>
        <ListItem>
          <ListItemText primary="Nom Project" secondary={projectName} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="applicationTyp" secondary={applicationType} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="dependencies" secondary={dependencies} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="SLA" secondary={SLA} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="environment" secondary={environment} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="dataSize" secondary={dataSize} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="connectedApplications"
            secondary={connectedApplications}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="techRequirements"
            secondary={techRequirements}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="costEstimation" secondary={costEstimation} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="cpu" secondary={cpu} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="disk" secondary={disk} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="memory" secondary={memory} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="numberOfVm" secondary={numberOfVm} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="osImage" secondary={osImage} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="osType" secondary={osType} />
        </ListItem>
      </List>

      <div
        style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          Confirm & Continue
        </Button>
      </div>

      {error && (
        <Alert severity="error" onClick={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Fragment>
  )
}

export default Confirm
