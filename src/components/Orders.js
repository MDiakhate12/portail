import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import axios from 'axios'
import Title from './Title'

export default function Orders({ projectId }) {
  const [vms, setVMs] = useState([])

  useEffect(() => {
    axios
      .get(`https://faas-cloud-backend.mouhammad.ml/${projectId}/instances`)
      .then((res) => {
        console.log(res)
        setVMs(res.data)
      })
  }, [])

  return (
    <React.Fragment>
      <Title>List of VMs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nom VM</TableCell>
            <TableCell>RAM</TableCell>
            <TableCell>CPU</TableCell>
            <TableCell>Disk</TableCell>
            <TableCell>OS Type</TableCell>
            <TableCell>OS Image</TableCell>
            <TableCell>IP address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vms.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.memory}</TableCell>
              <TableCell>{row.cpu}</TableCell>
              <TableCell>{row.disk}</TableCell>
              <TableCell>{row.osType}</TableCell>
              <TableCell>{row.osImage}</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Running</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
        </div>
      */}
    </React.Fragment>
  )
}
