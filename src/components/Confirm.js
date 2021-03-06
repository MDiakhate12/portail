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
import { Typography, Card, CardContent, Grid, CardHeader, Avatar, makeStyles, CardActions } from '@material-ui/core'
import StorageIcon from '@material-ui/icons/Storage';
import DescriptionIcon from '@material-ui/icons/Description';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    cardHeader: {
        paddingBottom: "0px"
    },
    cardContent: {
        paddingTop: "0px",
        paddingBottom: "0px"
    },
    listItemText: {
        marginTop: "2px",
        marginBottom: "2px",
    }

}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Confirm = ({ handleNext, handleBack }) => {
    const { formState, setVmList } = useContext(GlobalContext)

    const normalizeString = (strToNormalize) => {
        /**
         * Example replace "DiafProject" to "diaf-project"
         */
        return strToNormalize
            .replace(/[A-Z][a-z]*/g, (str) => `-${str.toLowerCase()}`)
            .replace(/ /g, '').trim().replace(/--/g, '')
            .replace(/(^-)|(-$)/g, '')
    }

    useEffect(() => {
        console.log(formState)
    })

    const {
        projectName,
        applicationType,
        dependencies,
        SLA,
        environment,
        stack,
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

    const instanceGroupName = normalizeString(projectName)

    const createVM = async () => {
        axios
            .post(`${BASE_URL}/create-vm`, formState)
            .then((res) => {
                console.log(res.data)
                setVmList(res.data)
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
                    history.push(`/project/${res.data._id}/vms?environment=${res.data._doc.environment}`)
                    console.log("FROM CONFIRM:", res.data)
                    // handleNext()
                }
            })
            .catch((err) => console.log(err))
    }

    const history = useHistory();

    const handleSubmit = async () => {
        try {
            await registerVM();
            await createVM();

        } catch (err) {
            console.log(err.message)
        }

    }

    const classes = useStyles();
    const [expandedProject, setExpandedProject] = React.useState(false);
    const [expandedVM, setExpandedVM] = React.useState(false);

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item sm={6}>
                    <Card>
                        <CardHeader
                            title="Project"
                            subheader="Project details summary (Click to expand)"
                            className={classes.cardHeader}
                            avatar={
                                <Avatar aria-label="recipe" >
                                    <DescriptionIcon color="primary" />
                                </Avatar>
                            } action={
                                <CardActions disableSpacing>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expandedProject,
                                        })}
                                        onClick={() => setExpandedProject(!expandedProject)}
                                        aria-expanded={expandedProject}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                            } />
                        <CardContent
                            className={classes.cardContent}
                        >
                            <List disablePadding>
                                <ListItem
                                    button
                                    onClick={() => setExpandedProject(!expandedProject)}
                                >
                                    <ListItemText className={classes.listItemText}
                                        primary={
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="primary"
                                            >
                                                Provider
                                                    </Typography>}
                                        secondary={provider.toUpperCase()} />
                                </ListItem>
                                <Divider />
                            </List>
                        </CardContent>
                        <Collapse in={expandedProject} timeout="auto" unmountOnExit>
                            <CardContent
                                className={classes.cardContent}
                            >
                                <List disablePadding>
                                    <ListItem button>
                                        <ListItemText className={classes.listItemText}
                                            primary={
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    color="primary">
                                                    Project Name
                                                </Typography>}
                                            secondary={projectName} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText}
                                            primary={
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    color="primary">
                                                    Application Type
                                             </Typography>}
                                            secondary={applicationType} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText}
                                            primary={
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    color="primary">
                                                    Environment
                                                    </Typography>}
                                            secondary={environment} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText}
                                            primary={
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    color="primary">
                                                    Application Stack
                                                    </Typography>}
                                            secondary={stack} />
                                    </ListItem>

                                    <Divider />

                                    {
                                        environment === 'prod' ?
                                            <>
                                                <ListItem button>
                                                    <ListItemText className={classes.listItemText}
                                                        primary={
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                color="primary">
                                                                Dependencies
                                                    </Typography>}
                                                        secondary={dependencies} />
                                                </ListItem>
                                                <Divider />

                                                <ListItem button>
                                                    <ListItemText className={classes.listItemText}
                                                        primary={
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                color="primary">
                                                                Connected Applcations
                                                        </Typography>}
                                                        secondary={connectedApplications}
                                                    />
                                                </ListItem>

                                                <Divider />

                                                <ListItem button>
                                                    <ListItemText className={classes.listItemText}
                                                        primary={
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                color="primary">
                                                                Project Cost Estimation
                                                    </Typography>}
                                                        secondary={costEstimation} />
                                                </ListItem>

                                                <Divider />

                                                <ListItem button>
                                                    <ListItemText className={classes.listItemText} primary={
                                                        <Typography
                                                            component="span"
                                                            varian1="body2"
                                                            color="primary">
                                                            SLA
                                                    </Typography>}
                                                        secondary={SLA} />
                                                </ListItem>

                                                <Divider />

                                                <ListItem button>
                                                    <ListItemText className={classes.listItemText}
                                                        primary={
                                                            <Typography
                                                                component="span"
                                                                variant="body1"
                                                                color="primary">
                                                                Project Archiecture
                                                        </Typography>}
                                                        secondary={projectArchitecture}
                                                    />
                                                </ListItem>
                                            </>
                                            : ''
                                    }
                                </List>
                            </CardContent>
                        </Collapse>
                    </Card>

                </Grid>
                <Grid item sm={6}>
                    <Card>
                        <CardHeader
                            title="VM Instances"
                            subheader="VM Instances details (Click to expand)"
                            className={classes.cardHeader}
                            avatar={
                                <Avatar aria-label="recipe">
                                    <StorageIcon color='primary' />
                                </Avatar>
                            } action={
                                <CardActions disableSpacing>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expandedVM,
                                        })}
                                        onClick={() => setExpandedVM(!expandedVM)}
                                        aria-expanded={expandedVM}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                            } />
                        <CardContent
                            className={classes.cardContent}
                        >
                            <List disablePadding>
                                <ListItem
                                    button
                                    onClick={() => setExpandedVM(!expandedVM)}
                                >
                                    <ListItemText className={classes.listItemText}
                                        primary={
                                            <Typography
                                                component="span"
                                                varian1="body1"
                                                color="primary">
                                                Instance Group Name
                                        </Typography>}
                                        secondary={instanceGroupName} />
                                </ListItem>
                                <Divider />
                            </List>
                        </CardContent>
                        <Collapse in={expandedVM} timeout="auto" unmountOnExit>
                            <CardContent
                                className={classes.cardContent}
                            >
                                <List disablePadding>
                                    <ListItem button>
                                        <ListItemText className={classes.listItemText} primary={
                                            <Typography
                                                component="span"
                                                varian1="body1"
                                                color="primary">
                                                cpu
                                                    </Typography>}
                                            secondary={cpu} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText} primary={
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="primary">
                                                disk
                                                    </Typography>}
                                            secondary={disk} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText} primary={
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="primary">
                                                memory
                                                    </Typography>}
                                            secondary={memory} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText} primary={
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="primary">
                                                numberOfVm
                                        </Typography>}
                                            secondary={numberOfVm} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText} primary={
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="primary">
                                                osImage
                                        </Typography>}
                                            secondary={osImage} />
                                    </ListItem>

                                    <Divider />

                                    <ListItem button>
                                        <ListItemText className={classes.listItemText} primary={
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                color="primary">
                                                osType
                                                    </Typography>}
                                            secondary={osType} />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Collapse>
                    </Card>

                </Grid>
            </Grid>


            <div
                style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
            >
                <Button variant="contained" color="default" onClick={handleBack}>
                    Précédent
        </Button>
                <Button
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    color="primary"
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
