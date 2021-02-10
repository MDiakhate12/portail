import React, { Fragment, useState, useEffect } from 'react'
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
const Confirm = ({ handleNext, handleBack, values, handleChange }) => {

    useEffect(() => {
        console.log(values)
    })

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
        provider
    } = values

    const [error, setError] = useState('')

    const handleSubmit = () => {
        axios
            .post('https://faas-cloud-backend.mouhammad.ml/', values)
            .then((res) => {
                console.log(res.data)
                if (typeof res.data === 'string') {
                    setError(res.data)
                } else {
                    console.log(res.data)
                    handleNext()
                }
            })
            .catch((err) => console.log(err))

        // Show last component or success message
    }

    return (
        <Fragment>
            <List disablePadding>
                <ListItem>
                    <ListItemText primary="Provider" secondary={provider.toUpperCase()} />
                </ListItem>

                <Divider />
                <ListItem>
                    <ListItemText primary="Nom Project" secondary={projectName} />
                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemText primary="applicationType" secondary={applicationType} />
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
