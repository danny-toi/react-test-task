import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from 'recharts'
import moment from 'moment'

// Indicates how many numbers to be shown in chart.
const CHART_CAPACITY = 10

class NumberChart extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.xTickFormatter = this.xTickFormatter.bind(this)
  }

  xTickFormatter(x) {
    return x ? moment(x).format('HH:mm:ss') : ''
  }

  parseData(numbers) {
    const parsed = []

    if (numbers.length) {
      // Prepare chart data with the recent 10 (CHART_CAPACITY) numbers.
      const maxIndex = Math.min(CHART_CAPACITY - 1, numbers.length - 1)
      for (let index = 0; index < maxIndex; index += 1) {
        parsed.push(numbers[index])
      }
    }

    if (parsed.length < CHART_CAPACITY) {
      const padding = CHART_CAPACITY - parsed.length
      for (let index = 0; index < padding; index += 1) {
        parsed.push({
          value: 0,
          timestamp: 0,
        })
      }
    }

    return parsed
  }

  render() {
    const { numbers } = this.props

    const chartData = this.parseData(numbers)

    return (
      <ResponsiveContainer aspect={4} width="100%" debounce={10}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            left: 16,
            bottom: 16,
          }}
        >
          <XAxis
            dataKey="timestamp"
            minTickGap={20}
            tickFormatter={this.xTickFormatter}
          />
          <YAxis
            domain={[-100, 100]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            labelFormatter={this.xTickFormatter}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke="#70c0eb"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default NumberChart
