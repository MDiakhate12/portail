import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Title from './Title'
import { useParams } from 'react-router-dom'
import DataTable from './DataTable'
import { BASE_URL } from '../App'
import { CircularProgress, Box } from '@material-ui/core'
import { GlobalContext } from '../store/providers/GlobalProvider'

function ListVM() {
    const { projectId } = useParams()
    const [rows, setRows] = useState([])
    const { vmList } = useContext(GlobalContext)

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 130,
            hide: true,
        },
        { field: 'memory', headerName: 'RAM', width: 85, type: 'number' },
        { field: 'cpu', headerName: 'CPU', width: 85, type: 'number' },
        { field: 'disk', headerName: 'Disk', type: 'number' },
        { field: 'instanceGroupName', headerName: 'Instance Group', type: 'String', width: 170 },
        { field: 'osType', headerName: 'Os Type', width: 160 },
        { field: 'osImage', headerName: 'Os Image', width: 160 },
        {
            field: 'publicIP',
            headerName: 'Public IP',
            width: 130,
            type: String,
            renderCell: (params) => {
                if (params.value === undefined)
                    return (<Box alignItems="center" justifyContent="center"><CircularProgress color="primary" /></Box>)

                return (<strong>{params.value}</strong>)
            }
        },
    ]

    useEffect(() => {
        axios
            .get(
                `${BASE_URL}/projects/${projectId}/instances`,
            )
            .then((res) => {
                console.log(res.data)
                let r = res.data.map((instance) => ({ id: instance._id, ...instance }))
                setRows(r)
                console.log(r)
            })
    }, [projectId])

    return (
        <div>
            <Title>List of Vms</Title>
            <DataTable columns={columns} rows={rows} />
        </div>
    )
}

export default ListVM
