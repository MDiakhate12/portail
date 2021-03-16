import React, { useContext } from 'react'
import { Box, Button } from '@material-ui/core'
import CustomButton from './CustomButton'
import devImage from '../images/dev.png'
import prodImage from '../images/prod.png'
import mernImage from '../images/mern.png'
import sbamImage from '../images/sbam.png'
import { GlobalContext } from '../store/providers/GlobalProvider'

// Destructuring props
const EnvStep = ({ handleNext, handleBack }) => {
    const { formState, setEnvironment, setStack } = useContext(GlobalContext)

    const environmentButtons = [
        {
            url: devImage,
            title: 'Développement',
            width: '30%',
            onClick: () => {
                setEnvironment('dev')
                console.log("ENV", formState.environment)
                // handleNext()
            },
        },
        {
            url: prodImage,
            title: 'Production',
            width: '30%',
            onClick: () => {
                setEnvironment('prod')
                console.log("ENV", formState.environment)
                // handleNext()
            },
        },
    ]

    const stackButtons = [
        {
            url: mernImage,
            title: 'MERN Stack',
            width: '30%',
            backgroundSize: "87%",
            onClick: () => {
                setStack('mern')
                console.log("STACK", formState.stack)
            },
        },
        {
            url: sbamImage,
            title: 'SBAM Stack',
            width: '30%',
            backgroundSize: "87%",
            onClick: () => {
                setStack('sbam')
                console.log("STACK", formState.stack)
            },
        },
    ]

    return (
        <>
            <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CustomButton buttons={environmentButtons} />
            </Box>

            <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CustomButton buttons={stackButtons} />
            </Box>

            <div
                style={{
                    display: 'flex',
                    marginTop: 50,
                    justifyContent: 'flex-end',
                }}
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
