import * as actionType from "../actions/actions_types";
import { updateObject } from "../utility";

export const formInitialState = {
  projectName: "DiafProject",
  applicationType: "web",
  dependencies: ["nginx", "nodejs"],
  SLA: 4,
  environment: "",
  stack: "",
  connectedApplications: ["gaia", "orange-et-moi", "nessico"],
  costEstimation: 777777,
  cpu: 1,
  disk: 10,
  memory: 1 * 1024,
  numberOfVm: 3,
  osImage: "debian-10",
  osType: "debian-cloud",
  publicIP: "",
  provider: "",
  providerList: [],
  projectArchitecture: "micro",
  frontendOptions: {
    project_repository: "https://github.com/MDiakhate12/mern-prod-frontend.git",
  },
  backendOptions: {
    db_uri:
      "mongodb+srv://Amet:amet@clusterprovisionning.3p11m.mongodb.net/mern-prod-database?retryWrites=true&w=majority",
    port: 4000,
    main_file: "index.js",
    project_repository: "https://github.com/MDiakhate12/mern-prod-backend.git",
    jar_url: "",
  },
};

const handleChange = (state, action) => {
  return updateObject(state, {
    [action.name]: action.value,
  });
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case actionType.FORM_ON_CHANGE:
      return handleChange(state, action);
    case actionType.APPLICATION_TYPE_CHANGE:
      return {
        ...state,
        applicationType: action.payload,
      };
    case actionType.EVIRONMENT_CHANGE:
      return {
        ...state,
        environment: action.payload,
      };
    case actionType.STACK_CHANGE:
      return {
        ...state,
        stack: action.payload,
      };
    case actionType.FRONTEND_OPTIONS_CHANGE:
      let { frontendOptions } = state;
      frontendOptions[action.payload.name] = action.payload.value;
      return {
        ...state,
        frontendOptions,
      };
    case actionType.BACKEND_OPTIONS_CHANGE:
      let { backendOptions } = state;
      backendOptions[action.payload.name] = action.payload.value;
      return {
        ...state,
        backendOptions,
      };
    default:
      return state;
  }
};
