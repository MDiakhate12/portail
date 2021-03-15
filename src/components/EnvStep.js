import React, { useState, useContext } from 'react'
import { Box, Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import CustomButton from './CustomButton'
import devImage from '../images/dev.png'
import prodImage from '../images/prod.png'
import { GlobalContext } from '../store/providers/GlobalProvider'
import { handleChange } from '../store/actions/actions'

// Destructuring props
const EnvStep = ({ handleNext, handleBack }) => {
  const { formDispatch } = useContext(GlobalContext)
  const [stack, setStack] = useState('sbam')

  const onChange = (event) => {
    setStack(event.target.value)
    formDispatch(handleChange(event))
  }
  const buttons = [
    {
      url: devImage,
      title: 'Développement',
      width: '30%',
      onClick: () => {
        setEnvironment('dev')
        // handleNext()
      },
    },
    {
      url: prodImage,
      title: 'Production',
      width: '30%',
      onClick: () => {
        setEnvironment('prod')
        // handleNext()
      },
    },
  ]

  const { setEnvironment } = useContext(GlobalContext)

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CustomButton buttons={buttons} />
      </Box>
      <center style={{ marginTop: 10 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Stack</FormLabel>
          <RadioGroup
            aria-label="stack"
            name="stack"
            value={stack}
            onChange={onChange}
          >
            <FormControlLabel
              value="sbam"
              control={<Radio />}
              label="Spring Boot Angular Mysql"
            />
            <FormControlLabel
              value="mern"
              control={<Radio />}
              label="Express React MongoDB "
            />
          </RadioGroup>
        </FormControl>
      </center>

      <div
        style={{ display: 'flex', marginTop: 26, justifyContent: 'flex-end' }}
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

export default EnvStep
