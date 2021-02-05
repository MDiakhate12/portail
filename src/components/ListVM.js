import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Orders from './Orders'
import { useParams } from 'react-router-dom'

function ListVM() {
  const { projectId } = useParams()

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Orders projectId={projectId} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default ListVM
