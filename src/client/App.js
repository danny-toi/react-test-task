import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socketIO from 'socket.io-client'

import { SOCKET_URL } from './config'
import { receiveData } from './actions'

import NumberChart from './components/NumberChart'
import RangeChart from './components/RangeChart'

class App extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    receiveData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleData = this.handleData.bind(this)
  }

  componentDidMount() {
    // Establish a socket connection.
    if (!this.socket) {
      this.socket = socketIO(SOCKET_URL)
      this.socket.on('data', this.handleData)
    }
  }

  componentWillUnmount() {
    // Release a socket connection.
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  // Handle data received from socket.io.
  handleData(data) {
    const { receiveData: receiveDataProp } = this.props
    receiveDataProp(data)
  }

  render() {
    const { numbers } = this.props

    return (
      <div className="container">
        <NumberChart
          numbers={numbers}
        />
        <RangeChart
          numbers={numbers}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ numbers }) => ({
  numbers,
})

const mapDispatchToProps = {
  receiveData,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
