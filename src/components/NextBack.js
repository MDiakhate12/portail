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
        Précédent
      </Button>
      <Button
        variant="contained"
        // disabled={!isValid}
        color="primary"
        onClick={handleNext}
      >
        Suivant
      </Button>
    </center>
  )
}

export default NextBack
