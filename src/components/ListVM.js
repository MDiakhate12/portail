import React, { useState, useEffect, useContext } from 'react'
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
        { field: 'name', headerName: 'Name', type: 'String', width: 170 },
        { field: 'cpu', headerName: 'CPU', width: 85, type: 'number' },
        { field: 'memory', headerName: 'RAM', width: 85, type: 'number', renderCell: (params) => `${params.value} MB` },
        { field: 'disk', headerName: 'Disk', type: 'number', renderCell: (params) => `${params.value} GB` },
        { field: 'osType', headerName: 'Os Type', width: 160 },
        { field: 'osImage', headerName: 'Os Image', width: 160 },
        {
            field: 'privateIP',
            headerName: 'Private IP',
            width: 130,
            type: String,
            renderCell: (params) => {
                if (params.value === undefined)
                    return (<Box alignItems="center" justifyContent="center"><CircularProgress color="primary" /></Box>)

                return (<strong>{params.value}</strong>)
            }
        },
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
    }, [projectId, vmList])

    return (
        <div>
            <Title>List of Vms</Title>
            <DataTable columns={columns} rows={rows} />
        </div>
    )
}

export default ListVM
