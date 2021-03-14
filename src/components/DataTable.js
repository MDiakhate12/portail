import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Paper } from '@material-ui/core'

export default function DataTable({ columns, rows }) {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        density="comfortable"
        scrollbarSize={10}
      />
    </Paper>
  )
}
