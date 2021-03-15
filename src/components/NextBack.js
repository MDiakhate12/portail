import React from 'react'
import Button from '@material-ui/core/Button'

function NextBack({ handleNext, handleBack }) {
  return (
    <center>
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
    </center>
  )
}

export default NextBack
