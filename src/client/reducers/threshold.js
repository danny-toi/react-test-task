import { ACTION_TYPE_THRESHOLD_SAVE } from '../constants'

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE_THRESHOLD_SAVE:
      return action.threshold
    default:
      return state
  }
}
