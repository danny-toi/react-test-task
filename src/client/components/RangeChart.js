import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from 'recharts'

import { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } from '../constants'

// Number range size of categories.
const CATEGORY_RANGE = 10

// Component to render bar chart.
class RangeChart extends Component {
  static propTypes = {
    numbers: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.xTickFormatter = this.xTickFormatter.bind(this)
  }

  xTickFormatter(x) {
    return `${MIN_RANDOM_NUMBER + x * CATEGORY_RANGE} - ${MIN_RANDOM_NUMBER + x * CATEGORY_RANGE + CATEGORY_RANGE}`
  }

  parseData(numbers) {
    const parsed = []

    const categoryCount = Math.ceil((MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER) / CATEGORY_RANGE)

    const counter = []
    for (let x = 0; x < categoryCount; x += 1) {
      counter[x] = 0
    }

    for (let index = 0; index < numbers.length; index += 1) {
      counter[Math.floor((numbers[index].value - MIN_RANDOM_NUMBER) / CATEGORY_RANGE)] += 1
    }

    for (let x = 0; x < categoryCount; x += 1) {
      parsed.push({
        x,
        y: counter[x],
      })
    }

    return parsed
  }

  render() {
    const { numbers } = this.props

    const chartData = this.parseData(numbers)

    return (
      <ResponsiveContainer aspect={4} width="100%" debounce={10}>
        <BarChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            left: 16,
            bottom: 16,
          }}
        >
          <XAxis
            dataKey="x"
            minTickGap={20}
            tickFormatter={this.xTickFormatter}
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            labelFormatter={this.xTickFormatter}
          />
          <Bar
            dataKey="y"
            fill="#70c0eb"
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default RangeChart
