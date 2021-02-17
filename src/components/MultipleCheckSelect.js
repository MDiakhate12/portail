import React, { useState, useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import { handleChange } from '../store/actions/actions'
import { GlobalContext } from '../store/providers/GlobalProvider'

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name, selectedValues, theme) {
    return {
        fontWeight:
            selectedValues.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export default function MultipleCheckSelect({ inputName, inputTitle, names }) {
    const { formState, formDispatch } = useContext(GlobalContext)
    const classes = useStyles()
    const theme = useTheme()

    const [selectedValues, setSelectedValues] = useState(formState[inputName])
    const onChange = (event) => {
        setSelectedValues(event.target.value)
        formDispatch(handleChange(event))
    }
    return (
        <div>
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-mutiple-chip-label">{inputTitle}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    name={inputName}
                    value={selectedValues}
                    onChange={onChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} color='primary' />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name.value}
                            value={name.value}
                            style={getStyles(name.value, selectedValues, theme)}
                        >
                            <Checkbox color='primary' checked={selectedValues.indexOf(name.value) > -1} />
                            <ListItemText primary={name.display} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
