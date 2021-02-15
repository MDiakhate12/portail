import React, { useState, useContext } from 'react'
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
import { AppContext } from '../App'
// import formValidation from '../Helper/formValidation'

// Step titles
const labels = [
  'Information Project',
  'VM information',
  'Provider Choice',
  'Confirmation',
]

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { state } = useContext(AppContext)

  // const [formErrors, setFormErrors] = useState({})

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1)
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            handleNext={handleNext}
            // formErrors={formErrors}
          />
        )
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            // formErrors={formErrors}
          />
        )
      case 2:
        return <ThirdStep handleNext={handleNext} handleBack={handleBack} />
      case 3:
        return <Confirm handleNext={handleNext} handleBack={handleBack} />
      default:
        break
    }
  }

  return (
    <>
      {activeStep === labels.length ? (
        // Last Component
        <Success values={state} />
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
              Cette platforme vous permet de faire le provisionning dans le
              cloud le plus propice.
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
