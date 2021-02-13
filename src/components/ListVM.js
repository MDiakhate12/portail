import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import axios from 'axios'
import Title from './Title'
import { useParams } from 'react-router-dom'
import DataTable from './DataTable'

function ListVM() {
  const { projectId } = useParams()
  const [rows, setRows] = useState([])

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 130,
    },
    { field: 'memory', headerName: 'RAM', width: 100, type: 'number' },
    { field: 'cpu', headerName: 'CPU', width: 100, type: 'number' },
    { field: 'disk', headerName: 'Disk', type: 'number' },
    { field: 'osType', headerName: 'Os Type' },
    { field: 'osImage', headerName: 'Os Image' },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
    },
    {
      field: 'ipAddress',
      headerName: 'Ip Address',
      width: 130,
    },
  ]

  useEffect(() => {
    axios
      .get(
        `https://faas-cloud-backend.mouhammad.ml/projects/${projectId}/instances`,
      )
      .then((res) => {
        console.log(res)
        let r = res.data.map((project) => ({ id: project._id, ...project }))
        setRows(r)
      })
  }, [projectId])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Title>List of Vms</Title>
            <DataTable columns={columns} rows={rows} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ListVM
