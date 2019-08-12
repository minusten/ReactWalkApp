import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

export default class Spinner extends Component {
  render () {
    return (
      <Loader
        type='TailSpin'
        color='#000'
        height='100'
        width='100'
      />
    )
  }
}
