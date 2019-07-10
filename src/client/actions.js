import { ACTION_TYPE_DATA_RECEIVE } from './constants'

// Action to receive data.
export const receiveData = data => ({
  type: ACTION_TYPE_DATA_RECEIVE,
  data,
})
