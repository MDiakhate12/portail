import React, { useContext } from 'react'
import { Box, Button } from '@material-ui/core'
import CustomButton from './CustomButton'
import devImage from '../images/dev.png';
import prodImage from '../images/prod.png';
import { GlobalContext } from '../store/providers/GlobalProvider';

// Destructuring props
const EnvStep = ({ handleNext, handleBack }) => {

    const buttons = [
        {
            url: devImage,
            title: 'Développement',
            width: '30%',
            onClick: () => { setEnvironment('dev'); handleNext() }

        },
        {
            url: prodImage,
            title: 'Production',
            width: '30%',
            onClick: () => { setEnvironment('prod'); handleNext() }

        }
    ];

    const { setEnvironment } = useContext(GlobalContext);

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
            </div>
        </>
    )
}

export default EnvStep
