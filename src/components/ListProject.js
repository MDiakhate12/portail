import React, { useState, useEffect } from 'react'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Title from './Title'
import DataTable from './DataTable'
import { BASE_URL } from '../App'
import { useHistory } from "react-router-dom";
import { Menu, MenuItem, Tooltip } from '@material-ui/core'

function ListProject() {
    const [rows, setRows] = useState([])
    const history = useHistory();
    const columns = [
        {
            field: 'id',
            headerName: 'Detail',
            renderCell: (params) => (
                <strong>
                    <Link>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => history.push(`project/${params.value}/vms`)}
                            style={{ marginLeft: 5 }}
                        >
                            Ouvrir
            </Button>
                    </Link>
                </strong>
            ),
        },
        { field: 'projectName', headerName: 'Nom Project', width: 130 },
        { field: 'applicationType', headerName: 'Application Type', width: 130 },
        {
            field: 'dependencies', headerName: 'Dependencies', width: 150,
            renderCell: (params) => (
                <div>
                    <Button>{params.values}</Button>
                </div>
            )
        },
        { field: 'SLA', headerName: 'SLA', type: 'number', width: 80 },
        { field: 'environment', headerName: 'Environment', width: 100 },
        { field: 'provider', headerName: 'Provider' },
        {
            field: 'connectedApplications',
            headerName: 'Connected Application',
            width: 130,
        },
        { field: 'costEstimation', headerName: 'Cost Estimation', type: 'number' },
    ]

    useEffect(() => {
        axios
            .get(`${BASE_URL}/projects/`)
            .then((res) => {
                console.log(res)
                let r = res.data.map((project) => ({ id: project._id, ...project }))
                setRows(r)
            })
    }, [])

    return (
        <div>
            <Title>List of projects</Title>
            <DataTable columns={columns} rows={rows} />
        </div>
    )
}

export default ListProject
