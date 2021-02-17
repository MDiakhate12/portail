import * as actionType from '../actions/actions_types'
import { updateObject } from '../utility'

export const formInitialState = {
  projectName: 'DiafProject',
  applicationType: 'dev',
  dependencies: [],
  SLA: 4,
  environment: 'prod',
  dataSize: '',
  connectedApplications: 'DiafApplications',
  costEstimation: 777777,
  vmGroupName: 'walabok-vm',
  cpu: 2,
  disk: 10,
  memory: 4 * 1024,
  numberOfVm: 1,
  osImage: 'debian-10',
  osType: 'debian-cloud',
  provider: '',
  providerList: [],
  projectArchitecture: 'micro',
}

const handleChange = (state, action) => {
  return updateObject(state, {
    [action.name]: action.value,
  })
}

const formReducer = (state, action) => {
  switch (action.type) {
    case actionType.FORM_ON_CHANGE:
      return handleChange(state, action)
    default:
      return state
  }
}

export default formReducer
