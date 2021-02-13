import * as actionType from './actions_types'

export const handleChange = (e) => {
  const { name, value } = e.target

  return {
    type: actionType.FORM_ON_CHANGE,
    name,
    value,
  }
}
