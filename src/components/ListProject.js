import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import axios from 'axios'
import Title from './Title'
import DataTable from './DataTable'

function ListProject() {
    const [projects, setProjects] = useState([])
    const [rows, setRows] = useState([])

    const columns = [
        { field: "id", headerName: 'ID', hide:true },
        { field: 'projectName', headerName: 'Nom Project', width: 130 },
        { field: 'applicationType', headerName: 'Application Type', width: 130 },
        { field: 'dependencies', headerName: 'dependencies', width: 150 },
        { field: 'SLA', headerName: 'SLA', type: 'number' },
        { field: 'environment', headerName: 'Environment' },
        { field: 'dataSize', headerName: 'Data Size', type: 'number' },
        { field: 'connectedApplications', headerName: 'Connected Application', width: 130 },
        { field: 'techRequirements', headerName: 'Technical Requirements', width: 130 },
        { field: 'costEstimation', headerName: 'Cost Estimation', type: 'number' },
    ];

    useEffect(() => {
        axios
            .get('https://faas-cloud-backend.mouhammad.ml/projects/')
            .then((res) => {
                console.log(res)
                let r = (res.data.map(project => ({ id: project._id, ...project })))
                setRows(r)
            })
    }, [])

    return (
        <div>
            <Title>List of projects</Title>
            {/* <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nom Project</TableCell>
            <TableCell>Application Type</TableCell>
            <TableCell>dependencies</TableCell>
            <TableCell>SLA</TableCell>
            <TableCell>Environment</TableCell>
            <TableCell>Data Size</TableCell>
            <TableCell>Connected Application</TableCell>
            <TableCell>Technical Requirements</TableCell>
            <TableCell>Cost Estimation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <Link to={`/project/${row.id}/vms`}>
              <TableRow key={row._id}>
                <TableCell>{row.projectName}</TableCell>
                <TableCell>{row.applicationType}</TableCell>
                <TableCell>{row.dependencies}</TableCell>
                <TableCell>{row.SLA}</TableCell>
                <TableCell>{row.environment}</TableCell>
                <TableCell>{row.dataSize}</TableCell>
                <TableCell>{row.connectedApplications}</TableCell>
                <TableCell>{row.techRequirements}</TableCell>
                <TableCell>{row.costEstimation}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table> */}
            <DataTable columns={columns} rows={rows} />
        </div>
    )
}

export default ListProject
