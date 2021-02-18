import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import { Box, CircularProgress, LinearProgress } from '@material-ui/core'
import { handleChange } from '../store/actions/actions'
import { GlobalContext } from '../store/providers/GlobalProvider'
import { LOADING_CHANGE } from '../store/actions/actions_types'

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
const ThirdStep = ({ handleNext, handleBack }) => {
    const classes = useStyles()
    const { formState, formDispatch } = useContext(GlobalContext)
    const { provider, providerList } = formState
    const [value, setValue] = useState(provider)

    const onChange = (event) => {
        setValue(event.target.value)
        formDispatch(handleChange(event))
    }

    return (


        <>

            <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select your provider</FormLabel>
                    <RadioGroup
                        aria-label="provider"
                        name="provider"
                        value={value}
                        onChange={onChange}
                    >
                        {providerList.map((providerItem) => {
                            if (providerList.indexOf(providerItem) === 0) {
                                return (
                                    <FormControlLabel
                                        key={providerItem.label}
                                        value={providerItem.value}
                                        control={<Radio color='primary' />}
                                        label={`${providerItem.label} - RECOMMENDED`}
                                    />
                                )
                            }
                            return (
                                <div>
                                    <FormControlLabel
                                        key={providerItem.label}
                                        value={providerItem.value}
                                        control={<Radio color='primary' />}
                                        label={providerItem.label}
                                    />
                                </div>

                            )
                        })}
                    </RadioGroup>
                </FormControl>
            </Box>
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

export default ThirdStep
