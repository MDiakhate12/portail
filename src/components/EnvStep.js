import React, { useContext } from "react";
import { Box, Button } from "@material-ui/core";
import CustomButton from "./CustomButton";
import devImage from "../images/dev.png";
import prodImage from "../images/prod.png";
import mernImage from "../images/mern.png";
import sbamImage from "../images/sbam.png";
import { GlobalContext } from "../store/providers/GlobalProvider";
import Snack from "./Snack";

// Destructuring props
const EnvStep = ({ handleNext, handleBack }) => {
    
  const {
    formState,
    setEnvironment,
    setStack,
    snackbarState,
    openSnackbar,
  } = useContext(GlobalContext);

  const environmentButtons = [
    {
      url: devImage,
      title: "Développement",
      width: "23%",
      height: 200,
      onClick: () => {
        setEnvironment("dev");
        console.log("ENV", formState.environment);
        // handleNext()
      },
    },
    {
      url: prodImage,
      title: "Production",
      width: "23%",
      height: 200,
      onClick: () => {
        setEnvironment("prod");
        console.log("ENV", formState.environment);
        // handleNext()
      },
    },
  ];

  const stackButtons = [
    {
      url: mernImage,
      title: "MERN Stack",
      width: "23%",
      height: 200,
      backgroundSize: "115%",
      onClick: () => {
        setStack("mern");
        console.log("STACK", formState.stack);
      },
    },
    {
      url: sbamImage,
      title: "SBAM Stack",
      width: "23%",
      height: 200,
      backgroundSize: "115%",
      onClick: () => {
        setStack("sbam");
        console.log("STACK", formState.stack);
      },
    },
  ];

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CustomButton buttons={environmentButtons} />
      </Box>

      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CustomButton buttons={stackButtons} />
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
          Back
        </Button>
        <Button
          variant="contained"
          // disabled={!isValid}
          color="primary"
          onClick={() => {
            if (formState.environment === "" || formState.stack === "") {
              openSnackbar(
                "You must choose at least one environment and one stack!",
                "warning"
              );
              console.log(snackbarState);
              return;
            }
            handleNext();
          }}
        >
          Next
        </Button>
      </div>
      <Snack />
    </>
  );
};

export default EnvStep;
