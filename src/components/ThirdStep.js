import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Box } from '@material-ui/core'

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
const ThirdStep = ({
    handleNext,
    handleBack,
    handleChange,
    values: { provider, providerList }
}) => {
    const classes = useStyles()

    const [value, setValue] = useState(provider)

    const onChange = (event) => {
        setValue(event.target.value);
        handleChange(event);
    }

    return (
        <>
            <Box width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center">
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select your provider</FormLabel>
                    <RadioGroup aria-label="provider" name="provider" value={value} onChange={onChange}>
                        {providerList.map((providerItem) => {
                            if (providerList.indexOf(providerItem) === 0) {
                                return (
                                    <FormControlLabel key={providerItem.label} value={providerItem.value} control={<Radio />} label={`${providerItem.label} - RECOMMENDED`} />
                                )
                            }
                            return (
                                <FormControlLabel key={providerItem.label} value={providerItem.value} control={<Radio />} label={providerItem.label} />

                            )
                        }
                        )}
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


