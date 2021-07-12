import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Title from "./Title";
import DataTable from "./DataTable";
import { BASE_URL } from "../App";
import { useHistory } from "react-router-dom";

export default function ListProject() {
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const columns = [
    {
      field: "id",
      headerName: "Détail",
      renderCell: (params) => (
        <strong>
          <Link>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                history.push(
                  `project/${params.value}/vms?environment=${params.getValue(
                    "environment"
                  )}`
                )
              }
              style={{ marginLeft: 5 }}
            >
              Ouvrir
            </Button>
          </Link>
        </strong>
      ),
    },
    { field: "projectName", headerName: "Nom", width: 140 },
    { field: "applicationType", headerName: "Type d'application", width: 180 },
    // {
    //     field: 'dependencies', headerName: 'Dependencies', width: 150,
    //     renderCell: (params) => (
    //         <div>
    //             <Button>{params.values}</Button>
    //         </div>
    //     )
    // },
    {
      field: "SLA",
      headerName: "SLA",
      type: "number",
      width: 80,
      renderCell: (params) => `${params.value}H`,
    },
    { field: "environment", headerName: "Environnement", width: 140 },
    { field: "provider", headerName: "Provider", width: 140 },
    {
      field: "connectedApplications",
      headerName: "Applications connectées",
      width: 180,
    },
    {
      field: "costEstimation",
      headerName: "Coût en local",
      type: "number",
      width: 180,
      renderCell: (params) => `${params.value} FCFA`,
    },
  ];

  useEffect(() => {
    axios.get(`${BASE_URL}/projects/`).then((res) => {
      console.log(res);
      let r = res.data.map((project) => ({ id: project._id, ...project }));
      setRows(r);
    });
  }, []);

  return (
    <>
      <Title>List des projets</Title>
      <DataTable columns={columns} rows={rows} />
    </>
  );
}
