import React, { useState, useEffect } from 'react'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Title from './Title'
import DataTable from './DataTable'

function ListProject() {
  const [rows, setRows] = useState([])

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
              href={`project/${params.value}/vms`}
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
    { field: 'dependencies', headerName: 'dependencies', width: 150 },
    { field: 'SLA', headerName: 'SLA', type: 'number' },
    { field: 'environment', headerName: 'Environment' },
    { field: 'dataSize', headerName: 'Data Size', type: 'number' },
    {
      field: 'connectedApplications',
      headerName: 'Connected Application',
      width: 130,
    },
    {
      field: 'techRequirements',
      headerName: 'Technical Requirements',
      width: 130,
    },
    { field: 'costEstimation', headerName: 'Cost Estimation', type: 'number' },
  ]

  useEffect(() => {
    axios
      .get('https://faas-cloud-backend.mouhammad.ml/projects/')
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
