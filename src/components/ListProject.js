import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import axios from 'axios'
import Title from './Title'

function ListProject() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios
      .get('https://faas-cloud-backend.mouhammad.ml/projects/')
      .then((res) => {
        console.log(res)
        setProjects(res.data)
      })
  }, [])

  return (
    <div>
      <Title>List of projects</Title>
      <Table size="small">
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
      </Table>
    </div>
  )
}

export default ListProject
