import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from '@material-ui/core'

export default function DataTable({ columns, rows }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        density="comfortable"
        components={Link}
      />
    </div>
  )
}
