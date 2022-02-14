import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

import s from './layout.module.css';

export default class LayoutPage extends Component {

  state = {
    hide: false
  }

  handleCart = () => {
    this.setState({hide: !this.state.hide});
  }

  render() {
    return (
      <>
            <Header handleCart={this.handleCart}/>
            <div className={s.ouletWrapper}>
            < Outlet/>
            <div className={this.state.hide ? s.hideWall: ""}></div>
            </div>
            
      </>
    )
  }
}
