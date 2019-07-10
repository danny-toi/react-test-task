import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import 'react-toastify/dist/ReactToastify.css'

import store from './store'
import App from './App'

import './scss/app.scss'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

// Hot-reloading.
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
