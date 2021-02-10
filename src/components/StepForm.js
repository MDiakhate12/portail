import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import Confirm from './Confirm'
import Success from './Success'
import ThirdStep from './ThirdStep'
// import formValidation from '../Helper/formValidation'

// Step titles
const labels = ['Information Project', 'VM information', 'Provider Choice', 'Confirmation']

const initialValues = {
    projectName: 'DiafProject',
    applicationType: 'dev',
    dependencies: [],
    SLA: '4',
    environment: 'prod',
    dataSize: '',
    connectedApplications: 'DiafApplications',
    techRequirements: 'DiafRequirements',
    costEstimation: 777777,
    cpu: '1',
    disk: '1',
    memory: '1',
    numberOfVm: '1',
    osImage: 'Ubuntu 18.04',
    osType: 'Debian',
    provider: '',
    providerList: []
}

const StepForm = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [formValues, setFormValues] = useState(initialValues)
    // const [formErrors, setFormErrors] = useState({})

    // Proceed to next step
    const handleNext = () => setActiveStep((prev) => prev + 1)
    // Go back to prev step
    const handleBack = () => setActiveStep((prev) => prev - 1)

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target

        // Set values
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSteps = (step) => {
        switch (step) {
            case 0:
                return (
                    <FirstStep
                        handleNext={handleNext}
                        handleChange={handleChange}
                        values={formValues}
                    // formErrors={formErrors}
                    />
                )
            case 1:
                return (
                    <SecondStep
                        handleNext={handleNext}
                        handleBack={handleBack}
                        handleChange={handleChange}
                        values={formValues}
                    // formErrors={formErrors}
                    />
                )
            case 2:
                return (
                    <ThirdStep
                        handleNext={handleNext}
                        handleBack={handleBack}
                        handleChange={handleChange}
                        values={formValues}
                    />
                )
            case 3:
                return (
                    <Confirm
                        handleNext={handleNext}
                        handleBack={handleBack}
                        handleChange={handleChange}
                        values={formValues}
                    />
                )
            default:
                break
        }
    }

    return (
        <>
            {activeStep === labels.length ? (
                // Last Component
                <Success values={formValues} />
            ) : (
                    <>
                        <Box style={{ margin: '30px 0 50px' }}>
                            <Typography variant="h4" align="center">
                                Creation de projet
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{ margin: '10px 0' }}
                            >
                                Cette platforme vous permet de faire le provisionning dans le cloud le
                                plus propice - DIAF COPAIN !!!
                            </Typography>
                        </Box>
                        <Stepper
                            activeStep={activeStep}
                            style={{ margin: '30px 0 15px' }}
                            alternativeLabel
                        >
                            {labels.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {handleSteps(activeStep)}
                    </>
                )}
        </>
    )
}

export default StepForm
