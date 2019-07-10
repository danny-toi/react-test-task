import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import socketIO from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify'

import { SOCKET_URL } from './config'
import { receiveData, saveThreshold } from './actions'

import ThresholdInput from './components/ThresholdInput'
import NumberChart from './components/NumberChart'
import RangeChart from './components/RangeChart'

class App extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
    threshold: PropTypes.number,
    receiveData: PropTypes.func.isRequired,
    saveThreshold: PropTypes.func.isRequired,
  }

  static defaultProps = {
    threshold: null,
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
    const { threshold, receiveData: receiveDataProp } = this.props
    receiveDataProp(data)

    if (threshold !== null && !isNaN(threshold)) {
      if (data.value > threshold) {
        toast(data.value)
      }
    }
  }

  render() {
    const { numbers, threshold, saveThreshold: saveThresholdProp } = this.props

    return (
      <div className="container">
        <ThresholdInput
          threshold={threshold}
          onSave={saveThresholdProp}
        />
        <NumberChart
          numbers={numbers}
        />
        <RangeChart
          numbers={numbers}
        />
        <ToastContainer />
      </div>
    )
  }
}

const mapStateToProps = ({ numbers, threshold }) => ({
  numbers,
  threshold,
})

const mapDispatchToProps = {
  receiveData,
  saveThreshold,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
