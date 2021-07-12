import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import BarChartIcon from '@material-ui/icons/BarChart'
import { Link } from 'react-router-dom'

export const mainListItems = (
    <div>
        <Link to={'/'} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Créer un projet" />
            </ListItem>
        </Link>
        <Link to={'/list-projects'} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Liste des projets" />
            </ListItem>
        </Link>
    </div>
)

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );
