import { ACTION_TYPE_DATA_RECEIVE } from '../constants'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE_DATA_RECEIVE:
      return [
        action.data,
        ...state,
      ]
    default:
      return state
  }
}
