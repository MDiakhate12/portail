import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import axios from 'axios'
import { InputAdornment, CircularProgress, Box } from "@material-ui/core";
import { handleChange } from "../store/actions/actions";
import { GlobalContext } from "../store/providers/GlobalProvider";
// import { BASE_URL } from '../App'

const SecondStep = ({ handleNext, handleBack }) => {
  const {
    formState,
    formDispatch,
    // setLoading,
    loading,
  } = useContext(GlobalContext);

  const {
    cpu,
    disk,
    memory,
    osImage,
    environment,
    osType,
    projectName,
  } = formState;

  //   const handleSubmit = () => {
  //     console.log('FROM SECOND STEP:', formState)
  //     setLoading(true)

  //     // GET CLOUD PROVIDERS ORIENTATION LIST
  //     axios
  //       .post(`${BASE_URL}/provider-list`, formState)
  //       .then((res) => {
  //         console.log(res.data)
  //         let providers = res.data.providers.map((provider) => ({
  //           value: provider.toLowerCase(),
  //           label: provider,
  //         }))

  //         // IF ON PREMISE SCORE GREATER THAN 0.5
  //         if (res.data.score <= 0.5) {
  //           providers = [
  //             // RECOMMEND ON-PREMISE ON TOP
  //             { value: 'openstack', label: 'OPENSTACK (ON PREMISE)' },
  //             ...providers,
  //           ]
  //         } else {
  //           // RECOMMEND PROVIDER-LIST ON TOP
  //           providers = [
  //             ...providers,
  //             { value: 'openstack', label: 'OPENSTACK (ON PREMISE)' },
  //           ]
  //         }
  //         formDispatch(
  //           handleChange({
  //             target: {
  //               name: 'providerList',
  //               value: providers,
  //             },
  //           }),
  //         )
  //         formDispatch(
  //           handleChange({
  //             target: {
  //               name: 'provider',
  //               value: providers[0].value,
  //             },
  //           }),
  //         )
  //         handleNext()

  //         setLoading(false)
  //       })
  //       .catch((err) => console.log(err))
  //   }

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={2}
      >
        {loading === true ? (
          <CircularProgress size={70} />
        ) : (
          <Grid
            container
            spacing={3}
            style={{ padding: "5px 12px 5px 12px" }}
            sm={10}
          >
            {environment === "dev" ? (
              <Grid item xs={12} sm={4}>
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
            ) : (
              ""
            )}

            <Grid item sm={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="os-type">Os Type</InputLabel>
                <Select
                  required
                  labelId="os-type"
                  value={osType || ""}
                  onChange={(e) => formDispatch(handleChange(e))}
                  id="os-type"
                  name="osType"
                >
                  <MenuItem value={"debian-cloud"}>Debian</MenuItem>
                  <MenuItem value={"ubuntu-os-cloud"}>Ubuntu</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="os-image">Os Image</InputLabel>
                <Select
                  required
                  labelId="os-image"
                  onChange={(e) => formDispatch(handleChange(e))}
                  value={osImage}
                  id="os-image"
                  name="osImage"
                >
                  <MenuItem value={"debian-10"}>
                    Debian GNU/Linux 10 (buster)
                  </MenuItem>
                  <MenuItem value={"debian-9"}>
                    Debian GNU/Linux 9 (stretch)
                  </MenuItem>
                  <MenuItem value={"ubuntu-2004-lts"}>
                    Ubuntu 20.04 LTS
                  </MenuItem>
                  <MenuItem value={"ubuntu-1804-lts"}>
                    Ubuntu 18.04 LTS
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel>vCPU</InputLabel>
                <Select
                  value={cpu || ""}
                  onChange={(e) => formDispatch(handleChange(e))}
                  name="cpu"
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl variant="filled" fullWidth>
                <InputLabel>Memory</InputLabel>
                <Select
                  value={memory || ""}
                  onChange={(e) => formDispatch(handleChange(e))}
                  name="memory"
                  startAdornment={
                    <InputAdornment position="start">GB</InputAdornment>
                  }
                >
                  <MenuItem value={1 * 1024}>1</MenuItem>
                  <MenuItem value={2 * 1024}>2</MenuItem>
                  <MenuItem value={4 * 1024}>4</MenuItem>
                  <MenuItem value={8 * 1024}>8</MenuItem>
                  <MenuItem value={8 * 1024}>16</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <TextField
                variant="filled"
                required
                type="number"
                value={disk || ""}
                onChange={(e) => formDispatch(handleChange(e))}
                id="disk"
                name="disk"
                label="Disque"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">GB</InputAdornment>
                  ),
                }}
                inputProps={{
                  step: "10",
                }}
              />
            </Grid>

            {/*

              <Grid item xs={12} sm={4}>
                <TextField
                  variant="filled"
                  onChange={(e) => formDispatch(handleChange(e))}
                  value={instanceGroupName || ''}
                  required
                  id="instanceGroupName"
                  name="instanceGroupName"
                  label="Instance Group Name"
                  fullWidth
                  autoComplete="family-name"
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="filled"
                  type="number"
                  onChange={(e) => formDispatch(handleChange(e))}
                  value={numberOfVm || ''}
                  required
                  id="vmNumber"
                  name="numberOfVm"
                  label="Nombre de VM"
                  fullWidth
                  autoComplete="family-name"
                />
              </Grid>

              */}
          </Grid>
        )}
      </Box>
      <div
        style={{
          display: "flex",
          marginTop: 50,
          justifyContent: "flex-end",
        }}
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
    </>
  );
};

export default SecondStep;
