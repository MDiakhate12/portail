import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Title from "./Title";
import { useParams, useLocation } from "react-router-dom";
import DataTable from "./DataTable";
import { BASE_URL } from "../App";
import { CircularProgress, Box, IconButton, Tooltip } from "@material-ui/core";
import { GlobalContext } from "../store/providers/GlobalProvider";
import FileCopyIcon from "@material-ui/icons/FileCopy";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ListVM() {
  const { projectId } = useParams();
  const environment = useQuery().get("environment");
  const [rows, setRows] = useState([]);
  const { vmList, openSnackbar } = useContext(GlobalContext);

  const copyToClipboard = (e, text) => {
    navigator.clipboard.writeText(text);
    openSnackbar("Copied to clipboard!", "info");
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 130,
      hide: true,
    },
    {
      field: "name",
      headerName: `${environment === "prod" ? "LoadBalancer " : ""}Name`,
      type: "String",
      width: 170,
    },
    { field: "cpu", headerName: "CPU", width: 85, type: "number" },
    {
      field: "memory",
      headerName: "RAM",
      width: 85,
      type: "number",
      renderCell: (params) => `${params.value} MB`,
    },
    {
      field: "disk",
      headerName: "Disk",
      type: "number",
      renderCell: (params) => `${params.value} GB`,
    },
    { field: "osType", headerName: "Os Type", width: 160 },
    { field: "osImage", headerName: "Os Image", width: 160 },
    {
      field: "privateIP",
      headerName: "Private IP",
      width: 150,
      type: String,
      hide: environment !== "dev",
      renderCell: (params) => {
        if (params.value === undefined)
          return (
            <Box alignItems="center" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          );
        return (
          <div>
            <strong>{params.value}</strong>
            <Tooltip title="Copy private IP">
              <IconButton
                size="small"
                onClick={(e) => copyToClipboard(e, params.value)}
              >
                <FileCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "publicIP",
      headerName: "Public IP",
      width: 150,
      type: String,
      hide: environment !== "dev",
      renderCell: (params) => {
        if (params.value === undefined)
          return (
            <Box alignItems="center" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          );
        return (
          <div>
            <strong>{params.value}</strong>
            <Tooltip title="Copy public IP">
              <IconButton
                size="small"
                onClick={(e) => copyToClipboard(e, params.value)}
              >
                <FileCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "loadBalancingScheme",
      headerName: "Type",
      width: 130,
      type: String,
      hide: environment !== "prod",
      renderCell: (params) => {
        if (params.value === undefined)
          return (
            <Box alignItems="center" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          );
        return <strong>{params.value}</strong>;
      },
    },
    {
      field: "IPAddress",
      headerName: "IP Address",
      width: 150,
      type: String,
      hide: environment !== "prod",
      renderCell: (params) => {
        if (params.value === undefined)
          return (
            <Box alignItems="center" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          );
        <div>
          <strong>{params.value}</strong>
          <Tooltip title="Copy IP Address">
            <IconButton
              size="small"
              onClick={(e) => copyToClipboard(e, params.value)}
            >
              <FileCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>;
      },
    },
  ];
  useEffect(() => {
    axios
      .get(
        environment === "dev"
          ? `${BASE_URL}/projects/${projectId}/instances`
          : `${BASE_URL}/projects/${projectId}/loadbalancers`
      )
      .then((res) => {
        console.log(res.data);
        let r = res.data.map((instance) =>
          environment === "prod"
            ? {
                id: instance._id,
                name: instance.name,
                cpu: instance.instanceTemplate.cpu,
                memory: instance.instanceTemplate.memory,
                disk: instance.instanceTemplate.disk,
                osType: instance.instanceTemplate.osType,
                osImage: instance.instanceTemplate.osImage,
                ...instance,
              }
            : {
                id: instance._id,
                ...instance,
              }
        );
        setRows(r);
        console.log(r);
      });
  }, [projectId, vmList, environment]);

  return (
    <div>
      <Title>List of Vms</Title>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}

export default ListVM;
