import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomButtonItem from './CustomButtonItem';
import { GlobalContext } from '../store/providers/GlobalProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        justifyContent: "center",
        color: theme.palette.primary.main,
    },
}));

export default function CustomButton({ buttons }) {
    const classes = useStyles();

    const [btns, setBtns] = useState([])

    const { formState } = useContext(GlobalContext)

    useEffect(() => {
        setBtns(buttons.map(button => ({ ...button, clicked: false })))
    }, [])

    const handleToggle = (e) => {
        setBtns(btns => {
            btns.forEach((btn, index) => {
                if (e.target.innerText === btn.title) {
                    console.log(buttons[index])
                    console.log(formState)
                    buttons[index].onClick()
                    btn.clicked = true
                } else {
                    btn.clicked = false
                }
            })
            return btns
        })
    }

    return (
        <div className={classes.root}>
            {btns.map((image) => (
                <CustomButtonItem key={image.title} image={image} handleToggle={handleToggle} />
            ))}
        </div>
    );
}
