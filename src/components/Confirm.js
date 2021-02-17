import React, { Fragment, useState, useEffect, useContext } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import MuiAlert from '@material-ui/lab/Alert'
import axios from 'axios'
import { GlobalContext } from '../store/providers/GlobalProvider'
import { BASE_URL } from '../App'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Confirm = ({ handleNext, handleBack }) => {
    const { formState } = useContext(GlobalContext)

    useEffect(() => {
        console.log(formState)
    })

    const {
        projectName,
        applicationType,
        dependencies,
        SLA,
        environment,
        dataSize,
        connectedApplications,
        costEstimation,
        cpu,
        disk,
        memory,
        numberOfVm,
        osImage,
        osType,
        provider,
        projectArchitecture,
    } = formState

    const [error, setError] = useState('')

    const createVM = async () => {
        axios
            .post(`${BASE_URL}/create-vm`, formState)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    const registerVM = async () => {
        axios
            .post(`${BASE_URL}/register-vm`, formState)
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
    }

    const handleSubmit = async () => {
        try {
            await registerVM();
            await createVM();
        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <Fragment>
            <List disablePadding>
                <ListItem>
                    <ListItemText primary="Provider" secondary={provider.toUpperCase()} />
                </ListItem>

                <Divider />
                <ListItem>
                    <ListItemText primary="Project Name" secondary={projectName} />
                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemText primary="applicationType" secondary={applicationType} />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary="Project Architecture"
                        secondary={projectArchitecture}
                    />
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
