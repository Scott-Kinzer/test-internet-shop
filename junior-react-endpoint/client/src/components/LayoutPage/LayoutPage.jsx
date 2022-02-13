import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default class LayoutPage extends Component {
  render() {
    return (
      <>
            <Header/>
            <Outlet/>
      </>
    )
  }
}
