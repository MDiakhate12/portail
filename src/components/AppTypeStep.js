import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
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
            width: '30%',
            onClick: () => { setApplicationType('dev'); handleNext() }

        },
        {
            url: bigDataImage,
            title: 'Big Data',
            width: '30%',
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
