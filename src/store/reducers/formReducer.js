import * as actionType from '../actions/actions_types'
import { updateObject } from '../utility'

export const formInitialState = {
    projectName: 'DiafProject',
    applicationType: 'web',
    dependencies: ['nginx', 'nodejs'],
    SLA: 4,
    environment: 'prod',
    stack: 'mern',
    connectedApplications: ['gaia', 'orange-et-moi', 'nessico'],
    costEstimation: 777777,
    cpu: 1,
    disk: 10,
    memory: 1 * 1024,
    numberOfVm: 3,
    osImage: 'debian-10',
    osType: 'debian-cloud',
    publicIP: "",
    provider: '',
    providerList: [],
    projectArchitecture: 'micro',
}

const handleChange = (state, action) => {
    return updateObject(state, {
        [action.name]: action.value,
    })
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case actionType.FORM_ON_CHANGE:
            return handleChange(state, action)
        case actionType.APPLICATION_TYPE_CHANGE:
            return {
                ...state,
                applicationType: action.payload
            }
        case actionType.EVIRONMENT_CHANGE:
            return {
                ...state,
                environment: action.payload
            }
        case actionType.STACK_CHANGE:
            return {
                ...state,
                stack: action.payload
            }
        default:
            return state
    }
}
