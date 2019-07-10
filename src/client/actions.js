import {
  ACTION_TYPE_DATA_RECEIVE,
  ACTION_TYPE_THRESHOLD_SAVE,
} from './constants'

// Action to receive data.
export const receiveData = data => ({
  type: ACTION_TYPE_DATA_RECEIVE,
  data,
})

// Action to set alert threshold data.
export const saveThreshold = threshold => ({
  type: ACTION_TYPE_THRESHOLD_SAVE,
  threshold,
})
