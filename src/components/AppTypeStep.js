import React, { useContext } from 'react'
import { Box } from '@material-ui/core'
import CustomButton from './CustomButton'
import webImage from '../images/web.png';
import bigDataImage from '../images/bigdata.png';
import { GlobalContext } from '../store/providers/GlobalProvider';


// Destructuring props
const AppTypeStep = ({ handleNext }) => {

    const buttons = [
        {
            url: webImage,
            title: 'Web',
            width: '25%',
            onClick: () => { setApplicationType('web'); handleNext() }
        },
        {
            url: bigDataImage,
            title: 'Big Data',
            width: '25%',
            onClick: () => { setApplicationType('big-data'); handleNext() }
        }
    ];

    const { setApplicationType } = useContext(GlobalContext);

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
        </>
    )
}

export default AppTypeStep
