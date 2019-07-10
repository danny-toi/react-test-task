/* eslint-disable no-underscore-dangle */
import { createStore, compose } from 'redux'

import { ENVIRONMENT } from './config'
import rootReducer from './reducers'

const composeEnhancers = ENVIRONMENT === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

const store = createStore(rootReducer, composeEnhancers())

export default store
