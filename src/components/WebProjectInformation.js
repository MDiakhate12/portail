import React, { Fragment, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import MultipleCheckSelect from "./MultipleCheckSelect";
import { handleChange } from "../store/actions/actions";
import { GlobalContext } from "../store/providers/GlobalProvider";

// Destructuring props
const FirstStep = ({ handleNext, handleBack }) => {
  const {
    formState,
    formDispatch,
    setFrontendOptions,
    setBackendOptions,
  } = useContext(GlobalContext);
  const {
    projectName,
    SLA,
    stack,
    connectedApplications,
    costEstimation,
    dependencies,
    frontendOptions,
    backendOptions,
  } = formState;

  console.log(stack);

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        noValidate
        style={{ padding: "5px 12px 5px 12px" }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            variant="filled"
            fullWidth
            label="Project Name"
            name="projectName"
            placeholder="Your project name"
            value={projectName || ""}
            onChange={(e) => formDispatch(handleChange(e))}
            // error={!!formErrors.projectName}
            // helperText={formErrors.projectName}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant="filled"
            fullWidth
            label="Cost Estimation"
            name="costEstimation"
            placeholder="12000 M"
            type="string"
            value={costEstimation || ""}
            onChange={(e) => formDispatch(handleChange(e))}
            // error={!!formErrors.dependencies}
            // helperText={formErrors.dependencies}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">FCFA</InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant="filled"
            fullWidth
            label=" Frontend Repository"
            name="project_repository"
            placeholder="url of the frontend code repo"
            value={frontendOptions.project_repository || ""}
            onChange={setFrontendOptions}
            // error={!!formErrors.projectName}
            // helperText={formErrors.projectName}
            required
          />
        </Grid>

        {stack === "sbam" ? (
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              fullWidth
              label="Spring Boot jar File"
              name="jar_url"
              placeholder="URL of build project jar file"
              value={backendOptions.jar_url || ""}
              onChange={setBackendOptions}
              // error={!!formErrors.projectName}
              // helperText={formErrors.projectName}
              required
            />
          </Grid>
        ) : (
          // The react/node only field
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                fullWidth
                label="Backend Repository"
                name="project_repository"
                placeholder="Repository url of express project"
                value={backendOptions.project_repository || ""}
                onChange={setBackendOptions}
                // error={!!formErrors.projectName}
                // helperText={formErrors.projectName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                fullWidth
                label="Backend Main File"
                name="main_file"
                placeholder="Express main file name"
                value={backendOptions.main_file || ""}
                onChange={setBackendOptions}
                // error={!!formErrors.projectName}
                // helperText={formErrors.projectName}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                fullWidth
                label="MongoDB Database URI"
                name="db_uri"
                placeholder="Mongo db uri for express"
                value={backendOptions.db_uri || ""}
                onChange={setBackendOptions}
                // error={!!formErrors.projectName}
                // helperText={formErrors.projectName}
                required
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            variant="filled"
            fullWidth
            label="Backend Port"
            name="port"
            placeholder="The backend running port"
            value={backendOptions.port || ""}
            onChange={setBackendOptions}
            // error={!!formErrors.projectName}
            // helperText={formErrors.projectName}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel>SLA</InputLabel>
            <Select
              value={SLA || ""}
              onChange={(e) => formDispatch(handleChange(e))}
              name="SLA"
            >
              <MenuItem value={"2"}>Max 2 Hours Downtime</MenuItem>
              <MenuItem value={"4"}>Max 4 Hours Downtime</MenuItem>
              <MenuItem value={"8"}>Max 8 Hours Downtime</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <MultipleCheckSelect
            inputValue={connectedApplications || ""}
            inputName="connectedApplications"
            inputTitle="Connected Applications"
            names={[
              { value: "gaia", display: "Gaia" },
              { value: "orange-money", display: "Orange Money" },
              { value: "orange-et-moi", display: "Orange et Moi" },
              { value: "agassi", display: "Agassi" },
              { value: "nessico", display: "Nessico" },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MultipleCheckSelect
            inputValue={dependencies || ""}
            inputName="dependencies"
            inputTitle="Dependencies"
            names={dependencies.map((dep) => ({
              value: dep,
              display: dep.charAt(0).toUpperCase() + dep.slice(1),
            }))}
          />
        </Grid>

        {/*
              <Grid item xs={12} sm={6}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel>Project Architecture</InputLabel>
                  <Select
                    value={projectArchitecture || ''}
                    onChange={(e) => formDispatch(handleChange(e))}
                    name="projectArchitecture"
                  >
                    <MenuItem value={'micro'}>Microservice</MenuItem>
                    <MenuItem value={'mono'}>Monolithic</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
          

          */}
      </Grid>
      <div
        style={{ display: "flex", marginTop: 26, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Précédent
        </Button>
        <Button
          variant="contained"
          // disabled={!isValid}
          color="primary"
          onClick={handleNext}
        >
          Suivant
        </Button>
      </div>
    </Fragment>
  );
};

export default FirstStep;
