import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Component to enter alert threshold.
class ThresholdInput extends Component {
  static propTypes = {
    threadhold: PropTypes.number,
    onSave: PropTypes.func.isRequired,
  }

  static defaultProps = {
    threadhold: null,
  }

  constructor(props) {
    super(props)

    const { threadhold } = props

    this.state = {
      threadhold: threadhold !== null ? threadhold : '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      threadhold: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const { onSave } = this.props
    const { threadhold } = this.state
    onSave(threadhold !== '' ? parseFloat(threadhold) : null)
  }

  render() {
    const { threadhold } = this.state

    return (
      <div className="threadhold-input-container">
        <form
          className="form-inline"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="threshold-input">
              Alert threshold
            </label>
            <input
              type="number"
              className="form-control"
              value={threadhold}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      </div>
    )
  }
}

export default ThresholdInput
